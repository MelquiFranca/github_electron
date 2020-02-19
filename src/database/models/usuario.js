'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    idGit: DataTypes.INTEGER,
    login: DataTypes.STRING,
    nome: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    url: DataTypes.STRING,
    repos_url: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};