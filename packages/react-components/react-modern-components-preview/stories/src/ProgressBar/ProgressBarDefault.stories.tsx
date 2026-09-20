import * as React from 'react';
import type { ProgressBarProps } from '@fluentui/react-modern-components-preview/progress-bar';
import { Field } from '@fluentui/react-components';
import { ProgressBar } from '@fluentui/react-modern-components-preview/progress-bar';

export const Default = (props: Partial<ProgressBarProps>): React.ReactNode => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
