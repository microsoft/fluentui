import * as React from 'react';
import { DetailsColumnBase } from './DetailsColumn.base';
import type { IColumn } from './DetailsList.types';
import type { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import type { ITooltipHostProps } from '../../Tooltip';
import type { IDragDropHelper } from '../../DragDrop';
import type { ICellStyleProps } from './DetailsRow.types';
import type { ITheme, IStyle } from '../../Styling';
import type { IIconProps } from '../Icon/Icon.types';

/**
 * {@docgategory DetailsList}
 */
export interface IDetailsColumnRenderTooltipProps extends ITooltipHostProps {
  /**
   * Information about the column for which the tooltip is being rendered.
   * Use this to format status information about the column, such as its filter or sort state.
   */
  column?: IColumn;
}

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
  onRenderColumnHeaderTooltip?: IRenderFunction<IDetailsColumnRenderTooltipProps>;
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
   * @deprecated use `updateDragInfo`
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
  /**
   * Whether to use fast icon and check components. The icons can't be targeted by customization
   * but are still customizable via class names.
   * @defaultvalue true
   */
  useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export type IDetailsColumnStyleProps = Required<Pick<IDetailsColumnProps, 'theme' | 'cellStyleProps'>> & {
  /**
   * Classname to provide for header region.
   */
  headerClassName?: string;
  /**
   * Whether or not the column is actionable.
   */
  isActionable?: boolean;
  /**
   * Whether or not the column contains contents.
   */
  isEmpty?: boolean;
  /**
   * Whether or not the column has a visible icon.
   */
  isIconVisible?: boolean;
  /**
   * Whether or not the column is padded.
   */
  isPadded?: boolean;
  /**
   * Whether or not the column has icon only content/
   */
  isIconOnly?: boolean;
  /**
   * Classname to provide for the header's icon region.
   */
  iconClassName?: string;
  /**
   * CSS transition duration on drag event.
   */
  transitionDurationDrag?: number;
  /**
   * CSS transition duration on drop event.
   */
  transitionDurationDrop?: number;
};

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsColumnStyles {
  /**
   * Styleable root region.
   */
  root: IStyle;
  /**
   * Styleable resize glyph region.
   */
  gripperBarVerticalStyle: IStyle;
  /**
   * Styleable cell tooltip region.
   */
  cellTooltip: IStyle;
  /**
   * Styleable cell title region.
   */
  cellTitle: IStyle;
  /**
   * Styleable cell name region.
   */
  cellName: IStyle;
  /**
   * Styleable icon region.
   */
  iconClassName: IStyle;
  /**
   * Styleable margin by icon region.
   */
  nearIcon: IStyle;
  /**
   * Styleable label region.
   */
  accessibleLabel: IStyle;
  /**
   * Styleable column sort icon region.
   */
  sortIcon: IStyle;
  /**
   * Styleable filter glyph.
   */
  filterChevron: IStyle;
  /**
   * Styleable border region after drag & drop.
   */
  borderAfterDropping: IStyle;
  /**
   * Transparent no border region after drag & drop to avoid content shift.
   */
  noBorderAfterDropping: IStyle;
  /**
   * Styleable border while drag & drop occurs.
   */
  borderWhileDragging: IStyle;
  /**
   * Transparent no border region while drag & drop occurs to avoid content shift.
   */
  noBorderWhileDragging: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsColumnFilterIconProps extends IIconProps {
  columnProps?: IDetailsColumnProps;
}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsColumnFieldProps {
  /**
   * Item data to render.
   */
  item: any;
  /**
   * Index of the item in its list.
   */
  itemIndex: number;
  /**
   * Whether or not the row is selected.
   */
  isSelected?: boolean;
  /**
   * Column schema information.
   */
  column: IColumn;
  /**
   * Key representing the cell value, for change-detection.
   */
  cellValueKey?: string;
  /**
   * Class name to apply to the cell root element.
   */
  className?: string;
  /**
   * Original content render function for the cell
   */
  onRender: (item?: any, index?: any, column?: IColumn) => React.ReactNode;
}
