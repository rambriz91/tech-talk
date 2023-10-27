const User = require('./User');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

Post.belongsTo(User, {
  foreignKey: 'poster_id',
});

User.hasMany(Post, {
  foreignKey: 'poster_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'commenter_id',
});

User.hasMany(Comment, {
  foreignKey: 'commenter_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };
