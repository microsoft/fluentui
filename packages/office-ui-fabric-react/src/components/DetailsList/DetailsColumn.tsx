import * as React from 'react';
import * as stylesImport from './DetailsHeader.scss';
const styles: any = stylesImport;
import { Icon } from '../../Icon';
import { BaseComponent, css, IRenderFunction, createRef, IDisposable } from '../../Utilities';
import { IColumn, ColumnActionsMode } from './DetailsList.types';
import { Layer } from '../../Layer';
import { ITooltipHostProps } from '../../Tooltip';
import { IDragDropHelper, IDragDropOptions } from './../../utilities/dragdrop/interfaces';

const INNER_PADDING = 16; // Account for padding around the cell.
const ISPADDED_WIDTH = 24;
const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button

export interface IDetailsColumnProps extends React.Props<DetailsColumn> {
  componentRef?: () => void;
  column: IColumn;
  columnIndex: number;
  parentId?: string;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  dragDropHelper?: IDragDropHelper | null;
  isDraggable?: boolean;
  // @deprecated, use updateDragInfo
  setDraggedItemIndex?: (itemIndex: number) => void;
  updateDragInfo?: (props: { itemIndex: number }, event?: MouseEvent) => void;
  isDropped?: boolean;
}

export class DetailsColumn extends BaseComponent<IDetailsColumnProps> {
  private _root: any;
  private _dragDropSubscription: IDisposable;

  constructor(props: IDetailsColumnProps) {
    super(props);

    this._root = createRef();
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onRootMouseDown = this._onRootMouseDown.bind(this);
    this._updateHeaderDragInfo = this._updateHeaderDragInfo.bind(this);
  }

  public render() {
    const { column, columnIndex, parentId, isDraggable } = this.props;
    const { onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip } = this.props;

    return (
      <div
        key={ column.key }
        ref={ this._root }
        role={ 'columnheader' }
        aria-sort={ column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none' }
        aria-colindex={ columnIndex + 1 }
        className={ css(
          'ms-DetailsHeader-cell',
          styles.cell,
          column.headerClassName,
          column.columnActionsMode !== ColumnActionsMode.disabled && 'is-actionable ' + styles.cellIsActionable,
          !column.name && 'is-empty ' + styles.cellIsEmpty,
          (column.isSorted || column.isGrouped || column.isFiltered) && 'is-icon-visible',
          column.isPadded && styles.cellWrapperPadded
        ) }
        data-is-draggable={ isDraggable }
        draggable={ isDraggable }
        style={ { width: column.calculatedWidth! + INNER_PADDING + (column.isPadded ? ISPADDED_WIDTH : 0) } }
        data-automationid={ 'ColumnsHeaderColumn' }
        data-item-key={ column.key }
      >
        { isDraggable && <Icon iconName={ 'GripperBarVertical' } className={ css(styles.gripperBarVerticalStyle) } /> }
        { onRenderColumnHeaderTooltip(
          {
            hostClassName: css(styles.cellTooltip),
            id: `${parentId}-${column.key}-tooltip`,
            setAriaDescribedBy: false,
            content: column.columnActionsMode !== ColumnActionsMode.disabled ? column.ariaLabel : '',
            children: (
              <span
                id={ `${parentId}-${column.key}` }
                aria-label={ column.isIconOnly ? column.name : undefined }
                aria-labelledby={ column.isIconOnly ? undefined : `${parentId}-${column.key}-name ` }
                className={ css('ms-DetailsHeader-cellTitle', styles.cellTitle) }
                data-is-focusable={ column.columnActionsMode !== ColumnActionsMode.disabled }
                role={ column.columnActionsMode !== ColumnActionsMode.disabled ? 'button' : undefined }
                aria-describedby={
                  this.props.onRenderColumnHeaderTooltip ? `${parentId}-${column.key}-tooltip` : undefined
                }
                onContextMenu={ this._onColumnContextMenu.bind(this, column) }
                onClick={ this._onColumnClick.bind(this, column) }
                aria-haspopup={ column.columnActionsMode === ColumnActionsMode.hasDropdown }
              >
                <span
                  id={ `${parentId}-${column.key}-name` }
                  className={ css('ms-DetailsHeader-cellName', styles.cellName, {
                    [styles.iconOnlyHeader]: column.isIconOnly
                  }) }
                >
                  { (column.iconName || column.iconClassName) && (
                    <Icon className={ css(styles.nearIcon, column.iconClassName) } iconName={ column.iconName } />
                  ) }

                  { !column.isIconOnly ? column.name : undefined }
                </span>

                { column.isFiltered && (
                  <Icon ariaLabel={ column.filterAriaLabel } className={ styles.nearIcon } iconName='Filter' />
                ) }

                { column.isSorted && (
                  <Icon
                    ariaLabel={
                      column.isSortedDescending ?
                        column.sortDescendingAriaLabel :
                        column.sortAscendingAriaLabel
                    }
                    className={ css(styles.nearIcon, styles.sortIcon) }
                    iconName={ column.isSortedDescending ? 'SortDown' : 'SortUp' }
                  />
                ) }

                { column.isGrouped && (
                  <Icon ariaLabel={ column.groupAriaLabel } className={ styles.nearIcon } iconName='GroupedDescending' />
                ) }

                { column.columnActionsMode === ColumnActionsMode.hasDropdown && !column.isIconOnly && (
                  <Icon
                    aria-hidden={ true }
                    className={ css('ms-DetailsHeader-filterChevron', styles.filterChevron) }
                    iconName='ChevronDown'
                  />
                ) }
              </span>
            )
          },
          this._onRenderColumnHeaderTooltip
        ) }
        {
          column.ariaLabel && !this.props.onRenderColumnHeaderTooltip ? (
            <Layer>
              <label
                key={ `${column.key}_label` }
                id={ `${parentId}-${column.key}-tooltip` }
                className={ styles.accessibleLabel }
              >
                { column.ariaLabel }
              </label>
            </Layer>
          ) : null
        }
      </div>
    );
  }

  public componentDidMount(): void {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }

    if (this.props.dragDropHelper && this.props.isDraggable!) {
      this._dragDropSubscription = this.props.dragDropHelper.subscribe(
        this._root.current as HTMLElement,
        this._events,
        this._getColumnDragDropOptions()
      );

      // We need to use native on this to avoid MarqueeSelection from handling the event before us.
      this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
    }
    if (this.props.isDropped) {
      if (this._root!.current!) {
        this._root!.current!.classList!.add(styles.borderAfterDropping);
      }
      setTimeout(() => {
        if (this._root!.current!) {
          this._root!.current!.classList!.remove(styles.borderAfterDropping);
        }
      }, 1500);
    }
  }

