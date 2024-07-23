import * as React from 'react';
import { initializeComponentRef, EventGroup, css, getRTL, getId, KeyCodes, classNamesFunction } from '../../Utilities';
import { ColumnDragEndLocation, CheckboxVisibility } from './DetailsList.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon, FontIcon } from '../../Icon';
import { Layer } from '../../Layer';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { CollapseAllVisibility } from '../../GroupedList';
import { DetailsRowCheck } from './DetailsRowCheck';
import { SelectionMode, SELECTION_CHANGE } from '../../Selection';
import { DragDropHelper } from '../../DragDrop';
import { DetailsColumn } from '../../components/DetailsList/DetailsColumn';
import { SelectAllVisibility } from './DetailsHeader.types';
import type { IProcessedStyleSet } from '../../Styling';
import type { IDisposable } from '../../Utilities';
import type { IColumn, IDetailsHeaderBaseProps, IColumnDragDropDetails } from './DetailsList.types';
import type { IFocusZone } from '../../FocusZone';
import type { ITooltipHostProps } from '../../Tooltip';
import type { ISelection } from '../../Selection';
import type { IDragDropOptions } from '../../DragDrop';
import type { IDetailsColumnProps } from '../../components/DetailsList/DetailsColumn';
import type {
  IDropHintDetails,
  IColumnReorderHeaderProps,
  IDetailsHeaderState,
  IDetailsHeaderStyleProps,
  IDetailsHeaderStyles,
  IDetailsHeader,
} from './DetailsHeader.types';

const getClassNames = classNamesFunction<IDetailsHeaderStyleProps, IDetailsHeaderStyles>();

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

const NO_COLUMNS: IColumn[] = [];

