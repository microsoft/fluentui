import * as React from 'react';
import { IStyle, IStyleFunctionOrObject, IBaseProps, INavLinkGroup } from 'office-ui-fabric-react';

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
   * If used inside a parent element with scrollbar, provide the parent element id to properly position
   * the floating nav by considering the scroll bar.
   */
  navScrollerId?: string;

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
   * Enables custom string for the Edit link
   */
  editString?: string;

  /**
   * Enables custom string for the Show more link
   */
  showMoreString?: string;

  /**
   * Enables custom string for the Show less link
   */
  showLessString?: string;

  /**
   * Callback for the parent component when the nav component is toggled between expanded and collapsed state
   */
  onNavCollapsed?(isCollapsed: boolean): void;

  /**
   * Callback for the Nav and when the "Show more" / "Show less" nav link is clicked.
   * The state "showMore" stays in the parent NavToggler component to keep show more/less state of Nav and SlimNav component in sync.
   */
  onShowMoreLinkClicked?(ev: React.MouseEvent<HTMLElement>): void;

  /**
   * Callback for the parent component when the nav node is toggled between expanded and collapsed state
   */
  onNavLinkGroupExpandedCallback?(nodeKey: string, isExpanded: boolean): void;

  /**
   * Callback for the parent component when the edit nav node is clicked
   */
  onEditNavClickedCallback?(): void;
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
