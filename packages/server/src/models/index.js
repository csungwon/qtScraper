import Sequelize from 'sequelize';

const sequelizeConfig = {
  dialect: 'postgres',
  operatorsAliases: false
};

const {
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_URL
} = process.env;

const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, sequelizeConfig)
  : new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, sequelizeConfig);

const db = {
  verse: sequelize.import('./verse'),
  user: sequelize.import('./user'),
  userQt: sequelize.import('./userQt')
};

Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

export default db;
