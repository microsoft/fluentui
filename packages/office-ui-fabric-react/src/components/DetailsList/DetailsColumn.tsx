import * as React from 'react';
import * as stylesImport from './DetailsHeader.scss';
const styles: any = stylesImport;
import { Icon } from '../../Icon';
import {
  BaseComponent,
  css,
  IRenderFunction,
  createRef,
  IDisposable
} from '../../Utilities';
import { IColumn, ColumnActionsMode } from './DetailsList.types';

import { ITooltipHostProps } from '../../Tooltip';
import {
  IDragDropHelper,
  IDragDropEvents,
  IDragDropOptions,
} from './../../utilities/dragdrop/interfaces';

const INNER_PADDING = 16; // Account for padding around the cell.
const ISPADDED_WIDTH = 24;

export interface IDetailsColumnProps extends React.Props<DetailsColumn> {
  componentRef?: () => void;
  column: IColumn;
  columnIndex: number;
  parentId?: string;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  dragDropHelper?: IDragDropHelper | null;
  dragDropColumnEvents?: IDragDropEvents | null;
  isDraggable?: boolean;
}

export interface IDetailsColumnState {
  isDropping: boolean;
}

export class DetailsColumn extends BaseComponent<IDetailsColumnProps, IDetailsColumnState> {
  private _root: any;
  private _dragDropSubscription: IDisposable;

  constructor(props: IDetailsColumnProps) {
    super(props);

    this.state = {
      isDropping: false,
    };
    this._root = createRef();
  }

  public render() {
    const { column, dragDropColumnEvents, columnIndex, parentId } = this.props;
    const { onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip
    } = this.props;
    const isDraggable = Boolean(dragDropColumnEvents && dragDropColumnEvents.canDrag && this.props.isDraggable);

    return (
      [
        (
          <div
            key={ column.key }
            ref={ this._root }
            role={ 'columnheader' }
            aria-sort={ column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none' }
            aria-disabled={ column.columnActionsMode === ColumnActionsMode.disabled }
            aria-colindex={ columnIndex }
            className={ css(
              'ms-DetailsHeader-cell',
              styles.cell,
              column.headerClassName,
              (column.columnActionsMode !== ColumnActionsMode.disabled) && ('is-actionable ' + styles.cellIsActionable),
              !column.name && ('is-empty ' + styles.cellIsEmpty),
              (column.isSorted || column.isGrouped || column.isFiltered) && 'is-icon-visible',
              column.isPadded && styles.cellWrapperPadded
            ) }
            data-is-draggable={ isDraggable }
            draggable={ isDraggable }
            style={ { width: column.calculatedWidth! + INNER_PADDING + (column.isPadded ? ISPADDED_WIDTH : 0) } }
            data-automationid='ColumnsHeaderColumn'
            data-item-key={ column.key }
          >
            {
              onRenderColumnHeaderTooltip({
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
                    aria-describedby={ this.props.onRenderColumnHeaderTooltip ? `${parentId}-${column.key}-tooltip` : undefined }
                    onContextMenu={ this._onColumnContextMenu.bind(this, column) }
                    onClick={ this._onColumnClick.bind(this, column) }
                    aria-haspopup={ column.columnActionsMode === ColumnActionsMode.hasDropdown }
                  >
                    <span
                      id={ `${parentId}-${column.key}-name` }
                      className={ css('ms-DetailsHeader-cellName',
                        styles.cellName, {
                          [styles.iconOnlyHeader]: column.isIconOnly
                        }) }
                    >
                      { (column.iconName || column.iconClassName) && (
                        <Icon className={ css(styles.nearIcon, column.iconClassName) } iconName={ column.iconName } />
                      ) }

                      { !column.isIconOnly ? column.name : undefined }
                    </span>

                    { column.isFiltered && (
                      <Icon className={ styles.nearIcon } iconName='Filter' />
                    ) }

                    { column.isSorted && (
                      <Icon className={ css(styles.nearIcon, styles.sortIcon) } iconName={ column.isSortedDescending ? 'SortDown' : 'SortUp' } />
                    ) }

                    { column.isGrouped && (
                      <Icon className={ styles.nearIcon } iconName='GroupedDescending' />
                    ) }

                    { column.columnActionsMode === ColumnActionsMode.hasDropdown && !column.isIconOnly && (
                      <Icon
                        className={ css('ms-DetailsHeader-filterChevron', styles.filterChevron) }
                        iconName='ChevronDown'
                      />
                    ) }
                  </span>
                )
              }, this._onRenderColumnHeaderTooltip)
            }
          </div>
        ),
        (
          column.ariaLabel && !this.props.onRenderColumnHeaderTooltip ? (
            <label
              key={ `${column.key}_label` }
              id={ `${parentId}-${column.key}-tooltip` }
              className={ styles.accessibleLabel }
            >
              { column.ariaLabel }
            </label>
          ) : null
        )
      ]
    );
  }

  public componentDidMount() {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }

    if (this.props.dragDropHelper && this.props.isDraggable!) {
      this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.value as HTMLElement, this._events, this._getColumnDragDropOptions());
    }
  }

  public componentWillUnmount() {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }
  }

  private _onRenderColumnHeaderTooltip = (tooltipHostProps: ITooltipHostProps, defaultRender?: IRenderFunction<ITooltipHostProps>): JSX.Element => {
    return (
      <span className={ tooltipHostProps.hostClassName }>
        { tooltipHostProps.children }
      </span >
    );
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
    const {
      columnIndex,
      dragDropColumnEvents
    } = this.props;
    const options = {
      selectionIndex: columnIndex,
      context: { data: columnIndex, index: columnIndex },
      canDrag: () => true,
      canDrop: () => false,
      onDragStart: dragDropColumnEvents!.onDragStart,
      updateDropState: () => undefined,
      onDrop: () => undefined,
      onDragEnd: dragDropColumnEvents!.onDragEnd,

    };
    return options;
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
}