import type {
  AccordionHeaderProps as AccordionHeaderHeadlessProps,
  AccordionHeaderState as AccordionHeaderHeadlessState,
} from '@fluentui/react-headless-components-preview/accordion';

export type { AccordionHeaderSlots } from '@fluentui/react-headless-components-preview/accordion';

/** Size of an AccordionHeader. `'medium'` is the base look. */
export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Windmod AccordionHeader props: the headless header plus the look props the headless surface
 * deliberately omits.
 */
export type AccordionHeaderProps = AccordionHeaderHeadlessProps & {
  /**
   * Lays the header out inline rather than as a block.
   * @default false
   */
  inline?: boolean;
  /** @default 'medium' */
  size?: AccordionHeaderSize;
};

/** Windmod AccordionHeader state: headless state plus the resolved look props. */
export type AccordionHeaderState = AccordionHeaderHeadlessState &
  Required<Pick<AccordionHeaderProps, 'inline' | 'size'>>;
