import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { initializeComponentRef, EventGroup, IDisposable, css, getRTL, getId, KeyCodes, IClassNames } from '../../Utilities';
import { IColumn, IDetailsHeaderBaseProps, IColumnDragDropDetails, ColumnDragEndLocation, CheckboxVisibility } from './DetailsList.types';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon, FontIcon } from '../../Icon';
import { Layer } from '../../Layer';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { CollapseAllVisibility } from '../../GroupedList';
import { DetailsRowCheck } from './DetailsRowCheck';
import { ITooltipHostProps } from '../../Tooltip';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { IDragDropOptions, DragDropHelper } from '../../utilities/dragdrop/index';
import { DetailsColumn, IDetailsColumnProps } from '../../components/DetailsList/DetailsColumn';
import { SelectAllVisibility, IDropHintDetails, IColumnReorderHeaderProps, IDetailsHeaderState } from './DetailsHeader.types';
import { IDetailsHeaderStyleProps, IDetailsHeaderStyles, IDetailsHeader } from './DetailsHeader.types';
import { classNamesFunction } from '../../Utilities';

const getClassNames = classNamesFunction<IDetailsHeaderStyleProps, IDetailsHeaderStyles>();

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

const NO_COLUMNS: IColumn[] = [];

export class DetailsHeaderBase extends React.Component<IDetailsHeaderBaseProps, IDetailsHeaderState> implements IDetailsHeader {
  public static defaultProps = {
    selectAllVisibility: SelectAllVisibility.visible,
    collapseAllVisibility: CollapseAllVisibility.visible,
    useFastIcons: true
  };

  private _classNames: IClassNames<IDetailsHeaderStyles>;
  private _rootElement: HTMLElement | undefined;
  private _events: EventGroup;
  private _rootComponent = React.createRef<IFocusZone>();
  private _id: string;
  private _draggedColumnIndex = -1;
  private _dropHintDetails: { [key: number]: IDropHintDetails } = {};
  private _dragDropHelper: DragDropHelper;
  private _currentDropHintIndex: number;
  private _subscriptionObject: IDisposable;
  private _onDropIndexInfo: {
    sourceIndex: number;
    targetIndex: number;
  };

  constructor(props: IDetailsHeaderBaseProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    this.state = {
      columnResizeDetails: undefined,
      isAllCollapsed: this.props.isAllCollapsed,
      isAllSelected: !!this.props.selection && this.props.selection.isAllSelected()
    };

    this._onDropIndexInfo = {
      sourceIndex: -1,
      targetIndex: -1
    };
    this._id = getId('header');
    this._currentDropHintIndex = -1;

    // The drag drop handler won't do any work until subscribe() is called,
    // so always set it up for convenience
    this._dragDropHelper = new DragDropHelper({
      selection: {
        getSelection: () => {
          return;
        }
      } as ISelection,
      minimumPixelsForDrag: this.props.minimumPixelsForDrag
    });
  }

  public componentDidMount(): void {
    const { selection } = this.props;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);

    // We need to use native on this to prevent MarqueeSelection from handling the event before us.
    this._events.on(this._rootElement!, 'mousedown', this._onRootMouseDown);

    this._events.on(this._rootElement!, 'keydown', this._onRootKeyDown);

