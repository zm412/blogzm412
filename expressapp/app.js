const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
dotenv.config();
const app = express();

const sequelize = new Sequelize("capstone_db", "zm412", "tazhbaeva1", {
  dialect: "postgres",
  host: "db",
  port: "5432",
});

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then((result) => {
    //console.log(result);
  })
  .catch((err) => console.log(err, "err"));

/*
 
User.create({
  username: "Bob",
  password: "ddd",
})
  .then((res) => {
    const user = { id: res.id, username: res.username, password: res.password };
    console.log(user);
  })
  .catch((err) => console.log(err));

  */

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("hbs").__express);
app.set("view engine", "html");

app.get("/", (req, res) => res.render("index"));

app.post("/create_one", (req, res) => {
  const { username, email, password } = req.body;

  User.create({ username, email, password: hashPassword })
    .then((doc) => {
      console.log(doc, "doc");
      const user = {
        username: doc.username,
        elem: doc.elem,
        password: doc.password,
      };
      console.log(user, "USER");
      res.json(doc);
    })
    .catch((err) => console.log(err));
});
app.get("/get_all", (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users, "users");
      res.json(users);
    })
    .catch((err) => console.log(err, "err"));
});
/*
User.destroy({
  where: {
    name: "Bob",
  },
}).then((res) => {
  console.log(res);
});
*/

app.post("/login", async (req, res) => {
  console.log(req.body, "REQ");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user, "user");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateAccessToken({
      username: user.username,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

app.post(
  "/register",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    console.log(req.body, "REQBODY");
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    let answ = await User.findOne({ where: { email } })

      .then((candidate) => {
        if (candidate) {
          return res
            .status(400)
            .json({ message: `User with email ${email} already exist` });
        } else {
          User.create({ username, email, password: hashPassword })
            .then((doc) => {
              console.log(doc, "doc");
              const token = generateAccessToken({
                username: req.body.username,
              });
              res.json({
                user: {
                  id: doc.id,
                  username: doc.username,
                  email: doc.email,
                },
                token,
              });
            })

            .catch((err) => console.log(err, "errcreate"));
        }
        console.log(candidate, "candidate");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running, localhost:5000")
);
