import * as React from 'react';
import { useAccordionPanel_unstable } from './useAccordionPanel';
import { renderAccordionPanel_unstable } from './renderAccordionPanel';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useAccordionPanelStyles_unstable } from './useAccordionPanelStyles.styles';
import type { AccordionPanelProps } from './AccordionPanel.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionPanel, using the `useAccordionPanel_unstable` and `useAccordionPanelStyles_unstable` hooks.
 */
export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> = React.forwardRef((props, ref) => {
  const state = useAccordionPanel_unstable(props, ref);

  useAccordionPanelStyles_unstable(state);

  useCustomStyleHook_unstable('useAccordionPanelStyles_unstable')(state);

  return renderAccordionPanel_unstable(state);
});

AccordionPanel.displayName = 'AccordionPanel';
