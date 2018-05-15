import * as React from 'react';
import { findDOMNode } from 'react-dom';
import {
  BaseComponent,
  css,
  getRTL,
  getId,
  KeyCodes,
  IRenderFunction,
  createRef
} from '../../Utilities';
import { IColumn, DetailsListLayoutMode } from './DetailsList.types';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon } from '../../Icon';
import { Layer } from '../../Layer';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { CollapseAllVisibility } from '../../GroupedList';
import { DetailsRowCheck } from './DetailsRowCheck';
import { ITooltipHostProps } from '../../Tooltip';
import * as checkStylesModule from './DetailsRowCheck.scss';
import { IViewport } from '../../utilities/decorators/withViewport';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import * as stylesImport from './DetailsHeader.scss';
import { IDragDropEvents, IDragDropOptions, IDragDropContext } from './../../utilities/dragdrop/interfaces';
import { DragDropHelper } from './../../utilities/dragdrop';
import { DetailsColumn } from './../../components/DetailsList/DetailsColumn';

const styles: any = stylesImport;
const checkStyles: any = checkStylesModule;

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

export interface IDetailsHeader {
  focus: () => boolean;
}

export interface IDetailsHeaderProps extends React.Props<DetailsHeader> {
  componentRef?: (component: IDetailsHeader | null) => void;
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  groupNestingDepth?: number;
  indentWidth?: number;
  collapseAllVisibility?: CollapseAllVisibility;
  isAllCollapsed?: boolean;
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
  /** ariaLabel for the entire header */
  ariaLabel?: string;
  /** ariaLabel for the header checkbox that selects or deselects everything */
  ariaLabelForSelectAllCheckbox?: string;
  ariaLabelForSelectionColumn?: string;
  selectAllVisibility?: SelectAllVisibility;
  viewport?: IViewport;
  frozenColumnCount?: number;
  dragDropColumnEvents?: IDragDropEvents | null;
}

export enum SelectAllVisibility {
  none = 0,
  hidden = 1,
  visible = 2
}

export interface IDetailsHeaderState {
  columnResizeDetails?: IColumnResizeDetails;
  isAllSelected?: boolean;
  isSizing?: boolean;
  groupNestingDepth?: number;
  isAllCollapsed?: boolean;
}

export interface IColumnResizeDetails {
  columnIndex: number;
  originX?: number;
  columnMinWidth: number;
}

export class DetailsHeader extends BaseComponent<IDetailsHeaderProps, IDetailsHeaderState> implements IDetailsHeader {
  public static defaultProps = {
    selectAllVisibility: SelectAllVisibility.visible,
    collapseAllVisibility: CollapseAllVisibility.visible
  };

  private _root = createRef<IFocusZone>();

  private _id: string;
  private _dragDropHelper: DragDropHelper | null;

  constructor(props: IDetailsHeaderProps) {
    super(props);

    this.state = {
      columnResizeDetails: undefined,
      groupNestingDepth: this.props.groupNestingDepth,
      isAllCollapsed: this.props.isAllCollapsed
    };

    this._onToggleCollapseAll = this._onToggleCollapseAll.bind(this);
    this._onSelectAllClicked = this._onSelectAllClicked.bind(this);
    this._id = getId('header');

    this._dragDropHelper = this.props.dragDropColumnEvents ? new DragDropHelper({
      selection: {
        getSelection: () => { return; }
      } as ISelection,
      minimumPixelsForDrag: 5
    }) : null;
  }

  public componentDidMount(): void {
    const { selection, columnReorderOptions } = this.props;
    const focusZone = this._root.current;
    const rootElement = findDOMNode(focusZone as any) as HTMLElement;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);

    // We need to use native on this to avoid MarqueeSelection from handling the event before us.
    this._events.on(rootElement, 'mousedown', this._onRootMouseDown);

    this._events.on(rootElement, 'keydown', this._onRootKeyDown);

