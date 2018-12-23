import React from 'react';
import { Form } from 'formik';

import { ErrorMessage } from '../../ui';
import './style.scss';

export default ({ status, setStatus, children }) => (
  <div className="auth--container">
    {!!status && !!status.error && (
      <ErrorMessage
        className="auth--global-error"
        description={status.error}
        afterClose={() => setStatus({ error: undefined })}
      />
    )}
    <Form className="auth--form">{children}</Form>
  </div>
);
