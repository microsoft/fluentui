import * as React from 'react';
import type { InteractionTagProps } from '@fluentui/react-modern-components-preview/interaction-tag';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-modern-components-preview/interaction-tag';

export const Default = (props: Partial<InteractionTagProps>): React.ReactNode => (
  <InteractionTag {...props}>
    <InteractionTagPrimary>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
