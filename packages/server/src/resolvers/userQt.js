import { AuthenticationError } from 'apollo-server-express';

export default {
  Query: {
    userQt: async (_, { qtId }, { req, db }) => {
      if (!req.session || !req.session.userId) {
        return null;
      }

      return await db.userQt.findOne({
        where: { authorId: req.session.userId, qtId: qtId }
      });
    },
    userQts: async (_, __, { req, db }) => {
      if (!req.session || !req.session.userId) {
        return [];
      }

      return await db.userQt.findAll({
        where: { authorId: req.session.userId }
      });
    }
  },
  Mutation: {
    updateOrCreateUserQt: async (_, { input }, { req, db }) => {
      if (!req.session || !req.session.userId) {
        throw new AuthenticationError(
          '로그인을 하셔야 큐티를 저장하실 수 있습니다.'
        );
      }

      const qt = await db.userQt.findOne({
        where: { qtId: input.qtId, authorId: req.session.userId }
      });

      qt
        ? await qt.update(input)
        : await db.userQt.create({ ...input, authorId: req.session.userId });

      return true;
    }
  }
};