  public componentWillUnmount(): void {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }
  }

  public componentDidUpdate(): void {
    if (!this._dragDropSubscription && this.props.dragDropHelper && this.props.isDraggable!) {
      this._dragDropSubscription = this.props.dragDropHelper.subscribe(
        this._root.value as HTMLElement,
        this._events,
        this._getColumnDragDropOptions()
      );

      // We need to use native on this to avoid MarqueeSelection from handling the event before us.
      this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
    }
    if (this._dragDropSubscription && !this.props.isDraggable!) {
      this._dragDropSubscription.dispose();
      this._events.off(this._root.current, 'mousedown');
      delete this._dragDropSubscription;
    }
  }

  private _onRenderColumnHeaderTooltip = (
    tooltipHostProps: ITooltipHostProps,
    defaultRender?: IRenderFunction<ITooltipHostProps>
  ): JSX.Element => {
    return <span className={ tooltipHostProps.hostClassName }>{ tooltipHostProps.children }</span>;
  }

  private _onColumnClick(column: IColumn, ev: React.MouseEvent<HTMLElement>): void {
    const { onColumnClick } = this.props;
    if (column.onColumnClick) {
      column.onColumnClick(ev, column);
    }
    if (onColumnClick) {
      onColumnClick(ev, column);
    }
  }

  private _getColumnDragDropOptions(): IDragDropOptions {
    const { columnIndex } = this.props;
    const options = {
      selectionIndex: columnIndex,
      context: { data: columnIndex, index: columnIndex },
      canDrag: () => this.props.isDraggable!,
      canDrop: () => false,
      onDragStart: this._onDragStart,
      updateDropState: () => undefined,
      onDrop: () => undefined,
      onDragEnd: this._onDragEnd
    };
    return options;
  }

  private _onDragStart(item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void {
    if (itemIndex) {
      this._updateHeaderDragInfo(itemIndex);
      this._root.current.classList.add(styles.borderWhileDragging);
    }
  }

  private _onDragEnd(item?: any, event?: MouseEvent): void {
    if (event) {
      this._updateHeaderDragInfo(-1, event);
    }
    this._root.current.classList.remove(styles.borderWhileDragging);
  }

  private _updateHeaderDragInfo(itemIndex: number, event?: MouseEvent) {
    if (this.props.setDraggedItemIndex) {
      this.props.setDraggedItemIndex(itemIndex);
    }
    if (this.props.updateDragInfo) {
      this.props.updateDragInfo({ itemIndex }, event);
    }
  }

  private _onColumnContextMenu(column: IColumn, ev: React.MouseEvent<HTMLElement>): void {
    const { onColumnContextMenu } = this.props;
    if (column.onColumnContextMenu) {
      column.onColumnContextMenu(column, ev);
      ev.preventDefault();
    }
    if (onColumnContextMenu) {
      onColumnContextMenu(column, ev);
      ev.preventDefault();
    }
  }

  private _onRootMouseDown(ev: MouseEvent): void {
    const { isDraggable } = this.props;
    // Ignore anything except the primary button.
    if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
      ev.stopPropagation();
    }
  }
}
