import * as React from 'react';
import { InteractionTag, InteractionTagProps, InteractionTagPrimary } from '@fluentui/react-tags-preview';

export const Default = (props: Partial<InteractionTagProps>) => (
  <InteractionTag {...props}>
    <InteractionTagPrimary>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
