import { IColumn } from './DetailsList.types';
import { DetailsColumnBase } from './DetailsColumn.base';
import { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { ITooltipHostProps } from '../../Tooltip';
import { IDragDropHelper } from '../../utilities/dragdrop/index';
import { ICellStyleProps } from './DetailsRow.types';
import { ITheme, IStyle } from '../../Styling';

export interface IDetailsColumnProps extends React.ClassAttributes<DetailsColumnBase> {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
  componentRef?: () => void;
  column: IColumn;
  columnIndex: number;
  parentId?: string;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  dragDropHelper?: IDragDropHelper | null;
  isDraggable?: boolean;
  // @deprecated, use `updateDragInfo`
  setDraggedItemIndex?: (itemIndex: number) => void;
  updateDragInfo?: (props: { itemIndex: number }, event?: MouseEvent) => void;
  isDropped?: boolean;
  cellStyleProps?: ICellStyleProps;
}

export type IDetailsColumnStyleProps = Required<Pick<IDetailsColumnProps, 'theme' | 'cellStyleProps'>> & {
  headerClassName?: string;
  isActionable?: boolean;
  isEmpty?: boolean;
  isIconVisible?: boolean;
  isPadded?: boolean;
  isIconOnly?: boolean;
  iconClassName?: string;
  transitionDurationDrag?: number;
  transitionDurationDrop?: number;
};

export interface IDetailsColumnStyles {
  root: IStyle;
  gripperBarVerticalStyle: IStyle;
  cellTooltip: IStyle;
  cellTitle: IStyle;
  cellName: IStyle;
  iconClassName: IStyle;
  nearIcon: IStyle;
  accessibleLabel: IStyle;
  sortIcon: IStyle;
  filterChevron: IStyle;
  borderAfterDropping: IStyle;
  noBorderAfterDropping: IStyle;
  borderWhileDragging: IStyle;
  noBorderWhileDragging: IStyle;
}