    if (this._getColumnReorderProps()) {
      this._subscriptionObject = this._dragDropHelper.subscribe(this._rootElement!, this._events, this._getHeaderDragDropOptions());
    }
  }

  public componentDidUpdate(prevProps: IDetailsHeaderBaseProps): void {
    if (this._getColumnReorderProps()) {
      if (!this._subscriptionObject) {
        this._subscriptionObject = this._dragDropHelper.subscribe(this._rootElement!, this._events, this._getHeaderDragDropOptions());
      }
    } else if (this._subscriptionObject) {
      this._subscriptionObject.dispose();
      delete this._subscriptionObject;
    }

    if (this.props !== prevProps && this._onDropIndexInfo.sourceIndex >= 0 && this._onDropIndexInfo.targetIndex >= 0) {
      const { columns: previousColumns = NO_COLUMNS } = prevProps;
      const { columns = NO_COLUMNS } = this.props;
      if (previousColumns[this._onDropIndexInfo.sourceIndex].key === columns[this._onDropIndexInfo.targetIndex].key) {
        this._onDropIndexInfo = {
          sourceIndex: -1,
          targetIndex: -1
        };
      }
    }

    if (this.props.isAllCollapsed !== prevProps.isAllCollapsed) {
      this.setState({ isAllCollapsed: this.props.isAllCollapsed });
    }
  }

  public componentWillUnmount(): void {
    if (this._subscriptionObject) {
      this._subscriptionObject.dispose();
      delete this._subscriptionObject;
    }

    this._dragDropHelper.dispose();

    this._events.dispose();
  }

  public render(): JSX.Element {
    const {
      columns = NO_COLUMNS,
      ariaLabel,
      ariaLabelForToggleAllGroupsButton,
      ariaLabelForSelectAllCheckbox,
      selectAllVisibility,
      ariaLabelForSelectionColumn,
      indentWidth,
      rowWidth = 0,
      onColumnClick,
      onColumnContextMenu,
      onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip,
      styles,
      selectionMode,
      theme,
      onRenderDetailsCheckbox,
      groupNestingDepth,
      useFastIcons,
      checkboxVisibility,
      className
    } = this.props;
    const { isAllSelected, columnResizeDetails, isSizing, isAllCollapsed } = this.state;
    const showCheckbox = selectAllVisibility !== SelectAllVisibility.none;
    const isCheckboxHidden = selectAllVisibility === SelectAllVisibility.hidden;
    const isCheckboxAlwaysVisible = checkboxVisibility === CheckboxVisibility.always;

    const columnReorderProps = this._getColumnReorderProps();
    const frozenColumnCountFromStart =
      columnReorderProps && columnReorderProps.frozenColumnCountFromStart ? columnReorderProps.frozenColumnCountFromStart : 0;
    const frozenColumnCountFromEnd =
      columnReorderProps && columnReorderProps.frozenColumnCountFromEnd ? columnReorderProps.frozenColumnCountFromEnd : 0;

    this._classNames = getClassNames(styles, {
      theme: theme!,
      isAllSelected,
      isSelectAllHidden: selectAllVisibility === SelectAllVisibility.hidden,
      isResizingColumn: !!columnResizeDetails && isSizing,
      isSizing,
      isAllCollapsed,
      isCheckboxHidden,
      className
    });

    const classNames = this._classNames;
    const IconComponent = useFastIcons ? FontIcon : Icon;

    const isRTL = getRTL();
    return (
      <FocusZone
        role="row"
        aria-label={ariaLabel}
        className={classNames.root}
        componentRef={this._rootComponent}
        ref={this._onRootRef}
        onMouseMove={this._onRootMouseMove}
        data-automationid="DetailsHeader"
        style={{ minWidth: rowWidth }}
        direction={FocusZoneDirection.horizontal}
      >
        {showCheckbox
          ? [
              <div
                key="__checkbox"
                className={classNames.cellIsCheck}
                aria-labelledby={`${this._id}-check`}
                onClick={!isCheckboxHidden ? this._onSelectAllClicked : undefined}
                aria-colindex={1}
                role={'columnheader'}
              >
                {onRenderColumnHeaderTooltip(
                  {
                    hostClassName: classNames.checkTooltip,
                    id: `${this._id}-checkTooltip`,
                    setAriaDescribedBy: false,
                    content: ariaLabelForSelectAllCheckbox,
                    children: (
                      <DetailsRowCheck
                        id={`${this._id}-check`}
                        aria-label={selectionMode === SelectionMode.multiple ? ariaLabelForSelectAllCheckbox : ariaLabelForSelectionColumn}
                        aria-describedby={
                          !isCheckboxHidden
                            ? ariaLabelForSelectAllCheckbox && !this.props.onRenderColumnHeaderTooltip
                              ? `${this._id}-checkTooltip`
                              : undefined
                            : ariaLabelForSelectionColumn && !this.props.onRenderColumnHeaderTooltip
                            ? `${this._id}-checkTooltip`
                            : undefined
                        }
                        data-is-focusable={!isCheckboxHidden || undefined}
                        isHeader={true}
                        selected={isAllSelected}
                        anySelected={false}
                        canSelect={!isCheckboxHidden}
                        className={classNames.check}
                        onRenderDetailsCheckbox={onRenderDetailsCheckbox}
                        useFastIcons={useFastIcons}
                        isVisible={isCheckboxAlwaysVisible}
                      />
                    )
                  },
                  this._onRenderColumnHeaderTooltip
                )}
              </div>,
              !this.props.onRenderColumnHeaderTooltip ? (
                ariaLabelForSelectAllCheckbox && !isCheckboxHidden ? (
                  <label key="__checkboxLabel" id={`${this._id}-checkTooltip`} className={classNames.accessibleLabel} aria-hidden={true}>
                    {ariaLabelForSelectAllCheckbox}
                  </label>
                ) : ariaLabelForSelectionColumn && isCheckboxHidden ? (
                  <label key="__checkboxLabel" id={`${this._id}-checkTooltip`} className={classNames.accessibleLabel} aria-hidden={true}>
                    {ariaLabelForSelectionColumn}
                  </label>
                ) : null
              ) : null
            ]
          : null}
        {groupNestingDepth! > 0 && this.props.collapseAllVisibility === CollapseAllVisibility.visible ? (
          <div
            className={classNames.cellIsGroupExpander}
            onClick={this._onToggleCollapseAll}
            data-is-focusable={true}
            aria-label={ariaLabelForToggleAllGroupsButton}
            aria-expanded={!isAllCollapsed}
            role={ariaLabelForToggleAllGroupsButton ? 'button' : undefined}
          >
            <IconComponent className={classNames.collapseButton} iconName={isRTL ? 'ChevronLeftMed' : 'ChevronRightMed'} />
          </div>
        ) : null}
        <GroupSpacer indentWidth={indentWidth} count={groupNestingDepth! - 1} />
        {columns.map((column: IColumn, columnIndex: number) => {
          const _isDraggable = columnReorderProps
            ? columnIndex >= frozenColumnCountFromStart && columnIndex < columns.length - frozenColumnCountFromEnd
            : false;
          return [
            columnReorderProps &&
              (_isDraggable || columnIndex === columns.length - frozenColumnCountFromEnd) &&
              this._renderDropHint(columnIndex),
            <DetailsColumn
              column={column}
              key={column.key}
              columnIndex={(showCheckbox ? 2 : 1) + columnIndex}
              parentId={this._id}
              isDraggable={_isDraggable}
              updateDragInfo={this._updateDragInfo}
              dragDropHelper={this._dragDropHelper}
              onColumnClick={onColumnClick}
              onColumnContextMenu={onColumnContextMenu}
              // Do not render tooltips by default, but allow for override via props.
              onRenderColumnHeaderTooltip={this.props.onRenderColumnHeaderTooltip}
              isDropped={this._onDropIndexInfo.targetIndex === columnIndex}
              cellStyleProps={this.props.cellStyleProps}
              useFastIcons={useFastIcons}
            />,
            this._renderColumnDivider(columnIndex)
          ];
        })}
        {columnReorderProps && frozenColumnCountFromEnd === 0 && this._renderDropHint(columns.length)}
        {isSizing && (
          <Layer>
            <div className={classNames.sizingOverlay} onMouseMove={this._onSizerMouseMove} onMouseUp={this._onSizerMouseUp} />
          </Layer>
        )}
      </FocusZone>
    );
  }

  /** Set focus to the active thing in the focus area. */
  public focus(): boolean {
    return Boolean(this._rootComponent.current && this._rootComponent.current.focus());
  }

  /**
   * Gets column reorder props from this.props. If the calling code is part of setting up or
   * handling drag/drop events, it's safe to assume that this method's return value is defined
   * (because drag/drop handling will only be set up if reorder props are given).
   */
  private _getColumnReorderProps(): IColumnReorderHeaderProps | undefined {
    const { columnReorderOptions, columnReorderProps } = this.props;
    return columnReorderProps || (columnReorderOptions && { ...columnReorderOptions, onColumnDragEnd: undefined });
  }

  private _getHeaderDragDropOptions(): IDragDropOptions {
    const options = {
      selectionIndex: 1,
      context: { data: this, index: 0 },
      canDrag: () => false,
      canDrop: () => true,
      onDragStart: () => undefined,
      updateDropState: this._updateDroppingState,
      onDrop: this._onDrop,
      onDragEnd: () => undefined,
      onDragOver: this._onDragOver
    };
    return options;
  }

  private _updateDroppingState = (newValue: boolean, event: DragEvent): void => {
    if (this._draggedColumnIndex >= 0 && event.type !== 'drop' && !newValue) {
      this._resetDropHints();
    }
  };

  private _isValidCurrentDropHintIndex() {
    return this._currentDropHintIndex >= 0;
  }

  private _onDragOver = (item: any, event: DragEvent): void => {
    if (this._draggedColumnIndex >= 0) {
      event.stopPropagation();
      this._computeDropHintToBeShown(event.clientX);
    }
  };

  private _onDrop = (item?: any, event?: DragEvent): void => {
    // Safe to assume this is defined since we're handling a drop event
    const columnReorderProps = this._getColumnReorderProps()!;

    // Target index will not get changed if draggeditem is after target item.
    if (this._draggedColumnIndex >= 0 && event) {
      const targetIndex =
        this._draggedColumnIndex > this._currentDropHintIndex ? this._currentDropHintIndex : this._currentDropHintIndex - 1;
      const isValidDrop = this._isValidCurrentDropHintIndex();
      event.stopPropagation();
      if (isValidDrop) {
        this._onDropIndexInfo.sourceIndex = this._draggedColumnIndex;
        this._onDropIndexInfo.targetIndex = targetIndex;

        if (columnReorderProps.onColumnDrop) {
          const dragDropDetails: IColumnDragDropDetails = {
            draggedIndex: this._draggedColumnIndex,
            targetIndex: targetIndex
          };
          columnReorderProps.onColumnDrop(dragDropDetails);
        } else if (columnReorderProps.handleColumnReorder) {
          columnReorderProps.handleColumnReorder(this._draggedColumnIndex, targetIndex);
        }
      }
    }

    this._resetDropHints();
    this._dropHintDetails = {};
    this._draggedColumnIndex = -1;
  };

  /**
   * @returns whether or not the "Select All" checkbox column is hidden.
   */
  private _isCheckboxColumnHidden(): boolean {
    const { selectionMode, checkboxVisibility } = this.props;

    return selectionMode === SelectionMode.none || checkboxVisibility === CheckboxVisibility.hidden;
  }

  private _updateDragInfo = (props: { itemIndex: number }, event?: MouseEvent) => {
    // Safe to assume this is defined since we're handling a drag event
    const columnReorderProps = this._getColumnReorderProps()!;
    const itemIndex = props.itemIndex;
    if (itemIndex >= 0) {
      // Column index is set based on the checkbox
      this._draggedColumnIndex = this._isCheckboxColumnHidden() ? itemIndex - 1 : itemIndex - 2;
      this._getDropHintPositions();
      if (columnReorderProps.onColumnDragStart) {
        columnReorderProps.onColumnDragStart(true);
      }
    } else if (event && this._draggedColumnIndex >= 0) {
      this._resetDropHints();
      this._draggedColumnIndex = -1;
      this._dropHintDetails = {};
      if (columnReorderProps.onColumnDragEnd) {
        const columnDragEndLocation = this._isEventOnHeader(event);
        columnReorderProps.onColumnDragEnd({ dropLocation: columnDragEndLocation }, event);
      }
    }
  };

  private _resetDropHints(): void {
    if (this._currentDropHintIndex >= 0) {
      this._updateDropHintElement(this._dropHintDetails[this._currentDropHintIndex].dropHintElementRef, 'none');
      this._currentDropHintIndex = -1;
    }
  }

  private _updateDropHintElement(element: HTMLElement, displayProperty: string) {
    (element.childNodes[1] as HTMLElement).style.display = displayProperty;
    (element.childNodes[0] as HTMLElement).style.display = displayProperty;
  }

  private _getDropHintPositions = (): void => {
    const { columns = NO_COLUMNS } = this.props;
    // Safe to assume this is defined since we're handling a drag/drop event
    const columnReorderProps = this._getColumnReorderProps()!;
    let prevX = 0;
    let prevMid = 0;
    let prevRef: HTMLElement;
    const frozenColumnCountFromStart = columnReorderProps.frozenColumnCountFromStart || 0;
    const frozenColumnCountFromEnd = columnReorderProps.frozenColumnCountFromEnd || 0;

    for (let i = frozenColumnCountFromStart; i < columns.length - frozenColumnCountFromEnd + 1; i++) {
      if (this._rootElement) {
        const dropHintElement = this._rootElement.querySelectorAll('#columnDropHint_' + i)[0] as HTMLElement;
        if (dropHintElement) {
          if (i === frozenColumnCountFromStart) {
            prevX = dropHintElement.offsetLeft;
            prevMid = dropHintElement.offsetLeft;
            prevRef = dropHintElement;
          } else {
            const newMid = (dropHintElement.offsetLeft + prevX!) / 2;
            this._dropHintDetails[i - 1] = {
              originX: prevX,
              startX: prevMid!,
              endX: newMid,
              dropHintElementRef: prevRef!
            };
            prevMid = newMid;
            prevRef = dropHintElement;
            prevX = dropHintElement.offsetLeft;
            if (i === columns.length - frozenColumnCountFromEnd) {
              this._dropHintDetails[i] = {
                originX: prevX,
                startX: prevMid!,
                endX: dropHintElement.offsetLeft,
                dropHintElementRef: prevRef
              };
            }
          }
        }
      }
    }
  };

  /**
   * Based on the given cursor position, finds the nearest drop hint and updates the state to make it visible
   */
  private _computeDropHintToBeShown = (clientX: number): void => {
    if (this._rootElement) {
      const clientRect = this._rootElement.getBoundingClientRect();
      const headerOriginX = clientRect.left;
      const eventXRelativePosition = clientX - headerOriginX;
      const currentDropHintIndex = this._currentDropHintIndex;
      if (this._isValidCurrentDropHintIndex()) {
        if (
          _liesBetween(
            eventXRelativePosition,
            this._dropHintDetails[currentDropHintIndex!].startX,
            this._dropHintDetails[currentDropHintIndex!].endX
          )
        ) {
          return;
        }
      }
      const { columns = NO_COLUMNS } = this.props;
      // Safe to assume this is defined since we're handling a drag/drop event
      const columnReorderProps = this._getColumnReorderProps()!;
      const frozenColumnCountFromStart = columnReorderProps.frozenColumnCountFromStart || 0;
      const frozenColumnCountFromEnd = columnReorderProps.frozenColumnCountFromEnd || 0;

      const currentIndex: number = frozenColumnCountFromStart;
      const lastValidColumn = columns.length - frozenColumnCountFromEnd;
      let indexToUpdate = -1;
      if (_isBefore(eventXRelativePosition, this._dropHintDetails[currentIndex].endX)) {
        indexToUpdate = currentIndex;
      } else if (_isAfter(eventXRelativePosition, this._dropHintDetails[lastValidColumn].startX)) {
        indexToUpdate = lastValidColumn;
      } else if (this._isValidCurrentDropHintIndex()) {
        if (
          this._dropHintDetails[currentDropHintIndex! + 1] &&
          _liesBetween(
            eventXRelativePosition,
            this._dropHintDetails[currentDropHintIndex! + 1].startX,
            this._dropHintDetails[currentDropHintIndex! + 1].endX
          )
        ) {
          indexToUpdate = currentDropHintIndex! + 1;
        } else if (
          this._dropHintDetails[currentDropHintIndex! - 1] &&
          _liesBetween(
            eventXRelativePosition,
            this._dropHintDetails[currentDropHintIndex! - 1].startX,
            this._dropHintDetails[currentDropHintIndex! - 1].endX
          )
        ) {
          indexToUpdate = currentDropHintIndex! - 1;
        }
      }
      if (indexToUpdate === -1) {
        let startIndex = frozenColumnCountFromStart;
        let endIndex = lastValidColumn;
        while (startIndex < endIndex) {
          const middleIndex = Math.ceil((endIndex + startIndex!) / 2);
          if (_liesBetween(eventXRelativePosition, this._dropHintDetails[middleIndex].startX, this._dropHintDetails[middleIndex].endX)) {
            indexToUpdate = middleIndex;
            break;
          } else if (_isBefore(eventXRelativePosition, this._dropHintDetails[middleIndex].originX)) {
            endIndex = middleIndex;
          } else if (_isAfter(eventXRelativePosition, this._dropHintDetails[middleIndex].originX)) {
            startIndex = middleIndex;
          }
        }
      }

      if (indexToUpdate === this._draggedColumnIndex || indexToUpdate === this._draggedColumnIndex + 1) {
        if (this._isValidCurrentDropHintIndex()) {
          this._resetDropHints();
        }
      } else if (currentDropHintIndex !== indexToUpdate && indexToUpdate >= 0) {
        this._resetDropHints();
        this._updateDropHintElement(this._dropHintDetails[indexToUpdate].dropHintElementRef, 'inline-block');
        this._currentDropHintIndex = indexToUpdate;
      }
    }
  };

  private _isEventOnHeader(event: MouseEvent): ColumnDragEndLocation | undefined {
    if (this._rootElement) {
      const clientRect = this._rootElement.getBoundingClientRect();
      if (
        event.clientX > clientRect.left &&
        event.clientX < clientRect.right &&
        event.clientY > clientRect.top &&
        event.clientY < clientRect.bottom
      ) {
        return ColumnDragEndLocation.header;
      }
    }
  }

  private _renderColumnSizer = ({ columnIndex }: IDetailsColumnProps): JSX.Element | null => {
    const { columns = NO_COLUMNS } = this.props;
    const column = columns[columnIndex];
    const { columnResizeDetails } = this.state;
    const classNames = this._classNames;

    return column.isResizable ? (
      <div
        key={`${column.key}_sizer`}
        aria-hidden={true}
        role="button"
        data-is-focusable={false}
        onClick={_stopPropagation}
        data-sizer-index={columnIndex}
        onBlur={this._onSizerBlur}
        className={css(classNames.cellSizer, columnIndex < columns.length - 1 ? classNames.cellSizerStart : classNames.cellSizerEnd, {
          [classNames.cellIsResizing]: columnResizeDetails && columnResizeDetails.columnIndex === columnIndex
        })}
        onDoubleClick={this._onSizerDoubleClick.bind(this, columnIndex)}
      />
    ) : null;
  };

  private _renderColumnDivider(columnIndex: number): JSX.Element | null {
    const { columns = NO_COLUMNS } = this.props;
    const column = columns[columnIndex];
    const { onRenderDivider } = column;
    return onRenderDivider
      ? onRenderDivider({ column, columnIndex }, this._renderColumnSizer)
      : this._renderColumnSizer({ column, columnIndex });
  }

  private _renderDropHint(dropHintIndex: number): JSX.Element {
    const classNames = this._classNames;
    const IconComponent = this.props.useFastIcons ? FontIcon : Icon;
    return (
      <div key={'dropHintKey'} className={classNames.dropHintStyle} id={`columnDropHint_${dropHintIndex}`}>
        <IconComponent
          key={`dropHintCircleKey`}
          aria-hidden={true}
          data-is-focusable={false}
          data-sizer-index={dropHintIndex}
          className={classNames.dropHintCaretStyle}
          iconName={'CircleShapeSolid'}
        />
        <div
          key={`dropHintLineKey`}
          aria-hidden={true}
          data-is-focusable={false}
          data-sizer-index={dropHintIndex}
          className={classNames.dropHintLineStyle}
        />
      </div>
    );
  }

  private _onRenderColumnHeaderTooltip = (tooltipHostProps: ITooltipHostProps): JSX.Element => {
    return <span className={tooltipHostProps.hostClassName}>{tooltipHostProps.children}</span>;
  };

  /**
   * double click on the column sizer will auto ajust column width
   * to fit the longest content among current rendered rows.
   *
   * @param columnIndex - index of the column user double clicked
   * @param ev - mouse double click event
   */
  private _onSizerDoubleClick(columnIndex: number, ev: React.MouseEvent<HTMLElement>): void {
    const { onColumnAutoResized, columns = NO_COLUMNS } = this.props;
    if (onColumnAutoResized) {
      onColumnAutoResized(columns[columnIndex], columnIndex);
    }
  }

  /**
   * Called when the select all toggle is clicked.
   */
  private _onSelectAllClicked = (): void => {
    const { selection } = this.props;

    if (selection) {
      selection.toggleAllSelected();
    }
  };

  private _onRootMouseDown = (ev: MouseEvent): void => {
    const columnIndexAttr = (ev.target as HTMLElement).getAttribute('data-sizer-index');
    const columnIndex = Number(columnIndexAttr);
    const { columns = NO_COLUMNS } = this.props;

    if (columnIndexAttr === null || ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
      // Ignore anything except the primary button.
      return;
    }

    this.setState({
      columnResizeDetails: {
        columnIndex: columnIndex,
        columnMinWidth: columns[columnIndex].calculatedWidth!,
        originX: ev.clientX
      }
    });

    ev.preventDefault();
    ev.stopPropagation();
  };

  private _onRootMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const { columnResizeDetails, isSizing } = this.state;

    if (columnResizeDetails && !isSizing && ev.clientX !== columnResizeDetails.originX) {
      this.setState({ isSizing: true });
    }
  };

  private _onRootRef = (focusZone: FocusZone): void => {
    if (focusZone) {
      // Need to resolve the actual DOM node, not the component. The element itself will be used for drag/drop and focusing.
      this._rootElement = findDOMNode(focusZone) as HTMLElement;
    } else {
      this._rootElement = undefined;
    }
  };

  private _onRootKeyDown = (ev: KeyboardEvent): void => {
    const { columnResizeDetails, isSizing } = this.state;
    const { columns = NO_COLUMNS, onColumnResized } = this.props;

    const columnIndexAttr = (ev.target as HTMLElement).getAttribute('data-sizer-index');

    if (!columnIndexAttr || isSizing) {
      return;
    }

    const columnIndex = Number(columnIndexAttr);

    if (!columnResizeDetails) {
      if (ev.which === KeyCodes.enter) {
        this.setState({
          columnResizeDetails: {
            columnIndex: columnIndex,
            columnMinWidth: columns[columnIndex].calculatedWidth!
          }
        });

        ev.preventDefault();
        ev.stopPropagation();
      }
    } else {
      let increment: number | undefined;

      if (ev.which === KeyCodes.enter) {
        this.setState({
          columnResizeDetails: undefined
        });

        ev.preventDefault();
        ev.stopPropagation();
      } else if (ev.which === KeyCodes.left) {
        increment = getRTL() ? 1 : -1;
      } else if (ev.which === KeyCodes.right) {
        increment = getRTL() ? -1 : 1;
      }

      if (increment) {
        if (!ev.shiftKey) {
          increment *= 10;
        }

        this.setState({
          columnResizeDetails: {
            ...columnResizeDetails,
            columnMinWidth: columnResizeDetails.columnMinWidth + increment
          }
        });

        if (onColumnResized) {
          onColumnResized(columns[columnIndex], columnResizeDetails.columnMinWidth + increment, columnIndex);
        }

        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  /**
   * mouse move event handler in the header
   * it will set isSizing state to true when user clicked on the sizer and move the mouse.
   *
   * @param ev - mouse move event
   */
  private _onSizerMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons
    } = ev;
    const { onColumnIsSizingChanged, onColumnResized, columns = NO_COLUMNS } = this.props;
    const { columnResizeDetails } = this.state;

    if (buttons !== undefined && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
      // cancel mouse down event and return early when the primary button is not pressed
      this._onSizerMouseUp(ev);
      return;
    }

    if (ev.clientX !== columnResizeDetails!.originX) {
      if (onColumnIsSizingChanged) {
        onColumnIsSizingChanged(columns[columnResizeDetails!.columnIndex], true);
      }
    }

    if (onColumnResized) {
      let movement = ev.clientX - columnResizeDetails!.originX!;

      if (getRTL()) {
        movement = -movement;
      }

      onColumnResized(
        columns[columnResizeDetails!.columnIndex],
        columnResizeDetails!.columnMinWidth + movement,
        columnResizeDetails!.columnIndex
      );
    }
  };

  private _onSizerBlur = (ev: React.FocusEvent<HTMLElement>): void => {
    const { columnResizeDetails } = this.state;

    if (columnResizeDetails) {
      this.setState({
        columnResizeDetails: undefined,
        isSizing: false
      });
    }
  };

  /**
   * mouse up event handler in the header
   * clear the resize related state.
   * This is to ensure we can catch double click event
   *
   * @param ev - mouse up event
   */
  private _onSizerMouseUp = (ev: React.MouseEvent<HTMLElement>): void => {
    const { columns = NO_COLUMNS, onColumnIsSizingChanged } = this.props;
    const { columnResizeDetails } = this.state;

    this.setState({
      columnResizeDetails: undefined,
      isSizing: false
    });

    if (onColumnIsSizingChanged) {
      onColumnIsSizingChanged(columns[columnResizeDetails!.columnIndex], false);
    }
  };

  private _onSelectionChanged(): void {
    const isAllSelected = !!this.props.selection && this.props.selection.isAllSelected();

    if (this.state.isAllSelected !== isAllSelected) {
      this.setState({
        isAllSelected: isAllSelected
      });
    }
  }

  private _onToggleCollapseAll = (): void => {
    const { onToggleCollapseAll } = this.props;
    const newCollapsed = !this.state.isAllCollapsed;
    this.setState({
      isAllCollapsed: newCollapsed
    });
    if (onToggleCollapseAll) {
      onToggleCollapseAll(newCollapsed);
    }
  };
}

function _liesBetween(target: number, left: number, right: number): boolean {
  return getRTL() ? target <= left && target >= right : target >= left && target <= right;
}
function _isBefore(a: number, b: number): boolean {
  return getRTL() ? a >= b : a <= b;
}
function _isAfter(a: number, b: number): boolean {
  return getRTL() ? a <= b : a >= b;
}

function _stopPropagation(ev: React.MouseEvent<HTMLElement>): void {
  ev.stopPropagation();
}
