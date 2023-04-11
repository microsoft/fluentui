import * as React from 'react';
import { ProgressBar } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Indeterminate = () => {
  return (
    <Field validationMessage="Indeterminate ProgressBar" validationState="none">
      <ProgressBar />
    </Field>
  );
};

Indeterminate.parameters = {
  docs: {
    description: {
      story: `ProgressBar is indeterminate when 'value' is undefined.
      Indeterminate ProgressBar is best used to show that an operation is being executed.`,
    },
  },
};
