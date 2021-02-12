import * as React from 'react';
import {
  IComponent,
  IComponentStyles,
  IHTMLElementSlot,
  IHTMLSlot,
  ISlottableProps,
  IStyleableComponentProps,
} from '../../Foundation';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { IBaseProps, IComponentAs } from '../../Utilities';
import { IRawStyleBase } from '@uifabric/merge-styles/lib/IRawStyleBase';
import { ILabelSlot } from '../../utilities/factoryComponents.types';

/* eslint-disable deprecation/deprecation */

/** @deprecated */
export type IToggleComponent = IComponent<IToggleProps, IToggleTokens, IToggleStyles, IToggleViewProps>;

// These types are redundant with IToggleComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
/** @deprecated */
export type IToggleTokenReturnType = ReturnType<Extract<IToggleComponent['tokens'], Function>>;
/** @deprecated */
export type IToggleStylesReturnType = ReturnType<Extract<IToggleComponent['styles'], Function>>;

/** @deprecated */
export interface IToggleSlots {
  /**
   * Defines root slot.
   * @deprecated
   */
  root?: IHTMLSlot;

  /**
   * Defines label slot displayed above pill.
   * @deprecated
   */
  label?: ILabelSlot;

  /**
   * Defines container slot for the toggle pill and the text next to it.
   * @deprecated
   */
  container?: IHTMLSlot;

  /**
   * Defines pill slot, rendered as a button by default.
   * @deprecated
   */
  pill?: IHTMLElementSlot<'button'>;

  /**
   * Defines thumb slot inside of the pill.
   * @deprecated
   */
  thumb?: IHTMLSlot;

  /**
   * Defines text slot displayed alongside pill. Overrides onText and offText.
   * @deprecated
   */
  text?: ILabelSlot;
}

/** @deprecated */
export interface IToggle {
  focus: () => void;
}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
export interface IToggleProps
  extends ISlottableProps<IToggleSlots>,
    IStyleableComponentProps<IToggleViewProps, IToggleTokens, IToggleStyles>,
    IBaseProps<IToggle> {
  /**
   * Render the root element as another type.
   * @deprecated
   */
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;

  /**
   * Text for screen-reader to announce as the name of the toggle.
   * @deprecated
   */
  ariaLabel?: string;

  /**
   * Initial state of the toggle. If you want the toggle to maintain its own state, use this.
   * Otherwise use `checked`.
   * @default false
   * @deprecated
   */
  defaultChecked?: boolean;

  /**
   * Checked state of the toggle. If you are maintaining state yourself, use this property.
   * Otherwise use `defaultChecked`.
   * @default defaultChecked
   * @deprecated
   */
  checked?: boolean;

  /**
   * Optional disabled flag.
   * @default false
   * @deprecated
   */
  disabled?: boolean;

  /**
   * Callback issued when the value changes.
   * @deprecated
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, checked?: boolean) => void;

  /**
   * Optional keytip for this toggle
   * @deprecated
   */
  keytipProps?: IKeytipProps;

  /**
   * Text to display when toggle is ON.
   * @deprecated
   */
  onText?: string;

  /**
   * Text to display when toggle is OFF.
   * @deprecated
   */
  offText?: string;
}

/** @deprecated */
export interface IToggleViewProps extends IToggleProps {
  /**
   * Toggle input callback triggered by mouse and keyboard input.
   * @deprecated
   */
  onClick?: (ev: React.MouseEvent<Element>) => void;

  /**
   * Reference to the toggle button.
   * @deprecated
   */
  toggleButtonRef?: React.RefObject<HTMLButtonElement>;
}

/** @deprecated */
export interface IToggleTokens {
  /** @deprecated */
  pillBackground?: string;
  /** @deprecated */
  pillHoveredBackground?: string;
  /** @deprecated */
  pillBorderColor?: string;
  /** @deprecated */
  pillHoveredBorderColor?: string;
  /** @deprecated */
  pillJustifyContent?: IRawStyleBase['justifyContent'];
  /** @deprecated */
  pillHighContrastBackground?: string;
  /** @deprecated */
  pillHighContrastHoveredBackground?: string;
  /** @deprecated */
  pillHighContrastBorderColor?: string;
  /** @deprecated */
  pillHighContrastHoveredBorderColor?: string;

  /** @deprecated */
  thumbBackground?: string;
  /** @deprecated */
  thumbHighContrastBackground?: string;
  /** @deprecated */
  thumbHighContrastBorderColor?: string;

  /** @deprecated */
  textColor?: string;
  /** @deprecated */
  textHighContrastColor?: string;
}

/** @deprecated */
export type IToggleStyles = IComponentStyles<IToggleSlots>;
