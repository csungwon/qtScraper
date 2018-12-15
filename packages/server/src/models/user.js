import bcrypt from 'bcrypt';

export default (sequelize, dataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: dataTypes.STRING,
        unique: {
          msg: '이미 존재하는 이메일 주소입니다.'
        },
        allowNull: false,
        validate: {
          isEmail: {
            msg: '올바른 이메일 형식이 아닙니다.'
          }
        }
      },
      password: {
        type: dataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [8, 50],
            msg: '8-50자의 비밀번호를 입력해주세요.'
          }
        }
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  );

  User.associate = ({ user, userQt }) => {
    user.hasMany(userQt, {
      foreignKey: {
        name: 'authorId',
        allowNull: false
      }
    });
  };

  return User;
};
