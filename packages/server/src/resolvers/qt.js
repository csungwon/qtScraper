import { fetchQtDetail, fetchQtMetas, fetchReading } from '../utils';

export default {
  Query: {
    qtMetas: (_, { date }) => fetchQtMetas(date),
    qt: async (_, { qtId }, { db }) => {
      const qtInfo = await fetchQtDetail(qtId);
      const scriptures = await fetchReading(qtInfo.reading, db);

      return {
        ...qtInfo,
        scriptures
      };
    }
  }
};
