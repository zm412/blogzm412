module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    post_text: Sequelize.TEXT,
    file_url: Sequelize.STRING,
  });

  return Post;
};
