import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { AccordionContextValue } from '../../contexts/accordion';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';

export type AccordionIndex = number | number[];

export type AccordionToggleEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type AccordionToggleEventHandler<Value = AccordionItemValue> = (
  event: AccordionToggleEvent,
  data: AccordionToggleData<Value>,
) => void;

export type AccordionContextValues = {
  accordion: AccordionContextValue;
};

export type AccordionSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type AccordionToggleData<Value = AccordionItemValue> = {
  value: Value;
  openItems: Value[];
};

export type AccordionProps<Value = AccordionItemValue> = ComponentProps<AccordionSlots> & {
  /**
   * Default value for the uncontrolled state of the panel.
   */
  defaultOpenItems?: Value | Value[];

  /**
   * Indicates if Accordion support multiple Panels closed at the same time.
   */
  collapsible?: boolean;

  /**
   * Indicates if Accordion support multiple Panels opened at the same time.
   */
  multiple?: boolean;

  /**
   * @deprecated Arrow keyboard navigation is not recommended for accordions. Consider using Tree if arrow navigation is a hard requirement.
   * Indicates if keyboard navigation is available and gives two options, linear or circular navigation.
   */
  navigation?: 'linear' | 'circular';

  /**
   * Callback to be called when the opened items change.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onToggle?: AccordionToggleEventHandler<Value>;

  /**
   * Controls the state of the panel.
   */
  openItems?: Value | Value[];
};

export type AccordionState<Value = AccordionItemValue> = ComponentState<AccordionSlots> & AccordionContextValue<Value>;
