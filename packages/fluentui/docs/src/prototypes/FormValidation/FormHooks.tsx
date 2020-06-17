import * as React from 'react';
import { Form } from '@fluentui/react-northstar';
import { useForm } from 'react-hook-form';

const FormValidateHooks = () => {
  const { register, handleSubmit, errors, setValue, watch, triggerValidation } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    console.log('errors: ', errors);
    console.log('data: ', data);
  };

  const firstNameWatched = watch('firstName');

  React.useEffect(() => {
    register(
      { name: 'city' },
      {
        required: { value: true, message: 'city is required' },
      },
    );
  }, [register]);

  const handleMultiChange = selectedOption => {
    setValue('city', selectedOption);
    triggerValidation('city');
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        label="First Name"
        id="first-name-hooks"
        required
        name="firstName"
        value={firstNameWatched}
        inputRef={register({
          required: { value: true, message: 'first name is required' },
          validate: val => (val.length <= 4 ? 'Too Short' : null),
        })}
        errorMessage={errors.firstName?.message}
        showSuccessIndicator={!errors.firstName && firstNameWatched?.length >= 4}
      />
      <Form.Dropdown
        onChange={(e, { value }) => {
          handleMultiChange(value);
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
