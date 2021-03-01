import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Divider}
 */
export interface DividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Determines the alignment of the content within the divider.
   * @defaultvalue 'center'
   */
  alignContent?: 'start' | 'end' | 'center';

  appearance?: 'default' | 'subtle' | 'brand' | 'strong';

  children?: any;

  /* A divider can have a overriding border color */
  color?: string;

  /* A divider can be classified as important to emphasize its content */
  important?: boolean;

  inset?: boolean;

  /* A divider can be horizontal (default) or vertical*/
  vertical?: boolean;

  /* Overrides for border visuals */
  borderStyle?: string;
  borderSize?: string | number;

  /* Exposed used properties */
  /*
   *** NOTE ***
    Once we have a full story and patterns for component tokens,
    the following should be removed and the pattern updated.
  */
  fontColor?: string;
  fontSize?: string;
  fontWeight?: string;
  height?: string;
  margin?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  width?: string;
}

/**
 * {@docCategory Divider}
 */
export interface DividerState extends DividerProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
