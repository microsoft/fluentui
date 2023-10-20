import * as React from 'react';
import { Icon, FontIcon } from '../../Icon';
import { initializeComponentRef, EventGroup, Async, classNamesFunction, composeRenderFunction } from '../../Utilities';
import { ColumnActionsMode } from './DetailsList.types';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import type { IProcessedStyleSet } from '../../Styling';
import type { IDisposable } from '../../Utilities';
import type { IDragDropOptions } from '../../DragDrop';
import type {
  IDetailsColumnStyleProps,
  IDetailsColumnProps,
  IDetailsColumnStyles,
  IDetailsColumnRenderTooltipProps,
  IDetailsColumnFilterIconProps,
} from './DetailsColumn.types';
import { ITooltipHost } from '../Tooltip/TooltipHost.types';

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button

const getClassNames = classNamesFunction<IDetailsColumnStyleProps, IDetailsColumnStyles>();
const TRANSITION_DURATION_DRAG = 200; // ms
const TRANSITION_DURATION_DROP = 1500; // ms
const CLASSNAME_ADD_INTERVAL = 20; // ms

const defaultOnRenderHeader =
  (classNames: IProcessedStyleSet<IDetailsColumnStyles>) =>
  (props?: IDetailsColumnProps): JSX.Element | null => {
    if (!props) {
      return null;
    }

    if (props.column.isIconOnly) {
      return <span className={classNames.accessibleLabel}>{props.column.name}</span>;
    }

    return <>{props.column.name}</>;
  };

