import * as React from 'react';
import { Icon } from '../../Icon';
import { BaseComponent, IRenderFunction, IDisposable, classNamesFunction, IClassNames } from '../../Utilities';
import { IColumn, ColumnActionsMode } from './DetailsList.types';

import { ITooltipHostProps } from '../../Tooltip';
import { IDragDropOptions } from './../../utilities/dragdrop/interfaces';
import { IDetailsColumnStyles } from './DetailsColumn.types';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import { IDetailsColumnStyleProps, IDetailsColumnProps } from './DetailsColumn.types';

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button

const getClassNames = classNamesFunction<IDetailsColumnStyleProps, IDetailsColumnStyles>();
const TRANSITION_DURATION_DRAG = 200; // ms
const TRANSITION_DURATION_DROP = 1500; // ms
const CLASSNAME_ADD_INTERVAL = 20; // ms

export class DetailsColumnBase extends BaseComponent<IDetailsColumnProps> {
  private _root: any;
  private _dragDropSubscription: IDisposable;
  private _classNames: IClassNames<IDetailsColumnStyles>;

  constructor(props: IDetailsColumnProps) {
    super(props);

    this._root = React.createRef();
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
    this._onRootMouseDown = this._onRootMouseDown.bind(this);
    this._updateHeaderDragInfo = this._updateHeaderDragInfo.bind(this);
  }

