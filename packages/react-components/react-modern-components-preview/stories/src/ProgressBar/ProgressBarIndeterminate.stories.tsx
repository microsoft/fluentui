import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-modern-components-preview/progress-bar';

export const Indeterminate = (): React.ReactNode => {
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
