module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    post_text: Sequelize.STRING,
    file_url: Sequelize.STRING,
  });

  return Post;
};
