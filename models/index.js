const User = require('./User');
const Post = require('./Post.js');

Post.belongsTo(User, {
  foreignKey: 'poster_id',
});

User.hasMany(Post, {
  foreignKey: 'poster_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Post };
