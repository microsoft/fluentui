import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { AccordionHeaderContextValue } from '../../contexts/accordionHeader';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export type AccordionHeaderContextValues = {
  accordionHeader: AccordionHeaderContextValue;
};

export type AccordionHeaderSlots = {
  /**
   * The element wrapping the button. By default this is a div, but can be a heading.
   */
  root: NonNullable<Slot<'div', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>>;
  /**
   * The component to be used as button in heading
   */
  button: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;
  /**
   * Expand icon slot rendered before (or after) children content in heading.
   */
  expandIcon?: Slot<'span'>;
  /**
   * Expand icon slot rendered before (or after) children content in heading.
   */
  icon?: Slot<'div'>;
};

export type AccordionHeaderProps = ComponentProps<Partial<AccordionHeaderSlots>> & {
  /**
   * The position of the expand  icon slot in heading.
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;

  /**
   * Indicates if the AccordionHeader should be rendered inline.
   */
  inline?: boolean;

  /**
   * Size of spacing in the heading.
   */
  size?: AccordionHeaderSize;
};

export type AccordionHeaderState = ComponentState<AccordionHeaderSlots> &
  Required<Pick<AccordionHeaderProps, 'inline'>> &
  AccordionHeaderContextValue;
