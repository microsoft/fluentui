import * as React from 'react';
import type { IRefObject } from '../../Utilities';
import type {
  IComponent,
  IComponentStyles,
  IHTMLElementSlot,
  ISlotProp,
  ISlottableProps,
  IStyleableComponentProps,
} from '@fluentui/foundation-legacy';
import type { ITextSlot } from '@fluentui/react';
import type { IIconSlot } from '../../utilities/factoryComponents.types';

export type ICollapsibleSectionTitleComponent = IComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleTokens,
  ICollapsibleSectionTitleStyles
>;

// These types are redundant with ICollapsibleSectionTitleComponent but are needed until TS function
// return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type ICollapsibleSectionTitleTokenReturnType = ReturnType<
  Extract<ICollapsibleSectionTitleComponent['tokens'], Function>
>;
export type ICollapsibleSectionTitleStylesReturnType = ReturnType<
  Extract<ICollapsibleSectionTitleComponent['styles'], Function>
>;

export type ICollapsibleSectionTitleSlot = ISlotProp<ICollapsibleSectionTitleProps, string>;

export interface ICollapsibleSectionTitleSlots {
  root?: IHTMLElementSlot<'button'>;
  chevron?: IIconSlot;
  text?: ITextSlot;
}

export interface ICollapsibleSectionTitleProps
  extends ISlottableProps<ICollapsibleSectionTitleSlots>,
    IStyleableComponentProps<
      ICollapsibleSectionTitleProps,
      ICollapsibleSectionTitleTokens,
      ICollapsibleSectionTitleStyles
    >,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  focusElementRef?: IRefObject<HTMLButtonElement>;
  /**
   * Collapsed state of body associated with this component.
   */
  collapsed?: boolean;
  /**
   * Disable chevron appearance.
   */
  chevronDisabled?: boolean;
  /**
   * Indentation of title.
   */
  indent?: number;
}

export interface ICollapsibleSectionTitleTokens {}

export type ICollapsibleSectionTitleStyles = IComponentStyles<ICollapsibleSectionTitleSlots>;
