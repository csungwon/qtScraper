import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment-timezone';

import { Check } from '../../ui/Icon';
import './style.scss';

export default ({ navigateTo, qtMetas, userQtIds, queryDate }) => {
  const tileContent = ({ date, view }) => {
    const qtMeta = qtMetas[date.getDate()];
    return (
      qtMeta &&
      view === 'month' && (
        <div className="react-calendar__tile--text">
          {qtMeta.title} {userQtIds.has(qtMeta.qtId) && <Check />}
        </div>
      )
    );
  };

  const tileClassName = ({ date, view }) =>
    [
      view === 'month' &&
        date.getDay() === 6 &&
        'react-calendar__month-view__days__day--saturday',
      date.toDateString() === new Date().toDateString() &&
        'react-calendar__tile--active'
    ].filter(className => typeof className === 'string');

  const onActiveDateChange = ({ activeStartDate, view }) => {
    if (view === 'month') {
      const date = moment(activeStartDate).format('YYYY-MM');
      navigateTo(`/calendar?month=${date}`);
    }
  };

  const onClickMonth = value => {
    const date = moment(value).format('YYYY-MM');
    navigateTo(`/calendar?month=${date}`);
  };

  const onClickDay = value => {
    if (qtMetas[value.getDate()]) {
      navigateTo(`/qt/${qtMetas[value.getDate()].qtId}`);
    }
  };

  return (
    <Calendar
      activeStartDate={moment(queryDate).toDate()}
      calendarType="US"
      locale="ko-KR"
      minDate={new Date(2005, 1, 1)}
      maxDate={new Date(moment.tz('Asia/Seoul').format('YYYY-MM-DD hh:mm'))}
      showNeighboringMonth={false}
      onActiveDateChange={onActiveDateChange}
      tileContent={tileContent}
      tileDisabled={({ date, view }) => view === 'month' && !date.getDay()}
      tileClassName={tileClassName}
      onClickMonth={onClickMonth}
      onClickDay={onClickDay}
    />
  );
};
