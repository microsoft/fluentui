import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseComponent,
  IDisposable,
  assign,
  autobind,
  css,
  shallowCompare,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IColumn, CheckboxVisibility } from './DetailsList.Props';
import { DetailsRowCheck, IDetailsRowCheckProps } from './DetailsRowCheck';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { DetailsRowFields } from './DetailsRowFields';
import { FocusZone, FocusZoneDirection, IFocusZone } from '../../FocusZone';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { CollapseAllVisibility } from '../../GroupedList';
import {
  IDragDropHelper,
  IDragDropEvents,
  IDragDropOptions,
} from './../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';
import * as stylesImport from './DetailsRow.scss';
const styles: any = stylesImport;
import { AnimationClassNames } from '../../Styling';
import * as checkStyles from './DetailsRowCheck.scss';

export interface IDetailsRowProps extends React.Props<DetailsRow> {
  componentRef?: () => void;
  item: any;
  itemIndex: number;
  columns: IColumn[];
  selectionMode: SelectionMode;
  selection: ISelection;
  eventsToRegister?: { eventName: string, callback: (item?: any, index?: number, event?: any) => void }[];
  onDidMount?: (row?: DetailsRow) => void;
  onWillUnmount?: (row?: DetailsRow) => void;
  onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  dragDropEvents?: IDragDropEvents;
  dragDropHelper?: IDragDropHelper;
  groupNestingDepth?: number;
  viewport?: IViewport;
  checkboxVisibility?: CheckboxVisibility;
  collapseAllVisibility?: CollapseAllVisibility;
  getRowAriaLabel?: (item: any) => string;
  checkButtonAriaLabel?: string;
}

export interface IDetailsRowSelectionState {
  isSelected: boolean;
  anySelected: boolean;
}

export interface IDetailsRowState {
  selectionState?: IDetailsRowSelectionState;
  columnMeasureInfo?: {
    index: number;
    column: IColumn;
    onMeasureDone: (measuredWidth: number) => void;
  };
  isDropping?: boolean;
  groupNestingDepth?: number;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

export class DetailsRow extends BaseComponent<IDetailsRowProps, IDetailsRowState> {
  public refs: {
    [key: string]: React.ReactInstance,
    cellMeasurer: HTMLElement
  };

  private _root: HTMLElement;
  private _focusZone: IFocusZone;
  private _hasSetFocus: boolean;
  private _droppingClassNames: string;
  private _hasMounted: boolean;
  private _dragDropSubscription: IDisposable;

  constructor(props: IDetailsRowProps) {
    super(props);

    this.state = {
      selectionState: this._getSelectionState(props),
      columnMeasureInfo: null,
      isDropping: false,
      groupNestingDepth: props.groupNestingDepth
    };

    this._hasSetFocus = false;

    this._droppingClassNames = '';

    this._updateDroppingState = this._updateDroppingState.bind(this);
    this._onToggleSelection = this._onToggleSelection.bind(this);
  }

  public componentDidMount() {
    let { dragDropHelper } = this.props;

    if (dragDropHelper) {
      this._dragDropSubscription = dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
    }

    this._events.on(this.props.selection, SELECTION_CHANGE, this._onSelectionChanged);

    if (this.props.onDidMount && this.props.item) {
      // If the item appears later, we should wait for it before calling this method.
      this._hasMounted = true;
      this.props.onDidMount(this);
    }
  }

  public componentDidUpdate(previousProps: IDetailsRowProps) {
    let state = this.state;
    let { item, onDidMount } = this.props;
    let { columnMeasureInfo } = state;

    if (this.props.itemIndex !== previousProps.itemIndex ||
      this.props.item !== previousProps.item ||
      this.props.dragDropHelper !== previousProps.dragDropHelper) {
      if (this._dragDropSubscription) {
        this._dragDropSubscription.dispose();
        delete this._dragDropSubscription;
      }

      if (this.props.dragDropHelper) {
        this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
      }
    }

    if (columnMeasureInfo && columnMeasureInfo.index >= 0) {
      let newWidth = this.refs.cellMeasurer.getBoundingClientRect().width;

      columnMeasureInfo.onMeasureDone(newWidth);

      this.setState({
        columnMeasureInfo: null
      });
    }

    if (item && onDidMount && !this._hasMounted) {
      this._hasMounted = true;
      onDidMount(this);
    }
  }

  public componentWillUnmount() {
    let { item, onWillUnmount } = this.props;

    // Only call the onWillUnmount callback if we have an item.
    if (onWillUnmount && item) {
      onWillUnmount(this);
    }

    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }
  }

  public componentWillReceiveProps(newProps: IDetailsRowProps) {
    this.setState({
      selectionState: this._getSelectionState(newProps),
      groupNestingDepth: newProps.groupNestingDepth
    });
  }

