/* tslint:disable */
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  INavLink,
  INavLinkGroup
} from 'office-ui-fabric-react/lib/components/Nav';
import { INavState } from 'office-ui-fabric-react/lib/components/Nav/Nav.base';
/* tslint:enable */

export interface INavProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[] | null;

  /**
   * (Optional) The key of the nav item initially selected.
   */
  initialSelectedKey?: string;

  /**
   * (Optional) The key of the nav item selected by caller.
   */
  selectedKey?: string;

  /**
   * (Optional) Used to toggle the nav component between expanded and collapsed state
   */
  isNavCollapsed?: boolean;

  /**
   * (Optional) If used inside a parent element with scrollbar, provide the parent element id to properly position
   * the floating nav by considering the scroll bar.
   */
  navScrollerId?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  getStyles?: IStyleFunction<INavStyleProps, INavStyles>;

  /**
   * (Optional) callback for the parent component when the nav component is toggled between expanded and collapsed state
   */
  onNavCollapsedCallback?(isCollapsed: boolean): void;
}

export interface INavState extends INavState {
  /**
   * Used to toggle the nav component between expanded and collapsed state.
   */
  isNavCollapsed?: boolean;
}

export interface INavLink extends INavLink {
  /* used to adjust the floating nav when the scrollbar appears */
  scrollTop?: number;
}

export interface INavStyleProps {
  /**
   * is element selected boolean
   */
  isSelected?: boolean;

  /**
   * has children boolean
   */
  hasChildren?: boolean;

  /**
   * nesting level of the nav item in the nav tree
   */
  nestingLevel?: number;

  /**
   * is nav collapsed boolean
   */
  isCollapsed?: boolean;

  /**
   * if the component is hosted inside a scroll bar, send the scrollTop to position the floating nav relative to it's parent
   */
  scrollTop?: number;
}

export interface INavStyles {
  /**
   * Style set for the nav component root
   */
  root: IStyle;

  /**
   * Style set for the nav item root
   */
  navItemRoot: IStyle;

  /**
   * Style set for the icon column in the nav item
   */
  navItemIconColumn: IStyle;

  /**
   * Style set for the name column in the nav item
   */
  navItemNameColumn: IStyle;

  /**
   * Style set for the slim version of nav item
   */
  navSlimItemRoot: IStyle;

  /**
   * Style set for the floating nav root in the slim version
   */
  navFloatingRoot: IStyle;

  /**
   * Style set for the floating nav item root
   */
  navFloatingItemRoot: IStyle;

  /**
   * Style set for the nav group separator
   */
  navGroupSeparatorRoot: IStyle;

  /**
   * Style set for the horizontal line in nav group separator
   */
  navGroupSeparatorHrLine: IStyle;

  /**
   * Style set for the group name in nav group separator
   */
  navGroupSeparatorGroupName: IStyle;

  /**
   * Style set for the nav toggler which toggles expanded and slim nav
   */
  navToggler: IStyle;
}
