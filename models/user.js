module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define('user', {
      id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      firstname: { type: Sequelize.STRING},
      lastname: { type: Sequelize.STRING},
      username: { type: Sequelize.TEXT },
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