  public render() {
    const {
      columns,
      dragDropEvents,
      item,
      itemIndex,
      onRenderCheck = this._onRenderCheck,
      onRenderItemColumn,
      selectionMode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      checkButtonAriaLabel,
      selection
    } = this.props;
    const { selectionState: { isSelected, anySelected }, columnMeasureInfo, isDropping, groupNestingDepth } = this.state;
    const isDraggable = Boolean(dragDropEvents && dragDropEvents.canDrag && dragDropEvents.canDrag(item));
    const droppingClassName = isDropping ? (this._droppingClassNames ? this._droppingClassNames : DEFAULT_DROPPING_CSS_CLASS) : '';
    const ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : null;
    const canSelect = selection.canSelectItem(item);
    const isContentUnselectable = selectionMode === SelectionMode.multiple;
    const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;

    return (
      <FocusZone
        {...getNativeProps(this.props, divProperties) }
        direction={ FocusZoneDirection.horizontal }
        ref={ this._onRootRef }
        componentRef={ this._resolveRef('_focusZone') }
        role='row'
        aria-label={ ariaLabel }
        className={ css(
          'ms-DetailsRow',
          AnimationClassNames.fadeIn400,
          styles.root,
          checkStyles.owner,
          droppingClassName,
          {
            [`is-contentUnselectable ${styles.rootIsContentUnselectable}`]: isContentUnselectable,
            [`is-selected ${checkStyles.isSelected} ${styles.rootIsSelected}`]: isSelected,
            [`is-check-visible ${checkStyles.isVisible}`]: checkboxVisibility === CheckboxVisibility.always
          }) }
        data-is-focusable={ true }
        data-selection-index={ itemIndex }
        data-item-index={ itemIndex }
        aria-rowindex={ itemIndex }
        data-is-draggable={ isDraggable }
        draggable={ isDraggable }
        data-automationid='DetailsRow'
        style={ { minWidth: viewport ? viewport.width : 0 } }
        aria-selected={ isSelected }
        allowFocusRoot={ true }
      >
        { showCheckbox && (
          <div
            role='gridcell'
            aria-colindex={ 0 }
            className={ css('ms-DetailsRow-cell', 'ms-DetailsRow-cellCheck', checkStyles.owner, styles.cell, styles.checkCell) }
          >
            { onRenderCheck({
              isSelected,
              anySelected,
              title: checkButtonAriaLabel,
              canSelect
            }) }
          </div>
        ) }

        { GroupSpacer({ count: groupNestingDepth - (this.props.collapseAllVisibility === CollapseAllVisibility.hidden ? 1 : 0) }) }

        { item && (
          <DetailsRowFields
            columns={ columns }
            item={ item }
            itemIndex={ itemIndex }
            columnStartIndex={ showCheckbox ? 1 : 0 }
            onRenderItemColumn={ onRenderItemColumn } />
        ) }

        { columnMeasureInfo && (
          <span
            role='presentation'
            className={ css('ms-DetailsRow-cellMeasurer ms-DetailsRow-cell', styles.cellMeasurer, styles.cell) }
            ref='cellMeasurer'
          >
            <DetailsRowFields
              columns={ [columnMeasureInfo.column] }
              item={ item }
              itemIndex={ itemIndex }
              columnStartIndex={ (showCheckbox ? 1 : 0) + columns.length }
              onRenderItemColumn={ onRenderItemColumn } />
          </span>
        ) }
      </FocusZone>
    );
  }

  /**
   * measure cell at index. and call the call back with the measured cell width when finish measure
   *
   * @param {number} index (the cell index)
   * @param {(width: number) => void} onMeasureDone (the call back function when finish measure)
   */
  public measureCell(index: number, onMeasureDone: (width: number) => void) {
    let column = assign({}, this.props.columns[index]) as IColumn;

    column.minWidth = 0;
    column.maxWidth = 999999;

    delete column.calculatedWidth;

    this.setState({
      columnMeasureInfo: {
        index,
        column,
        onMeasureDone
      }
    });
  }

  public focus(): boolean {
    return !!this._focusZone && this._focusZone.focus();
  }

  protected _onRenderCheck(props: IDetailsRowCheckProps) {
    return <DetailsRowCheck { ...props } />;
  }

  private _getSelectionState(props: IDetailsRowProps): IDetailsRowSelectionState {
    let { itemIndex, selection } = props;

    return {
      isSelected: selection.isIndexSelected(itemIndex),
      anySelected: selection.getSelectedCount() > 0
    };
  }

  private _onSelectionChanged() {
    let selectionState = this._getSelectionState(this.props);

    if (!shallowCompare(selectionState, this.state.selectionState)) {
      this.setState({
        selectionState: selectionState
      });
    }
  }

  private _onToggleSelection() {
    const { selection } = this.props;

    selection.toggleIndexSelected(this.props.itemIndex);
  }

  @autobind
  private _onRootRef(focusZone: FocusZone) {
    if (focusZone) {
      // Need to resolve the actual DOM node, not the component. The element itself will be used for drag/drop and focusing.
      this._root = ReactDOM.findDOMNode(focusZone) as HTMLElement;
    } else {
      this._root = undefined;
    }
  }

  private _getRowDragDropOptions(): IDragDropOptions {
    const {
      item,
      itemIndex,
      dragDropEvents,
      eventsToRegister
    } = this.props;
    let options = {
      eventMap: eventsToRegister,
      selectionIndex: itemIndex,
      context: { data: item, index: itemIndex },
      canDrag: dragDropEvents.canDrag,
      canDrop: dragDropEvents.canDrop,
      onDragStart: dragDropEvents.onDragStart,
      updateDropState: this._updateDroppingState,
      onDrop: dragDropEvents.onDrop,
      onDragEnd: dragDropEvents.onDragEnd,
    };

    return options;
  }

  /**
   * update isDropping state based on the input value, which is used to change style during drag and drop
   *
   * when change to true, that means drag enter. we will add default dropping class name
   * or the custom dropping class name (return result from onDragEnter) to the root elemet.
   *
   * when change to false, that means drag leave. we will remove the dropping class name from root element.
   *
   * @private
   * @param {boolean} newValue (new isDropping state value)
   * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
   */
  private _updateDroppingState(newValue: boolean, event: DragEvent) {
    let { selectionState, isDropping } = this.state;
    let { dragDropEvents, item } = this.props;

    if (!newValue) {
      if (dragDropEvents.onDragLeave) {
        dragDropEvents.onDragLeave(item, event);
      }
    } else {
      if (dragDropEvents.onDragEnter) {
        this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
      }
    }

    if (isDropping !== newValue) {
      this.setState({ selectionState: selectionState, isDropping: newValue });
    }
  }
}
