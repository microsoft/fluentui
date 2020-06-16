import * as React from 'react';
import { Form } from '@fluentui/react-northstar';
import { Formik } from 'formik';

const FormValidateFormik = () => (
  <Formik
    initialValues={{
      firstName: '',
      city: '',
    }}
    validate={values => {
      const errors: {
        firstName?: string;
        city?: string;
      } = {};
      if (values.firstName.length < 4) {
        errors.firstName = 'Too small';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }}
    render={({ handleSubmit, handleChange, errors, handleBlur, setTouched, touched, values, setFieldValue }) => (
      <Form onSubmit={handleSubmit}>
        {touched.firstName && values.firstName.length >= 4}
        <Form.Input
          errorMessage={touched.firstName && errors.firstName}
          onBlur={() => {
            setTouched({ city: true });
          }}
          onChange={handleChange}
          showSuccessIndicator={Boolean(values.firstName.length >= 4)}
          label="First Name"
          name="firstName"
          id="first-name-inline"
          required
        />
        <Form.Dropdown
          onBlur={handleBlur}
          onChange={(e, props) => {
            setFieldValue('city', props.value);
          }}
          label="City"
          id="city"
          items={['prague', 'new york']}
        />
        <Form.Button content="Submit" />
      </Form>
    )}
  />
);

export default FormValidateFormik;
