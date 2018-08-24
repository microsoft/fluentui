import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { Layout, Layouts } from 'react-grid-layout';
import { DashboardGridBreakpointLayouts } from '../DashboardGridLayout/DashboardGridLayout.types';

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
   * Is in the edit section mode
   * @default false
   */
  isEditMode?: boolean;

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

export interface IEditSectionsProps {
  /**
   * The text label of add button
   */
  addButtonLabel?: string;
  /**
   * If add button is disabled
   */
  addButtonDisabled?: boolean;

  /**
   * The text label of save button
   */
  saveButtonLabel?: string;

  /**
   * If save button is disabled
   */
  saveButtonDisabled?: boolean;

  /**
   * The text label of cancel button
   */
  cancelButtonLabel?: string;

  /**
   * Describes the layout of the section to display for every breakpoint
   */
  layout?: DashboardGridBreakpointLayouts;

  /**
   * Whether sections in this grid should be draggable or not
   * @default true
   */
  isDraggable?: boolean;

  onAddSection?(): void;

  /**
   * Callback so you can save the layout.
   */
  onLayoutChange?(currentLayout: Layout[], allLayouts: Layouts): void;
}

export interface IEditSectionsStyles {
  root: IStyle;
  addButton: IStyle;
  saveButton: IStyle;
  cancelButton: IStyle;
  rightAlignedFlexContainer: IStyle;
}
