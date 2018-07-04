import * as React from 'react';
import { DetailsRowBase } from './DetailsRow.base';
import { IStyle, ITheme, IStyleSet } from '../../Styling';
import { IColumn, CheckboxVisibility } from './DetailsList.types';
import { ISelection, SelectionMode } from '../../utilities/selection/interfaces';
import { IDragDropHelper, IDragDropEvents } from '../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';
import { CollapseAllVisibility } from '../GroupedList/GroupedList.types';
import { IStyleFunctionOrObject } from '../../Utilities';
import { IDetailsRowCheckProps } from './DetailsRowCheck.types';
import { IDetailsRowFieldsProps } from './DetailsRowFields.types';

export interface IDetailsRowProps extends React.Props<DetailsRowBase> {
  /**
   * Theme provided by styled() function
   */
  theme?: ITheme;

  /**
   * Overriding styles to this row
   */
  styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;

  /**
   * Ref of the component
   */
  componentRef?: () => void;

  /**
   * Data source for this component
   */
  item: any;

  /**
   * Index of the collection of items of the DetailsList
   */
  itemIndex: number;

  /**
   * Column metadata
   */
  columns: IColumn[];

  /**
   * Whether to render in compact mode
   */
  compact?: boolean;

  /**
   * Selection mode
   */
  selectionMode: SelectionMode;

  /**
   * Selection from utilities
   */
  selection: ISelection;

  /**
   * A list of events to register
   */
  eventsToRegister?: { eventName: string; callback: (item?: any, index?: number, event?: any) => void }[];

  /**
   * Callback for did mount for parent
   */
  onDidMount?: (row?: DetailsRowBase) => void;

  /**
   * Callback for will mount for parent
   */
  onWillUnmount?: (row?: DetailsRowBase) => void;

  /**
   * Callback for rendering a checkbox
   */
  onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;

  /**
   * Callback for rendering an item column
   */
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;

  /**
   * Handling drag and drop events
   */
  dragDropEvents?: IDragDropEvents;

  /**
   * Helper for the drag and drop
   */
  dragDropHelper?: IDragDropHelper;

  /**
   * Nesting depth of a grouping
   */
  groupNestingDepth?: number;

  /**
   * How much to indent
   */
  indentWidth?: number;

  /**
   * View port of the virtualized list
   */
  viewport?: IViewport;

  /**
   * Checkbox visibility
   */
  checkboxVisibility?: CheckboxVisibility;

  /**
   * Collapse all visibility
   */
  collapseAllVisibility?: CollapseAllVisibility;

  /**
   * Callback for getting the row aria label
   */
  getRowAriaLabel?: (item: any) => string;

  /**
   * Callback for getting the row aria-describedby
   */
  getRowAriaDescribedBy?: (item: any) => string;

  /**
   * Check button's aria label
   */
  checkButtonAriaLabel?: string;

  /**
   * Class name for the checkbox cell
   */
  checkboxCellClassName?: string;

  /**
   * DOM element into which to render row field
   */
  rowFieldsAs?: React.StatelessComponent<IDetailsRowFieldsProps> | React.ComponentClass<IDetailsRowFieldsProps>;

  /**
   * Overriding class name
   */
  className?: string;

  /**
   * Whether to render shimmer
   */
  shimmer?: boolean;
}

export type IDetailsRowStyleProps = Required<Pick<IDetailsRowProps, 'theme'>> & {
  isSelected?: boolean;
  anySelected?: boolean;
  canSelect?: boolean;
  checkClassNames?: IStyleSet;
  droppingClassName?: string;
  isCheckVisible?: boolean;
  isRowHeader?: boolean;
  checkboxCellClassName?: string;
  className?: string;
  compact?: boolean;
};

export interface IDetailsRowStyles {
  root: IStyle;
  cell: IStyle;
  cellUnpadded: IStyle;
  cellPadded: IStyle;
  checkCell: IStyle;
  isRowHeader: IStyle;
  isMultiline: IStyle;
  fields: IStyle;
  cellMeasurer: IStyle;
  checkCover: IStyle;
  shimmer: IStyle;
  shimmerIconPlaceholder: IStyle;
  shimmerLeftBorder: IStyle;
  shimmerBottomBorder: IStyle;
  check: IStyle;
}
