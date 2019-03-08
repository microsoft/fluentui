import { IStyle } from 'office-ui-fabric-react';

export interface INavLinkProps extends React.AllHTMLAttributes<HTMLAnchorElement> {
  /**
   * Used for telemetry
   */
  dataHint?: string;

  /**
   * Used for telemetry
   */
  dataValue?: string;

  /**
   * Used by the screen reader to describe the nav link
   */
  ariaLabel?: string;

  /**
   * True means the nav link is currently expanded (visible), false means the nav link is currently collapsed (invisible)
   */
  ariaExpanded?: boolean;

  /**
   * Icon name for the icon shown on the left side of the nav link
   */
  primaryIconName?: string;

  /**
   * Icon name for the icon shown on the right side of the nav link
   */
  secondaryIconName?: string;

  /**
   * Has an L2 (nested) menu
   */
  hasNestedMenu?: boolean;

  /**
   * One of it's L2 links is selected (required for selected indicator)
   */
  hasSelectedNestedLink?: boolean;

  /**
   * Is an L2 (nested) link
   */
  isNested?: boolean;

  /**
   * Is an L1 in an expanded state
   */
  isExpanded?: boolean;

  /**
   * Either is the selected link, or the L1 with a selected L2
   */
  isSelected?: boolean;

  /**
   * Pays attention to Nav collapsed state to render the right selected indicator and nested menu
   */
  isNavCollapsed?: boolean;

  offsetUpdated?: (offset: number) => void;
}

export interface INavLinkStyles {
  navLink: IStyle;
  navItemBarMarker: IStyle;
  iconWrapper: IStyle;
  navItemIcon: IStyle;
  navItemText: IStyle;
}

export interface INavLinkStyleProps {
  isNavCollapsed: boolean;
  isExpanded: boolean;
  hasNestedMenu: boolean;
  isSelected: boolean;
  hasSelectedNestedLink: boolean;
  isNested: boolean;
}
