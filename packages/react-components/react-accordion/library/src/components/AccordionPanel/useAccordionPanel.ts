import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { presenceMotionSlot, type PresenceMotionSlotProps } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { useAccordionContext_unstable } from '../../contexts/accordion';
import type { AccordionPanelProps, AccordionPanelState } from './AccordionPanel.types';
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
  const { open } = useAccordionItemContext_unstable();
  const focusableProps = useTabsterAttributes({ focusable: { excludeFromMover: true } });
  const navigation = useAccordionContext_unstable(ctx => ctx.navigation);

  return {
    open,
    components: {
      root: 'div',
      // TODO: remove once React v18 slot API is modified
      // This is a problem at the moment due to UnknownSlotProps assumption
      // that `children` property is `ReactNode`, which in this case is not valid
      // as PresenceComponentProps['children'] is `ReactElement`
      collapseMotion: Collapse as React.FC<PresenceMotionSlotProps>,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ...props,
        ...(navigation && focusableProps),
      }),
      { elementType: 'div' },
    ),
    collapseMotion: presenceMotionSlot(props.collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        visible: open,
        unmountOnExit: true,
      },
    }),
  };
};
