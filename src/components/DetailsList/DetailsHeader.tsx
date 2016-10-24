import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import { IColumn, DetailsListLayoutMode, ColumnActionsMode } from './DetailsList.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Check } from '../Check/Check';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { css } from '../../utilities/css';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { getRTL } from '../../utilities/rtl';
import './DetailsHeader.scss';

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
const INNER_PADDING = 16;

export interface IDetailsHeaderProps extends React.Props<DetailsHeader> {
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number) => void;
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: Event) => void;
  groupNestingDepth?: number;
  isAllCollapsed?: boolean;
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
  /** ariaLabel for the entire header */
  ariaLabel?: string;
  /** ariaLabel for the header checkbox that selects or deselects everything */
  ariaLabelForSelectAllCheckbox?: string;
  selectAllVisibility?: SelectAllVisibility;
}

export enum SelectAllVisibility {
  none,
  hidden,
  visible
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
  originX: number;
  columnMinWidth: number;
}

export class DetailsHeader extends BaseComponent<IDetailsHeaderProps, IDetailsHeaderState> {
  public static defaultProps = {
    isSelectAllVisible: SelectAllVisibility.visible
  };

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
    focusZone: FocusZone;
  };

  constructor(props: IDetailsHeaderProps) {
    super(props);

    this.state = {
      columnResizeDetails: null,
      groupNestingDepth: this.props.groupNestingDepth,
      isAllCollapsed: this.props.isAllCollapsed
    };

    this._onToggleCollapseAll = this._onToggleCollapseAll.bind(this);
    this._onSelectAllClicked = this._onSelectAllClicked.bind(this);
  }

  public componentDidMount() {
    let { selection } = this.props;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);
    this._events.on(this.refs.root, 'mousedown', this._onSizerDown);
  }

  public componentWillReceiveProps(newProps) {
    let { groupNestingDepth } = this.state;

    if (newProps.groupNestingDepth !== groupNestingDepth) {
      this.setState({ groupNestingDepth: newProps.groupNestingDepth });
    }
  }

  public render() {
    let { columns, ariaLabel, ariaLabelForSelectAllCheckbox, selectAllVisibility } = this.props;
    let { isAllSelected, columnResizeDetails, isSizing, groupNestingDepth, isAllCollapsed } = this.state;

    return (
      <div
        role='row'
        aria-label= { ariaLabel }
        className={ css('ms-DetailsHeader', {
          'is-allSelected': isAllSelected,
          'is-selectAllHidden': selectAllVisibility === SelectAllVisibility.hidden,
          'is-resizingColumn': !!columnResizeDetails && isSizing
        }) }
        onMouseMove={ this._onMove.bind(this) }
        onMouseUp={ this._onUp.bind(this) }
        ref='root'
        data-automationid='DetailsHeader'>
        <FocusZone ref='focusZone' direction={ FocusZoneDirection.horizontal }>
          <div className='ms-DetailsHeader-cellWrapper' role='columnheader'>
            { (selectAllVisibility === SelectAllVisibility.visible) ? (
              <button
                className='ms-DetailsHeader-cell is-check'
                onClick={ this._onSelectAllClicked }
                aria-label={ ariaLabelForSelectAllCheckbox }
                aria-pressed={ isAllSelected }
                >
                <Check isChecked={ isAllSelected } />
              </button>
            ) : null }
          </div>
          { groupNestingDepth > 0 ? (
          <button className='ms-DetailsHeader-cell' onClick={ this._onToggleCollapseAll }>
            <i className={ css('ms-DetailsHeader-collapseButton ms-Icon ms-Icon--ChevronDown', {
              'is-collapsed': isAllCollapsed
            }) } >
            </i>
          </button>
          ) : (null) }
          { GroupSpacer({ count: groupNestingDepth - 1 }) }
          { columns.map((column, columnIndex) => (
            <div key={ column.key } className='ms-DetailsHeader-cellSizeWrapper'>
              <div className='ms-DetailsHeader-cellWrapper' role='columnheader'>
                <button
                  key={ column.fieldName }
                  disabled={ column.columnActionsMode === ColumnActionsMode.disabled }
                  className={ css('ms-DetailsHeader-cell', column.headerClassName, {
                    'is-actionable': column.columnActionsMode !== ColumnActionsMode.disabled,
                    'is-empty': !column.name,
                    'is-icon-visible': column.isSorted || column.isGrouped || column.isFiltered
                  }) }
                  style={ { width: column.calculatedWidth + INNER_PADDING } }
                  onClick={ this._onColumnClick.bind(this, column) }
                  onContextMenu={ this._onColumnContextMenu.bind(this, column) }
                  aria-haspopup={ column.columnActionsMode === ColumnActionsMode.hasDropdown }
                  aria-label={ column.ariaLabel || column.name }
                  aria-sort={ column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none' }
                  data-automationid='ColumnsHeaderColumn'
                  data-item-key={ column.key }
                  >

                  { column.isFiltered && (
                    <i className='ms-Icon ms-Icon--filter' />
                  ) }

                  { column.isSorted && (
                    <i className={ css('ms-Icon', {
                      'ms-Icon--SortUp': !column.isSortedDescending,
                      'ms-Icon--SortDown': column.isSortedDescending
                    }) } />
                  ) }

                  { column.isGrouped && (
                    <i className='ms-Icon ms-Icon--GroupedDescending' />
                  ) }

                  { column.iconClassName && (
                    <i className= {'ms-Icon ' + column.iconClassName} />
                  ) }

                  { column.name }

                  { column.columnActionsMode === ColumnActionsMode.hasDropdown && (
                    <i className='ms-DetailsHeader-filterChevron ms-Icon ms-Icon--ChevronDown' />
                  ) }
                </button>
              </div>
              { (column.isResizable) ? (
                <div
                  data-sizer-index={ columnIndex }
                  className={ css('ms-DetailsHeader-cell is-sizer', {
                    'is-resizing': columnResizeDetails && columnResizeDetails.columnIndex === columnIndex && isSizing
                  }) }
                  onDoubleClick={ this._onSizerDoubleClick.bind(this, columnIndex) }
                  />
              ) : (null) }
            </div>
          )) }
        </FocusZone>
      </div>
    );
  }

  /** Set focus to the active thing in the focus area. */
  public focus(): boolean {
    return this.refs.focusZone.focus();
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
  private _onSelectAllClicked() {
    let { selection } = this.props;

    selection.toggleAllSelected();
  }

  /**
   * mouse move event handler in the header
   * it will set isSizing state to true when user clicked on the sizer and move the mouse.
   *
   * @private
   * @param {React.MouseEvent} ev (mouse move event)
   */
  private _onMove(ev: React.MouseEvent<HTMLElement>) {
    let {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons = MOUSEMOVE_PRIMARY_BUTTON
    } = ev;

    let { onColumnIsSizingChanged, columns } = this.props;
    let { columnResizeDetails, isSizing } = this.state;

    if (columnResizeDetails) {
      if (buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
        // cancel mouse down event and return early when the primary button is not pressed
        this._onUp(ev);
        return;
      }

      if (!isSizing && ev.clientX !== columnResizeDetails.originX) {
        isSizing = true;

        this._events.on(window, 'mousemove', this._onSizerMove, true);
        this._events.on(window, 'mouseup', this._onSizerUp, true);

        this.setState({ isSizing: isSizing });

        if (onColumnIsSizingChanged) {
          onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], true);
        }

      }
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
  private _onUp(ev: React.MouseEvent<HTMLElement>) {
    this.setState({
      columnResizeDetails: null,
      isSizing: false
    });
  }

  private _onSizerDown(ev: MouseEvent) {
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

  private _onSelectionChanged() {
    let isAllSelected = this.props.selection.isAllSelected();

    if (this.state.isAllSelected !== isAllSelected) {
      this.setState({
        isAllSelected: isAllSelected
      });
    }
  }

  private _onSizerMove(ev: React.MouseEvent<HTMLElement>) {
    let {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons = MOUSEMOVE_PRIMARY_BUTTON
    } = ev;

    let { columnResizeDetails } = this.state;

    if (columnResizeDetails) {
      if (buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
        // cancel mouse down event and return early when the primary button is not pressed
        this._onSizerUp();
        return;
      }

      let { onColumnResized, columns } = this.props;

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
  }

  private _onSizerUp() {
    let { columns, onColumnIsSizingChanged } = this.props;
    let { columnResizeDetails } = this.state;

    this._events.off(window);

    this.setState({
      columnResizeDetails: null,
      isSizing: false
    });

    if (onColumnIsSizingChanged) {
      onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
    }
  }

  private _onColumnClick(column, ev) {
    let { onColumnClick } = this.props;

    if (column.onColumnClick) {
      column.onColumnClick(ev, column);
    }

    if (onColumnClick) {
      onColumnClick(ev, column);
    }
  }

  private _onColumnContextMenu(column, ev) {
    let { onColumnContextMenu } = this.props;

    if (column.onContextMenu) {
      column.onColumnContextMenu(column, ev);
    }

    if (onColumnContextMenu) {
      onColumnContextMenu(column, ev);
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
