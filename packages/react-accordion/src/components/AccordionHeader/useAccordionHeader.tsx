import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { useMergedRefs } from '@fluentui/react-hooks';
import { AccordionHeaderProps, AccordionHeaderState } from './AccordionHeader.types';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionHeaderShorthandProps = ['expandIcon', 'buttonSlot'];

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
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      expandIcon: defaultExpandIcon,
      buttonSlot: { as: 'div', role: 'button' },
      as: 'div',
      role: 'heading',
      expandIconPosition: 'start',
    },
    defaultProps,
    resolveShorthandProps(props, accordionHeaderShorthandProps),
  );

  return state;
};

const ChevronIcon = (props: React.HTMLAttributes<HTMLElement>) => <div {...props}>{'>'}</div>;

const defaultExpandIcon: ShorthandProps<React.HTMLAttributes<HTMLElement>> = { as: ChevronIcon };
