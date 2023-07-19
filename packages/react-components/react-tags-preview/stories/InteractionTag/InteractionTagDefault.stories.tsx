import * as React from 'react';
import { InteractionTag, InteractionTagProps } from '@fluentui/react-tags-preview';

export const Default = (props: Partial<InteractionTagProps>) => (
  <InteractionTag {...props}>Primary text</InteractionTag>
);