    if (columnReorderOptions) {
      this._getDropHintPositions(rootElement);
      this._dragDropHelper!.subscribe(rootElement, this._events, this._getHeaderDragDropOptions());
    }
  }

  public componentDidUpdate(): void {
    const { columnReorderOptions } = this.props;
    const focusZone = this._root.value;
    const rootElement = findDOMNode(focusZone as any) as HTMLElement;

    if (columnReorderOptions) {
      this._getDropHintPositions(rootElement);
    }
  }

  public componentWillReceiveProps(newProps: IDetailsHeaderProps): void {
    const { groupNestingDepth } = this.state;

    if (newProps.groupNestingDepth !== groupNestingDepth) {
      this.setState({ groupNestingDepth: newProps.groupNestingDepth });
    }
  }

  public componentWillUnmount(): void {
    if (this._dragDropHelper) {
      this._dragDropHelper.dispose();
    }
  }

  public render(): JSX.Element {
    const {
      columns,
      ariaLabel,
      ariaLabelForSelectAllCheckbox,
      selectAllVisibility,
      ariaLabelForSelectionColumn,
      indentWidth,
      viewport,
      columnReorderOptions,
      onColumnClick,
      onColumnContextMenu
    } = this.props;
    const { isAllSelected, columnResizeDetails, isSizing, groupNestingDepth, isAllCollapsed } = this.state;

    const showCheckbox = selectAllVisibility !== SelectAllVisibility.none;
    const isCheckboxHidden = selectAllVisibility === SelectAllVisibility.hidden;

    const { onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip } = this.props;

    return (
      <FocusZone
        role="row"
        aria-label={ariaLabel}
        className={css(
          'ms-DetailsHeader',
          styles.root,
          isAllSelected && 'is-allSelected ' + styles.rootIsAllSelected,
          selectAllVisibility === SelectAllVisibility.hidden && 'is-selectAllHidden ' + styles.rootIsSelectAllHidden,
          !!columnResizeDetails && isSizing && 'is-resizingColumn'
        )}
        componentRef={this._root}
        onMouseMove={this._onRootMouseMove}
        data-automationid="DetailsHeader"
        style={{ minWidth: viewport ? viewport.width : 0 }}
        direction={FocusZoneDirection.horizontal}
      >
        {showCheckbox
          ? [
            <div
              key="__checkbox"
              className={css(
                'ms-DetailsHeader-cell',
                'ms-DetailsHeader-cellIsCheck',
                styles.cell,
                styles.cellIsCheck,
                checkStyles.owner,
                isAllSelected && checkStyles.isSelected
              )}
              aria-labelledby={`${this._id}-check`}
              onClick={this._onSelectAllClicked}
              aria-colindex={!isCheckboxHidden ? 1 : undefined}
              role={!isCheckboxHidden ? 'columnheader' : undefined}
            >
              {onRenderColumnHeaderTooltip(
                {
                  hostClassName: css(styles.checkTooltip),
                  id: `${this._id}-checkTooltip`,
                  setAriaDescribedBy: false,
                  content: ariaLabelForSelectAllCheckbox,
                  children: (
                    <DetailsRowCheck
                      id={`${this._id}-check`}
                      aria-label={ariaLabelForSelectionColumn}
                      aria-describedby={`${this._id}-checkTooltip`}
                      data-is-focusable={!isCheckboxHidden}
                      isHeader={true}
                      selected={isAllSelected}
                      anySelected={false}
                      canSelect={!isCheckboxHidden}
                    />
                  )
                },
                this._onRenderColumnHeaderTooltip
              )}
            </div>,
            ariaLabelForSelectAllCheckbox && !this.props.onRenderColumnHeaderTooltip ? (
              <label key="__checkboxLabel" id={`${this._id}-checkTooltip`} className={styles.accessibleLabel}>
                {ariaLabelForSelectAllCheckbox}
              </label>
            ) : null
          ]
          : null}
        {groupNestingDepth! > 0 && this.props.collapseAllVisibility === CollapseAllVisibility.visible ? (
          <div
            className={css('ms-DetailsHeader-cell', styles.cell)}
            onClick={this._onToggleCollapseAll}
            data-is-focusable={true}
          >
            <Icon
              className={css(
                'ms-DetailsHeader-collapseButton',
                styles.collapseButton,
                isAllCollapsed && 'is-collapsed ' + styles.collapseButtonIsCollapsed
              )}
              iconName="ChevronDown"
            />
          </div>
        ) : null}
        <GroupSpacer indentWidth={indentWidth} count={groupNestingDepth! - 1} />
        {
          columns.map((column: IColumn, columnIndex: number) => {
            const _isDraggable = dragDropColumnEvents! && columnIndex >= this.props.frozenColumnCount!;
            return (
              [(
                <DetailsColumn
                  column={column}
                  key={column.key}
                  columnIndex={(showCheckbox ? 2 : 1) + columnIndex}
                  parentId={this._id}
                  isDraggable={_isDraggable}
                  dragDropColumnEvents={dragDropColumnEvents}
                  dragDropHelper={this._dragDropHelper}
                  onColumnClick={onColumnClick}
                  onColumnContextMenu={onColumnContextMenu}
                />
                /* <div
                  key={ column.key }
                  role='columnheader'
                  aria-sort={ column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none' }
                  aria-disabled={ column.columnActionsMode === ColumnActionsMode.disabled }
                  aria-colindex={ (showCheckbox ? 1 : 0) + columnIndex }
                  className={ css(
                    'ms-DetailsHeader-cell',
                    droppingClassName,
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
                      id: `${this._id}-${column.key}-tooltip`,
                      setAriaDescribedBy: false,
                      content: column.columnActionsMode !== ColumnActionsMode.disabled ? column.ariaLabel : '',
                      children: (
                        <span
                          id={ `${this._id}-${column.key}` }
                          aria-label={ column.isIconOnly ? column.name : undefined }
                          aria-labelledby={ column.isIconOnly ? undefined : `${this._id}-${column.key}-name ` }
                          className={ css('ms-DetailsHeader-cellTitle', styles.cellTitle) }
                          data-is-focusable={ column.columnActionsMode !== ColumnActionsMode.disabled }
                          role={ column.columnActionsMode !== ColumnActionsMode.disabled ? 'button' : undefined }
                          aria-describedby={ `${this._id}-${column.key}-tooltip` }
                          onContextMenu={ this._onColumnContextMenu.bind(this, column) }
                          onClick={ this._onColumnClick.bind(this, column) }
                          aria-haspopup={ column.columnActionsMode === ColumnActionsMode.hasDropdown }
                        >
                          <span
                            id={ `${this._id}-${column.key}-name` }
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
                </div>,
                column.ariaLabel && !this.props.onRenderColumnHeaderTooltip ? (
                  <label
                    key={ `${column.key}_label` }
                    id={ `${this._id}-${column.key}-tooltip` }
                    className={ styles.accessibleLabel }
                  >
                    { column.ariaLabel }
                  </label>
                ) : null,*/
              ),
              column.isResizable && this._renderColumnSizer(columnIndex)
              ];
        )
        })}
        {isSizing && (
          <Layer>
            <div
              className={css(isSizing && styles.sizingOverlay)}
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
    return Boolean(this._root.value && this._root.value.focus());
  }

  private _getHeaderDragDropOptions(): IDragDropOptions {
    const {
      dragDropColumnEvents
    } = this.props;
    const dataContext: IDragDropContext = { data: this, index: 1 };
    const options = {
      selectionIndex: 1,
      context: { data: dataContext, index: 1 },
      canDrag: () => false,
      canDrop: () => true,
      onDragStart: this._dragDropColumnEvents!.onDragStart,
      updateDropState: this._updateDroppingState,
      onDrop: this._dragDropColumnEvents!.onDrop,
      onDragEnd: () => undefined,
      onDragOver: this._dragDropColumnEvents!.onDragOver
    };
    return options;
  }

  private _updateDroppingState(newValue: boolean, event: DragEvent): void {
    // TODO - Handle CSS changes
  }

  private _getDragDropColumnEvents(): IDragDropEvents {
    let _draggedColumnIndex: number | undefined;
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
        return true;
      },
      canDrag: (item?: any) => {
        return item >= this.props.columnReorderOptions!.frozenColumnCount!;
      },
      onDragEnter: (item?: any, event?: DragEvent) => {
        // TODO - Not implemented
        // return string is the css classes that will be added to the entering element.
        return 'dragEnter';
      },
      onDragLeave: (item?: any, event?: DragEvent) => {
        // TODO - Not implemented
        return;
      },
      onDrop: (item?: any, event?: DragEvent) => {
        if (_draggedColumnIndex !== undefined && _draggedColumnIndex !== -1 && event! instanceof DragEvent) {
          let targetIndex = -1;
          let i = -1;
          for (i = 0; i < this.state.dropHintsState!.length; i++) {
            if (this.state.dropHintsState![i]) {
              break;
            }
          }
          if (i != this.state.dropHintsState!.length) {
            targetIndex = (this.props.selectionMode !== SelectionMode.none) ? i : i + 1;
            if (_draggedColumnIndex !== targetIndex) {
              this.props.columnReorderOptions!.handleColumnReorder(_draggedColumnIndex!, targetIndex);
              _draggedColumnIndex = -1;
            }
            const newDropHintState = this.state.dropHintsState!.map(state => false);
            this.setState({ dropHintsState: newDropHintState });
          }
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        console.log("In start");
        _draggedColumnIndex = (this.props.selectionMode !== SelectionMode.none) ? itemIndex! - 1 : itemIndex;
        event!.preventDefault();
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        _draggedColumnIndex = -1;
        const newDropHintState = this.state.dropHintsState!.map(state => false);
        this.setState({ dropHintsState: newDropHintState });
      },
      onDragOver: (item: any, event: DragEvent) => {
        // TODO - Handle CSS changes
        if (_draggedColumnIndex !== undefined && _draggedColumnIndex !== -1) {
          const clientX = event.clientX;
          this._updateDropHintStates(clientX);
        }
      }
    };
  }

  private _getDropHintPositions = (rootElement: HTMLElement): void => {
    const { columnReorderOptions, columns } = this.props;
    const headerOriginX = rootElement.getBoundingClientRect().left;
    const frozenColumnCount = (columnReorderOptions!.frozenColumnCount) ? columnReorderOptions!.frozenColumnCount : 0;
    this.props.columns.map((column, columnIndex) => {
      if (columnIndex >= frozenColumnCount!) {
        const dropHintElement = rootElement!.querySelectorAll('#columnDropHint_' + columnIndex)[0] as HTMLElement;
        if (dropHintElement !== null) {
          this._dropHintOriginXValues[columnIndex] = dropHintElement!.offsetLeft + headerOriginX;
        }
      }
    });
    if (columns.length >= frozenColumnCount!) {
      const dropHintElement = rootElement.querySelectorAll('#columnDropHint_' + columns.length)[0] as HTMLElement;
      if (dropHintElement !== null) {
        this._dropHintOriginXValues[columns.length] = dropHintElement!.offsetLeft + headerOriginX;
      }
    }
  }

  private _updateDropHintStates = (eventXposition: number): void => {
    let currentIndex = this.props.columnReorderOptions!.frozenColumnCount!;
    const colCount = this.props.columns.length;
    let indexToUpdate = -1;
    const dropHintsState = this.state.dropHintsState;
    if (eventXposition < this._dropHintOriginXValues[currentIndex]) {
      indexToUpdate = currentIndex;
    } else {
      while (currentIndex < colCount) {
        if (eventXposition > this._dropHintOriginXValues[currentIndex]
          && eventXposition < this._dropHintOriginXValues[currentIndex + 1]) {
          if (eventXposition > ((this._dropHintOriginXValues[currentIndex + 1] + this._dropHintOriginXValues[currentIndex]) / 2)) {
            indexToUpdate = currentIndex + 1;
          } else {
            indexToUpdate = currentIndex;
          }
          break;
        } else { currentIndex++; }
      }
    }
    if (dropHintsState) {
      const newDropHintState = dropHintsState.map(state => false);
      newDropHintState[indexToUpdate] = true;
      this.setState({ dropHintsState: newDropHintState });
    }
  }

  private _renderColumnSizer(columnIndex: number): JSX.Element {
    const { columns } = this.props;
    const column = this.props.columns[columnIndex];
    const { columnResizeDetails } = this.state;

    return (
      <div
        key={`${column.key}_sizer`}
        aria-hidden={true}
        role="button"
        data-is-focusable={false}
        onClick={stopPropagation}
        data-sizer-index={columnIndex}
        onBlur={this._onSizerBlur}
        className={css(
          'ms-DetailsHeader-cellSizer',
          styles.cellSizer,
          columnIndex < columns.length - 1 ? styles.cellSizerStart : styles.cellSizerEnd,
          {
            ['is-resizing ' + styles.cellIsResizing]: columnResizeDetails && columnResizeDetails.columnIndex === columnIndex
          })}
        onDoubleClick={this._onSizerDoubleClick.bind(this, columnIndex)}
      />
    );
  }

  private _renderDropHint(dropHintIndex: number): JSX.Element {
    return (
      <div
        key={`columndropHint`}
        aria-hidden={true}
        data-is-focusable={false}
        data-sizer-index={dropHintIndex}
        id={`columnDropHint_${dropHintIndex}`}
        className={css(
          'ms-DetailsHeader-dropHint',
          styles.dropHint,
          {
            //  TODO add CSS changes to show drop hint
            ['is-dropping ' + styles.isDropping]: this.state.dropHintsState![dropHintIndex]
          }
        )}
        onDoubleClick={this._onSizerDoubleClick.bind(this, columnIndex)}
      />
    );
  }

  private _onRenderColumnHeaderTooltip = (
    tooltipHostProps: ITooltipHostProps,
    defaultRender?: IRenderFunction<ITooltipHostProps>
  ): JSX.Element => {
    return <span className={tooltipHostProps.hostClassName}>{tooltipHostProps.children}</span>;
  };

  /**
   * double click on the column sizer will auto ajust column width
   * to fit the longest content among current rendered rows.
   *
   * @private
* @param {number} columnIndex (index of the column user double clicked)
* @param {React.MouseEvent} ev (mouse double click event)
      */
  private _onSizerDoubleClick(columnIndex: number, ev: React.MouseEvent<HTMLElement>): void {
    const { onColumnAutoResized, columns } = this.props;
    if (onColumnAutoResized) {
      onColumnAutoResized(columns[columnIndex], columnIndex);
    }
  }

  /**
   * Called when the select all toggle is clicked.
   */
  private _onSelectAllClicked = (): void => {
    const { selection } = this.props;

    selection.toggleAllSelected();
  };

  private _onRootMouseDown = (ev: MouseEvent): void => {
    const columnIndexAttr = (ev.target as HTMLElement).getAttribute('data-sizer-index');
    const columnIndex = Number(columnIndexAttr);
    const { columns } = this.props;

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

  private _onRootKeyDown = (ev: KeyboardEvent): void => {
    const { columnResizeDetails, isSizing } = this.state;
    const { columns, onColumnResized } = this.props;

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
   * @private
* @param {React.MouseEvent} ev (mouse move event)
                              */
  private _onSizerMouseMove = (ev: React.MouseEvent<HTMLElement>): void => {
    const {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons
    } = ev;
    const { onColumnIsSizingChanged, onColumnResized, columns } = this.props;
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
   * @private
* @param {React.MouseEvent} ev (mouse up event)
                                  */
  private _onSizerMouseUp = (ev: React.MouseEvent<HTMLElement>): void => {
    const { columns, onColumnIsSizingChanged } = this.props;
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
    const isAllSelected = this.props.selection.isAllSelected();

    if (this.state.isAllSelected !== isAllSelected) {
      this.setState({
        isAllSelected: isAllSelected
      });
    }
  }

  private _onToggleCollapseAll(): void {
    const { onToggleCollapseAll } = this.props;
    const newCollapsed = !this.state.isAllCollapsed;
    this.setState({
      isAllCollapsed: newCollapsed
    });
    if (onToggleCollapseAll) {
      onToggleCollapseAll(newCollapsed);
    }
  }
}

function stopPropagation(ev: React.MouseEvent<HTMLElement>): void {
  ev.stopPropagation();
}
