import * as React from 'react';
import { Toggle } from './Toggle';
import {
  IStyle,
  IRawStyle,
  IProcessedStyle
} from '../../Styling';

export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 */
export interface IToggleProps extends React.HTMLProps<HTMLInputElement | Toggle> {
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
   * Custom styles for this component
   */
  customStyles?: IToggleStyles;
}

export interface IToggleStyles {
  root?: IStyle;
  /* The text before the actual toggle switch */
  label?: IStyle;

  /* Holds the toggle switch and the On/Off text next to it */
  control?: IStyle;
  invisibleToggle?: IStyle;
  /* The text indicating the on/off state of the control */
  stateText?: IStyle;
  focus?: IRawStyle | IProcessedStyle;

  /* The rounded container, modify font-size on toggle to set the size of the control */
  toggleBase?: IStyle;
  toggle?: IStyle;
  toggleHover?: IRawStyle | IProcessedStyle;
  toggleOn?: IStyle;
  toggleOnHover?: IRawStyle | IProcessedStyle;
  toggleDisabled?: IStyle;
  toggleOnDisabled?: IStyle;

  /* The dot in the middle */
  thumbBase?: IStyle;
  thumb?: IStyle;
  thumbHover?: IRawStyle | IProcessedStyle;
  thumbOn?: IStyle;
  thumbOnHover?: IRawStyle | IProcessedStyle;
  thumbDisabled?: IStyle;
  thumbOnDisabled?: IStyle;
}