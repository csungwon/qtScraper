import { graphql, withApollo } from 'react-apollo';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import * as yup from 'yup';
import gql from 'graphql-tag';

import LoginForm from './LoginForm';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const initalFormValues = () => ({
  email: '',
  password: ''
});

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 형식이 아닙니다.')
    .required('이메일 주소를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요')
});

const handleSubmit = async (
  values,
  { props, setSubmitting, setFieldError, setStatus }
) => {
  const { location, history, client } = props;
  const { data } = await props.login({ variables: { ...values } });
  const { from } = location.state || { from: { pathname: '/calendar' } };
  if (data.login.ok) {
    await client.clearStore();
    client.writeData({ data: { isLoggedIn: true } });
    history.push(from);
    return;
  }

  data.login.errors.forEach(({ path, message }) => {
    path === 'global'
      ? setStatus({ error: message })
      : setFieldError(path, message);
  });

  setSubmitting(false);
};

export default compose(
  graphql(LOGIN, { name: 'login' }),
  withApollo,
  withFormik({
    validationSchema,
    handleSubmit,
    mapPropsToValues: initalFormValues
  })
)(LoginForm);
