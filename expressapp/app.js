const hbs = require("hbs");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
var fileUpload = require("express-fileupload");
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

const Post = sequelize.define("post", {
  post_text: Sequelize.STRING,
  file_url: Sequelize.STRING,
});

User.hasMany(Post, {
  onDelete: "CASCADE",
  foreignKey: "userId",
  sourceKey: "id",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  onDelete: "CASCADE",
});

sequelize
  .sync()
  .then((result) => {
    //console.log(result);
  })
  .catch((err) => console.log(err, "err"));

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/media")));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("hbs").__express);
app.set("view engine", "html");

app.get("/", (req, res) => res.render("index"));

app.get("/get_posts", (req, res) => {
  User.findAll({
    include: [
      {
        model: Post,
      },
    ],
  })
    .then((doc) => {
      let all_posts = doc.reduce((total, current, i) => {
        let posts = current.posts.map((n) => {
          return {
            id: n.id,
            post_text: n.post_text,
            file_url: n.file_url,
            createdAt: n.createdAt,
            user: {
              id: current.id,
              username: current.username,
              email: current.email,
            },
          };
        });

        return total.concat(posts);
      }, []);
      res.json(all_posts);
    })
    .catch((err) => console.log(err, "err"));
});

app.get("/get_all", (req, res) => {
  Post.findAll({ raw: true })
    .then((users) => {
      console.log(users, "users");
      res.json(users);
    })
    .catch((err) => console.log(err, "err"));
});

app.delete("/post/:id", authenticateToken, async (req, res) => {
  console.log(req.params.id, "REQ");
  //console.log(req.files.file_item, "files");

  Post.destroy({ where: { id: req.params.id } }).then((doc) => {
    console.log(doc, "doc");
  });

  res.json("hello");
});

app.post("/add_post", authenticateToken, async (req, res) => {
  //console.log(req.body, "REQ");
  //console.log(req.files.file_item, "files");

  User.findByPk(req.body.userid).then((user) => {
    if (!user) return console.log("User not found");
    console.log(user, "doc");
    let storage = req.body.userid + "/" + req.files.file_item.name;
    user
      .createPost({
        post_text: req.body.postText,
        file_url: storage,
      })
      .then((post_item) => {
        console.log(post_item, "item");

        try {
          if (!fs.existsSync("media/" + req.body.userid)) {
            fs.mkdirSync("media/" + req.body.userid);
          }
        } catch (err) {
          console.error(err);
        }
        req.files.file_item.mv("media/" + storage);
      })
      .catch((err) => console.log(err, "err"));
  });

  res.json("hello");
});

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
