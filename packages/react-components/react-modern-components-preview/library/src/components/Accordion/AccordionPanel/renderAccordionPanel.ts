import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { AccordionPanelInternalSlots, AccordionPanelState } from './AccordionPanel.types';

export const renderAccordionPanel = (state: AccordionPanelState): JSXElement => {
  assertSlots<AccordionPanelInternalSlots>(state);

  const panel = createElement(state.root);

  return state.collapseMotion ? createElement(state.collapseMotion, undefined, panel) : panel;
};
