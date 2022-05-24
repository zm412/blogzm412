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


User.findAll({})
  .then((users) => {
    console.log(users);
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
/*
User.destroy({
  where: {
    name: "Bob",
  },
}).then((res) => {
  console.log(res);
});
*/

app.post(
  "/register",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  (req, res) => {
    console.log(req.body, "REQBODY");
    const { username, email, password } = req.body;
    const candidate = User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }
    const hashPassword = bcrypt.hash(password, 8);

    User.create({ username, email, password: hashPassword })
      .then((doc) => {
        const user = {
          id: doc.id,
          username: doc.username,
          elem: doc.elem,
          password: doc.password,
        };
        console.log(user, "USER");
      })
      .catch((err) => console.log(err));

    //const user = new User({username, email, password: hashPassword})
    //user.save()
    const token = generateAccessToken({ username: req.body.username });

    res.json(token);
  }
);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running, localhost:5000")
);
