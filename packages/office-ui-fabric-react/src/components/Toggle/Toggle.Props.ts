import * as React from 'react';
import { Toggle } from './Toggle';
import { IStyle, ITheme } from '../../Styling';

export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 */
export interface IToggleProps extends React.HTMLAttributes<HTMLElement | Toggle> {
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
   * Custom styles for this component
   */
  styles?: IToggleStyles;
}

export interface IToggleStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /*
   * Style for the text before the actual toggle switch.
   */
  label?: IStyle;

  /**
   * Style for the container wrapping switch and the state (on/off) text.
   */
  container?: IStyle;

  /**
   * Style for the toggle "pill" element, which is inside of the container and contains the thumb.
   */
  pill?: IStyle;

  /**
   * Style override for the pill element when enabled/checked.
   */
  pillChecked?: IStyle;

  /**
   * Style override for the pill element when enabled/unchecked/hovered.
   */
  pillHovered?: IStyle;

  /**
   * Style override for the pill element when enabled/checked/hovered.
   */
  pillCheckedHovered?: IStyle;

  /**
   * Style override for the pill element when disabled/unchecked.
   */
  pillDisabled?: IStyle;

  /**
   * Style override for the pill element when disabled/checked.
   */
  pillCheckedDisabled?: IStyle;

  /**
   * Style for the thumb element inside of the pill, in the normal unchecked enabled state.
   */
  thumb?: IStyle;

  /**
   * Style override for the thumb when enabled/unchecked/hovered.
   */
  thumbHovered?: IStyle;

  /**
   * Style override for the thumb when enabled/checked.
   */
  thumbChecked?: IStyle;

  /**
   * Style override for the thumb when enabled/checked/hovered.
   */
  thumbCheckedHovered?: IStyle;

  /**
   * Style override for the thumb when disabled/unchecked.
   */
  thumbDisabled?: IStyle;

  /**
   * Style override for the thumb when disabled/checked.
   */
  thumbCheckedDisabled?: IStyle;

  /**
   * Style for the text indicating the on/off state of the control.
   */
  text?: IStyle;
}
