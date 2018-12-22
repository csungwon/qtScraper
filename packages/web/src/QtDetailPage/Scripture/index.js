import React from 'react';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import './style.scss';

const Scriptures = ({ scriptures }) => {
  const versesByChapter = groupBy(scriptures, 'chapter');
  const allChapters = sortBy(Object.keys(versesByChapter), parseInt);

  return (
    <section>
      <h2>
        <span role="img" aria-label="book">
          📖
        </span>{' '}
        말씀
      </h2>
      <ul className="qt__scriptures">
        {allChapters.map(chapter => (
          <li key={chapter}>
            <strong>{chapter}장</strong>
            <ol start={versesByChapter[chapter][0].verse}>
              {versesByChapter[chapter].map(v => (
                <li key={`${v.book}${v.chapter}:${v.verse}`}>{v.text}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Scriptures;
