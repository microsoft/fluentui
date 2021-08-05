import * as React from 'react';
import { Form, FormDropdown, FormButton } from '@fluentui/react-northstar';

const labelId = 'choose-friend-label';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormDropdown
      label={{ content: `Your best friend's name is:`, id: labelId }}
      items={['Cecil Folk', 'Folk Cecil', 'Cecil Folk', 'Folk Folk']}
      aria-labelledby={labelId}
      search={true}
      placeholder="Choose a friend"
    />
    <FormButton content="Submit" />
  </Form>
);

export default FormExample;
