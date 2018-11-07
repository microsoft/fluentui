import * as React from 'react';
import { IComponent, IStyleableComponentProps } from '../../Foundation';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IComponentAs, IRefObject } from '../../Utilities';

export type IToggleComponent = IComponent<IToggleProps, IToggleViewProps, IToggleStyles>;

export interface IToggle {}

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
}

export type IToggleViewProps = Pick<IToggleProps, 'as' | 'label' | 'ariaLabel' | 'disabled' | 'onChange' | 'keytipProps'> &
  Required<Pick<IToggleProps, 'checked'>> & {
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
  };

/**
 * Styles for the Toggle component.
 */
export interface IToggleStyles {
  /**
   * Root element.
   */
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
