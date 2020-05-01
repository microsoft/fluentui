import { ITheme, IStyle, IStyleFunctionOrObject } from 'office-ui-fabric-react';

export interface IPageHeaderProps {
  /** The title of the current page. */
  pageTitle: string;

  /** The subtitle of the current page. */
  pageSubTitle?: string;

  /** Class for the root element */
  className?: string;

  /** Style overrides */
  styles?: IStyleFunctionOrObject<IPageHeaderStyleProps, IPageHeaderStyles>;

  /** Theme provided by higher-order component. */
  theme?: ITheme;
}

export type IPageHeaderStyleProps = Pick<IPageHeaderProps, 'theme'>;

export interface IPageHeaderStyles {
  root: IStyle;
  title: IStyle;
  subTitle: IStyle;
}
