import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';
import { VersionSwitcherDefinition } from '@fluentui/public-docsite-setup';

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
   * Defines the necessary information to populate the version switcher.
   */
  versionSwitcherDefinition?: VersionSwitcherDefinition;
}

export type IPageHeaderStyleProps = Pick<IPageHeaderProps, 'className' | 'pageTitle' | 'theme'>;

export interface IPageHeaderStyles {
  root: IStyle;
  title: IStyle;
  subTitle: IStyle;
  versionSelector: IStyle;
}
