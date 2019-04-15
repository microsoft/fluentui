import { IStyle, IFontWeight } from '@uifabric/styling';
import { IComponent, IHTMLSlot, IStyleableComponentProps } from '../../../Foundation';
import { ITextSlot } from 'office-ui-fabric-react';
import { IPersonaCoinSlot } from '../../PersonaCoin/PersonaCoin.types';

export type IVerticalPersonaComponent = IComponent<IVerticalPersonaProps, IVerticalPersonaTokens, IVerticalPersonaStyles>;

// These types are redundant with IVerticalPersonaComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IVerticalPersonaTokenReturnType = ReturnType<Extract<IVerticalPersonaComponent['tokens'], Function>>;
export type IVerticalPersonaStylesReturnType = ReturnType<Extract<IVerticalPersonaComponent['styles'], Function>>;

export interface IVerticalPersonaSlots {
  root?: IHTMLSlot;
  primaryText?: ITextSlot;
  secondaryText?: ITextSlot;
  coin?: IPersonaCoinSlot;
}

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
// If you don't want these props to be included in your component, just remove this extension.
export interface IVerticalPersonaProps
  extends IVerticalPersonaSlots,
    IStyleableComponentProps<IVerticalPersonaProps, IVerticalPersonaTokens, IVerticalPersonaStyles> {
  vertical: true;
  text: string;
}

export interface IVerticalPersonaStyles {
  root?: IStyle;
  primaryText?: IStyle;
  secondaryText?: IStyle;
  coin?: IStyle; // TODO: Check if this works after Jason his PR
}

export interface IVerticalPersonaTokens {
  verticalPersonaWidth?: number;
  fontFamily?: string;
  horizontalTextPadding?: number;
  primaryTextPaddingTop?: string;
  primaryTextFontSize?: string;
  primaryTextFontWeight?: IFontWeight;
  secondaryTextPaddingTop?: string;
  secondaryTextFontSize?: string;
  secondaryTextFontWeight?: IFontWeight;
}
