import { IColumn } from './DetailsList.types';
import { DetailsColumnBase } from './DetailsColumn.base';
import { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { ITooltipHostProps } from '../../Tooltip';
import { IDragDropHelper } from '../../utilities/dragdrop/index';
import { ICellStyleProps } from './DetailsRow.types';
import { ITheme, IStyle } from '../../Styling';

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsColumnProps extends React.ClassAttributes<DetailsColumnBase> {
  /**
   * The theme object to respect during render.
   */
  theme?: ITheme;
  /**
   * The component styles to respect during render.
   */
  styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
  /**
   * A reference to the component instance.
   */
  componentRef?: () => void;
  /**
   * The column definition for the component instance.
   */
  column: IColumn;
  /**
   * The column index for the component instance.
   */
  columnIndex: number;
  /**
   * Parent ID used for accessibility label(s).
   */
  parentId?: string;
  /**
   * Render function for providing a column header tooltip.
   */
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  /**
   * Callback fired when click event occurs.
   */
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  /**
   * Callback fired on contextual menu event to provide contextual menu UI.
   */
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  /**
   * The drag and drop helper for the component instance.
   */
  dragDropHelper?: IDragDropHelper | null;
  /**
   * Whether or not the column can be re-ordered via drag and drop.
   */
  isDraggable?: boolean;
  /**
   * @deprecated, use `updateDragInfo`
   */
  setDraggedItemIndex?: (itemIndex: number) => void;
  /**
   * Callback on drag and drop event.
   */
  updateDragInfo?: (props: { itemIndex: number }, event?: MouseEvent) => void;
  /**
   * Whether or not the column has been dropped via drag and drop.
   */
  isDropped?: boolean;
  /**
   * Custom styles for cell rendering.
   */
  cellStyleProps?: ICellStyleProps;
}

/**
 * {@docCategory DetailsList}
 */
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

/**
 * {@docCategory DetailsList}
 */
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
