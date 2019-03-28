import { INavLink, IStyle, IFocusZone } from 'office-ui-fabric-react';

export interface INavGroupProps {
  /**
   * Title of the group. Is hidden for the first nav group.
   */
  groupName?: string;

  /**
   * Manages key index of nav groups, is passed down to navLinkGroup to help with unique ID
   */
  groupIndex: number;

  /**
   * Navigation links array
   */
  links: INavLink[];

  /**
   * TODO: Not sure what this is for
   */
  dataHint?: string;

  /**
   * Passes the state of the nav as a prop so the lower level components know how to behave
   */
  isNavCollapsed: boolean;

  /**
   * callback for when a group has been collapsed or expanded
   */
  onCollapse?: () => void;

  /**
   * Ref to the scrolling container of the navigation
   */
  navRef: React.RefObject<HTMLDivElement>;

  /**
   * Ref to the main FocusZone of the navigation
   */
  focusZoneRef: React.RefObject<IFocusZone>;
}

export interface INavGroupStyles {
  navGroupDivider: IStyle;
  navGroupTitle: IStyle;
  navItem: IStyle;
}
