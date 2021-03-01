import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { Descendant } from '@reach/descendants';

export interface AccordionContext {
  openItems: AccordionOpen;
  requestToggle(index: number): void;
}

export type AccordionOpen = number | number[];

/**
 * {@docCategory Accordion\}
 */
export interface AccordionProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  multiple?: boolean;
  collapsible?: boolean;
  /**
   * Controls the state of the panel
   */
  open?: AccordionOpen;
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultOpen?: AccordionOpen;
  onToggle?(index: number): void;
}

/**
 * {@docCategory Accordion\}
 */
export interface AccordionState extends AccordionProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  multiple: boolean;
  collapsible: boolean;
  context: AccordionContext;
  descendants: AccordionDescendant[];
  setDescendants: React.Dispatch<React.SetStateAction<AccordionDescendant[]>>;
}

export interface AccordionDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  disabled: boolean;
}
