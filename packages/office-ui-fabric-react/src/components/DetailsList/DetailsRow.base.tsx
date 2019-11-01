import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeComponentRef, EventGroup, IDisposable, css, shallowCompare, getNativeProps, divProperties } from '../../Utilities';
import { IColumn, CheckboxVisibility } from './DetailsList.types';
import { DetailsRowCheck } from './DetailsRowCheck';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { DetailsRowFields } from './DetailsRowFields';
import { FocusZone, FocusZoneDirection, IFocusZone } from '../../FocusZone';
import { SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { CollapseAllVisibility } from '../../GroupedList';
import { IDragDropOptions } from './../../utilities/dragdrop/interfaces';
import { IDetailsRowBaseProps } from './DetailsRow.types';
import { IDetailsRowCheckProps } from './DetailsRowCheck.types';
import { IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types';
import { classNamesFunction } from '../../Utilities';
import { IDetailsRowFieldsProps } from './DetailsRowFields.types';
import { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDetailsRowStyleProps, IDetailsRowStyles>();

export interface IDetailsRowSelectionState {
  isSelected: boolean;
  isSelectionModal: boolean;
}

export interface IDetailsRowState {
  selectionState: IDetailsRowSelectionState;
  columnMeasureInfo?: {
    index: number;
    column: IColumn;
    onMeasureDone: (measuredWidth: number) => void;
  };
  isDropping?: boolean;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

const NO_COLUMNS: IColumn[] = [];

export class DetailsRowBase extends React.Component<IDetailsRowBaseProps, IDetailsRowState> {
  private _events: EventGroup;
  private _root: HTMLElement | undefined;
  private _cellMeasurer = React.createRef<HTMLSpanElement>();
  private _focusZone = React.createRef<IFocusZone>();
  private _droppingClassNames: string;
  /** Whether this.props.onDidMount has been called */
  private _onDidMountCalled: boolean;
  private _dragDropSubscription: IDisposable;

  private _classNames: IProcessedStyleSet<IDetailsRowStyles>;
  private _rowClassNames: IDetailsRowFieldsProps['rowClassNames'];

  constructor(props: IDetailsRowBaseProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    this.state = {
      selectionState: this._getSelectionState(props),
      columnMeasureInfo: undefined,
      isDropping: false
    };

    this._droppingClassNames = '';
  }

  public componentDidMount(): void {
    const { dragDropHelper } = this.props;

    if (dragDropHelper) {
      this._dragDropSubscription = dragDropHelper.subscribe(this._root as HTMLElement, this._events, this._getRowDragDropOptions());
    }

    this._events.on(this.props.selection, SELECTION_CHANGE, this._onSelectionChanged);

    if (this.props.onDidMount && this.props.item) {
      // If the item appears later, we should wait for it before calling this method.
      this._onDidMountCalled = true;
      this.props.onDidMount(this);
    }
  }

  public componentDidUpdate(previousProps: IDetailsRowBaseProps) {
    const state = this.state;
    const { item, onDidMount } = this.props;
    const { columnMeasureInfo } = state;

    if (
      this.props.itemIndex !== previousProps.itemIndex ||
      this.props.item !== previousProps.item ||
      this.props.dragDropHelper !== previousProps.dragDropHelper
    ) {
      if (this._dragDropSubscription) {
        this._dragDropSubscription.dispose();
        delete this._dragDropSubscription;
      }

      if (this.props.dragDropHelper) {
        this._dragDropSubscription = this.props.dragDropHelper.subscribe(
          this._root as HTMLElement,
          this._events,
          this._getRowDragDropOptions()
        );
      }
    }

    if (columnMeasureInfo && columnMeasureInfo.index >= 0 && this._cellMeasurer.current) {
      const newWidth = this._cellMeasurer.current.getBoundingClientRect().width;

      columnMeasureInfo.onMeasureDone(newWidth);

      this.setState({
        columnMeasureInfo: undefined
      });
    }

    if (item && onDidMount && !this._onDidMountCalled) {
      this._onDidMountCalled = true;
      onDidMount(this);
    }
  }

  public componentWillUnmount(): void {
    const { item, onWillUnmount } = this.props;

    // Only call the onWillUnmount callback if we have an item.
    if (onWillUnmount && item) {
      onWillUnmount(this);
    }

    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
      delete this._dragDropSubscription;
    }

    this._events.dispose();
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(newProps: IDetailsRowBaseProps): void {
    this.setState({
      selectionState: this._getSelectionState(newProps)
    });
  }

  public shouldComponentUpdate(nextProps: IDetailsRowBaseProps, nextState: IDetailsRowState): boolean {
    if (this.props.useReducedRowRenderer) {
      const newSelectionState = this._getSelectionState(nextProps);
      if (this.state.selectionState.isSelected !== newSelectionState.isSelected) {
        return true;
      }
      return !shallowCompare(this.props, nextProps);
    } else {
      return true;
    }
  }

  public render(): JSX.Element {
    const {
      className,
      columns = NO_COLUMNS,
      dragDropEvents,
      item,
      itemIndex,
      onRenderCheck = this._onRenderCheck,
      onRenderDetailsCheckbox,
      onRenderItemColumn,
      getCellValueKey,
      selectionMode,
      rowWidth = 0,
      checkboxVisibility,
      getRowAriaLabel,
      getRowAriaDescribedBy,
      checkButtonAriaLabel,
      checkboxCellClassName,
      /** Alias rowFieldsAs as RowFields and default to DetailsRowFields if rowFieldsAs does not exist */
      rowFieldsAs: RowFields = DetailsRowFields,
      selection,
      indentWidth,
      enableUpdateAnimations,
      compact,
      theme,
      styles,
      cellsByColumn,
      groupNestingDepth,
      useFastIcons = true
    } = this.props;
    const { columnMeasureInfo, isDropping } = this.state;
    const { isSelected = false, isSelectionModal = false } = this.state.selectionState;
    const isDraggable = dragDropEvents ? !!(dragDropEvents.canDrag && dragDropEvents.canDrag(item)) : undefined;
    const droppingClassName = isDropping ? this._droppingClassNames || DEFAULT_DROPPING_CSS_CLASS : '';
    const ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : undefined;
    const ariaDescribedBy = getRowAriaDescribedBy ? getRowAriaDescribedBy(item) : undefined;
    const canSelect = !!selection && selection.canSelectItem(item, itemIndex);
    const isContentUnselectable = selectionMode === SelectionMode.multiple;
    const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;
    const ariaSelected = selectionMode === SelectionMode.none ? undefined : isSelected;

    this._classNames = {
      ...this._classNames,
      ...getClassNames(styles, {
        theme: theme!,
        isSelected,
        canSelect: !isContentUnselectable,
        anySelected: isSelectionModal,
        checkboxCellClassName,
        droppingClassName,
        className,
        compact,
        enableUpdateAnimations
      })
    };

    const rowClassNames: IDetailsRowFieldsProps['rowClassNames'] = {
      isMultiline: this._classNames.isMultiline,
      isRowHeader: this._classNames.isRowHeader,
      cell: this._classNames.cell,
      cellAnimation: this._classNames.cellAnimation,
      cellPadded: this._classNames.cellPadded,
      cellUnpadded: this._classNames.cellUnpadded,
      fields: this._classNames.fields
    };

    // Only re-assign rowClassNames when classNames have changed.
    // Otherwise, they will cause DetailsRowFields to unnecessarily
    // re-render, see https://github.com/OfficeDev/office-ui-fabric-react/pull/8799.
    // Refactor DetailsRowFields to generate own styles to remove need for this.
    if (!shallowCompare(this._rowClassNames || {}, rowClassNames)) {
      this._rowClassNames = rowClassNames;
    }

    const rowFields = (
      <RowFields
        rowClassNames={this._rowClassNames}
        cellsByColumn={cellsByColumn}
        columns={columns}
        item={item}
        itemIndex={itemIndex}
        columnStartIndex={showCheckbox ? 1 : 0}
        onRenderItemColumn={onRenderItemColumn}
        getCellValueKey={getCellValueKey}
        enableUpdateAnimations={enableUpdateAnimations}
      />
    );

    return (
      <FocusZone
        data-is-focusable={true}
        {...getNativeProps(this.props, divProperties)}
        {...(typeof isDraggable === 'boolean'
          ? {
              'data-is-draggable': isDraggable, // This data attribute is used by some host applications.
              draggable: isDraggable
            }
          : {})}
        direction={FocusZoneDirection.horizontal}
        ref={this._onRootRef}
        componentRef={this._focusZone}
        role="row"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={this._classNames.root}
        data-selection-index={itemIndex}
        data-item-index={itemIndex}
        aria-rowindex={itemIndex + 1}
        data-automationid="DetailsRow"
        style={{ minWidth: rowWidth }}
        aria-selected={ariaSelected}
        allowFocusRoot={true}
      >
        {showCheckbox && (
          <div role="gridcell" aria-colindex={1} data-selection-toggle={true} className={this._classNames.checkCell}>
            {onRenderCheck({
              selected: isSelected,
              anySelected: isSelectionModal,
              'aria-label': checkButtonAriaLabel,
              canSelect,
              compact,
              className: this._classNames.check,
              theme,
              isVisible: checkboxVisibility === CheckboxVisibility.always,
              onRenderDetailsCheckbox: onRenderDetailsCheckbox,
              useFastIcons
            })}
          </div>
        )}

        <GroupSpacer
          indentWidth={indentWidth}
          count={groupNestingDepth! - (this.props.collapseAllVisibility === CollapseAllVisibility.hidden ? 1 : 0)}
        />

        {item && rowFields}
        {columnMeasureInfo && (
          <span role="presentation" className={css(this._classNames.cellMeasurer, this._classNames.cell)} ref={this._cellMeasurer}>
            <RowFields
              rowClassNames={this._rowClassNames}
              columns={[columnMeasureInfo.column]}
              item={item}
              itemIndex={itemIndex}
              columnStartIndex={(showCheckbox ? 1 : 0) + columns.length}
              onRenderItemColumn={onRenderItemColumn}
              getCellValueKey={getCellValueKey}
            />
          </span>
        )}

        <span role="checkbox" className={this._classNames.checkCover} aria-checked={isSelected} data-selection-toggle={true} />
      </FocusZone>
    );
  }

  /**
   * measure cell at index. and call the call back with the measured cell width when finish measure
   *
   * @param index - The cell index
   * @param onMeasureDone - The call back function when finish measure
   */
  public measureCell(index: number, onMeasureDone: (width: number) => void): void {
    const { columns = NO_COLUMNS } = this.props;
    const column: IColumn = { ...columns[index] };

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

  public focus(forceIntoFirstElement: boolean = false): boolean {
    return !!this._focusZone.current && this._focusZone.current.focus(forceIntoFirstElement);
  }

  protected _onRenderCheck(props: IDetailsRowCheckProps) {
    return <DetailsRowCheck {...props} />;
  }

  private _getSelectionState(props: IDetailsRowBaseProps): IDetailsRowSelectionState {
    const { itemIndex, selection } = props;

    return {
      isSelected: !!selection && selection.isIndexSelected(itemIndex),
      isSelectionModal: !!selection && !!selection.isModal && selection.isModal()
    };
  }

  private _onSelectionChanged = (): void => {
    const selectionState = this._getSelectionState(this.props);

    if (!shallowCompare(selectionState, this.state.selectionState)) {
      this.setState({
        selectionState: selectionState
      });
    }
  };

  private _onRootRef = (focusZone: FocusZone): void => {
    if (focusZone) {
      // Need to resolve the actual DOM node, not the component. The element itself will be used for drag/drop and focusing.
      this._root = ReactDOM.findDOMNode(focusZone) as HTMLElement;
    } else {
      this._root = undefined;
    }
  };

  private _getRowDragDropOptions(): IDragDropOptions {
    const { item, itemIndex, dragDropEvents, eventsToRegister } = this.props;
    const options = {
      eventMap: eventsToRegister,
      selectionIndex: itemIndex,
      context: { data: item, index: itemIndex },
      canDrag: dragDropEvents!.canDrag,
      canDrop: dragDropEvents!.canDrop,
      onDragStart: dragDropEvents!.onDragStart,
      updateDropState: this._updateDroppingState,
      onDrop: dragDropEvents!.onDrop,
      onDragEnd: dragDropEvents!.onDragEnd
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
   * @param newValue - New isDropping state value
   * @param event - The event trigger dropping state change which can be dragenter, dragleave etc
   */
  private _updateDroppingState = (newValue: boolean, event: DragEvent): void => {
    const { isDropping } = this.state;
    const { dragDropEvents, item } = this.props;

    if (!newValue) {
      if (dragDropEvents!.onDragLeave) {
        dragDropEvents!.onDragLeave(item, event);
      }
    } else if (dragDropEvents!.onDragEnter) {
      this._droppingClassNames = dragDropEvents!.onDragEnter(item, event);
    }

    if (isDropping !== newValue) {
      this.setState({ isDropping: newValue });
    }
  };
}
