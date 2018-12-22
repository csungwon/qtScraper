import React from 'react';
import './style.scss';

const References = ({ references }) =>
  !!references.length && (
    <ul className="qt__references">
      {references.map((reference, i) => (
        <li key={i}>{reference}</li>
      ))}
    </ul>
  );

export default References;
