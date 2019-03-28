import { IStyle } from 'office-ui-fabric-react';

export interface INavLinkProps extends React.AllHTMLAttributes<HTMLAnchorElement> {
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
}

export interface INavLinkStyles {
  root: IStyle;
  iconContainer: IStyle;
  icon: IStyle;
  text: IStyle;
  secondaryIcon: IStyle;
}

export interface INavLinkStyleProps {
  isNavCollapsed: boolean;
  isExpanded: boolean;
  hasNestedMenu: boolean;
  isSelected: boolean;
  hasSelectedNestedLink: boolean;
  isNested: boolean;
}
