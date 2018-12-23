import { graphql, withApollo } from 'react-apollo';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import * as yup from 'yup';
import gql from 'graphql-tag';

import RegisterForm from './RegisterForm';

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
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
  password: '',
  confirmPassword: ''
});

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 형식이 아닙니다.')
    .required('이메일 주소를 입력해주세요.'),
  password: yup
    .string()
    .min(8, '8-50자의 비밀번호를 입력해주세요.')
    .max(50, '8-50자의 비밀번호를 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 확인해주세요.')
});

const handleSubmit = async (
  values,
  { props, setSubmitting, setFieldError, setStatus }
) => {
  const { location, history, client } = props;
  const { data } = await props.register({ variables: { ...values } });
  const { from } = location.state || { from: { pathname: '/calendar' } };
  if (data.register.ok) {
    await client.clearStore();
    client.writeData({ data: { isLoggedIn: true } });
    history.push(from);
    return;
  }

  data.register.errors.forEach(({ path, message }) => {
    path === 'global'
      ? setStatus({ error: message })
      : setFieldError(path, message);
  });

  setSubmitting(false);
};

export default compose(
  graphql(REGISTER, { name: 'register' }),
  withApollo,
  withFormik({
    validationSchema,
    handleSubmit,
    mapPropsToValues: initalFormValues
  })
)(RegisterForm);
