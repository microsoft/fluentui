import { ITheme, IStyle, IStyleFunctionOrObject } from 'office-ui-fabric-react';
import { IVersionSwitcherDefinition } from '../../utilities/SiteDefinition.types';

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
  versionSwitcherDefinition?: IVersionSwitcherDefinition;
}

export type IPageHeaderStyleProps = Pick<IPageHeaderProps, 'className' | 'pageTitle' | 'theme'>;

export interface IPageHeaderStyles {
  root: IStyle;
  title: IStyle;
  subTitle: IStyle;
  versionSelector: IStyle;
}
