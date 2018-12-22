import React from 'react';

import { Button } from '../../ui';
import './style.scss';

const Guide = ({ guide, handleShowGuide, showGuide }, ref) => (
  <section>
    <h2>
      <span role="img" aria-label="map">
        🗺
      </span>{' '}
      길잡이
    </h2>
    <div className="qt__guide">
      {!showGuide ? (
        <p>
          충분한 묵상 시간을 가진 후에 보는 길잡이가 큐티를 더욱 풍성하게
          만듭니다
          <span role="img" aria-label="prayer">
            🙏
          </span>
          <Button
            className="qt__guide--show"
            type="primary"
            ghost
            onClick={handleShowGuide}
            size="large"
          >
            길잡이 보기
          </Button>
        </p>
      ) : (
        <p ref={ref}>{guide}</p>
      )}
    </div>
  </section>
);

export default React.forwardRef(Guide);
