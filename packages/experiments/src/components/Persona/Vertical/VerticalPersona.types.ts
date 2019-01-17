import { IStyle, IFontWeight } from '@uifabric/styling';
import { IComponent, IHTMLDivSlot, IStyleableComponentProps } from '../../../Foundation';
import { ITextSlot } from '../../../Text';
import { IPersonaCoinSlot } from '../../PersonaCoin/PersonaCoin.types';

export type IVerticalPersonaComponent = IComponent<IVerticalPersonaProps, IVerticalPersonaTokens, IVerticalPersonaStyles>;

export interface IVerticalPersonaSlots {
  root?: IHTMLDivSlot;
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
  textPaddingLeftAndRight?: number;
  primaryTextPaddingTop?: string;
  primaryTextFontSize?: string;
  primaryTextFontWeight?: IFontWeight;
  secondaryTextPaddingTop?: string;
  secondaryTextFontSize?: string;
  secondaryTextFontWeight?: IFontWeight;
}
