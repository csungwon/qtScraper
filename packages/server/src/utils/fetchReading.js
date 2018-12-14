import { UserInputError } from 'apollo-server-express';

export default async (rangeQuery, db) => {
  const format1 = /(\S+?) (\d{1,3}):(\d{1,3})~(\d{1,3}):(\d{1,3})/; // 시편 1:5~3:1
  const format2 = /(\S+?) (\d{1,3}):(\d{1,3})~(\d{1,3})/; // 민수기 23:2~6
  const format3 = /(\S+?) (\d{1,3}):(\d{1,3})/; // 요한복음 3:16

  let match;
  if ((match = rangeQuery.match(format1))) {
    const [_, book, fromChapter, fromVerse, toChapter, toVerse] = match;
    const verses = await db.verse.findAll({
      where: {
        book,
        [db.Op.and]: [
          {
            [db.Op.or]: [
              {
                chapter: {
                  [db.Op.gt]: fromChapter
                }
              },
              {
                chapter: fromChapter,
                verse: {
                  [db.Op.gte]: fromVerse
                }
              }
            ]
          },
          {
            [db.Op.or]: [
              {
                chapter: {
                  [db.Op.lt]: toChapter
                }
              },
              {
                chapter: toChapter,
                verse: {
                  [db.Op.lte]: toVerse
                }
              }
            ]
          }
        ]
      }
    });
    return verses.length ? verses.map(r => r.get()) : [];
  } else if ((match = rangeQuery.match(format2))) {
    const [_, book, chapter, fromVerse, toVerse] = match;
    const verses = await db.verse.findAll({
      where: {
        book,
        chapter,
        verse: {
          [db.Op.between]: [fromVerse, toVerse]
        }
      }
    });
    return verses.length ? verses.map(r => r.get()) : [];
  } else if ((match = rangeQuery.match(format3))) {
    const [_, book, chapter, verse] = match;
    const verses = await db.verse.findOne({
      where: {
        book,
        chapter,
        verse
      }
    });
    return verses && [verses.get()];
  } else {
    throw new UserInputError('Invalid Input format. Check your input.');
  }
};
