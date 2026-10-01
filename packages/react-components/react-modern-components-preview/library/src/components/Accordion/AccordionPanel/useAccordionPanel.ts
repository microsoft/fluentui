'use client';

import type * as React from 'react';
import { useAccordionPanel as useAccordionPanelBase } from '@fluentui/react-headless-components-preview/accordion';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';
import type { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';

export const useAccordionPanel = (props: AccordionPanelProps, ref: React.Ref<HTMLElement>): AccordionPanelState => {
  const { collapseMotion, ...rest } = props;
  const state = useAccordionPanelBase(rest, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      collapseMotion: Collapse,
    },
    collapseMotion: presenceMotionSlot(collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        appear: false,
        unmountOnExit: true,
        visible: state.open,
      },
    }),
  };
};
