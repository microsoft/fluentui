import * as React from 'react';
import { IComponent, IComponentStyles, IStyleableComponentProps } from '../../Foundation';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { IRefObject } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { IHTMLButtonSlot, IHTMLSlot, ILabelSlot } from '../../utilities/factoryComponents.types';

export type IToggleComponent = IComponent<IToggleProps, IToggleViewProps, IToggleTokens, IToggleStyles>;

export interface IToggleSlots {
  root?: IHTMLSlot;
  label?: ILabelSlot;
  container?: IHTMLSlot;
  pill?: IHTMLButtonSlot;
  thumb?: IHTMLSlot;
  text?: ILabelSlot;
}

export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 */
export interface IToggleProps extends IToggleSlots, IStyleableComponentProps<IToggleViewProps, IToggleTokens, IToggleStyles> {
  /**
   * Optional callback to access the IToggleComponent interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IToggle>;

  /**
   * Text to display when toggle is ON.
   */
  onText?: string;

  /**
   * Text to display when toggle is OFF.
   */
  offText?: string;

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

export type IToggleViewProps = Pick<IToggleProps, 'label' | 'ariaLabel' | 'disabled' | 'onChange' | 'keytipProps' | 'text'> &
  Required<Pick<IToggleProps, 'checked' | 'tokens'>> & {
    /**
     * Toggle input callback triggered by mouse and keyboard input.
     */
    onClick?: (ev: React.MouseEvent<Element>) => void;

    /**
     * Root element class name.
     */
    // TODO: shouldn't this be at props level and not view-only?
    className?: string;

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