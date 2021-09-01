import * as React from 'react';
import type { IStyle, ITheme } from '@fluentui/style-utilities';
import type { IRefObject, IStyleFunctionOrObject, IComponentAs } from '@fluentui/utilities';

/**
 * {@docCategory Toggle}
 */
export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 * {@docCategory Toggle}
 */
export interface IToggleProps extends React.HTMLAttributes<HTMLElement>, React.RefAttributes<HTMLElement> {
  /**
   * Render the root element as another type.
   */
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;

  /**
   * Optional callback to access the IToggle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IToggle>;

  /**
   * A label for the toggle.
   */
  label?: string | JSX.Element;

  /**
   * Text to display when toggle is ON.
   * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
   */
  onText?: string;

  /**
   * Text to display when toggle is OFF.
   * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
   */
  offText?: string;

  /**
   * Text for screen-reader to announce as the name of the toggle.
   */
  ariaLabel?: string;

  /**
   * @deprecated Use `ariaLabel` for name, and let the metadata convey state
   */
  onAriaLabel?: string;

  /**
   * @deprecated Use `ariaLabel` for name, and let the metadata convey state
   */
  offAriaLabel?: string;

  /**
   * Checked state of the toggle. If you are maintaining state yourself, use this property.
   * Otherwise use `defaultChecked`.
   */
  checked?: boolean;

  /**
   * Initial state of the toggle. If you want the toggle to maintain its own state, use this.
   * Otherwise use `checked`.
   */
  defaultChecked?: boolean;

  /**
   * Optional disabled flag.
   */
  disabled?: boolean;

  /**
   * Whether the label (not the onText/offText) should be positioned inline with the toggle control.
   * Left (right in RTL) side when on/off text provided VS right (left in RTL) side when no on/off text.
   * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
   */
  inlineLabel?: boolean;

  /**
   * Callback issued when the value changes.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, checked?: boolean) => void;

  /**
   * @deprecated Use `onChange` instead.
   */
  onChanged?: (checked: boolean) => void;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<IToggleStyleProps, IToggleStyles>;

  /**
   * Whether to use the 'switch' role (ARIA 1.1) or the 'checkbox' role (ARIA 1.0).
   * @default 'switch'
   */
  role?: 'checkbox' | 'switch' | 'menuitemcheckbox';
}

/**
 * Properties required to build the styles for the Toggle component.
 * {@docCategory Toggle}
 */
export interface IToggleStyleProps {
  /**
   * Theme values.
   */
  theme: ITheme;

  /**
   * Root element class name.
   */
  className?: string;

  /**
   * Component is disabled.
   */
  disabled?: boolean;

  /**
   * Component is checked.
   */
  checked?: boolean;

  /**
   * Whether label should be positioned inline with the toggle.
   */
  inlineLabel?: boolean;

  /**
   * Whether the user did not specify a on/off text. Influencing only when inlineLabel is used.
   */
  onOffMissing?: boolean;
}

/**
 * Styles for the Toggle component.
 * {@docCategory Toggle}
 */
export interface IToggleStyles {
  /** Root element. */
  root: IStyle;

  /**
   * Label element above the toggle.
   */
  label: IStyle;

  /**
   * Container for the toggle pill and the text next to it.
   */
  container: IStyle;

  /**
   * Pill, rendered as a button.
   */
  pill: IStyle;

  /**
   * Thumb inside of the pill.
   */
  thumb: IStyle;

  /**
   * Text next to the pill.
   */
  text: IStyle;
}
