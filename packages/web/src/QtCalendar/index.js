import React from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import gql from 'graphql-tag';

import Calendar from './Calendar';
import { Spinner } from '../ui';
import './style.scss';

const QT_METAS_QUERY = gql`
  query QtMetas($date: String) {
    qtMetas(date: $date) {
      qtId
      day
      title
    }
    userQts {
      qtId
    }
  }
`;

export default ({ history, location }) => {
  const queryDate = queryString.parse(location.search).month;
  const navigateTo = (pathname, state) => {
    if (state) {
      history.push({ pathname, state });
    } else {
      history.push(pathname);
    }
  };
  return (
    <Query query={QT_METAS_QUERY} variables={{ date: queryDate }}>
      {({ data, loading, error }) => {
        if (error) return <p>Error: {error.message}</p>;

        const qtMetaMap = {};
        const userQtIds = new Set();

        if (!loading) {
          const { qtMetas, userQts } = data;
          qtMetas.forEach(qtMeta => {
            qtMetaMap[qtMeta.day] = qtMeta;
          });
          userQts.forEach(qt => {
            userQtIds.add(qt.qtId);
          });
        }

        return (
          <div className="calendar--container">
            {loading && <Spinner>큐티 정보를 불러오는 중입니다...</Spinner>}
            <Calendar
              navigateTo={navigateTo}
              qtMetas={qtMetaMap}
              userQtIds={userQtIds}
              queryDate={queryDate}
            />
          </div>
        );
      }}
    </Query>
  );
};
