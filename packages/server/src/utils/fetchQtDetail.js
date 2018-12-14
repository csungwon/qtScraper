import rp from 'request-promise';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';
import moment from 'moment-timezone';
import { UserInputError } from 'apollo-server-express';

export default async function fetchQtDetail(qtId) {
  const requestOptions = {
    encoding: null,
    uri: `http://www.365qt.com/TodaysQT.asp?QTID=${qtId}`,
    transform: responseBody => {
      const utf8string = iconv.decode(responseBody, 'EUC-KR');
      const $ = cheerio.load(utf8string, { decodeEntities: false });
      return $;
    }
  };

  const $ = await rp(requestOptions);

  if ($('#content').length === 0)
    throw new UserInputError(`No Qt with id ${qtId} exists.`);

  return {
    qtId,
    ...parseHTML($)
  };
}

function parseHTML($) {
  return {
    title: getTitle($),
    date: getDate($),
    reading: getReading($),
    references: getReferences($),
    questions: getQuestions($),
    guide: getGuide($)
  };
}

function getTitle($) {
  return $('#qtDay .qtbigText2')
    .text()
    .trim();
}

function getDate($) {
  const string = $('#qtDay');
  const YYYYMM = /<div class="qtDayTextW">(.+?)<\/div>/.exec(string)[1].trim();
  const D = /<div class="qtbigText">(.+?)<\/div>/.exec(string)[1].trim();
  const date = moment(YYYYMM + '. ' + D, 'YYYY. MM. D');
  if (date.day() === 0) throw new UserInputError('There is no QT on Sunday');
  return date.format('MM/D/YYYY');
}

function getReading($) {
  const string = $('#qtDay');
  return /<br>\((.+?)\)/.exec(string)[1].trim();
}

function getReferences($) {
  const string = $('.script ul li').html();
  return string
    ? $('.script ul li')
        .html()
        .replace(/<!--.+-->/, '')
        .replace(/<br>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .trim()
        .split(/\n+/)
        .filter(s => s.length > 0)
    : [];
}

function getQuestions($) {
  const string = $('a[name=meditation]')
    .nextAll('p')
    .html();
  return string
    ? string
        .replace(/<span.+?<\/span>/g, '')
        .replace(/<[^>]+>/g, '')
        .trim()
        .split(/\d\./)
        .filter(s => s.length > 0)
        .map(s => s.trim())
    : [];
}

function getGuide($) {
  return $('.bx2 p')
    .text()
    .trim();
}
