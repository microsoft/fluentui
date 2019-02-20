import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDialogContentProps } from 'office-ui-fabric-react/lib/Dialog';
import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Layout, Layouts } from 'react-grid-layout-fabric';
import { DashboardGridBreakpointLayouts } from '../DashboardGridLayout/DashboardGridLayout.types';

export interface ISectionProps {
  /**
   * The unique id for section in dashboard
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
  styles?: IStyleFunctionOrObject<ISectionStyleProps, ISectionStyles>;

  /**
   * Is in the edit section mode?
   * @default false
   */
  isEditMode?: boolean;

  /**
   * Is in the renaming section mode?
   * @default false
   */
  isRenaming?: boolean;

  /**
   * Is in the adding section mode?
   * @default false
   */
  isAdding?: boolean;

  /**
   * Is the section disabled? if yes, drag, rename delete etc., are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The row height used for react grid layout
   */
  rowHeight?: number;

  /**
   * The rename/edit button prop in the section
   */
  renameSectionButtonProps?: IButtonProps;

  /**
   * The delete button prop in the section
   */
  deleteSectionButtonProps?: IButtonProps;

  /**
   * Handler when collapse expand is toggled
   */
  onCollapseExpand?: (expanded: boolean, key: string) => void;

  /**
   * Handler for deleting section
   * @param key the key of section being deleted
   */
  onDelete?: (key: string) => void;

  /**
   * Handler for renaming section button click
   * @param key the key of section being renamed
   */
  onRename?: (key: string) => void;

  /**
   * Update the title of section being renamed
   * @param key the key of section being renamed
   * @param title the new title
   */
  updateSectionTitle?: (key: string, title: string) => void;
}

export interface ISectionStyleProps {
  /**
   * Is the section disabled? if yes, drag, rename, delete etc., are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The row height used for React-Grid-Layout
   */
  rowHeight?: number;

  /**
   * Is in the edit section mode?
   * @default false
   */
  isEditMode?: boolean;
}

export interface ISection extends ISectionProps {
  /**
   * Card ids in this section
   */
  cardIds?: string[];
}

export interface ISectionState {
  /**
   * if section is expanded
   */
  expanded: boolean;
}

export interface ISectionStyles {
  root: IStyle;
  sectionTitle: IStyle;
  addSectionTextField: IStyle;
  renameSectionTextField: IStyle;
  actions: IStyle;
  actionButton: IStyle;
  actionButtonDisabled: IStyle;
  actionButtonHovered: IStyle;
  actionButtonPressed: IStyle;
}

export interface IEditSectionsProps {
  /**
   * The sections
   */
  sections: ISection[];

  /**
   * If add button is disabled
   */
  addButtonDisabled?: boolean;

  /**
   * If save button is disabled
   */
  saveButtonDisabled?: boolean;

  /**
   * Describes the layout of the section to display for every breakpoint
   */
  layout?: DashboardGridBreakpointLayouts;

  /**
   * Whether sections in this grid should be draggable or not
   * @default true
   */
  isDraggable?: boolean;

  /**
   * The default title for new section
   */
  defaultSectionTitle?: string;

  /**
   * The default id for adding new section
   */
  defaultNewSectionId?: string;

  /**
   * The row height used for React-Grid-Layout
   */
  rowHeight?: number;

  /**
   * The add button prop
   */
  addButtonProps?: IButtonProps;

  /**
   * The cancel button prop
   */
  cancelButtonProps?: IButtonProps;

  /**
   * The cancel button prop
   */
  saveButtonProps?: IButtonProps;

  /**
   * The content for delete section dialog
   */
  deleteSectionDialogContentProps?: IDialogContentProps;

  /**
   * The modal property of the delete section dialog
   */
  deleteSectionDialogModelProps?: IModalProps;

  /**
   * The remove button prop in delete section dialog
   */
  deleteSectionDilaogRemoveButtonProps?: IButtonProps;

  /**
   * The cencel button prop in delete section dialog
   */
  deleteSectionDilaogCancelButtonProps?: IButtonProps;

  /**
   * The rename/edit button prop in the section
   */
  renameSectionButtonProps?: IButtonProps;

  /**
   * The delete button prop in the section
   */
  deleteSectionButtonProps?: IButtonProps;

  /**
   * Custom styling for individual elements within the edit section DOM.
   */
  styles?: IStyleFunctionOrObject<{}, IEditSectionsStyles>;

  /**
   * On add a new section.
   */
  onAddSection?: (title: string) => void;

  /**
   * Callback to save the layout.
   */
  onLayoutChange?: (currentLayout: Layout[], allLayouts: Layouts) => void;

  /**
   * Handler for deleting section
   * @param the key of section being deleted
   */
  onDeleteSection?: (key: string) => void;

  /**
   * Handler when renaming section button is clicked
   * @param the key of section being renamed
   */
  onRenameSectionClick?: (key: string) => void;

  /**
   * Handler when the title of the section in edit is updated
   * @param key the key of section being renamed
   * @param title the new title
   */
  onUpdateSectionTitle?: (key: string, title: string) => void;

  /**
   * Callback when click on cancel button
   */
  onCancel?: () => void;

  /**
   * Callback when click on save button
   */
  onSave?: () => void;
}

export interface IEditSectionsStyles {
  root: IStyle;
  icon: IStyle;
  addButton: IStyle;
  saveButton: IStyle;
  cancelButton: IStyle;
  topActionButtonsFlexContainer: IStyle;
}
