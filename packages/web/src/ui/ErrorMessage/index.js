import React from 'react';
import { Alert } from 'antd';
import 'antd/lib/alert/style/css';

export default ({ description, afterClose, className }) => (
  <Alert
    className={className}
    message="오류"
    description={description}
    type="error"
    closable
    showIcon
    afterClose={afterClose}
  />
);
