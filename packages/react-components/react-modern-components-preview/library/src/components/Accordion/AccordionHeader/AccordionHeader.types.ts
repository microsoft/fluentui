import type {
  AccordionHeaderProps as AccordionHeaderBaseProps,
  AccordionHeaderState as AccordionHeaderBaseState,
} from '@fluentui/react-headless-components-preview/accordion';

export type { AccordionHeaderSlots } from '@fluentui/react-headless-components-preview/accordion';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = NonNullable<AccordionHeaderBaseProps['expandIconPosition']>;

export type AccordionHeaderProps = AccordionHeaderBaseProps & {
  /** Indicates if the AccordionHeader should be rendered inline. */
  inline?: boolean;

  /** Size of spacing and text in the heading. */
  size?: AccordionHeaderSize;
};

export type AccordionHeaderState = AccordionHeaderBaseState &
  Required<Pick<AccordionHeaderProps, 'inline' | 'size'>> & {
    expandIcon?: AccordionHeaderBaseState['expandIcon'] & {
      'data-icon-position': 'start' | 'end';
      'data-open'?: string;
    };
    root: AccordionHeaderBaseState['root'] & {
      'data-inline'?: string;
      'data-size': AccordionHeaderSize;
    };
  };
