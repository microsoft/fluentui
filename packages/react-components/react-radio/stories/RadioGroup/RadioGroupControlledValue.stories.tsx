import * as React from 'react';

import { Field, Radio, RadioGroup, Button } from '@fluentui/react-components';

export const ControlledValue = () => {
  const [value, setValue] = React.useState('banana');
  return (
    <>
      <Field label="Favorite Fruit">
        <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
          <Radio value="apple" label="Apple" />
          <Radio value="pear" label="Pear" />
          <Radio value="banana" label="Banana" />
          <Radio value="orange" label="Orange" />
        </RadioGroup>
      </Field>
      <Button disabled={!value} onClick={() => setValue('')}>
        Clear selection
      </Button>
    </>
  );
};

ControlledValue.parameters = {
  docs: {
    description: {
      story: 'The selected radio item can be controlled using the `value` and `onChange` props.',
    },
  },
};
