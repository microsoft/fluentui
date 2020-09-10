import * as React from 'react';
import { Form } from '@fluentui/react-northstar';
import { useForm } from 'react-hook-form';

const FormValidateHooks = () => {
  const { register, handleSubmit, errors, setValue, triggerValidation, formState } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.log('errors: ', errors);
    // eslint-disable-next-line no-console
    console.log('data: ', data);
  };

  React.useEffect(() => {
    register(
      { name: 'city' },
      {
        required: { value: true, message: 'city is required' },
      },
    );
  }, [register]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        label="First Name"
        id="first-name-hooks"
        name="firstName"
        ref={register({
          required: { value: true, message: 'first name is required' },
          validate: val => (val.length <= 4 ? 'Too Short' : null),
        })}
        errorMessage={errors.firstName?.message}
        showSuccessIndicator={!errors.firstName && formState.touched.firstName}
      />
      <Form.Dropdown
        onChange={(e, { value }) => {
          setValue('city', value);
          triggerValidation('city');
        }}
        onBlur={() => {
          triggerValidation('city');
        }}
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
