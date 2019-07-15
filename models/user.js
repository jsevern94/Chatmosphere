module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define('user', {
      username: { primaryKey: true, type: Sequelize.STRING, allowNull: false },
      firstname: { type: Sequelize.STRING},
      lastname: { type: Sequelize.STRING},
      about: { type: Sequelize.TEXT },
      email: { type: Sequelize.STRING, validate: { isEmail: true } },
      password: { type: Sequelize.STRING, allowNull: false },
      last_login: { type: Sequelize.DATE },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });
  
    return User;
  };