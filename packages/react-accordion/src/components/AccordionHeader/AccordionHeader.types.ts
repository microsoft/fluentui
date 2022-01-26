import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { ARIAButtonShorthandProps } from '@fluentui/react-aria';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export type AccordionHeaderContextValue = {
  disabled: boolean;
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  size: AccordionHeaderSize;
};

export type AccordionHeaderContextValues = {
  accordionHeader: AccordionHeaderContextValue;
};

export type AccordionHeaderSlots = {
  root: IntrinsicShorthandProps<'div'>;
  /**
   * The component to be used as button in heading
   */
  button: ARIAButtonShorthandProps;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  expandIcon: IntrinsicShorthandProps<'span'>;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  icon?: IntrinsicShorthandProps<'div'>;
};

export type AccordionHeaderCommons = {
  /**
   * Size of spacing in the heading
   */
  size: AccordionHeaderSize;
  /**
   * The position of the expand  icon slot in heading
   */
  expandIconPosition: AccordionHeaderExpandIconPosition;
  /**
   * Indicates if the AccordionHeader should be rendered inline
   */
  inline: boolean;
};

export type AccordionHeaderProps = ComponentProps<AccordionHeaderSlots> & Partial<AccordionHeaderCommons>;

export type AccordionHeaderState = ComponentState<AccordionHeaderSlots> &
  AccordionHeaderCommons &
  AccordionHeaderContextValue;
