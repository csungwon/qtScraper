import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'formik';

import { InputField, Button, Divider } from '../ui';
import { User, Lock } from '../ui/Icon';
import AuthForm from '../shared/AuthForm';

export default ({ isSubmitting, status, setStatus, location }) => {
  const { from } = location.state || {
    from: { pathname: '/calendar' }
  };
  return (
    <AuthForm status={status} setStatus={setStatus}>
      <Field
        hasFeedback
        name="email"
        type="email"
        noValidate
        prefix={<User className="field--icon" />}
        placeholder="이메일"
        component={InputField}
      />
      <Field
        hasFeedback
        name="password"
        type="password"
        prefix={<Lock className="field--icon" />}
        placeholder="비밀번호"
        component={InputField}
      />
      <Field
        hasFeedback
        name="confirmPassword"
        type="password"
        prefix={<Lock className="field--icon" />}
        placeholder="비밀번호 확인"
        component={InputField}
      />
      <Button block type="primary" htmlType="submit" loading={isSubmitting}>
        가입
      </Button>
      <Divider>또는</Divider>
      <Button block>
        <Link to={{ pathname: '/login', state: { from } }}>로그인</Link>
      </Button>
    </AuthForm>
  );
};
