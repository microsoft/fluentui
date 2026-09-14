import * as React from 'react';
import type { JSXElement, InteractionTagProps } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-components';

export const Default = (props: Partial<InteractionTagProps>): JSXElement => (
  <InteractionTag {...props}>
    <InteractionTagPrimary>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
