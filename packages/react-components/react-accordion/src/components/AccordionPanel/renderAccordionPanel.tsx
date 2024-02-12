/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';
import { Collapse } from '@fluentui/react-motions-preview';

const curves = {
  curveAccelerateMax: 'cubic-bezier(0.9,0.1,1,0.2)',
  curveAccelerateMid: 'cubic-bezier(1,0,1,1)',
  curveAccelerateMin: 'cubic-bezier(0.8,0,0.78,1)',
  curveDecelerateMax: 'cubic-bezier(0.1,0.9,0.2,1)',
  curveDecelerateMid: 'cubic-bezier(0,0,0,1)',
  curveDecelerateMin: 'cubic-bezier(0.33,0,0.1,1)',
  curveEasyEaseMax: 'cubic-bezier(0.8,0,0.2,1)',
  curveEasyEase: 'cubic-bezier(0.33,0,0.67,1)',
  curveLinear: 'cubic-bezier(0,0,1,1)',
};

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
