const hbs = require("hbs");
const dbConfig = require("./db/db.config.js");
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
dotenv.config();
const app = express();
const dbase = require("./db/models");
const User = dbase.users;
const Post = dbase.posts;

dbase.sequelize
  .sync()
  .then((result) => {
    //console.log(result);
  })
  .catch((err) => console.log(err, "err"));

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

function savingFiles(req, res, next) {
  if (req.files != null) {
    if (req.files.file_item != null) {
      let storage = req.body.userid + "/" + req.files.file_item.name;

      try {
        if (!fs.existsSync("media/" + req.body.userid)) {
          fs.mkdirSync("media/" + req.body.userid);
        }
      } catch (err) {
        console.error(err);
      }

      req.files.file_item.mv("media/" + storage);
      req.body.file_url = storage;
    } else if (req.body.file_url == null) {
      req.body.file_url = null;
    }
  }
  next();
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "It's time to log in" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.status(403).json({ message: "It's time to log in" });

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
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ message: "Error" }));
});

app.delete("/post/:id", authenticateToken, async (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (!post) res.status(404).json({ message: "Post not found" });

      if (!fs.existsSync("media/" + post.file_url)) {
        fs.unlink("media/" + post.file_url, (err) => {
          if (err) throw err; // не удалось удалить файл
          console.log("Файл успешно удалён");
        });
      }

      Post.destroy({ where: { id: post.id } })
        .then((doc) => {
          res.status(200).json({ message: "Post deleted" });
        })
        .catch((err) => res.status(400).json({ message: "Error" }));
    })

    .catch((err) => res.status(400).json({ message: "Error" }));
});

app.put("/post/:id", authenticateToken, savingFiles, async (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (!post) res.status(404).json({ message: "Post not found" });
      console.log(post, "post");

      if (!fs.existsSync("media/" + post.file_url)) {
        fs.unlink("media/" + post.file_url, (err) => {
          if (err) throw err; // не удалось удалить файл
          console.log("Файл успешно удалён");
        });
      }

      let updatedPost = {};

      for (let key in req.body) {
        if (key != "userid") updatedPost[key] = req.body[key];
      }
      updatedPost.file_url = req.body.file_url;

      console.log(updatedPost, "newpost");
      Post.update(updatedPost, {
        where: {
          id: post.id,
        },
      })
        .then((res) => res.status(200).json({ message: "Update complete" }))
        .catch((err) => console.log(err, "err"));
    })
    .catch((err) => console.log(err, "err"));
});

app.post("/add_post", authenticateToken, savingFiles, async (req, res) => {
  User.findByPk(req.body.userid).then((user) => {
    if (!user) res.status(404).json({ message: "User not found" });
    user
      .createPost({
        post_text: req.body.post_text,
        file_url: req.body.file_url,
      })
      .then((post_item) => {
        return res.status(200).json({ message: "Post added" });
      })
      .catch((err) => console.log(err, "err"));
  });
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
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running, localhost:5000")
);
