import * as React from 'react';

import { Field, Button } from '@fluentui/react-components';
import { Radio, RadioGroup } from '@fluentui/react-modern-components-preview/radio-group';

export const ControlledValue = (): React.ReactNode => {
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
      <Button disabledFocusable={!value} onClick={() => setValue('')}>
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
