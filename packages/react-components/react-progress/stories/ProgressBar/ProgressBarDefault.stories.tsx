import * as React from 'react';
import { ProgressBar, ProgressBarProps } from '@fluentui/react-progress';
import { Field } from '@fluentui/react-field';

export const Default = (props: Partial<ProgressBarProps>) => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
