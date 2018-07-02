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

export interface IDetailsRowProps extends React.Props<DetailsRowBase> {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;
  componentRef?: () => void;
  item: any;
  itemIndex: number;
  columns: IColumn[];
  compact?: boolean;
  selectionMode: SelectionMode;
  selection: ISelection;
  eventsToRegister?: { eventName: string; callback: (item?: any, index?: number, event?: any) => void }[];
  onDidMount?: (row?: DetailsRowBase) => void;
  onWillUnmount?: (row?: DetailsRowBase) => void;
  onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  dragDropEvents?: IDragDropEvents;
  dragDropHelper?: IDragDropHelper;
  groupNestingDepth?: number;
  indentWidth?: number;
  viewport?: IViewport;
  checkboxVisibility?: CheckboxVisibility;
  collapseAllVisibility?: CollapseAllVisibility;
  getRowAriaLabel?: (item: any) => string;
  getRowAriaDescribedBy?: (item: any) => string;
  checkButtonAriaLabel?: string;
  checkboxCellClassName?: string;
  rowFieldsAs?: React.StatelessComponent<IDetailsRowFieldsProps> | React.ComponentClass<IDetailsRowFieldsProps>;
  className?: string;
  shimmer?: boolean;
}

export interface IDetailsRowFieldsProps {
  componentRef?: () => void;
  item: any;
  itemIndex: number;
  columnStartIndex: number;
  columns: IColumn[];
  compact?: boolean;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  shimmer?: boolean;
}

export type IDetailsRowStyleProps = Required<Pick<IDetailsRowProps, 'theme'>> & {
  isSelected: boolean;
  anySelected: boolean;
  canSelect: boolean;
  checkClassNames: IStyleSet;
  droppingClassName: string;
  isCheckVisible: boolean;
  isRowHeader?: boolean;
  checkboxCellClassName?: string;
  className?: string;
  compact?: boolean;
};

export interface IDetailsRowStyles {
  root: IStyle;
  cell: IStyle;
  checkCell: IStyle;
  check: IStyle;
  isRowHeader: IStyle;
  isPadded: IStyle;
  isMultiline: IStyle;
  fields: IStyle;
  cellMeasurer: IStyle;
  checkCover: IStyle;
  shimmer: IStyle;
  shimmerIconPlaceholder: IStyle;
  shimmerLeftBorder: IStyle;
  shimmerBottomBorder: IStyle;
}
