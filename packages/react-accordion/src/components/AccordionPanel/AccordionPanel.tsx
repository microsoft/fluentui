import * as React from 'react';
import { useAccordionPanel_unstable } from './useAccordionPanel';
import type { AccordionPanelProps } from './AccordionPanel.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionPanel, using the `useAccordionPanel_unstable` and `useAccordionPanelStyles_unstable` hooks.
 */
export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> = React.forwardRef((props, ref) => {
  const [state, render] = useAccordionPanel_unstable(props, ref);
  return render(state);
});

AccordionPanel.displayName = 'AccordionPanel';
