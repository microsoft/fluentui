import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStatelessComponent, IStyleableComponentProps } from '../../Foundation';

export type IVerticalPersonaComponent = IStatelessComponent<IVerticalPersonaProps, IVerticalPersonaStyles>;

// Extending IStyleableComponentProps will automatically add stylable props for you, such as styles and theme.
//    If you don't want these props to be included in your component, just remove this extension.
export interface IVerticalPersonaProps extends IStyleableComponentProps<IVerticalPersonaProps, IVerticalPersonaStyles> {
  text: string;
  initials?: string;
  secondaryText?: string;
  imageUrl?: string;
  size: 56 | 72 | 100;
}

export interface IVerticalPersonaStyles {
  root: IStyle;
  text: IStyle;
  secondaryText: IStyle;
}