export class DetailsHeaderBase
  extends React.Component<IDetailsHeaderBaseProps, IDetailsHeaderState>
  implements IDetailsHeader
{
  public static defaultProps = {
    selectAllVisibility: SelectAllVisibility.visible,
    collapseAllVisibility: CollapseAllVisibility.visible,
    useFastIcons: true,
  };

  private _classNames: IProcessedStyleSet<IDetailsHeaderStyles>;
  private _rootElement = React.createRef<HTMLElement>();
  private _events: EventGroup;
  private _rootComponent = React.createRef<IFocusZone>();
  private _id: string;
  private _draggedColumnIndex = -1;
  private _dropHintDetails: { [key: number]: IDropHintDetails } = {};
  private _dragDropHelper: DragDropHelper;
  private _currentDropHintIndex: number;
  private _subscriptionObject?: IDisposable;
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
      isAllSelected: !!this.props.selection && this.props.selection.isAllSelected(),
    };

    this._onDropIndexInfo = {
      sourceIndex: -1,
      targetIndex: -1,
    };
    this._id = getId('header');
    this._currentDropHintIndex = -1;

    // The drag drop handler won't do any work until subscribe() is called,
    // so always set it up for convenience
    this._dragDropHelper = new DragDropHelper({
      selection: {
        getSelection: () => {
          return;
        },
      } as ISelection,
      minimumPixelsForDrag: this.props.minimumPixelsForDrag,
    });
  }

  public componentDidMount(): void {
    const { selection } = this.props;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);

    // this._rootElement.current will be null in tests using react-test-renderer
    if (this._rootElement.current) {
      // We need to use native on this to prevent MarqueeSelection from handling the event before us.
      this._events.on(this._rootElement.current, 'mousedown', this._onRootMouseDown);

      this._events.on(this._rootElement.current, 'keydown', this._onRootKeyDown);

      if (this._getColumnReorderProps()) {
        this._subscriptionObject = this._dragDropHelper.subscribe(
          this._rootElement.current,
          this._events,
          this._getHeaderDragDropOptions(),
        );
      }
    }
  }

  public componentDidUpdate(prevProps: IDetailsHeaderBaseProps): void {
    if (this._getColumnReorderProps()) {
      if (!this._subscriptionObject && this._rootElement.current) {
        this._subscriptionObject = this._dragDropHelper.subscribe(
          this._rootElement.current,
          this._events,
          this._getHeaderDragDropOptions(),
        );
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
          targetIndex: -1,
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
      className,
    } = this.props;
    const { isAllSelected, columnResizeDetails, isSizing, isAllCollapsed } = this.state;
    const showCheckbox = selectAllVisibility !== SelectAllVisibility.none;
    const isCheckboxHidden = selectAllVisibility === SelectAllVisibility.hidden;
    const isCheckboxAlwaysVisible = checkboxVisibility === CheckboxVisibility.always;

    const columnReorderProps = this._getColumnReorderProps();
    const frozenColumnCountFromStart =
      columnReorderProps && columnReorderProps.frozenColumnCountFromStart
        ? columnReorderProps.frozenColumnCountFromStart
        : 0;
    const frozenColumnCountFromEnd =
      columnReorderProps && columnReorderProps.frozenColumnCountFromEnd
        ? columnReorderProps.frozenColumnCountFromEnd
        : 0;

    this._classNames = getClassNames(styles, {
      theme: theme!,
      isAllSelected,
      isSelectAllHidden: selectAllVisibility === SelectAllVisibility.hidden,
      isResizingColumn: !!columnResizeDetails && isSizing,
      isSizing,
      isAllCollapsed,
      isCheckboxHidden,
      className,
    });

    const classNames = this._classNames;
    const IconComponent = useFastIcons ? FontIcon : Icon;
    const hasGroupExpander = groupNestingDepth! > 0;
    const showGroupExpander = hasGroupExpander && this.props.collapseAllVisibility === CollapseAllVisibility.visible;
    const columnIndexOffset = this._computeColumnIndexOffset(showCheckbox);

    const isRTL = getRTL(theme);
    return (
      <FocusZone
        role="row"
        aria-label={ariaLabel}
        className={classNames.root}
        componentRef={this._rootComponent}
        elementRef={this._rootElement}
        onMouseMove={this._onRootMouseMove}
        data-automationid="DetailsHeader"
        direction={FocusZoneDirection.horizontal}
      >
        {showCheckbox
          ? [
              <div
                key="__checkbox"
                className={classNames.cellIsCheck}
                aria-labelledby={`${this._id}-checkTooltip`}
                onClick={!isCheckboxHidden ? this._onSelectAllClicked : undefined}
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
                        aria-label={
                          selectionMode === SelectionMode.multiple
                            ? ariaLabelForSelectAllCheckbox
                            : ariaLabelForSelectionColumn
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
                    ),
                  },
                  this._onRenderColumnHeaderTooltip,
                )}
              </div>,
              !this.props.onRenderColumnHeaderTooltip ? (
                ariaLabelForSelectAllCheckbox && !isCheckboxHidden ? (
                  <label
                    key="__checkboxLabel"
                    id={`${this._id}-checkTooltip`}
                    className={classNames.accessibleLabel}
                    aria-hidden={true}
                  >
                    {ariaLabelForSelectAllCheckbox}
                  </label>
                ) : ariaLabelForSelectionColumn && isCheckboxHidden ? (
                  <label
                    key="__checkboxLabel"
                    id={`${this._id}-checkTooltip`}
                    className={classNames.accessibleLabel}
                    aria-hidden={true}
                  >
                    {ariaLabelForSelectionColumn}
                  </label>
                ) : null
              ) : null,
            ]
          : null}
        {showGroupExpander ? (
          <div
            className={classNames.cellIsGroupExpander}
            onClick={this._onToggleCollapseAll}
            data-is-focusable={true}
            aria-label={ariaLabelForToggleAllGroupsButton}
            aria-expanded={!isAllCollapsed}
            role="columnheader"
          >
            <IconComponent
              className={classNames.collapseButton}
              iconName={isRTL ? 'ChevronLeftMed' : 'ChevronRightMed'}
            />
            {/* Use this span in addition to aria-label, otherwise VoiceOver ignores the column */}
            <span className={classNames.accessibleLabel}>{ariaLabelForToggleAllGroupsButton}</span>
          </div>
        ) : hasGroupExpander ? (
          <div className={classNames.cellIsGroupExpander} data-is-focusable={false} role="columnheader">
            {/* Empty placeholder cell when CollapseAllVisibility is hidden */}
          </div>
        ) : null}
        <GroupSpacer indentWidth={indentWidth} role="gridcell" count={groupNestingDepth! - 1} />
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
              styles={column.styles}
              key={column.key}
              columnIndex={columnIndexOffset + columnIndex}
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
            this._renderColumnDivider(columnIndex),
          ];
        })}
        {columnReorderProps && frozenColumnCountFromEnd === 0 && this._renderDropHint(columns.length)}
        {isSizing && (
          <Layer>
            <div
              className={classNames.sizingOverlay}
              onMouseMove={this._onSizerMouseMove}
              onMouseUp={this._onSizerMouseUp}
            />
          </Layer>
        )}
      </FocusZone>
    );
  }

  /** Set focus to the active thing in the focus area. */
  public focus(): boolean {
    return !!this._rootComponent.current?.focus();
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
      onDragOver: this._onDragOver,
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
        this._draggedColumnIndex > this._currentDropHintIndex
          ? this._currentDropHintIndex
          : this._currentDropHintIndex - 1;
      const isValidDrop = this._isValidCurrentDropHintIndex();
      event.stopPropagation();
      if (isValidDrop) {
        this._onDropIndexInfo.sourceIndex = this._draggedColumnIndex;
        this._onDropIndexInfo.targetIndex = targetIndex;

        if (columnReorderProps.onColumnDrop) {
          const dragDropDetails: IColumnDragDropDetails = {
            draggedIndex: this._draggedColumnIndex,
            targetIndex,
          };
          columnReorderProps.onColumnDrop(dragDropDetails);
          /* eslint-disable deprecation/deprecation */
        } else if (columnReorderProps.handleColumnReorder) {
          columnReorderProps.handleColumnReorder(this._draggedColumnIndex, targetIndex);
          /* eslint-enable deprecation/deprecation */
        }
      }
    }

    this._resetDropHints();
    this._dropHintDetails = {};
    this._draggedColumnIndex = -1;
  };

  private _computeColumnIndexOffset = (showCheckbox: boolean) => {
    const hasGroupExpander = this.props.groupNestingDepth && this.props.groupNestingDepth > 0;

    let offset = 1;
    if (showCheckbox) {
      offset += 1;
    }

    if (hasGroupExpander) {
      offset += 1;
    }

    return offset;
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
      this._draggedColumnIndex = itemIndex - this._computeColumnIndexOffset(!this._isCheckboxColumnHidden());
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
      if (this._rootElement.current) {
        const dropHintElement = this._rootElement.current.querySelectorAll('#columnDropHint_' + i)[0] as HTMLElement;
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
              dropHintElementRef: prevRef!,
            };
            prevMid = newMid;
            prevRef = dropHintElement;
            prevX = dropHintElement.offsetLeft;
            if (i === columns.length - frozenColumnCountFromEnd) {
              this._dropHintDetails[i] = {
                originX: prevX,
                startX: prevMid!,
                endX: dropHintElement.offsetLeft,
                dropHintElementRef: prevRef,
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
    const isRtl = getRTL(this.props.theme);
    if (this._rootElement.current) {
      const clientRect = this._rootElement.current.getBoundingClientRect();
      const headerOriginX = clientRect.left;
      const eventXRelativePosition = clientX - headerOriginX;
      const currentDropHintIndex = this._currentDropHintIndex;
      if (this._isValidCurrentDropHintIndex()) {
        if (
          _liesBetween(
            isRtl,
            eventXRelativePosition,
            this._dropHintDetails[currentDropHintIndex!].startX,
            this._dropHintDetails[currentDropHintIndex!].endX,
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
      if (_isBefore(isRtl, eventXRelativePosition, this._dropHintDetails[currentIndex].endX)) {
        indexToUpdate = currentIndex;
      } else if (_isAfter(isRtl, eventXRelativePosition, this._dropHintDetails[lastValidColumn].startX)) {
        indexToUpdate = lastValidColumn;
      } else if (this._isValidCurrentDropHintIndex()) {
        if (
          this._dropHintDetails[currentDropHintIndex! + 1] &&
          _liesBetween(
            isRtl,
            eventXRelativePosition,
            this._dropHintDetails[currentDropHintIndex! + 1].startX,
            this._dropHintDetails[currentDropHintIndex! + 1].endX,
          )
        ) {
          indexToUpdate = currentDropHintIndex! + 1;
        } else if (
          this._dropHintDetails[currentDropHintIndex! - 1] &&
          _liesBetween(
            isRtl,
            eventXRelativePosition,
            this._dropHintDetails[currentDropHintIndex! - 1].startX,
            this._dropHintDetails[currentDropHintIndex! - 1].endX,
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
          if (
            _liesBetween(
              isRtl,
              eventXRelativePosition,
              this._dropHintDetails[middleIndex].startX,
              this._dropHintDetails[middleIndex].endX,
            )
          ) {
            indexToUpdate = middleIndex;
            break;
          } else if (_isBefore(isRtl, eventXRelativePosition, this._dropHintDetails[middleIndex].originX)) {
            endIndex = middleIndex;
          } else if (_isAfter(isRtl, eventXRelativePosition, this._dropHintDetails[middleIndex].originX)) {
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
    if (this._rootElement.current) {
      const clientRect = this._rootElement.current.getBoundingClientRect();
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
        className={css(
          classNames.cellSizer,
          columnIndex < columns.length - 1 ? classNames.cellSizerStart : classNames.cellSizerEnd,
          {
            [classNames.cellIsResizing]: columnResizeDetails && columnResizeDetails.columnIndex === columnIndex,
          },
        )}
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
      <div
        key={'dropHintKey'}
        className={classNames.dropHintStyle}
        id={`columnDropHint_${dropHintIndex}`}
        aria-hidden={true}
      >
        <div
          role="presentation"
          key={`dropHintCircleKey`}
          className={classNames.dropHintCaretStyle}
          data-is-focusable={false}
          data-sizer-index={dropHintIndex}
          aria-hidden={true}
        >
          <IconComponent iconName={'CircleShapeSolid'} />
        </div>
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
        columnIndex,
        columnMinWidth: columns[columnIndex].calculatedWidth!,
        originX: ev.clientX,
      },
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

  private _onRootKeyDown = (ev: KeyboardEvent): void => {
    const { columnResizeDetails, isSizing } = this.state;
    const { columns = NO_COLUMNS, onColumnResized } = this.props;

    const columnIndexAttr = (ev.target as HTMLElement).getAttribute('data-sizer-index');

    if (!columnIndexAttr || isSizing) {
      return;
    }

    const columnIndex = Number(columnIndexAttr);

    if (!columnResizeDetails) {
      // eslint-disable-next-line deprecation/deprecation
      if (ev.which === KeyCodes.enter) {
        this.setState({
          columnResizeDetails: {
            columnIndex,
            columnMinWidth: columns[columnIndex].calculatedWidth!,
          },
        });

        ev.preventDefault();
        ev.stopPropagation();
      }
    } else {
      let increment: number | undefined;

      // eslint-disable-next-line deprecation/deprecation
      if (ev.which === KeyCodes.enter) {
        this.setState({
          columnResizeDetails: undefined,
        });

        ev.preventDefault();
        ev.stopPropagation();
        // eslint-disable-next-line deprecation/deprecation
      } else if (ev.which === KeyCodes.left) {
        increment = getRTL(this.props.theme) ? 1 : -1;
        // eslint-disable-next-line deprecation/deprecation
      } else if (ev.which === KeyCodes.right) {
        increment = getRTL(this.props.theme) ? -1 : 1;
      }

      if (increment) {
        if (!ev.shiftKey) {
          increment *= 10;
        }

        this.setState({
          columnResizeDetails: {
            ...columnResizeDetails,
            columnMinWidth: columnResizeDetails.columnMinWidth + increment,
          },
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
      buttons,
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

      if (getRTL(this.props.theme)) {
        movement = -movement;
      }

      onColumnResized(
        columns[columnResizeDetails!.columnIndex],
        columnResizeDetails!.columnMinWidth + movement,
        columnResizeDetails!.columnIndex,
      );
    }
  };

  private _onSizerBlur = (ev: React.FocusEvent<HTMLElement>): void => {
    const { columnResizeDetails } = this.state;

    if (columnResizeDetails) {
      this.setState({
        columnResizeDetails: undefined,
        isSizing: false,
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
      isSizing: false,
    });

    if (onColumnIsSizingChanged) {
      onColumnIsSizingChanged(columns[columnResizeDetails!.columnIndex], false);
    }
  };

  private _onSelectionChanged(): void {
    const isAllSelected = !!this.props.selection && this.props.selection.isAllSelected();

    if (this.state.isAllSelected !== isAllSelected) {
      this.setState({
        isAllSelected,
      });
    }
  }

  private _onToggleCollapseAll = (): void => {
    const { onToggleCollapseAll } = this.props;
    const newCollapsed = !this.state.isAllCollapsed;
    this.setState({
      isAllCollapsed: newCollapsed,
    });
    if (onToggleCollapseAll) {
      onToggleCollapseAll(newCollapsed);
    }
  };
}

function _liesBetween(rtl: boolean, target: number, left: number, right: number): boolean {
  return rtl ? target <= left && target >= right : target >= left && target <= right;
}
function _isBefore(rtl: boolean, a: number, b: number): boolean {
  return rtl ? a >= b : a <= b;
}
function _isAfter(rtl: boolean, a: number, b: number): boolean {
  return rtl ? a <= b : a >= b;
}

function _stopPropagation(ev: React.MouseEvent<HTMLElement>): void {
  ev.stopPropagation();
}
