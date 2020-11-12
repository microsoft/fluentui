import * as React from 'react';
import { IContextualMenuItem, IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

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

  /**
   * The available versions whose documentation is presented on the website.
   */
  versionOptions?: IContextualMenuItem[];

  /**
   * Callback that determines what happens when a version is chosen from the version dropdown.
   */
  onVersionMenuClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, item: IContextualMenuItem) => void;

  /**
   * The data regarding the current version of the library.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentVersionData?: any;
}

export type IPageHeaderStyleProps = Pick<IPageHeaderProps, 'theme'>;

export interface IPageHeaderStyles {
  root: IStyle;
  title: IStyle;
  subTitle: IStyle;
}
