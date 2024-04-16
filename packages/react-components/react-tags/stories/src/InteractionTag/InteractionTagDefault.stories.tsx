import * as React from 'react';
import { InteractionTag, InteractionTagProps, InteractionTagPrimary } from '@fluentui/react-components';

export const Default = (props: Partial<InteractionTagProps>) => (
  <InteractionTag {...props}>
    <InteractionTagPrimary>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
