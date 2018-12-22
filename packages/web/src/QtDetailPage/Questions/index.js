import React from 'react';

import QuestionForm from './QuestionForm';
import './style.scss';

const Questions = ({ questions, qtId }) => (
  <section>
    <h2>
      <span role="img" aria-label="magnifying glass">
        🔎
      </span>{' '}
      연구/묵상
    </h2>
    <QuestionForm questions={questions} qtId={qtId} />
  </section>
);

export default Questions;
