import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseComponent,
  autobind,
  css,
  getRTL,
  getId,
  KeyCodes,
  IRenderFunction
} from '../../Utilities';
import { IColumn, DetailsListLayoutMode, ColumnActionsMode } from './DetailsList.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon } from '../../Icon';
import { Layer } from '../../Layer';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { CollapseAllVisibility } from '../../GroupedList';
import { DetailsRowCheck } from './DetailsRowCheck';
import { ITooltipHostProps } from '../../Tooltip';
import * as checkStyles from './DetailsRowCheck.scss';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import * as stylesImport from './DetailsHeader.scss';
const styles: any = stylesImport;

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
const INNER_PADDING = 16;

export interface IDetailsHeader {
  focus(): boolean;
}

export interface IDetailsHeaderProps extends React.Props<DetailsHeader> {
  componentRef?: (component: IDetailsHeader) => void;
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number) => void;
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  groupNestingDepth?: number;
  collapseAllVisibility?: CollapseAllVisibility;
  isAllCollapsed?: boolean;
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
  /** ariaLabel for the entire header */
  ariaLabel?: string;
  /** ariaLabel for the header checkbox that selects or deselects everything */
  ariaLabelForSelectAllCheckbox?: string;
  ariaLabelForSelectionColumn?: string;
  selectAllVisibility?: SelectAllVisibility;
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

  public refs: {
    [key: string]: React.ReactInstance;
    root: FocusZone;
  };

  private _id: string;

  constructor(props: IDetailsHeaderProps) {
    super(props);

    this.state = {
      columnResizeDetails: null,
      groupNestingDepth: this.props.groupNestingDepth,
      isAllCollapsed: this.props.isAllCollapsed
    };

    this._onToggleCollapseAll = this._onToggleCollapseAll.bind(this);
    this._onSelectAllClicked = this._onSelectAllClicked.bind(this);
    this._id = getId('header');
  }

  public componentDidMount() {
    let { selection } = this.props;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);

    const rootElement = ReactDOM.findDOMNode(this.refs.root);

    // We need to use native on this to avoid MarqueeSelection from handling the event before us.
    this._events.on(rootElement, 'mousedown', this._onRootMouseDown);

    this._events.on(rootElement, 'keydown', this._onRootKeyDown);
  }

  public componentWillReceiveProps(newProps: IDetailsHeaderProps) {
    let { groupNestingDepth } = this.state;

    if (newProps.groupNestingDepth !== groupNestingDepth) {
      this.setState({ groupNestingDepth: newProps.groupNestingDepth });
    }
  }

  public render() {
    let { columns, ariaLabel, ariaLabelForSelectAllCheckbox, selectAllVisibility, ariaLabelForSelectionColumn } = this.props;
    let { isAllSelected, columnResizeDetails, isSizing, groupNestingDepth, isAllCollapsed } = this.state;

    const showCheckbox = selectAllVisibility !== SelectAllVisibility.none;

    const {
      onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip
    } = this.props;

    return (
      <FocusZone
        role='row'
        aria-label={ ariaLabel }
        className={ css('ms-DetailsHeader', styles.root, {
          ['is-allSelected ' + styles.rootIsAllSelected]: isAllSelected,
          ['is-selectAllHidden ' + styles.rootIsSelectAllHidden]: selectAllVisibility === SelectAllVisibility.hidden,
          'is-resizingColumn': !!columnResizeDetails && isSizing,
        }) }
        ref='root'
        onMouseMove={ this._onRootMouseMove }
        data-automationid='DetailsHeader'
        direction={ FocusZoneDirection.horizontal }
      >
        { showCheckbox ? (
          <div
            className={ css('ms-DetailsHeader-cell', 'ms-DetailsHeader-cellIsCheck', styles.cell, styles.cellIsCheck, checkStyles.owner, {
              [checkStyles.isSelected]: isAllSelected
            }) }
            onClick={ this._onSelectAllClicked }
            aria-colindex={ 0 }
            role='columnheader'>
            <span
              aria-label={ ariaLabelForSelectionColumn }
            ></span>
            {
              onRenderColumnHeaderTooltip({
                hostClassName: css(styles.checkTooltip),
                id: `${this._id}-checkTooltip`,
                setAriaDescribedBy: false,
                content: ariaLabelForSelectAllCheckbox,
                children: (
                  <DetailsRowCheck
                    aria-describedby={ `${this._id}-checkTooltip` }
                    selected={ isAllSelected }
                    anySelected={ false }
                    canSelect={ true }
                  />
                )
              }, this._onRenderColumnHeaderTooltip)
            }
          </div>
        ) : null }
        { groupNestingDepth > 0 && this.props.collapseAllVisibility === CollapseAllVisibility.visible ? (
          <div
            className={ css('ms-DetailsHeader-cell', styles.cell) }
            onClick={ this._onToggleCollapseAll }
          >
            <Icon
              className={ css(
                'ms-DetailsHeader-collapseButton',
                styles.collapseButton,
                isAllCollapsed && ('is-collapsed ' + styles.collapseButtonIsCollapsed)
              ) }
              iconName='ChevronDown'
            />
          </div>
        ) : (null) }
        { GroupSpacer({ count: groupNestingDepth - 1 }) }
        { columns.map((column: IColumn, columnIndex: number) => {
          const previousColumnIndex = columnIndex - 1;
          const previousColumn = columns[previousColumnIndex];

          return (
            [
              <div
                key={ column.key }
                role='columnheader'
                aria-sort={ column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none' }
                aria-disabled={ column.columnActionsMode === ColumnActionsMode.disabled }
                aria-colindex={ (showCheckbox ? 1 : 0) + columnIndex }
                className={ css(
                  'ms-DetailsHeader-cell',
                  styles.cell,
                  column.headerClassName, {
                    ['is-actionable ' + styles.cellIsActionable]: column.columnActionsMode !== ColumnActionsMode.disabled,
                    ['is-empty ' + styles.cellIsEmpty]: !column.name,
                    'is-icon-visible': column.isSorted || column.isGrouped || column.isFiltered
                  }) }
                style={ { width: column.calculatedWidth + INNER_PADDING } }
                aria-haspopup={ column.columnActionsMode === ColumnActionsMode.hasDropdown }
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
                        className={ css('ms-DetailsHeader-cellTitle', styles.cellTitle) }
                        data-is-focusable={ column.columnActionsMode !== ColumnActionsMode.disabled }
                        role={ column.columnActionsMode !== ColumnActionsMode.disabled ? 'button' : undefined }
                        aria-describedby={ `${this._id}-${column.key}-tooltip` }
                        onContextMenu={ this._onColumnContextMenu.bind(this, column) }
                        onClick={ this._onColumnClick.bind(this, column) }
                      >
                        { column.isFiltered && (
                          <Icon className={ styles.nearIcon } iconName='Filter' />
                        ) }

                        { column.isSorted && (
                          <Icon className={ styles.nearIcon } iconName={ column.isSortedDescending ? 'SortDown' : 'SortUp' } />
                        ) }

                        { column.isGrouped && (
                          <Icon className={ styles.nearIcon } iconName='GroupedDescending' />
                        ) }

                        <span
                          aria-label={ column.isIconOnly ? column.name : undefined }
                          className={ css('ms-DetailsHeader-cellName', styles.cellName) }
                        >
                          { (column.iconName || column.iconClassName) && (
                            <Icon className={ css(styles.nearIcon, column.iconClassName) } iconName={ column.iconName } />
                          ) }

                          { !column.isIconOnly ? column.name : undefined }
                        </span>

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
              (column.isResizable) && this._renderColumnSizer(columnIndex)
            ]
          );
        }) }
        { isSizing && (
          <Layer>
            <div
              className={ css(isSizing && styles.sizingOverlay) }
              onMouseMove={ this._onSizerMouseMove }
              onMouseUp={ this._onSizerMouseUp }
            />
          </Layer>
        ) }
      </FocusZone>
    );
  }

  /** Set focus to the active thing in the focus area. */
  public focus(): boolean {
    return this.refs.root.focus();
  }

  private _renderColumnSizer(columnIndex: number) {
    const { columns } = this.props;
    const column = this.props.columns[columnIndex];
    const { isSizing, columnResizeDetails } = this.state;

    return (
      <div
        aria-hidden={ true }
        role='button'
        data-is-focusable={ false }
        onClick={ stopPropagation }
        data-sizer-index={ columnIndex }
        onBlur={ this._onSizerBlur }
        className={ css(
          'ms-DetailsHeader-cellSizer',
          styles.cellSizer,
          columnIndex < columns.length - 1 ? styles.cellSizerStart : styles.cellSizerEnd,
          {
            ['is-resizing ' + styles.cellIsResizing]: columnResizeDetails && columnResizeDetails.columnIndex === columnIndex
          }) }
        onDoubleClick={ this._onSizerDoubleClick.bind(this, columnIndex) }
      />
    );
  }

  @autobind
  private _onRenderColumnHeaderTooltip(tooltipHostProps: ITooltipHostProps, defaultRender?: IRenderFunction<ITooltipHostProps>) {
    return <span className={ tooltipHostProps.hostClassName }>{
      tooltipHostProps.children
    }</span>;
  }

  /**
   * double click on the column sizer will auto ajust column width
   * to fit the longest content among current rendered rows.
   *
   * @private
   * @param {number} columnIndex (index of the column user double clicked)
   * @param {React.MouseEvent} ev (mouse double click event)
   */
  private _onSizerDoubleClick(columnIndex: number, ev: React.MouseEvent<HTMLElement>) {
    let { onColumnAutoResized, columns } = this.props;
    if (onColumnAutoResized) {
      onColumnAutoResized(columns[columnIndex], columnIndex);
    }
  }

  /**
   * Called when the select all toggle is clicked.
   */

  @autobind
  private _onSelectAllClicked() {
    let { selection } = this.props;

    selection.toggleAllSelected();
  }

  @autobind
  private _onRootMouseDown(ev: MouseEvent) {
    let columnIndexAttr = (ev.target as HTMLElement).getAttribute('data-sizer-index');
    let columnIndex = Number(columnIndexAttr);
    let { columns } = this.props;

    if (columnIndexAttr === null || ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
      // Ignore anything except the primary button.
      return;
    }

    this.setState({
      columnResizeDetails: {
        columnIndex: columnIndex,
        columnMinWidth: columns[columnIndex].calculatedWidth,
        originX: ev.clientX
      }
    });

    ev.preventDefault();
    ev.stopPropagation();
  }

  @autobind
  private _onRootMouseMove(ev: React.MouseEvent<HTMLElement>) {
    let { columnResizeDetails, isSizing } = this.state;

    if (columnResizeDetails && !isSizing && ev.clientX !== columnResizeDetails.originX) {
      this.setState({ isSizing: true });
    }
  }

  @autobind
  private _onRootKeyDown(ev: KeyboardEvent) {
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
            columnMinWidth: columns[columnIndex].calculatedWidth
          }
        });

        ev.preventDefault();
        ev.stopPropagation();
      }
    } else {
      let increment: number;

      if (ev.which === KeyCodes.enter) {
        this.setState({
          columnResizeDetails: null
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
          onColumnResized(columns[columnIndex], columnResizeDetails.columnMinWidth + increment);
        }

        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  /**
   * mouse move event handler in the header
   * it will set isSizing state to true when user clicked on the sizer and move the mouse.
   *
   * @private
   * @param {React.MouseEvent} ev (mouse move event)
   */
  @autobind
  private _onSizerMouseMove(ev: React.MouseEvent<HTMLElement>) {
    let {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons
    } = ev;
    let { onColumnIsSizingChanged, onColumnResized, columns } = this.props;
    let { columnResizeDetails } = this.state;

    if (buttons !== undefined && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
      // cancel mouse down event and return early when the primary button is not pressed
      this._onSizerMouseUp(ev);
      return;
    }

    if (ev.clientX !== columnResizeDetails.originX) {
      if (onColumnIsSizingChanged) {
        onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], true);
      }
    }

    if (onColumnResized) {
      let movement = ev.clientX - columnResizeDetails.originX;

      if (getRTL()) {
        movement = -movement;
      }

      onColumnResized(
        columns[columnResizeDetails.columnIndex],
        columnResizeDetails.columnMinWidth + movement
      );
    }

  }

  @autobind
  private _onSizerBlur(ev: React.FocusEvent<HTMLElement>) {
    const { columnResizeDetails } = this.state;

    if (columnResizeDetails) {
      this.setState({
        columnResizeDetails: null,
        isSizing: false
      });
    }
  }

  /**
   * mouse up event handler in the header
   * clear the resize related state.
   * This is to ensure we can catch double click event
   *
   * @private
   * @param {React.MouseEvent} ev (mouse up event)
   */
  @autobind
  private _onSizerMouseUp(ev: React.MouseEvent<HTMLElement>) {
    let { columns, onColumnIsSizingChanged } = this.props;
    let { columnResizeDetails } = this.state;

    this.setState({
      columnResizeDetails: null,
      isSizing: false
    });

    if (onColumnIsSizingChanged) {
      onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
    }
  }

  private _onSelectionChanged() {
    let isAllSelected = this.props.selection.isAllSelected();

    if (this.state.isAllSelected !== isAllSelected) {
      this.setState({
        isAllSelected: isAllSelected
      });
    }
  }

  private _onColumnClick(column: IColumn, ev: React.MouseEvent<HTMLElement>) {
    let { onColumnClick } = this.props;

    if (column.onColumnClick) {
      column.onColumnClick(ev, column);
    }

    if (onColumnClick) {
      onColumnClick(ev, column);
    }
  }

  private _onColumnContextMenu(column: IColumn, ev: React.MouseEvent<HTMLElement>) {
    let { onColumnContextMenu } = this.props;

    if (column.onColumnContextMenu) {
      column.onColumnContextMenu(column, ev);

      ev.preventDefault();
    }

    if (onColumnContextMenu) {
      onColumnContextMenu(column, ev);

      ev.preventDefault();
    }
  }

  private _onToggleCollapseAll() {
    let { onToggleCollapseAll } = this.props;
    let newCollapsed = !this.state.isAllCollapsed;
    this.setState({
      isAllCollapsed: newCollapsed
    });
    if (onToggleCollapseAll) {
      onToggleCollapseAll(newCollapsed);
    }
  }
}

function stopPropagation(ev: React.MouseEvent<HTMLElement>) {
  ev.stopPropagation();
}
