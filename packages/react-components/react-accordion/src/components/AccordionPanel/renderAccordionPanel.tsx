/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';
import { Collapse } from '../../../../react-tree/src/components/Tree/Collapse';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel_unstable = (state: AccordionPanelState) => {
  assertSlots<AccordionPanelSlots>(state);
  // Original show/hide without transition
  // return state.open ? <state.root>{state.root.children}</state.root> : null;

  // Wrap child content in a Collapse transition which manages show/hide
  return <Collapse visible={state.open}>{state.root.children}</Collapse>;
};
