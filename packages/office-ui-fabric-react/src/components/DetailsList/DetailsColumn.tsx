import * as React from 'react';
import { Icon } from '../../Icon';
import { BaseComponent, css, IRenderFunction, createRef, IDisposable, IClassNames } from '../../Utilities';
import { IColumn, ColumnActionsMode } from './DetailsList.types';

import { ITooltipHostProps } from '../../Tooltip';
import { IDragDropHelper, IDragDropOptions } from './../../utilities/dragdrop/interfaces';
import { IDetailsHeaderStyles } from './DetailsHeader.types';

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
  setDraggedItemIndex?: (itemIndex: number) => void;
  isDropped?: boolean;
  headerClassNames: IClassNames<IDetailsHeaderStyles>;
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
  }

  public render(): JSX.Element {
    const { column, columnIndex, parentId, isDraggable, headerClassNames } = this.props;
    const { onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip } = this.props;

    return (
      <>
        <div
          key={column.key}
          ref={this._root}
          role={'columnheader'}
          aria-sort={column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none'}
          aria-colindex={columnIndex}
          className={css(
            headerClassNames.cell,
            column.headerClassName,
            column.columnActionsMode !== ColumnActionsMode.disabled &&
              'is-actionable ' + headerClassNames.cellIsActionable,
            !column.name && 'is-empty ' + headerClassNames.cellIsEmpty,
            (column.isSorted || column.isGrouped || column.isFiltered) && 'is-icon-visible',
            column.isPadded && headerClassNames.cellWrapperPadded
          )}
          data-is-draggable={isDraggable}
          draggable={isDraggable}
          style={{ width: column.calculatedWidth! + INNER_PADDING + (column.isPadded ? ISPADDED_WIDTH : 0) }}
          data-automationid={'ColumnsHeaderColumn'}
          data-item-key={column.key}
        >
          {isDraggable && <Icon iconName={'GripperBarVertical'} className={headerClassNames.gripperBarVerticalStyle} />}
          {onRenderColumnHeaderTooltip(
            {
              hostClassName: headerClassNames.cellTooltip,
              id: `${parentId}-${column.key}-tooltip`,
              setAriaDescribedBy: false,
              content: column.columnActionsMode !== ColumnActionsMode.disabled ? column.ariaLabel : '',
              children: (
                <span
                  id={`${parentId}-${column.key}`}
                  aria-label={column.isIconOnly ? column.name : undefined}
                  aria-labelledby={column.isIconOnly ? undefined : `${parentId}-${column.key}-name `}
                  className={headerClassNames.cellTitle}
                  data-is-focusable={column.columnActionsMode !== ColumnActionsMode.disabled}
                  role={column.columnActionsMode !== ColumnActionsMode.disabled ? 'button' : undefined}
                  aria-describedby={
                    this.props.onRenderColumnHeaderTooltip || this._hasAccessibleLabel()
                      ? `${parentId}-${column.key}-tooltip`
                      : undefined
                  }
                  onContextMenu={this._onColumnContextMenu.bind(this, column)}
                  onClick={this._onColumnClick.bind(this, column)}
                  aria-haspopup={column.columnActionsMode === ColumnActionsMode.hasDropdown}
                >
                  <span
                    id={`${parentId}-${column.key}-name`}
                    className={css(headerClassNames.cellName, {
                      [headerClassNames.iconOnlyHeader]: column.isIconOnly
                    })}
                  >
                    {(column.iconName || column.iconClassName) && (
                      <Icon
                        className={css(headerClassNames.nearIcon, column.iconClassName)}
                        iconName={column.iconName}
                      />
                    )}

                    {column.isIconOnly ? (
                      <span className={headerClassNames.accessibleLabel}>{column.name}</span>
                    ) : (
                      column.name
                    )}
                  </span>

                  {column.isFiltered && <Icon className={headerClassNames.nearIcon} iconName={'Filter'} />}

                  {column.isSorted && (
                    <Icon
                      className={css(headerClassNames.nearIcon, headerClassNames.sortIcon)}
                      iconName={column.isSortedDescending ? 'SortDown' : 'SortUp'}
                    />
                  )}

                  {column.isGrouped && <Icon className={headerClassNames.nearIcon} iconName={'GroupedDescending'} />}

                  {column.columnActionsMode === ColumnActionsMode.hasDropdown &&
                    !column.isIconOnly && (
                      <Icon aria-hidden={true} className={headerClassNames.filterChevron} iconName={'ChevronDown'} />
                    )}
                </span>
              )
            },
            this._onRenderColumnHeaderTooltip
          )}
        </div>
        {!this.props.onRenderColumnHeaderTooltip ? this._renderAccessibleLabel() : null}
      </>
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

    const { headerClassNames } = this.props;

    if (this.props.isDropped) {
      if (this._root!.current!) {
        this._root!.current!.classList!.add(headerClassNames.borderAfterDropping);
      }
      setTimeout(() => {
        if (this._root!.current!) {
          this._root!.current!.classList!.remove(headerClassNames.borderAfterDropping);
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
    return <span className={tooltipHostProps.hostClassName}>{tooltipHostProps.children}</span>;
  };

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

  private _hasAccessibleLabel(): boolean {
    const { column } = this.props;

    return !!(
      column.ariaLabel ||
      column.filterAriaLabel ||
      column.sortAscendingAriaLabel ||
      column.sortDescendingAriaLabel ||
      column.groupAriaLabel
    );
  }

  private _renderAccessibleLabel(): JSX.Element | null {
    const { column, parentId, headerClassNames } = this.props;

    return this._hasAccessibleLabel() && !this.props.onRenderColumnHeaderTooltip ? (
      <label
        key={`${column.key}_label`}
        id={`${parentId}-${column.key}-tooltip`}
        className={headerClassNames.accessibleLabel}
      >
        {column.ariaLabel}
        {(column.isFiltered && column.filterAriaLabel) || null}
        {(column.isSorted &&
          (column.isSortedDescending ? column.sortDescendingAriaLabel : column.sortAscendingAriaLabel)) ||
          null}
        {(column.isGrouped && column.groupAriaLabel) || null}
      </label>
    ) : null;
  }

  private _onDragStart(item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void {
    const { headerClassNames } = this.props;

    if (itemIndex && this.props.setDraggedItemIndex) {
      this.props.setDraggedItemIndex(itemIndex);
      this._root.current.classList.add(headerClassNames.borderWhileDragging);
    }
  }

  private _onDragEnd(item?: any, event?: MouseEvent): void {
    const { headerClassNames } = this.props;

    if (this.props.setDraggedItemIndex) {
      this.props.setDraggedItemIndex(-1);
      this._root.current.classList.remove(headerClassNames.borderWhileDragging);
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

  private _onRootMouseDown = (ev: MouseEvent): void => {
    const { isDraggable } = this.props;
    // Ignore anything except the primary button.
    if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
      ev.stopPropagation();
    }
  };
}
