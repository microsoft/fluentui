'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { useAccordionContext_unstable } from '../../contexts/accordion';
import type {
  AccordionPanelBaseProps,
  AccordionPanelBaseState,
  AccordionPanelProps,
  AccordionPanelState,
} from './AccordionPanel.types';
import { useAccordionItemContext_unstable } from '../../contexts/accordionItem';

/**
 * Returns the props and state required to render the component
 * @param props - AccordionPanel properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 */
export const useAccordionPanel_unstable = (
  props: AccordionPanelProps,
  ref: React.Ref<HTMLElement>,
): AccordionPanelState => {
  const { collapseMotion, ...baseProps } = props;
  const state = useAccordionPanelBase_unstable(baseProps, ref);
  const focusableProps = useTabsterAttributes({ focusable: { excludeFromMover: true } });
  const navigation = useAccordionContext_unstable(ctx => ctx.navigation);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      collapseMotion: Collapse,
    },
    root: {
      ...state.root,
      ...(navigation && focusableProps),
    },
    collapseMotion: presenceMotionSlot(props.collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        visible: state.open,
        unmountOnExit: true,
      },
    }),
  };
};

/**
 * Base state hook for AccordionPanel, without design related features.
 *
 * @param props - AccordionPanelBaseProps properties
 * @param ref - reference to root HTMLElement of AccordionPanel
 */
export const useAccordionPanelBase_unstable = (
  props: AccordionPanelBaseProps,
  ref: React.Ref<HTMLElement>,
): AccordionPanelBaseState => {
  const { open } = useAccordionItemContext_unstable();

  return {
    open,
    components: {
      root: 'div',
    },
    root: slot.always(
      {
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      },
      { elementType: 'div' },
    ),
  };
};
