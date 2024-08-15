import * as React from 'react';
import { Rating } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';

export const ControlledValue = () => {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <Rating value={value} onChange={(_, data) => setValue(data.value)} />
      <Button onClick={() => setValue(0)}>Clear Rating</Button>
    </>
  );
};

ControlledValue.parameters = {
  docs: {
    description: {
      story: 'The selected rating value can be controlled using the `value` and `onChange` props.',
    },
  },
};
