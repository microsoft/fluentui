import * as React from 'react';
import { Form } from '@fluentui/react-northstar';
import { useForm } from 'react-hook-form';

const FormValidateHooks = () => {
  const { register, handleSubmit, errors, setValue, getValues, triggerValidation } = useForm();
  const onSubmit = data => {
    console.log('errors: ', errors);
    console.log('data: ', data);
  };

  React.useEffect(() => {
    register(
      { name: 'firstName' },
      {
        required: { value: true, message: 'first name is required' },
        validate: val => (val.length < 4 ? 'Too Short' : null),
      },
    );

    register(
      { name: 'city', mode: 'onBlur' },
      {
        required: { value: true, message: 'first name is required' },
        validate: val => (val.length < 4 ? 'Too Short' : null),
      },
    );
  }, [register]);

  const handleMultiChange = selectedOption => {
    setValue('city', selectedOption);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        errorMessage={errors.firstName?.message}
        showSuccessIndicator={!errors.firstName && getValues().firstName?.length > 4}
        label="First Name"
        id="first-name-hooks"
        required
        onBlurCapture={() => triggerValidation('firstName')}
        onChange={(e, { value }) => {
          setValue('firstName', value);
        }}
      />
      <Form.Dropdown
        onChange={(e, { value }) => {
          handleMultiChange(value);
        }}
        onBlur={() => triggerValidation('city')}
        label="City"
        id="city"
        items={['prague', 'new york']}
        errorMessage={errors.city?.message}
      />
      <Form.Button content="Submit" />
    </Form>
  );
};

export default FormValidateHooks;
