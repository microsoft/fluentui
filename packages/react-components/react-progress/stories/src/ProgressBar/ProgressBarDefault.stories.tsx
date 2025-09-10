import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, ProgressBar, ProgressBarProps } from '@fluentui/react-components';

export const Default = (props: Partial<ProgressBarProps>): JSXElement => {
  return (
    <Field validationMessage="Default ProgressBar" validationState="none">
      <ProgressBar {...props} value={0.5} />
    </Field>
  );
};
