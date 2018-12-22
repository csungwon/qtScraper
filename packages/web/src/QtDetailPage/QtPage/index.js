import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

import { Spinner } from '../../ui';
import Header from '../Header';
import Scripture from '../Scripture';
import References from '../References';
import Questions from '../Questions';
import Guide from '../Guide';
import './style.scss';

class QtPage extends Component {
  state = {
    showGuide: false
  };

  guideRef = React.createRef();

  handleShowGuide = () => {
    this.setState({ showGuide: true }, () => {
      window.scrollTo({
        top: this.guideRef.current.offsetTop,
        behavior: 'smooth'
      });
    });
  };

  render() {
    const { loading, error } = this.props.data;

    if (loading) return <Spinner>큐티를 불러오는 중입니다...</Spinner>;
    if (error) return <p>error: {error.message}</p>;

    const {
      qtId,
      title,
      date,
      reading,
      scriptures,
      references,
      questions,
      guide
    } = this.props.data.qt;
    return (
      <div className="qt__container">
        {loading ? (
          <Spinner>큐티를 불러오는 중입니다...</Spinner>
        ) : (
          <>
            <Button className="qt__back-button" size="large">
              <Link to="/calendar">
                <Icon type="left" /> 달력
              </Link>
            </Button>
            <Header title={title} reading={reading} date={date} />
            <Scripture scriptures={scriptures} />
            <References references={references} />
            <Questions questions={questions} qtId={qtId} />
            <Guide
              guide={guide}
              showGuide={this.state.showGuide}
              handleShowGuide={this.handleShowGuide}
              ref={this.guideRef}
            />
          </>
        )}
      </div>
    );
  }
}

export default QtPage;
