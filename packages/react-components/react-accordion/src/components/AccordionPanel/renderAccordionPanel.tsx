/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';
// import { Collapse, durations, curves } from '@fluentui/react-motions-preview';
import { Collapse } from '@fluentui/react-motions-preview';

// TODO: allow the motion to be injected and enable that from Storybook
// TODO: unify this open/close duration with the header's chevron rotation duration
// const motionDuration = durations.durationNormal;
// const enterEasing = curves.curveDecelerateMid;
// const exitEasing = curves.curveDecelerateMid;

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel_unstable = (state: AccordionPanelState) => {
  assertSlots<AccordionPanelSlots>(state);
  // Wrap child content in a Collapse transition which manages show/hide
  return (
    // <Collapse
    //   visible={state.open}
    //   override={{
    //     all: { duration: motionDuration },
    //     enter: { easing: enterEasing },
    //     exit: { easing: exitEasing },
    //   }}
    // >
    <Collapse>
      <state.root>{state.root.children}</state.root>
    </Collapse>
  );
};
