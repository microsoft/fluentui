import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISectionProps {
  /**
   * Key for section in dashboard-grid-layout
   */
  id: string;

  /**
   * Title of the section
   */
  title: string;

  /**
   * CSS classname
   */
  className?: string;

  /**
   * Styling
   */
  style?: React.CSSProperties;

  /**
   * String for removing section, pass in only if remove is allowed
   */
  removeTitle?: string;

  /**
   * Handler when collapse expand is toggled
   */
  onCollapseExpand?(expanded: boolean, key: string): void;

  /**
   * Handler for deleting section
   */
  onDelete?(key: string): void;
}

export interface ISection extends ISectionProps {
  /**
   * The unique key for item in dashboard
   */
  key: string;

  /**
   * keys of cards for this section
   */
  keysOfCard: string[];
}

export interface ISectionState {
  /**
   * if section is expanded
   */
  expanded: boolean;
}

export interface ISectionStyles {
  root: IStyle;
  actions: IStyle;
  actionButton: IStyle;
}