/**
 * Component for rendering columns in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export class DetailsColumnBase extends React.Component<IDetailsColumnProps> {
  private _async: Async;
  private _events: EventGroup;
  private _root = React.createRef<HTMLDivElement>();
  private _dragDropSubscription?: IDisposable;
  private _classNames: IProcessedStyleSet<IDetailsColumnStyles>;
  private _tooltipRef = React.createRef<ITooltipHost>();

  constructor(props: IDetailsColumnProps) {
    super(props);
    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);
  }

  public render(): JSX.Element {
    const {
      column,
      parentId,
      isDraggable,
      styles,
      theme,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
      useFastIcons = true,
    } = this.props;
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
      transitionDurationDrop: TRANSITION_DURATION_DROP,
    });

    const classNames = this._classNames;
    const IconComponent = useFastIcons ? FontIcon : Icon;

    const onRenderFilterIcon = column.onRenderFilterIcon
      ? composeRenderFunction(column.onRenderFilterIcon, this._onRenderFilterIcon(this._classNames))
      : this._onRenderFilterIcon(this._classNames);

    const onRenderHeader = column.onRenderHeader
      ? composeRenderFunction(column.onRenderHeader, defaultOnRenderHeader(this._classNames))
      : defaultOnRenderHeader(this._classNames);

    const hasInnerButton =
      column.columnActionsMode !== ColumnActionsMode.disabled &&
      (column.onColumnClick !== undefined || this.props.onColumnClick !== undefined);
    // use aria-describedby to point to the tooltip if the tooltip is not using the ariaLabel string
    const shouldAssociateTooltip = this.props.onRenderColumnHeaderTooltip
      ? !column.ariaLabel
      : this._hasAccessibleDescription();
    const accNameDescription = {
      'aria-label': column.ariaLabel ? column.ariaLabel : column.isIconOnly ? column.name : undefined,
      'aria-labelledby': column.ariaLabel || column.isIconOnly ? undefined : `${parentId}-${column.key}-name`,
      'aria-describedby': shouldAssociateTooltip ? `${parentId}-${column.key}-tooltip` : undefined,
    };

    return (
      <>
        <div
          key={column.key}
          ref={this._root}
          role={'columnheader'}
          {...(!hasInnerButton && accNameDescription)}
          aria-sort={column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none'}
          // when the column is not disabled and has no inner button, this node should be in the focus order
          data-is-focusable={
            !hasInnerButton && column.columnActionsMode !== ColumnActionsMode.disabled ? 'true' : undefined
          }
          className={classNames.root}
          data-is-draggable={isDraggable}
          draggable={isDraggable}
          style={{
            width:
              (column.calculatedWidth || 0) +
              cellStyleProps.cellLeftPadding +
              cellStyleProps.cellRightPadding +
              (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0),
          }}
          data-automationid={'ColumnsHeaderColumn'}
          data-item-key={column.key}
          onBlur={this._onColumnBlur}
          onFocus={this._onColumnFocus}
        >
          {isDraggable && (
            <IconComponent iconName="GripperBarVertical" className={classNames.gripperBarVerticalStyle} />
          )}
          {onRenderColumnHeaderTooltip(
            {
              hostClassName: classNames.cellTooltip,
              id: `${parentId}-${column.key}-tooltip`,
              setAriaDescribedBy: false,
              column,
              componentRef: this._tooltipRef,
              content: column.columnActionsMode !== ColumnActionsMode.disabled ? column.ariaLabel : '',
              children: (
                <span
                  id={`${parentId}-${column.key}`}
                  className={classNames.cellTitle}
                  // this node should only be focusable when it is a button
                  data-is-focusable={
                    hasInnerButton && column.columnActionsMode !== ColumnActionsMode.disabled ? 'true' : undefined
                  }
                  role={hasInnerButton ? 'button' : undefined}
                  {...(hasInnerButton && accNameDescription)}
                  onContextMenu={this._onColumnContextMenu}
                  onClick={this._onColumnClick}
                  aria-haspopup={column.columnActionsMode === ColumnActionsMode.hasDropdown ? 'menu' : undefined}
                  aria-expanded={
                    column.columnActionsMode === ColumnActionsMode.hasDropdown ? !!column.isMenuOpen : undefined
                  }
                >
                  <span id={`${parentId}-${column.key}-name`} className={classNames.cellName}>
                    {(column.iconName || column.iconClassName) && (
                      <IconComponent className={classNames.iconClassName} iconName={column.iconName} />
                    )}

                    {onRenderHeader(this.props)}
                  </span>

                  {column.isFiltered && <IconComponent className={classNames.nearIcon} iconName="Filter" />}

                  {(column.isSorted || column.showSortIconWhenUnsorted) && (
                    <IconComponent
                      className={classNames.sortIcon}
                      iconName={column.isSorted ? (column.isSortedDescending ? 'SortDown' : 'SortUp') : 'Sort'}
                    />
                  )}

                  {column.isGrouped && <IconComponent className={classNames.nearIcon} iconName="GroupedDescending" />}

                  {column.columnActionsMode === ColumnActionsMode.hasDropdown &&
                    !column.isIconOnly &&
                    onRenderFilterIcon({
                      'aria-hidden': true,
                      columnProps: this.props,
                      className: classNames.filterChevron,
                      iconName: 'ChevronDown',
                    })}
                </span>
              ),
            },
            this._onRenderColumnHeaderTooltip,
          )}
        </div>
        {!this.props.onRenderColumnHeaderTooltip ? this._renderAccessibleDescription() : null}
      </>
    );
  }

  public componentDidMount(): void {
    if (this.props.dragDropHelper && this.props.isDraggable) {
      this._addDragDropHandling();
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
    this._async.dispose();
    this._events.dispose();
  }

  public componentDidUpdate(): void {
    if (!this._dragDropSubscription && this.props.dragDropHelper && this.props.isDraggable) {
      this._addDragDropHandling();
    }

    if (this._dragDropSubscription && !this.props.isDraggable) {
      this._dragDropSubscription.dispose();
      this._events.off(this._root.current, 'mousedown');
      delete this._dragDropSubscription;
    }
  }

  private _onRenderFilterIcon =
    (classNames: IProcessedStyleSet<IDetailsColumnStyles>) =>
    (props: IDetailsColumnFilterIconProps): JSX.Element => {
      const { columnProps, ...iconProps } = props;
      const IconComponent = columnProps?.useFastIcons ? FontIcon : Icon;

      return <IconComponent {...iconProps} />;
    };

  private _onRenderColumnHeaderTooltip = (tooltipHostProps: IDetailsColumnRenderTooltipProps): JSX.Element => {
    return <span className={tooltipHostProps.hostClassName}>{tooltipHostProps.children}</span>;
  };

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { onColumnClick, column } = this.props;

    if (column.columnActionsMode === ColumnActionsMode.disabled) {
      return;
    }

    if (column.onColumnClick) {
      column.onColumnClick(ev, column);
    }

    if (onColumnClick) {
      onColumnClick(ev, column);
    }
  };

  private _onColumnBlur = () => {
    this._tooltipRef.current && this._tooltipRef.current.dismiss();
  };

  private _onColumnFocus = () => {
    this._tooltipRef.current && this._tooltipRef.current.show();
  };

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
      onDragEnd: this._onDragEnd,
    };
    return options;
  }

  private _hasAccessibleDescription(): boolean {
    const { column } = this.props;

    return !!(
      column.filterAriaLabel ||
      column.sortAscendingAriaLabel ||
      column.sortDescendingAriaLabel ||
      column.groupAriaLabel ||
      column.sortableAriaLabel
    );
  }

  private _renderAccessibleDescription(): JSX.Element | null {
    const { column, parentId } = this.props;
    const classNames = this._classNames;

    return this._hasAccessibleDescription() && !this.props.onRenderColumnHeaderTooltip ? (
      <label
        key={`${column.key}_label`}
        id={`${parentId}-${column.key}-tooltip`}
        className={classNames.accessibleLabel}
        hidden
      >
        {(column.isFiltered && column.filterAriaLabel) || null}
        {((column.isSorted || column.showSortIconWhenUnsorted) &&
          (column.isSorted
            ? column.isSortedDescending
              ? column.sortDescendingAriaLabel
              : column.sortAscendingAriaLabel
            : column.sortableAriaLabel)) ||
          null}
        {(column.isGrouped && column.groupAriaLabel) || null}
      </label>
    ) : null;
  }

  private _onDragStart = (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent): void => {
    const classNames = this._classNames;
    if (itemIndex) {
      this._updateHeaderDragInfo(itemIndex);
      this._root.current!.classList.add(classNames.borderWhileDragging);
      this._async.setTimeout(() => {
        if (this._root.current) {
          this._root.current.classList.add(classNames.noBorderWhileDragging);
        }
      }, CLASSNAME_ADD_INTERVAL);
    }
  };

  private _onDragEnd = (item?: any, event?: MouseEvent): void => {
    const classNames = this._classNames;
    if (event) {
      this._updateHeaderDragInfo(-1, event);
    }
    this._root.current!.classList.remove(classNames.borderWhileDragging);
    this._root.current!.classList.remove(classNames.noBorderWhileDragging);
  };

  private _updateHeaderDragInfo = (itemIndex: number, event?: MouseEvent) => {
    /* eslint-disable deprecation/deprecation */
    if (this.props.setDraggedItemIndex) {
      this.props.setDraggedItemIndex(itemIndex);
    }
    /* eslint-enable deprecation/deprecation */
    if (this.props.updateDragInfo) {
      this.props.updateDragInfo({ itemIndex }, event);
    }
  };

  private _onColumnContextMenu = (ev: React.MouseEvent<HTMLElement>): void => {
    const { onColumnContextMenu, column } = this.props;
    if (column.onColumnContextMenu) {
      column.onColumnContextMenu(column, ev);
      ev.preventDefault();
    }
    if (onColumnContextMenu) {
      onColumnContextMenu(column, ev);
      ev.preventDefault();
    }
  };

  private _onRootMouseDown = (ev: MouseEvent): void => {
    const { isDraggable } = this.props;
    // Ignore anything except the primary button.
    if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
      ev.stopPropagation();
    }
  };

  private _addDragDropHandling() {
    this._dragDropSubscription = this.props.dragDropHelper!.subscribe(
      this._root.current!,
      this._events,
      this._getColumnDragDropOptions(),
    );

    // We need to use native on this to prevent MarqueeSelection from handling the event before us.
    this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
  }
}
