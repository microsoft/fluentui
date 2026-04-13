import { renderAccordionPanel_unstable } from '@fluentui/react-accordion';
import type { AccordionPanelState as FluentAccordionPanelState } from '@fluentui/react-accordion';

import type { AccordionPanelState } from './AccordionPanel.types';

/**
 * Renders the final JSX of the AccordionPanel component, given the state.
 */
export const renderAccordionPanel = (state: AccordionPanelState) => {
  return renderAccordionPanel_unstable(state as FluentAccordionPanelState);
};
