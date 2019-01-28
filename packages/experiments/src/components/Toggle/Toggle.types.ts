import * as React from 'react';
import { IComponent, IComponentStyles, IHTMLButtonSlot, IHTMLDivSlot, IStyleableComponentProps } from '../../Foundation';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { IBaseProps, IComponentAs } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { ILabelSlot } from '../../utilities/factoryComponents.types';

export type IToggleComponent = IComponent<IToggleProps, IToggleTokens, IToggleStyles, IToggleViewProps>;

// These types are redundant with IToggleComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IToggleTokenReturnType = ReturnType<Extract<IToggleComponent['tokens'], Function>>;
export type IToggleStylesReturnType = ReturnType<Extract<IToggleComponent['styles'], Function>>;

export interface IToggleSlots {
  /**
   * Defines root slot.
   */
  root?: IHTMLDivSlot;

  /**
   * Defines label slot displayed above pill.
   */
  label?: ILabelSlot;

  /**
   * Defines container slot for the toggle pill and the text next to it.
   */
  container?: IHTMLDivSlot;

  /**
   * Defines pill slot, rendered as a button by default.
   */
  pill?: IHTMLButtonSlot;

  /**
   * Defines thumb slot inside of the pill.
   */
  thumb?: IHTMLDivSlot;

  /**
   * Defines text slot displayed alongside pill. Overrides onText and offText.
   */
  text?: ILabelSlot;
}

export interface IToggle {
  focus: () => void;
}

export interface IToggleProps
  extends IToggleSlots,
    IStyleableComponentProps<IToggleViewProps, IToggleTokens, IToggleStyles>,
    IBaseProps<IToggle> {
  /**
   * Render the root element as another type.
   */
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;

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

  /**
   * Text to display when toggle is ON.
   */
  onText?: string;

  /**
   * Text to display when toggle is OFF.
   */
  offText?: string;
}

export interface IToggleViewProps extends IToggleProps {
  /**
   * Toggle input callback triggered by mouse and keyboard input.
   */
  onClick?: (ev: React.MouseEvent<Element>) => void;

  /**
   * Reference to the toggle button.
   */
  toggleButtonRef?: React.RefObject<HTMLButtonElement>;
}

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
