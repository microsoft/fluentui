import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { FlexDirectionProperty, MarginProperty, GlobalsNumber } from 'csstype';

/**
 * CSS standard `justify-content` and `align-items` alignment options.
 */
export type FlexAlignment =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'baseline';

/**
 * Flex component properties
 * {@docCategory Flex }
 */
export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Flex direction.
   * Wrapper of the CSS `flex-direction`.
   */
  direction?: FlexDirectionProperty;

  /**
   * Horizontal alignment of the items.
   * Wrapper of the CSS `justify-content` for `row` alignments and `align-items` for `column` alignments.
   */
  horizontalAlign?: FlexAlignment;

  /**
   * Vertical alignment of the items.
   * Wrapper of the CSS `align-items` for `row` alignments and `justify-content` for `column` alignments.
   */
  verticalAlign?: FlexAlignment;

  /**
   * Children gap
   * Wrapper of the CSS `margin` for each item.
   */
  gap?: MarginProperty<string | number>;

  /**
   * Wrap items onto multiple lines.
   * Wrapper of the CSS `flex-wrap`.
   */
  wrap?: boolean;

  /**
   * Children grow factor.
   * Wrapper of the CSS `flex-grow` for each child.
   */
  grow?: GlobalsNumber;

  /**
   * Children shrink factor.
   * Wrapper of the CSS `flex-shrink` for each child.
   */
  shrink?: GlobalsNumber;

  /**
   * Use inline layout
   */
  inline?: boolean;
}

/**
 * Flex component state
 * {@docCategory Flex }
 */
export type FlexState = ComponentState<React.Ref<HTMLElement>, FlexProps>;
