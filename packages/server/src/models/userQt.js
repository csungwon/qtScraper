export default (sequelize, dataTypes) => {
  const UserQt = sequelize.define('userQt', {
    qtId: {
      type: dataTypes.INTEGER,
      validate: {
        min: 1
      },
      primaryKey: true
    },
    answer1: dataTypes.TEXT,
    answer2: dataTypes.TEXT,
    answer3: dataTypes.TEXT,
    answer4: dataTypes.TEXT,
    answer5: dataTypes.TEXT
  });

  UserQt.associate = ({ user, userQt }) => {
    userQt.belongsTo(user, {
      foreignKey: {
        name: 'authorId',
        primaryKey: true
      }
    });
  };

  return UserQt;
};
