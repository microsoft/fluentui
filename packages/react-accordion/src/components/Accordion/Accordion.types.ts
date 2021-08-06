import * as React from 'react';
import { ComponentProps, ComponentState, Descendant } from '@fluentui/react-utilities';
import { AccordionHeaderProps, AccordionHeaderSlots } from '../AccordionHeader/AccordionHeader.types';

export type AccordionIndex = number | number[];

/**
 * Common properties shared between Accordion and AccordionHeader through context
 */
type AccordionHeaderCommonProps = Pick<AccordionHeaderProps, 'expandIconPosition' | 'size' | 'inline'>;

export interface AccordionContextValue
  extends AccordionHeaderCommonProps,
    Partial<Pick<AccordionState, keyof AccordionSlots>> {
  navigable: boolean;
  /**
   * The list of opened panels by index
   */
  openItems: number[];
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   */
  requestToggle: NonNullable<AccordionProps['onToggle']>;
}

export type AccordionSlots = Partial<Omit<AccordionHeaderSlots, 'children'>>;

export interface AccordionCommons extends AccordionHeaderCommonProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Indicates if keyboard navigation is available
   */
  navigable: boolean;
  /**
   * Indicates if Accordion support multiple Panels opened at the same time
   */
  multiple: boolean;
  /**
   * Indicates if Accordion support multiple Panels closed at the same time
   */
  collapsible: boolean;
  /**
   * Controls the state of the panel
   */
  index?: AccordionIndex;
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultIndex?: AccordionIndex;
  onToggle?(event: React.MouseEvent | React.KeyboardEvent, index: number): void;
}

export interface AccordionProps extends ComponentProps<AccordionSlots>, Partial<AccordionCommons> {}

// export type AccordionDefaultedProps = 'collapsible' | 'multiple' | 'navigable';

export interface AccordionState extends ComponentState<AccordionSlots>, AccordionCommons {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  context: AccordionContextValue;
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
