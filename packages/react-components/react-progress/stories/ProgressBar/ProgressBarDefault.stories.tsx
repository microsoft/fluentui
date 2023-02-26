import * as React from 'react';
import { Field } from '@fluentui/react-field';
import { ProgressBar, ProgressBarProps } from '@fluentui/react-progress';

export const Default = (props: Partial<ProgressBarProps>) => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
