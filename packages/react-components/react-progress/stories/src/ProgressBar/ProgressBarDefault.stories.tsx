import * as React from 'react';
import { Field, ProgressBar, ProgressBarProps } from '@fluentui/react-components';

export const Default = (props: Partial<ProgressBarProps>) => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
