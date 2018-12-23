import React from 'react';
import { Form, Input } from 'antd';

import 'antd/lib/input/style/css';
import 'antd/lib/form/style/css';
import './style.scss';

const FormItem = Form.Item;

export default ({
  field,
  hasFeedback,
  form: { touched, errors },
  ...props
}) => (
  <FormItem
    help={touched[field.name] && errors[field.name]}
    validateStatus={
      touched[field.name]
        ? errors[field.name]
          ? 'error'
          : 'success'
        : undefined
    }
    hasFeedback={hasFeedback}
  >
    <Input {...field} {...props} size="large" />
  </FormItem>
);
