import * as React from 'react';
import { IStyle, IStyleFunction, ITheme } from '../../Styling';
import { IComponentAs } from '../../Utilities';

export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 */
export interface IToggleProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render the root element as another type.
   */
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;

  /**
   * Optional callback to access the IToggle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IToggle) => void;

  /**
   * A label for the toggle.
   */
  label?: string;

  /**
   * Text to display when toggle is ON.
   */
  onText?: string;

  /**
   * Text to display when toggle is OFF.
   */
  offText?: string;

  /**
   * Text for screen-reader to announce when toggle is ON.
   */
  onAriaLabel?: string;

  /**
   * Text for screen-reader to announce when toggle is OFF.
   */
  offAriaLabel?: string;

  /**
   * Checked state of the toggle. If you are maintaining state yourself, use this property. Otherwise refer to 'defaultChecked'.
   */
  checked?: boolean;

  /**
   * Initial state of the toggle. If you want the toggle to maintain its own state, use this. Otherwise refer to 'checked'.
   */
  defaultChecked?: boolean;

  /**
   * Optional disabled flag.
   */
  disabled?: boolean;

  /**
   * onchange callback.
   */
  onChanged?: (checked: boolean) => void;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Optional styles for the component.
   */
  getStyles?: IStyleFunction<IToggleStyleProps, IToggleStyles>;
}

/**
 * Properties required to build the styles for the Toggle component.
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
}

/**
 * Styles for the Toggle component.
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
