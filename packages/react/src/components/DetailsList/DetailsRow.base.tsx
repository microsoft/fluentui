import * as React from 'react';
import {
  initializeComponentRef,
  EventGroup,
  css,
  shallowCompare,
  getNativeProps,
  divProperties,
  composeComponentAs,
} from '../../Utilities';
import { CheckboxVisibility } from './DetailsList.types';
import { DetailsRowCheck } from './DetailsRowCheck';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { DetailsRowFields } from './DetailsRowFields';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { SelectionMode, SELECTION_CHANGE } from '../../Selection';
import { CollapseAllVisibility } from '../../GroupedList';
import { classNamesFunction } from '../../Utilities';
import type { IDisposable } from '../../Utilities';
import type { IColumn } from './DetailsList.types';
import type { IFocusZone } from '../../FocusZone';
import type { IDragDropOptions } from '../../DragDrop';
import type { IDetailsRowBaseProps, IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types';
import type { IDetailsRowCheckProps } from './DetailsRowCheck.types';
import type { IDetailsRowFieldsProps } from './DetailsRowFields.types';
import type { IProcessedStyleSet } from '../../Styling';
import { getId } from '../../Utilities';

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
  private _root = React.createRef<HTMLElement>();
  private _cellMeasurer = React.createRef<HTMLSpanElement>();
  private _focusZone = React.createRef<IFocusZone>();
  private _droppingClassNames: string;
  /** Whether this.props.onDidMount has been called */
  private _onDidMountCalled: boolean;
  private _dragDropSubscription?: IDisposable;

  private _classNames: IProcessedStyleSet<IDetailsRowStyles>;
  private _rowClassNames: IDetailsRowFieldsProps['rowClassNames'];
  private _ariaRowDescriptionId: string;

  public static getDerivedStateFromProps(
    nextProps: IDetailsRowBaseProps,
    previousState: IDetailsRowState,
  ): IDetailsRowState {
    return {
      ...previousState,
      selectionState: getSelectionState(nextProps),
    };
  }

  constructor(props: IDetailsRowBaseProps) {
    super(props);

    initializeComponentRef(this);
    this._events = new EventGroup(this);

    this.state = {
      selectionState: getSelectionState(props),
      columnMeasureInfo: undefined,
      isDropping: false,
    };

    this._droppingClassNames = '';
  }
  public componentDidMount(): void {
    const { dragDropHelper, selection, item, onDidMount } = this.props;

    if (dragDropHelper && this._root.current) {
      this._dragDropSubscription = dragDropHelper.subscribe(
        this._root.current,
        this._events,
        this._getRowDragDropOptions(),
      );
    }

    if (selection) {
      this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);
    }

    if (onDidMount && item) {
      // If the item appears later, we should wait for it before calling this method.
      this._onDidMountCalled = true;
      onDidMount(this);
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

      if (this.props.dragDropHelper && this._root.current) {
        this._dragDropSubscription = this.props.dragDropHelper.subscribe(
          this._root.current,
          this._events,
          this._getRowDragDropOptions(),
        );
      }
    }

    if (columnMeasureInfo && columnMeasureInfo.index >= 0 && this._cellMeasurer.current) {
      const newWidth = this._cellMeasurer.current.getBoundingClientRect().width;

      columnMeasureInfo.onMeasureDone(newWidth);

      this.setState({
        columnMeasureInfo: undefined,
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

  public shouldComponentUpdate(nextProps: IDetailsRowBaseProps, nextState: IDetailsRowState): boolean {
    if (this.props.useReducedRowRenderer) {
      const newSelectionState = getSelectionState(nextProps);
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
      id,
      flatIndexOffset = 2,
      onRenderCheck = this._onRenderCheck,
      onRenderDetailsCheckbox,
      onRenderItemColumn,
      onRenderField,
      getCellValueKey,
      selectionMode,
      rowWidth = 0,
      checkboxVisibility,
      getRowAriaLabel,
      getRowAriaDescription,
      getRowAriaDescribedBy,
      checkButtonAriaLabel,
      checkboxCellClassName,
      /** Alias rowFieldsAs as RowFields and default to DetailsRowFields if rowFieldsAs does not exist */
      rowFieldsAs,
      selection,
      indentWidth,
      enableUpdateAnimations,
      compact,
      theme,
      styles,
      cellsByColumn,
      groupNestingDepth,
      useFastIcons = true,
      cellStyleProps,
      group,
      focusZoneProps,
      disabled = false,
    } = this.props;
    const { columnMeasureInfo, isDropping } = this.state;
    const { isSelected = false, isSelectionModal = false } = this.state.selectionState;
    const isDraggable = dragDropEvents ? !!(dragDropEvents.canDrag && dragDropEvents.canDrag(item)) : undefined;
    const droppingClassName = isDropping ? this._droppingClassNames || DEFAULT_DROPPING_CSS_CLASS : '';
    const ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : undefined;
    const ariaRowDescription = getRowAriaDescription ? getRowAriaDescription(item) : undefined;
    const ariaDescribedBy = getRowAriaDescribedBy ? getRowAriaDescribedBy(item) : undefined;
    const canSelect = !!selection && selection.canSelectItem(item, itemIndex) && !disabled;
    const isContentUnselectable = selectionMode === SelectionMode.multiple;
    const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;
    const ariaSelected = selectionMode === SelectionMode.none ? undefined : isSelected;
    const ariaPositionInSet = group ? itemIndex - group.startIndex + 1 : undefined;
    const ariaSetSize = group ? group.count : undefined;
    const focusZoneDirection = focusZoneProps ? focusZoneProps.direction : FocusZoneDirection.horizontal;

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
        enableUpdateAnimations,
        cellStyleProps,
        disabled,
      }),
    };

    const rowClassNames: IDetailsRowFieldsProps['rowClassNames'] = {
      isMultiline: this._classNames.isMultiline,
      isRowHeader: this._classNames.isRowHeader,
      cell: this._classNames.cell,
      cellAnimation: this._classNames.cellAnimation,
      cellPadded: this._classNames.cellPadded,
      cellUnpadded: this._classNames.cellUnpadded,
      fields: this._classNames.fields,
    };

    // Only re-assign rowClassNames when classNames have changed.
    // Otherwise, they will cause DetailsRowFields to unnecessarily
    // re-render, see https://github.com/microsoft/fluentui/pull/8799.
    // Refactor DetailsRowFields to generate own styles to remove need for this.
    if (!shallowCompare(this._rowClassNames || {}, rowClassNames)) {
      this._rowClassNames = rowClassNames;
    }

    const RowFields = rowFieldsAs ? composeComponentAs(rowFieldsAs, DetailsRowFields) : DetailsRowFields;

    const rowFields = (
      <RowFields
        rowClassNames={this._rowClassNames}
        rowHeaderId={`${id}-header`}
        cellsByColumn={cellsByColumn}
        columns={columns}
        item={item}
        itemIndex={itemIndex}
        isSelected={isSelected}
        columnStartIndex={(showCheckbox ? 1 : 0) + (groupNestingDepth ? 1 : 0)}
        onRenderItemColumn={onRenderItemColumn}
        onRenderField={onRenderField}
        getCellValueKey={getCellValueKey}
        enableUpdateAnimations={enableUpdateAnimations}
        cellStyleProps={cellStyleProps}
      />
    );

    const defaultRole = 'row';
    const role = this.props.role ? this.props.role : defaultRole;
    this._ariaRowDescriptionId = getId('DetailsRow-description');

    // When the user does not specify any column is a row-header in the columns props,
    // The aria-labelledby of the checkbox does not specify {id}-header.
    const hasRowHeader = columns.some(column => {
      return !!column.isRowHeader;
    });
    const ariaLabelledby = `${id}-checkbox` + (hasRowHeader ? ` ${id}-header` : '');

    return (
      <FocusZone
        data-is-focusable={true}
        {...getNativeProps(this.props, divProperties)}
        {...(typeof isDraggable === 'boolean'
          ? {
              'data-is-draggable': isDraggable, // This data attribute is used by some host applications.
              draggable: isDraggable,
            }
          : {})}
        {...focusZoneProps}
        direction={focusZoneDirection}
        elementRef={this._root}
        componentRef={this._focusZone}
        role={role}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        aria-describedby={ariaRowDescription ? this._ariaRowDescriptionId : ariaDescribedBy}
        className={this._classNames.root}
        data-selection-index={itemIndex}
        data-selection-touch-invoke={true}
        data-selection-disabled={disabled || undefined}
        data-item-index={itemIndex}
        aria-rowindex={ariaPositionInSet === undefined ? itemIndex + flatIndexOffset : undefined}
        aria-level={(groupNestingDepth && groupNestingDepth + 1) || undefined}
        aria-posinset={ariaPositionInSet}
        aria-setsize={ariaSetSize}
        data-automationid="DetailsRow"
        style={{ minWidth: rowWidth }}
        aria-selected={ariaSelected}
        allowFocusRoot={true}
      >
        {ariaRowDescription ? (
          <span key="description" role="presentation" hidden={true} id={this._ariaRowDescriptionId}>
            {ariaRowDescription}
          </span>
        ) : null}
        {showCheckbox && (
          <div role="gridcell" data-selection-toggle={true} className={this._classNames.checkCell}>
            {onRenderCheck({
              id: id ? `${id}-checkbox` : undefined,
              selected: isSelected,
              selectionMode,
              anySelected: isSelectionModal,
              'aria-label': checkButtonAriaLabel,
              'aria-labelledby': id ? ariaLabelledby : undefined,
              canSelect,
              compact,
              className: this._classNames.check,
              theme,
              isVisible: checkboxVisibility === CheckboxVisibility.always,
              onRenderDetailsCheckbox: onRenderDetailsCheckbox,
              useFastIcons,
            })}
          </div>
        )}

        <GroupSpacer
          indentWidth={indentWidth}
          role="gridcell"
          count={groupNestingDepth! - (this.props.collapseAllVisibility === CollapseAllVisibility.hidden ? 1 : 0)}
        />

        {item && rowFields}
        {columnMeasureInfo && (
          <span
            role="presentation"
            className={css(this._classNames.cellMeasurer, this._classNames.cell)}
            ref={this._cellMeasurer}
          >
            <RowFields
              rowClassNames={this._rowClassNames}
              rowHeaderId={`${id}-header`}
              columns={[columnMeasureInfo.column]}
              item={item}
              itemIndex={itemIndex}
              columnStartIndex={(showCheckbox ? 1 : 0) + (groupNestingDepth ? 1 : 0) + columns.length}
              onRenderItemColumn={onRenderItemColumn}
              getCellValueKey={getCellValueKey}
            />
          </span>
        )}

        <span
          role="checkbox"
          className={this._classNames.checkCover}
          aria-checked={isSelected}
          data-selection-toggle={true}
        />
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
        onMeasureDone,
      },
    });
  }

  public focus(forceIntoFirstElement: boolean = false): boolean {
    return !!this._focusZone.current?.focus(forceIntoFirstElement);
  }

  protected _onRenderCheck(props: IDetailsRowCheckProps) {
    return <DetailsRowCheck {...props} />;
  }

  private _onSelectionChanged = (): void => {
    const selectionState = getSelectionState(this.props);

    if (!shallowCompare(selectionState, this.state.selectionState)) {
      this.setState({
        selectionState: selectionState,
      });
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
      onDragEnd: dragDropEvents!.onDragEnd,
      onDragOver: dragDropEvents!.onDragOver,
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

function getSelectionState(props: IDetailsRowBaseProps): IDetailsRowSelectionState {
  const { itemIndex, selection } = props;

  return {
    isSelected: !!selection?.isIndexSelected(itemIndex),
    isSelectionModal: !!selection?.isModal?.(),
  };
}
