import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { Descendant } from '@reach/descendants';

export interface AccordionContext {}

/**
 * {@docCategory Accordion\}
 */
export interface AccordionProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory Accordion\}
 */
export interface AccordionState extends AccordionProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  context: AccordionContext;
  descendants: AccordionDescendant[];
  setDescendants: React.Dispatch<React.SetStateAction<AccordionDescendant[]>>;
}

export interface AccordionDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  disabled: boolean;
}
