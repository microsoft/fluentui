'use client';

import * as React from 'react';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';
import type { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';
import { useAccordionPanelBase_unstable } from './useAccordionPanelBase';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 */
export const useAccordionPanel_unstable = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLElement>,
): AccordionPanelState => {
  const baseState = useAccordionPanelBase_unstable(props, ref);

  return {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      collapseMotion: Collapse,
    },
    collapseMotion: presenceMotionSlot(props.collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        visible: baseState.open,
        unmountOnExit: true,
      },
    }),
  };
};
