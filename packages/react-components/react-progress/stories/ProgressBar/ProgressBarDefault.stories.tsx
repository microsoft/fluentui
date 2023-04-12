import * as React from 'react';
import { ProgressBar, ProgressBarProps } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<ProgressBarProps>) => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
