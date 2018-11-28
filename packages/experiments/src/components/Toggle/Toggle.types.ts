import * as React from 'react';
import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IComponentAs, IRefObject } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';

export type IToggleComponent = IComponent<IToggleProps, IToggleViewProps, IToggleStyles>;

export type IToggleSlots = 'root' | 'label' | 'container' | 'pill' | 'thumb' | 'text';

export interface IToggle {
  focus: () => void;
}

/**
 * Toggle component props.
 */
export interface IToggleProps extends IStyleableComponentProps<IToggleViewProps, IToggleStyles> {
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
   * Style variables for Toggle.
   */
  styleVariables?: IToggleStyleVariables;
}

export type IToggleViewProps = Pick<IToggleProps, 'as' | 'label' | 'ariaLabel' | 'disabled' | 'onChange' | 'keytipProps'> &
  Required<Pick<IToggleProps, 'checked' | 'styleVariables'>> & {
    /**
     * Toggle input callback triggered by mouse and keyboard input.
     */
    onClick?: (ev: React.MouseEvent<Element>) => void;

    /**
     * Root element class name.
     */
    className?: string;

    /**
     * Text to display next to the toggle.
     */
    text?: string;

    /**
     * Reference to the toggle button.
     */
    toggleButtonRef?: React.RefObject<HTMLButtonElement>;
  };

/**
 * Styles for the Toggle component.
 */
export interface IToggleStyleVariablesTypes {
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

export type IToggleStyleVariables = IToggleStyleVariablesTypes | ((props: IToggleViewProps) => IToggleStyleVariablesTypes) | undefined;

export type IToggleStyles = { [key in IToggleSlots]: IStyle };
