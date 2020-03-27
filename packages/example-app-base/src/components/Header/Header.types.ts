import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IIconStyleProps } from 'office-ui-fabric-react/lib/Icon';

export interface IHeaderProps {
  title: string;
  sideLinks: { name: string; url: string }[];

  isMenuVisible: boolean;
  onIsMenuVisibleChanged?: (isMenuVisible: boolean) => void;

  isLargeDown?: boolean;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IHeaderStyleProps, IHeaderStyles>;
}

export type IHeaderStyleProps = Pick<IHeaderProps, 'theme' | 'isLargeDown'>;

export interface IHeaderStyles {
  root: IStyle;
  title: IStyle;
  /** Styles for each header button. To style the icons, use `subComponentStyles.icons`. */
  button: IStyle;
  /** Styles for the container of the right-side buttons (settings + `sideLinks`) */
  buttons: IStyle;
  subComponentStyles: IHeaderSubComponentStyles;
}

export interface IHeaderSubComponentStyles {
  // TODO: remove any after TS 3 upgrade
  // tslint:disable:no-any
  /** Styles for the hamburger and settings icons */
  icons: IStyleFunctionOrObject<IIconStyleProps, any>;
}
