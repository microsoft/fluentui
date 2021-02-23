import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';
import { useAccordionItemContext } from '../AccordionItem';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps = ['expandIcon', 'button'];

const mergeProps = makeMergeProps<AccordionHeaderState>({ deepMerge: accordionHeaderShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props AccordionHeader properties
 * @param ref reference to root HTMLElement of AccordionHeader
 * @param defaultProps default values for the properties of AccordionHeader
 */
export const useAccordionHeader = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionHeaderProps,
): AccordionHeaderState => {
  const { headingId, panelId, onAccordionHeaderClick } = useAccordionItemContext();
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      expandIcon: {
        as: 'div',
      },
      button: {
        as: 'div',
        role: 'button',
        children: React.Fragment,
        'aria-controls': panelId,
        id: props.id ?? headingId,
        onClick: onAccordionHeaderClick,
      },
      as: 'div',
      role: 'heading',
      expandIconPosition: 'start',
    },
    defaultProps,
    resolveShorthandProps(props, accordionHeaderShorthandProps),
  );

  return state;
};
