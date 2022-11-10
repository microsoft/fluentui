import * as React from 'react';
import type { SliderFieldProps } from '@fluentui/react-components/unstable';
import { SliderField } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<SliderFieldProps>) => (
  <SliderField
    label="Example slider field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
