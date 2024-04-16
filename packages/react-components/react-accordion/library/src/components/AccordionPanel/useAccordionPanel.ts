import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useTabsterAttributes } from '@fluentui/react-tabster';
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
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
        ...(navigation && focusableProps),
      }),
      { elementType: 'div' },
    ),
  };
};
