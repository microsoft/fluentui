import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Divider}
 */
export interface DividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Determines the alignment of the content within the divider.
   * @defaultvalue 'center'
   */
  alignContent?: 'start' | 'end' | 'center';

  /**
   * Predefined visual styles
   * @defaultvalue 'default'
   */
  appearance?: 'default' | 'subtle' | 'brand' | 'strong';

  /**
   * A divider can have a overriding border color
   */
  color?: string;

  /**
   * A divider can be classified as important to emphasize its content
   */
  important?: boolean;

  /**
   * Adds a 12px padding to the begining and end of the divider
   */
  inset?: boolean;

  /**
   * A divider can be horizontal (default) or vertical*/
  vertical?: boolean;

  /**
   * Overrides for border visuals
   */
  borderStyle?: string;
  borderSize?: string | number;

  /**
   * Accessibility wrapper for content when presented.
   * A shorthand prop can be a literal, object, or
   * JSX. The `children` prop of the object can be a render function,
   * taking in the original slot component and props.
   */
  wrapper?: ShorthandProps<React.HTMLAttributes<HTMLDivElement>>;

  /**
   * Exposed used properties
   *
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
  ref: React.RefObject<HTMLElement>;

  /**
   * The Id created to expose accessability for readers
   */
  labelledById?: string;
}
