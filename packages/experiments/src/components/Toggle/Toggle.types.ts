import * as React from 'react';
import { IComponent, IComponentStyles, IStyleableComponentProps } from '../../Foundation';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { IComponentAs, IRefObject } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { IHTMLButtonSlot, IHTMLSlot, ILabelSlot } from '../../utilities/factoryComponents.types';

export type IToggleComponent = IComponent<IToggleProps, IToggleViewProps, IToggleStyles, IToggleTokens>;

export interface IToggleSlots {
  /**
   * Root element.
   */
  root?: IHTMLSlot;

  /**
   * A label for the toggle.
   */
  label?: ILabelSlot;

  /**
   * Container for the toggle pill and the text next to it.
   */
  container?: IHTMLSlot;

  /**
   * Pill, rendered as a button.
   */
  pill?: IHTMLButtonSlot;

  /**
   * Thumb inside of the pill.
   */
  thumb?: IHTMLSlot;

  /**
   * Text to display when toggle is ON.
   */
  onText?: ILabelSlot;

  /**
   * Text to display when toggle is OFF.
   */
  offText?: ILabelSlot;
}

export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 */
export interface IToggleProps extends IToggleSlots, IStyleableComponentProps<IToggleViewProps, IToggleStyles, IToggleTokens> {
  /**
   * Render the root element as another type.
   */
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;

  /**
   * Optional callback to access the IToggleComponent interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IToggle>;

  /**
   * Text for screen-reader to announce as the name of the toggle.
   */
  ariaLabel?: string;

  /**
   * Initial state of the toggle. If you want the toggle to maintain its own state, use this. Otherwise refer to `checked`.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Checked state of the toggle. If you are maintaining state yourself, use this property. Otherwise refer to `defaultChecked`.
   * @default defaultChecked
   */
  checked?: boolean;

  /**
   * Optional disabled flag.
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback issued when the value changes.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, checked?: boolean) => void;

  /**
   * Optional keytip for this toggle
   */
  keytipProps?: IKeytipProps;
}

export type IToggleViewProps = IToggleProps & {
  /**
   * Toggle input callback triggered by mouse and keyboard input.
   */
  onClick?: (ev: React.MouseEvent<Element>) => void;

  /**
   * Reference to the toggle button.
   */
  toggleButtonRef?: React.RefObject<HTMLButtonElement>;
};

/**
 * Styles for the Toggle component.
 */
export interface IToggleTokens {
  pillBackground?: string;
  pillHoveredBackground?: string;
  pillBorderColor?: string;
  pillHoveredBorderColor?: string;
  pillJustifyContent?: IRawStyleBase['justifyContent'];
  pillHighContrastBackground?: string;
  pillHighContrastHoveredBackground?: string;
  pillHighContrastBorderColor?: string;
  pillHighContrastHoveredBorderColor?: string;

  thumbBackground?: string;
  thumbHighContrastBackground?: string;
  thumbHighContrastBorderColor?: string;

  textColor?: string;
  textHighContrastColor?: string;
}

export type IToggleStyles = IComponentStyles<IToggleSlots>;
