import rp from 'request-promise';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';
import moment from 'moment-timezone';
import { UserInputError } from 'apollo-server-express';

export default async function fetchQTMetas(date) {
  let dateParsed = moment(date, 'YYYY-MM', true);
  if (!dateParsed.isValid()) dateParsed = moment();

  if (
    dateParsed.isAfter(moment(), 'day') ||
    dateParsed.isBefore(moment('2005-02-01'), 'day')
  ) {
    return [];
  }

  const requestOptions = {
    encoding: null,
    uri: `http://www.365qt.com/TodaysQTCalendar.asp?Current_DateTime=${dateParsed.format(
      'YYYY-MM-DD'
    )}`,
    transform: responseBody => {
      const utf8string = iconv.decode(responseBody, 'EUC-KR');
      const $ = cheerio.load(utf8string, { decodeEntities: false });
      return $;
    }
  };

  const $ = await rp(requestOptions);

  if ($('#content').length === 0) throw new UserInputError('No such id exists');

  return getQts($);
}

function getQts($) {
  const string = $('tbody').html();
  const regex = /(onclick="location\.href='TodaysQT\.asp\?QTID=(\d{1,4})';"[\s\S\r]*?>[\s\S\r]*?(\d{1,2})[\s\S\r]*?<span class="textCal">(.+?)<\/span>)/gm;
  const matches = [];
  let match;
  while ((match = regex.exec(string))) {
    const [_, __, qtId, day, title] = match;
    matches.push({ qtId, day, title });
  }
  return matches;
}
