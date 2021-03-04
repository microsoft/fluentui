import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { Descendant } from '@reach/descendants';
import { AccordionHeaderProps } from '../AccordionHeader';

export type AccordionIndex = number | number[];

export interface AccordionContext {
  /**
   * The list of opened panels by index
   */
  openItems: AccordionIndex;
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   */
  requestToggle(index: number): void;
}

type AccordionHeaderCommonProps = Pick<AccordionHeaderProps, 'expandIcon' | 'expandIconPosition' | 'button' | 'size'>;
/**
 * {@docCategory Accordion\}
 */
export interface AccordionProps extends ComponentProps, AccordionHeaderCommonProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Indicates if Accordion support multiple Panels opened at the same time
   */
  multiple?: boolean;
  /**
   * Indicates if Accordion support multiple Panels closed at the same time
   */
  collapsible?: boolean;
  /**
   * Controls the state of the panel
   */
  index?: AccordionIndex;
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultIndex?: AccordionIndex;
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
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  context: AccordionContext;
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  descendants: AccordionDescendant[];
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  setDescendants: React.Dispatch<React.SetStateAction<AccordionDescendant[]>>;
}

export interface AccordionDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  /**
   * Indicates is a determined AccordionItem descending the Accordion is or not disabled
   */
  disabled: boolean;
}
