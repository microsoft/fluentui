import { IStyle, IStyleFunctionOrObject, IBaseProps, INavLinkGroup } from 'office-ui-fabric-react';
import { INavLinkProps } from './NavLink.types';

export interface INavProps extends IBaseProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[];

  /**
   * Mutually exclusive to "defaultIsNavCollapsed".
   * Use this if you control the collapsed state at a higher level and plan to pass in the correct value
   * based on handling onNavCollapsed events and re-rendering.
   */
  isNavCollapsed?: boolean;

  /**
   * Mutually exclusive to "isNavCollapsed". Use this if you want an uncontrolled component, and
   * want the Checkbox instance to maintain its own state.
   */
  defaultIsNavCollapsed?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<INavStyleProps, INavStyles>;

  /**
   * Used for telemetry
   */
  dataHint?: string;

  /**
   * Enables the Edit link
   */
  enableCustomization?: boolean;

  /**
   * Enables the show more / show less toggle. Only used when enableCustomization is true.
   */
  showMore?: boolean;

  /**
   * Props to pass into the show more link
   */
  showMoreLinkProps?: INavLinkProps;

  /**
   * Props to pass into the edit link
   */
  editLinkProps?: INavLinkProps;

  /**
   * Props to pass into the edit link
   */
  collapseNavLinkProps?: INavLinkProps;

  /**
   * Callback for the parent component when the nav component is toggled between expanded and collapsed state
   */
  onNavCollapsed?(isCollapsed: boolean): void;
}

export interface INavState {
  /**
   * Used to toggle the nav component between expanded and collapsed state.
   */
  isNavCollapsed: boolean;

  shouldScroll: boolean;
}

export interface INavStyleProps {
  /**
   * When the Nav is collapsed
   */
  isNavCollapsed: boolean;

  /**
   * When the nav has enough content to scroll
   */
  shouldScroll: boolean;
}

export interface INavStyles {
  /**
   * Nav
   */
  root: IStyle;
  navWrapper: IStyle;
  navContainer: IStyle;
  navGroup: IStyle;
}
