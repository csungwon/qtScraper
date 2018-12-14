import bcrypt from 'bcrypt';

export default {
  Query: {
    me: async (_, __, { req, db }) => {
      if (!req.session || !req.session.userId) {
        return null;
      }
      return await db.user.findById(req.session.userId);
    }
  },
  Mutation: {
    register: async (_, { email, password }, { req, db }) => {
      try {
        const user = await db.user.create({ email, password });
        req.session.userId = user.id;
        return {
          ok: true
        };
      } catch (error) {
        return {
          ok: false,
          errors: error.errors.map(({ path, message }) => ({ path, message }))
        };
      }
    },
    login: async (_, { email, password }, { req, db }) => {
      const error = {
        ok: false,
        errors: [
          {
            path: 'global',
            message:
              '아이디 또는 비밀번호를 확인해주세요. 등록되지 않은 아이디거나, 아이디 또는 비밀번호를 잘못 입력하였습니다.'
          }
        ]
      };

      const user = await db.user.findOne({ where: { email } });
      if (!user) return error;

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return error;

      req.session.userId = user.id;
      return {
        ok: true
      };
    },
    logout: (_, __, { req }) => {
      req.session = null;
      return true;
    }
  }
};
