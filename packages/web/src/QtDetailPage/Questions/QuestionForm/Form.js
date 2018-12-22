import React from 'react';
import { Form, Field, withFormik } from 'formik';
import { message, Modal } from 'antd';
import 'antd/lib/message/style/css';
import 'antd/lib/modal/style/css';

import Persist from './Persist';
import { TextArea, Button } from '../../../ui';

const QuestionForm = ({ questions, isSubmitting, dirty, qtId }) => (
  <Form>
    {questions.map((question, index) => (
      <label className="qt__question--item" key={index}>
        {`${index + 1}. ${question}`}
        <Field
          name={`answer${index + 1}`}
          render={({ field }) => (
            <TextArea
              {...field}
              className="qt__question--form"
              autosize={{ minRows: 3 }}
            />
          )}
        />
      </label>
    ))}
    <Button
      type="primary"
      htmlType="submit"
      loading={isSubmitting}
      disabled={!dirty}
    >
      큐티 저장
    </Button>
    <Persist name={qtId} debounce={1000} />
  </Form>
);

const formikConfig = {
  mapPropsToValues: ({ queryData, qtId }) => {
    if (queryData.userQt) {
      const { __typename, ...answers } = queryData.userQt;
      return answers;
    }
    return {
      qtId,
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: ''
    };
  },
  enableReinitialize: true,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { props, setSubmitting }) => {
    const { history, location, saveUserQt } = props;
    const destroyMessage = message.loading('큐티를 저장하고 있습니다...');

    try {
      await saveUserQt({
        variables: {
          input: values
        }
      });
      destroyMessage();
      message.success('큐티를 성공적으로 저장하였습니다!');
    } catch (e) {
      destroyMessage();
      Modal.error({
        title: '큐티 저장 실패',
        content: '로그인을 하셔야 큐티를 저장하실 수 있습니다.',
        onOk: () => {
          history.push({ pathname: '/login', state: { from: location } });
        }
      });
    }
    setSubmitting(false);
  }
};

export default withFormik(formikConfig)(QuestionForm);
