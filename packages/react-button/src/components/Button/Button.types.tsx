import * as React from 'react';
import { ComponentProps, ShorthandValue, ComposeStandardStatics } from '../../utils/tempTypes';
import { ComposeOptions } from '@fluentui/react-compose';

export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

// tslint:disable-next-line:no-any
export interface ButtonProps extends ComponentProps, React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Shorthand icon. A shorthand prop can be a literal, object,
   * JSX, or function which takes render options.
   */
  icon?: ShorthandValue<{}>;

  /**
   * Shorthand content within the button.
   */
  content?: ShorthandValue<{}>;

  /**
   * Shorthand loader content within the button.
   */
  loader?: ShorthandValue<{}>;

  /** A button can appear circular. */
  circular?: boolean;

  /** A button can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A button can fill the width of its container. */
  fluid?: boolean;

  /** A button can contain only an icon. */
  iconOnly?: boolean;

  /** An icon button can format its Icon to appear before or after its content. */
  iconPosition?: 'before' | 'after';

  /** A button that inherits its background and has a subtle appearance. */
  inverted?: boolean;

  /** A button can show a loading indicator. */
  loading?: boolean;

  /**
   * Called after a user clicks the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  // onClick?: ComponentEventHandler<ButtonProps>;

  /**
   * Called after a user focuses the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  // onFocus?: ComponentEventHandler<ButtonProps>;

  /** A button can emphasize that it represents the primary action. */
  primary?: boolean;

  /** A button can emphasize that it represents an alternative action. */
  secondary?: boolean;

  /** A button can be sized. */
  size?: SizeValue;

  // TODO: Deprecate or rename to textOnly for alignment with iconOnly?
  /** A button can be formatted to show only text in order to indicate a less-pronounced action. */
  // text?: boolean;
}

export interface ButtonSlots {
  icon: React.ElementType;
  content: React.ElementType;
  loader: React.ElementType;
}

export type ButtonSlotProps = {
  [key in keyof ButtonSlots]: ButtonProps[key];
};

export interface ButtonOptions
  extends ComposeOptions<ButtonProps, ButtonSlots, ButtonSlotProps, ComposeStandardStatics> {}
