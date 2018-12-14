export default (sequelize, dataTypes) =>
  sequelize.define(
    'verse',
    {
      book: {
        type: dataTypes.STRING(7),
        primaryKey: true
      },
      chapter: {
        type: dataTypes.INTEGER,
        primaryKey: true
      },
      verse: {
        type: dataTypes.INTEGER,
        primaryKey: true
      },
      text: {
        type: dataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
