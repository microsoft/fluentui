import * as React from 'react';
import { InteractionTag, InteractionTagProps, Primary } from '@fluentui/react-tags-preview';

export const Default = (props: Partial<InteractionTagProps>) => (
  <InteractionTag {...props}>
    <Primary>Primary text</Primary>
  </InteractionTag>
);
