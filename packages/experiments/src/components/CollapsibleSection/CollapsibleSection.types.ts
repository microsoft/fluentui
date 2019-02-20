import * as React from 'react';
import { IComponent, IComponentStyles, IHTMLSlot, IStyleableComponentProps } from '../../Foundation';
import { IBaseProps, IRefObject } from '../../Utilities';
import { ICollapsibleSectionTitleSlot } from './CollapsibleSectionTitle.types';

export type ICollapsibleSectionComponent = IComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionTokens,
  ICollapsibleSectionStyles,
  ICollapsibleSectionViewProps
>;

// These types are redundant with ICollapsibleSectionComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ICollapsibleSectionTokenReturnType = ReturnType<Extract<ICollapsibleSectionComponent['tokens'], Function>>;
export type ICollapsibleSectionStylesReturnType = ReturnType<Extract<ICollapsibleSectionComponent['styles'], Function>>;

export interface ICollapsibleSectionSlots {
  root?: IHTMLSlot;
  title?: ICollapsibleSectionTitleSlot;
  body?: IHTMLSlot;
}

export interface ICollapsibleSection {}

export interface ICollapsibleSectionProps
  extends ICollapsibleSectionSlots,
    IStyleableComponentProps<ICollapsibleSectionViewProps, ICollapsibleSectionStyles, ICollapsibleSectionTokens>,
    IBaseProps<ICollapsibleSection> {
  /**
   * Default and initial collapsed state if collapsed prop is not provided.
   * @default true
   */
  defaultCollapsed?: boolean;

  /**
   * Collapsed state. If provided, component is controlled.
   * @default defaultCollapsed
   */
  collapsed?: boolean;

  indent?: number;
}

export interface ICollapsibleSectionViewProps extends ICollapsibleSectionProps {
  /**
   * Optional callback to access the Title element interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  titleElementRef?: IRefObject<HTMLButtonElement>;

  /**
   * Toggle input callback triggered by mouse and keyboard input.
   */
  onClick?: (ev: React.MouseEvent<Element>) => void;

  /**
   * Key down callback for root element of CollapsibleSection.
   */
  onRootKeyDown?: (ev: React.KeyboardEvent<Element>) => void;

  /**
   * Key down callback for CollapsibleSection title.
   */
  onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
}

export interface ICollapsibleSectionTokens {}

export type ICollapsibleSectionStyles = IComponentStyles<ICollapsibleSectionSlots>;
