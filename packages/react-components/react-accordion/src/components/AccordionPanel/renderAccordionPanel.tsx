/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';
import { Collapse, curves } from '@fluentui/react-motions-preview';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel_unstable = (state: AccordionPanelState) => {
  assertSlots<AccordionPanelSlots>(state);
  // Original show/hide without transition
  // return state.open ? <state.root>{state.root.children}</state.root> : null;

  // Wrap child content in a Collapse transition which manages show/hide
  return (
    <Collapse
      visible={state.open}
      override={{
        all: { duration: 500 },
        enter: { easing: curves.curveAccelerateMid },
        exit: { easing: curves.curveDecelerateMid },
      }}
    >
      {<state.root>{state.root.children}</state.root>}
    </Collapse>
  );
};