  public render(): JSX.Element {
    const { column, columnIndex, parentId, isDraggable, styles, theme, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = this.props;
    const { onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip } = this.props;

    this._classNames = getClassNames(styles, {
      theme: theme!,
      headerClassName: column.headerClassName,
      iconClassName: column.iconClassName,
      isActionable: column.columnActionsMode !== ColumnActionsMode.disabled,
      isEmpty: !column.name,
      isIconVisible: column.isSorted || column.isGrouped || column.isFiltered,
      isPadded: column.isPadded,
      isIconOnly: column.isIconOnly,
      cellStyleProps,
      transitionDurationDrag: TRANSITION_DURATION_DRAG,
      transitionDurationDrop: TRANSITION_DURATION_DROP
    });

    const classNames = this._classNames;

    return (
      <>
        <div
          key={column.key}
          ref={this._root}
          role={'columnheader'}
          aria-sort={column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none'}
          aria-colindex={columnIndex}
          className={classNames.root}
          data-is-draggable={isDraggable}
          draggable={isDraggable}
          style={{
            width:
              column.calculatedWidth! +
              cellStyleProps.cellLeftPadding +
              cellStyleProps.cellRightPadding +
              (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
          }}
          data-automationid={'ColumnsHeaderColumn'}
          data-item-key={column.key}
        >
          {isDraggable && <Icon iconName="GripperBarVertical" className={classNames.gripperBarVerticalStyle} />}
          {onRenderColumnHeaderTooltip(
            {
              hostClassName: classNames.cellTooltip,
              id: `${parentId}-${column.key}-tooltip`,
              setAriaDescribedBy: false,
              content: column.columnActionsMode !== ColumnActionsMode.disabled ? column.ariaLabel : '',
              children: (
                <span
                  id={`${parentId}-${column.key}`}
                  aria-label={column.isIconOnly ? column.name : undefined}
                  aria-labelledby={column.isIconOnly ? undefined : `${parentId}-${column.key}-name `}
                  className={classNames.cellTitle}
                  data-is-focusable={column.columnActionsMode !== ColumnActionsMode.disabled}
                  role={
                    column.columnActionsMode !== ColumnActionsMode.disabled &&
                    (column.onColumnClick !== undefined || this.props.onColumnClick !== undefined)
                      ? 'button'
                      : undefined
                  }
                  aria-describedby={
                    !this.props.onRenderColumnHeaderTooltip && this._hasAccessibleLabel() ? `${parentId}-${column.key}-tooltip` : undefined
                  }
                  onContextMenu={this._onColumnContextMenu.bind(this, column)}
                  onClick={this._onColumnClick.bind(this, column)}
                  aria-haspopup={column.columnActionsMode === ColumnActionsMode.hasDropdown}
                  aria-expanded={
                    column.columnActionsMode === ColumnActionsMode.hasDropdown ? (column.isMenuOpen ? true : false) : undefined
                  }
                >
                  <span id={`${parentId}-${column.key}-name`} className={classNames.cellName}>
                    {(column.iconName || column.iconClassName) && <Icon className={classNames.iconClassName} iconName={column.iconName} />}

                    {column.isIconOnly ? <span className={classNames.accessibleLabel}>{column.name}</span> : column.name}
                  </span>

                  {column.isFiltered && <Icon className={classNames.nearIcon} iconName={'Filter'} />}

                  {column.isSorted && <Icon className={classNames.sortIcon} iconName={column.isSortedDescending ? 'SortDown' : 'SortUp'} />}

                  {column.isGrouped && <Icon className={classNames.nearIcon} iconName={'GroupedDescending'} />}

                  {column.columnActionsMode === ColumnActionsMode.hasDropdown && !column.isIconOnly && (
                    <Icon aria-hidden={true} className={classNames.filterChevron} iconName={'ChevronDown'} />
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

    if (this.props.dragDropHelper && this.props.isDraggable) {
      this._dragDropSubscription = this.props.dragDropHelper.subscribe(
        this._root.current as HTMLElement,
        this._events,
        this._getColumnDragDropOptions()
      );

      // We need to use native on this to avoid MarqueeSelection from handling the event before us.
      this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
    }

    const classNames = this._classNames;

    if (this.props.isDropped) {
      if (this._root.current) {
        this._root.current.classList.add(classNames.borderAfterDropping);

        this._async.setTimeout(() => {
          if (this._root.current) {
            this._root.current.classList.add(classNames.noBorderAfterDropping);
          }
        }, CLASSNAME_ADD_INTERVAL);
      }

      this._async.setTimeout(() => {
        if (this._root.current) {
          this._root.current.classList.remove(classNames.borderAfterDropping);
          this._root.current.classList.remove(classNames.noBorderAfterDropping);
        }
      }, TRANSITION_DURATION_DROP + CLASSNAME_ADD_INTERVAL);
    }
  }

  public componentWillUnmount(): void {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }
  }

  public componentDidUpdate(): void {
    if (!this._dragDropSubscription && this.props.dragDropHelper && this.props.isDraggable) {
      this._dragDropSubscription = this.props.dragDropHelper.subscribe(
        this._root.current as HTMLElement,
        this._events,
        this._getColumnDragDropOptions()
      );

      // We need to use native on this to avoid MarqueeSelection from handling the event before us.
      this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
    }
    if (this._dragDropSubscription && !this.props.isDraggable) {
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
    if (column.columnActionsMode === ColumnActionsMode.disabled) {
      return;
    }

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
    const { column, parentId } = this.props;
    const classNames = this._classNames;

    return this._hasAccessibleLabel() && !this.props.onRenderColumnHeaderTooltip ? (
      <label key={`${column.key}_label`} id={`${parentId}-${column.key}-tooltip`} className={classNames.accessibleLabel}>
        {column.ariaLabel}
        {(column.isFiltered && column.filterAriaLabel) || null}
        {(column.isSorted && (column.isSortedDescending ? column.sortDescendingAriaLabel : column.sortAscendingAriaLabel)) || null}
        {(column.isGrouped && column.groupAriaLabel) || null}
      </label>
    ) : null;
  }

  private _onDragStart(item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void {
    const classNames = this._classNames;
    if (itemIndex) {
      this._updateHeaderDragInfo(itemIndex);
      this._root.current.classList.add(classNames.borderWhileDragging);
      this._async.setTimeout(() => {
        if (this._root.current) {
          this._root.current.classList.add(classNames.noBorderWhileDragging);
        }
      }, CLASSNAME_ADD_INTERVAL);
    }
  }

  private _onDragEnd(item?: any, event?: MouseEvent): void {
    const classNames = this._classNames;
    if (event) {
      this._updateHeaderDragInfo(-1, event);
    }
    this._root.current.classList.remove(classNames.borderWhileDragging);
    this._root.current.classList.remove(classNames.noBorderWhileDragging);
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

  private _onRootMouseDown = (ev: MouseEvent): void => {
    const { isDraggable } = this.props;
    // Ignore anything except the primary button.
    if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
      ev.stopPropagation();
    }
  };
}
