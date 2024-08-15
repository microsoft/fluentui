import * as React from 'react';

import {
  initializeComponentRef,
  FocusRects,
  Async,
  KeyCodes,
  elementContains,
  getRTLSafeKeyCode,
  classNamesFunction,
  css,
  memoizeFunction,
  warnMutuallyExclusive,
} from '../../Utilities';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsListLayoutMode,
  ColumnDragEndLocation,
  IColumnDragDropDetails,
} from '../DetailsList/DetailsList.types';
import { DetailsHeader } from '../DetailsList/DetailsHeader';
import { SelectAllVisibility } from '../DetailsList/DetailsHeader.types';
import { DetailsRowBase } from '../DetailsList/DetailsRow.base';
import { DetailsRow } from '../DetailsList/DetailsRow';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Selection, SelectionMode, SelectionZone } from '../../Selection';

import { DragDropHelper } from '../../DragDrop';
import { GroupedList } from '../../GroupedList';
import { List, ScrollToMode } from '../../List';
import { withViewport } from '../../utilities/decorators/withViewport';
import { GetGroupCount } from '../../utilities/groupedList/GroupedListUtility';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import { CHECK_CELL_WIDTH as CHECKBOX_WIDTH } from './DetailsRowCheck.styles';
// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.
import { SPACER_WIDTH as GROUP_EXPAND_WIDTH } from '../GroupedList/GroupSpacer';
import { composeComponentAs, composeRenderFunction, getId } from '@fluentui/utilities';
import { useConst } from '@fluentui/react-hooks';
import type { IRenderFunction } from '../../Utilities';
import type {
  IColumn,
  IDetailsList,
  IDetailsListProps,
  IDetailsListStyles,
  IDetailsListStyleProps,
} from '../DetailsList/DetailsList.types';
import type {
  IDetailsHeader,
  IDetailsHeaderProps,
  IColumnReorderHeaderProps,
} from '../DetailsList/DetailsHeader.types';
import type { IDetailsFooterProps } from '../DetailsList/DetailsFooter.types';
import type { IDetailsRowProps } from '../DetailsList/DetailsRow.types';
import type { IFocusZone, IFocusZoneProps } from '../../FocusZone';
import type { IObjectWithKey, ISelection } from '../../Selection';
import type { IGroupedList, IGroupDividerProps, IGroupRenderProps, IGroup } from '../../GroupedList';
import type { IListProps } from '../../List';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IDetailsListStyleProps, IDetailsListStyles>();
const COMPONENT_NAME = 'DetailsList';

export interface IDetailsListState {
  focusedItemIndex: number;
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns: IColumn[];
  isCollapsed?: boolean;
  isSizing?: boolean;
  isSomeGroupExpanded?: boolean;
  /**
   * A unique object used to force-update the List when it changes.
   */
  version: {};
  getDerivedStateFromProps(nextProps: IDetailsListProps, previousState: IDetailsListState): IDetailsListState;
}

const MIN_COLUMN_WIDTH = 100; // this is the global min width

const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;

const rowFocusZoneAddTabIndexProps = { tabIndex: 0 };
const rowFocusZoneNoTabIndexProps = {};

type IDetailsListInnerProps = Omit<IDetailsListProps, 'selection'> &
  IDetailsListState & {
    selection: ISelection;
    dragDropHelper: DragDropHelper | undefined;
    rootRef: React.RefObject<HTMLDivElement>;
    listRef: React.RefObject<List>;
    groupedListRef: React.RefObject<IGroupedList>;
    focusZoneRef: React.RefObject<IFocusZone>;
    headerRef: React.RefObject<IDetailsHeader>;
    selectionZoneRef: React.RefObject<SelectionZone>;
    onGroupExpandStateChanged: (isSomeGroupExpanded: boolean) => void;
    onColumnIsSizingChanged: (column: IColumn, isSizing: boolean) => void;
    onRowDidMount: (row: DetailsRowBase) => void;
    onRowWillUnmount: (row: DetailsRowBase) => void;
    onColumnResized: (resizingColumn: IColumn, newWidth: number, resizingColumnIndex: number) => void;
    onColumnAutoResized: (column: IColumn, columnIndex: number) => void;
    onToggleCollapse: (collapsed: boolean) => void;
    onActiveRowChanged: (el?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLElement>) => void;
    onRenderDefaultRow: (detailsRowProps: IDetailsRowProps) => JSX.Element;
  };

/**
 * Hooks-based implementation of DetailsList.
 * Since many existing consumers of DetailsList expect `ref` to return a `DetailsList`,
 * this inner component handles rendering while the outer maintains compatibility.
 */
const DetailsListInner: React.ComponentType<IDetailsListInnerProps> = (
  props: IDetailsListInnerProps,
): JSX.Element | null => {
  const { selection } = props;

  const {
    ariaLabelForListHeader,
    ariaLabelForSelectAllCheckbox,
    ariaLabelForSelectionColumn,
    className,
    checkboxVisibility,
    compact,
    constrainMode,
    dragDropEvents,
    groups,
    groupProps,
    indentWidth,
    items,
    isPlaceholderData,
    isHeaderVisible,
    layoutMode,
    onItemInvoked,
    onItemContextMenu,
    onColumnHeaderClick,
    onColumnHeaderContextMenu,
    selectionMode = selection.mode,
    selectionPreservedOnEmptyClick,
    selectionZoneProps,
    // eslint-disable-next-line deprecation/deprecation
    ariaLabel,
    ariaLabelForGrid,
    rowElementEventMap,
    // eslint-disable-next-line deprecation/deprecation
    shouldApplyApplicationRole = false,
    getKey,
    listProps,
    usePageCache,
    onShouldVirtualize,
    viewport,
    minimumPixelsForDrag,
    getGroupHeight,
    styles,
    theme,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    onRenderCheckbox,
    useFastIcons,
    dragDropHelper,
    adjustedColumns,
    isCollapsed,
    isSizing,
    isSomeGroupExpanded,
    version,
    rootRef,
    listRef,
    focusZoneRef,
    columnReorderOptions,
    groupedListRef,
    headerRef,
    onGroupExpandStateChanged,
    onColumnIsSizingChanged,
    onRowDidMount,
    onRowWillUnmount,
    disableSelectionZone,
    isSelectedOnFocus = true,
    onColumnResized,
    onColumnAutoResized,
    onToggleCollapse,
    onActiveRowChanged,
    onBlur,
    rowElementEventMap: eventsToRegister,
    onRenderMissingItem,
    onRenderItemColumn,
    onRenderField,
    getCellValueKey,
    getRowAriaLabel,
    getRowAriaDescribedBy,
    checkButtonAriaLabel,
    checkButtonGroupAriaLabel,
    checkboxCellClassName,
    useReducedRowRenderer,
    enableUpdateAnimations,
    enterModalSelectionOnTouch,
    onRenderDefaultRow,
    selectionZoneRef,
    focusZoneProps,
  } = props;

  const defaultRole = 'grid';
  const role = props.role ? props.role : defaultRole;

  const rowId = getId('row');

  const groupNestingDepth = getGroupNestingDepth(groups);
  const groupedDetailsListIndexMap = useGroupedDetailsListIndexMap(groups);

  const additionalListProps = React.useMemo((): IListProps => {
    return {
      renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
      renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND,
      getKey,
      version,
      ...listProps,
    };
  }, [isSizing, getKey, version, listProps]);

  let selectAllVisibility = SelectAllVisibility.none; // for SelectionMode.none
  if (selectionMode === SelectionMode.single) {
    selectAllVisibility = SelectAllVisibility.hidden;
  }
  if (selectionMode === SelectionMode.multiple) {
    // if isCollapsedGroupSelectVisible is false, disable select all when the list has all collapsed groups
    let isCollapsedGroupSelectVisible =
      groupProps && groupProps.headerProps && groupProps.headerProps.isCollapsedGroupSelectVisible;
    if (isCollapsedGroupSelectVisible === undefined) {
      isCollapsedGroupSelectVisible = true;
    }
    const isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
    selectAllVisibility = isSelectAllVisible ? SelectAllVisibility.visible : SelectAllVisibility.hidden;
  }

  if (checkboxVisibility === CheckboxVisibility.hidden) {
    selectAllVisibility = SelectAllVisibility.none;
  }

  const defaultOnRenderDetailsHeader = React.useCallback(
    (detailsHeaderProps: IDetailsHeaderProps): JSX.Element | null => {
      return <DetailsHeader {...detailsHeaderProps} />;
    },
    [],
  );

  const defaultOnRenderDetailsFooter = React.useCallback((): JSX.Element | null => {
    return null;
  }, []);

  const propsOnRenderDetailsHeader = props.onRenderDetailsHeader;

  const onRenderDetailsHeader = React.useMemo(() => {
    return propsOnRenderDetailsHeader
      ? composeRenderFunction(propsOnRenderDetailsHeader, defaultOnRenderDetailsHeader)
      : defaultOnRenderDetailsHeader;
  }, [propsOnRenderDetailsHeader, defaultOnRenderDetailsHeader]);

  const propsOnRenderDetailsFooter = props.onRenderDetailsFooter;

  const onRenderDetailsFooter = React.useMemo(() => {
    return propsOnRenderDetailsFooter
      ? composeRenderFunction(propsOnRenderDetailsFooter, defaultOnRenderDetailsFooter)
      : defaultOnRenderDetailsFooter;
  }, [propsOnRenderDetailsFooter, defaultOnRenderDetailsFooter]);

  const detailsFooterProps = React.useMemo((): IDetailsFooterProps => {
    return {
      columns: adjustedColumns,
      groupNestingDepth,
      selection,
      selectionMode,
      viewport,
      checkboxVisibility,
      indentWidth,
      cellStyleProps,
    };
  }, [
    adjustedColumns,
    groupNestingDepth,
    selection,
    selectionMode,
    viewport,
    checkboxVisibility,
    indentWidth,
    cellStyleProps,
  ]);

  const columnReorderOnDragEnd = columnReorderOptions && columnReorderOptions.onDragEnd;

  const onColumnDragEnd = React.useCallback(
    (
      {
        dropLocation,
      }: {
        dropLocation?: ColumnDragEndLocation;
      },
      event: MouseEvent,
    ): void => {
      let finalDropLocation: ColumnDragEndLocation = ColumnDragEndLocation.outside;
      if (columnReorderOnDragEnd) {
        if (dropLocation && dropLocation !== ColumnDragEndLocation.header) {
          finalDropLocation = dropLocation;
        } else if (rootRef.current) {
          const clientRect = rootRef.current.getBoundingClientRect();
          if (
            event.clientX > clientRect.left &&
            event.clientX < clientRect.right &&
            event.clientY > clientRect.top &&
            event.clientY < clientRect.bottom
          ) {
            finalDropLocation = ColumnDragEndLocation.surface;
          }
        }
        columnReorderOnDragEnd(finalDropLocation);
      }
    },
    [columnReorderOnDragEnd, rootRef],
  );

  const columnReorderProps = React.useMemo((): IColumnReorderHeaderProps | undefined => {
    if (columnReorderOptions) {
      return {
        ...columnReorderOptions,
        onColumnDragEnd,
      };
    }
  }, [columnReorderOptions, onColumnDragEnd]);

  const rowCount =
    (isHeaderVisible ? 1 : 0) +
    (props.onRenderDetailsFooter ? 1 : 0) +
    GetGroupCount(groups) +
    (items ? items.length : 0);
  const colCount =
    (selectAllVisibility !== SelectAllVisibility.none ? 1 : 0) +
    (adjustedColumns ? adjustedColumns.length : 0) +
    (groups ? 1 : 0);

  const classNames = React.useMemo(() => {
    return getClassNames(styles, {
      theme: theme!,
      compact,
      isFixed: layoutMode === DetailsListLayoutMode.fixedColumns,
      isHorizontalConstrained: constrainMode === ConstrainMode.horizontalConstrained,
      className,
    });
  }, [styles, theme, compact, layoutMode, constrainMode, className]);

  const onRenderDetailsGroupFooter = groupProps && groupProps.onRenderFooter;

  const finalOnRenderDetailsGroupFooter = React.useMemo(() => {
    return onRenderDetailsGroupFooter
      ? (groupFooterProps: IGroupDividerProps, defaultRender?: IRenderFunction<IGroupDividerProps>) => {
          return onRenderDetailsGroupFooter(
            {
              ...groupFooterProps,
              columns: adjustedColumns,
              groupNestingDepth,
              indentWidth,
              selection,
              selectionMode,
              viewport,
              checkboxVisibility,
              cellStyleProps,
            },
            defaultRender,
          );
        }
      : undefined;
  }, [
    onRenderDetailsGroupFooter,
    adjustedColumns,
    groupNestingDepth,
    indentWidth,
    selection,
    selectionMode,
    viewport,
    checkboxVisibility,
    cellStyleProps,
  ]);

  const onRenderDetailsGroupHeader = groupProps && groupProps.onRenderHeader;

  const finalOnRenderDetailsGroupHeader = React.useMemo(() => {
    return onRenderDetailsGroupHeader
      ? (groupHeaderProps: IGroupDividerProps, defaultRender?: IRenderFunction<IGroupDividerProps>) => {
          const { groupIndex } = groupHeaderProps;
          const groupKey: string | undefined =
            groupIndex !== undefined ? groupHeaderProps.groups?.[groupIndex]?.key : undefined;
          const totalRowCount: number =
            groupKey !== undefined && groupedDetailsListIndexMap[groupKey]
              ? groupedDetailsListIndexMap[groupKey].totalRowCount
              : 0;

          return onRenderDetailsGroupHeader(
            {
              ...groupHeaderProps,
              columns: adjustedColumns,
              groupNestingDepth,
              indentWidth,
              selection,
              selectionMode: checkboxVisibility !== CheckboxVisibility.hidden ? selectionMode : SelectionMode.none,
              viewport,
              checkboxVisibility,
              cellStyleProps,
              ariaColSpan: adjustedColumns.length,
              ariaLevel: undefined,
              ariaPosInSet: undefined,
              ariaSetSize: undefined,
              ariaRowCount: undefined,
              ariaRowIndex: groupIndex !== undefined ? totalRowCount + (isHeaderVisible ? 1 : 0) : undefined,
            },
            defaultRender,
          );
        }
      : (groupHeaderProps: IGroupDividerProps, defaultRender: IRenderFunction<IGroupDividerProps>) => {
          const { groupIndex } = groupHeaderProps;
          const groupKey: string | undefined =
            groupIndex !== undefined ? groupHeaderProps.groups?.[groupIndex]?.key : undefined;
          const totalRowCount: number =
            groupKey !== undefined && groupedDetailsListIndexMap[groupKey]
              ? groupedDetailsListIndexMap[groupKey].totalRowCount
              : 0;

          return defaultRender({
            ...groupHeaderProps,
            ariaColSpan: adjustedColumns.length,
            ariaLevel: undefined,
            ariaPosInSet: undefined,
            ariaSetSize: undefined,
            ariaRowCount: undefined,
            ariaRowIndex: groupIndex !== undefined ? totalRowCount + (isHeaderVisible ? 1 : 0) : undefined,
          });
        };
  }, [
    onRenderDetailsGroupHeader,
    adjustedColumns,
    groupNestingDepth,
    indentWidth,
    isHeaderVisible,
    selection,
    selectionMode,
    viewport,
    checkboxVisibility,
    cellStyleProps,
    groupedDetailsListIndexMap,
  ]);

  const finalGroupProps = React.useMemo((): IGroupRenderProps | undefined => {
    return {
      ...groupProps,
      role: role === defaultRole ? 'rowgroup' : 'presentation',
      onRenderFooter: finalOnRenderDetailsGroupFooter,
      onRenderHeader: finalOnRenderDetailsGroupHeader,
      // pass through custom group header checkbox label
      headerProps: {
        ...groupProps?.headerProps,
        selectAllButtonProps: {
          'aria-label': checkButtonGroupAriaLabel,
          ...groupProps?.headerProps?.selectAllButtonProps,
        },
      },
    };
  }, [groupProps, finalOnRenderDetailsGroupFooter, finalOnRenderDetailsGroupHeader, checkButtonGroupAriaLabel, role]);

  const sumColumnWidths = useConst(() =>
    memoizeFunction((columns: IColumn[]) => {
      let totalWidth: number = 0;

      columns.forEach((column: IColumn) => (totalWidth += column.calculatedWidth || column.minWidth));

      return totalWidth;
    }),
  );

  const collapseAllVisibility = groupProps && groupProps.collapseAllVisibility;

  const rowWidth = React.useMemo(() => {
    return sumColumnWidths(adjustedColumns);
  }, [adjustedColumns, sumColumnWidths]);

  const onRenderCell = React.useCallback(
    (nestingDepth: number, item: any, index: number, group?: IGroup): React.ReactNode => {
      const finalOnRenderRow = props.onRenderRow
        ? composeRenderFunction(props.onRenderRow, onRenderDefaultRow)
        : onRenderDefaultRow;

      const groupKey: string | undefined = group ? group.key : undefined;
      const numOfGroupHeadersBeforeItem: number =
        groupKey && groupedDetailsListIndexMap[groupKey]
          ? groupedDetailsListIndexMap[groupKey].numOfGroupHeadersBeforeItem
          : 0;

      const rowRole = role === defaultRole ? undefined : 'presentation';

      // add tabindex="0" to first row so if the header isn't rendered or isn't focusable,
      // the focuszone still has content in the tab order.
      const rowFocusZoneProps = index > 0 ? rowFocusZoneNoTabIndexProps : rowFocusZoneAddTabIndexProps;

      const rowProps: IDetailsRowProps = {
        item,
        itemIndex: index,
        flatIndexOffset: (isHeaderVisible ? 2 : 1) + numOfGroupHeadersBeforeItem,
        compact,
        columns: adjustedColumns,
        groupNestingDepth: nestingDepth,
        id: `${rowId}-${index}`,
        selectionMode,
        selection,
        onDidMount: onRowDidMount,
        onWillUnmount: onRowWillUnmount,
        onRenderItemColumn,
        onRenderField,
        getCellValueKey,
        eventsToRegister,
        dragDropEvents,
        dragDropHelper,
        viewport,
        checkboxVisibility,
        collapseAllVisibility,
        getRowAriaLabel,
        getRowAriaDescribedBy,
        checkButtonAriaLabel,
        checkboxCellClassName,
        useReducedRowRenderer,
        indentWidth,
        cellStyleProps,
        onRenderDetailsCheckbox: onRenderCheckbox,
        enableUpdateAnimations,
        rowWidth,
        useFastIcons,
        role: rowRole,
        isGridRow: true,
        focusZoneProps: rowFocusZoneProps,
      };

      if (!item) {
        if (onRenderMissingItem) {
          return onRenderMissingItem(index, rowProps);
        }

        return null;
      }

      return finalOnRenderRow(rowProps);
    },
    [
      compact,
      adjustedColumns,
      selectionMode,
      selection,
      rowId,
      onRowDidMount,
      onRowWillUnmount,
      onRenderItemColumn,
      onRenderField,
      getCellValueKey,
      eventsToRegister,
      dragDropEvents,
      dragDropHelper,
      viewport,
      checkboxVisibility,
      collapseAllVisibility,
      getRowAriaLabel,
      getRowAriaDescribedBy,
      isHeaderVisible,
      checkButtonAriaLabel,
      checkboxCellClassName,
      useReducedRowRenderer,
      indentWidth,
      cellStyleProps,
      onRenderCheckbox,
      enableUpdateAnimations,
      useFastIcons,
      onRenderDefaultRow,
      onRenderMissingItem,
      props.onRenderRow,
      rowWidth,
      role,
      groupedDetailsListIndexMap,
    ],
  );

  const onRenderListCell = React.useCallback(
    (nestingDepth: number): ((item: any, itemIndex: number) => React.ReactNode) => {
      return (item: any, itemIndex: number): React.ReactNode => {
        return onRenderCell(nestingDepth, item, itemIndex);
      };
    },
    [onRenderCell],
  );

  const isRightArrow = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      // eslint-disable-next-line deprecation/deprecation
      return event.which === getRTLSafeKeyCode(KeyCodes.right, theme);
    },
    [theme],
  );

  const focusZoneInnerProps: IFocusZoneProps = {
    ...focusZoneProps,
    componentRef: focusZoneProps && focusZoneProps.componentRef ? focusZoneProps.componentRef : focusZoneRef,
    className:
      focusZoneProps && focusZoneProps.className
        ? css(classNames.focusZone, focusZoneProps.className)
        : classNames.focusZone,
    direction: focusZoneProps ? focusZoneProps.direction : FocusZoneDirection.vertical,
    shouldEnterInnerZone:
      focusZoneProps && focusZoneProps.shouldEnterInnerZone ? focusZoneProps.shouldEnterInnerZone : isRightArrow,
    onActiveElementChanged:
      focusZoneProps && focusZoneProps.onActiveElementChanged
        ? focusZoneProps.onActiveElementChanged
        : onActiveRowChanged,
    shouldRaiseClicksOnEnter: false,
    onBlur: focusZoneProps && focusZoneProps.onBlur ? focusZoneProps.onBlur : onBlur,
  };

  const FinalGroupedList =
    groups && groupProps?.groupedListAs ? composeComponentAs(groupProps.groupedListAs, GroupedList) : GroupedList;

  const list = groups ? (
    <FinalGroupedList
      focusZoneProps={focusZoneInnerProps}
      componentRef={groupedListRef}
      groups={groups}
      groupProps={finalGroupProps}
      items={items}
      onRenderCell={onRenderCell}
      role="presentation"
      selection={selection}
      selectionMode={checkboxVisibility !== CheckboxVisibility.hidden ? selectionMode : SelectionMode.none}
      dragDropEvents={dragDropEvents}
      dragDropHelper={dragDropHelper}
      eventsToRegister={rowElementEventMap}
      listProps={additionalListProps}
      onGroupExpandStateChanged={onGroupExpandStateChanged}
      usePageCache={usePageCache}
      onShouldVirtualize={onShouldVirtualize}
      getGroupHeight={getGroupHeight}
      compact={compact}
    />
  ) : (
    <FocusZone {...focusZoneInnerProps}>
      <List
        ref={listRef}
        role="presentation"
        items={items}
        onRenderCell={onRenderListCell(0)}
        usePageCache={usePageCache}
        onShouldVirtualize={onShouldVirtualize}
        {...additionalListProps}
      />
    </FocusZone>
  );

  const onHeaderKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      // eslint-disable-next-line deprecation/deprecation
      if (ev.which === KeyCodes.down) {
        if (focusZoneRef.current && focusZoneRef.current.focus()) {
          // select the first item in list after down arrow key event
          // only if nothing was selected; otherwise start with the already-selected item
          if (isSelectedOnFocus && selection.getSelectedIndices().length === 0) {
            selection.setIndexSelected(0, true, false);
          }

          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    },
    [selection, focusZoneRef, isSelectedOnFocus],
  );

  const onContentKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLElement>): void => {
      // eslint-disable-next-line deprecation/deprecation
      if (ev.which === KeyCodes.up && !ev.altKey) {
        if (headerRef.current && headerRef.current.focus()) {
          ev.preventDefault();
          ev.stopPropagation();
        }
      }
    },
    [headerRef],
  );

  return (
    <div
      ref={rootRef}
      className={classNames.root}
      data-automationid="DetailsList"
      data-is-scrollable="false"
      {...(shouldApplyApplicationRole ? { role: 'application' } : {})}
    >
      <FocusRects />
      <div
        role={role}
        // ariaLabel is a legacy prop that used to be applied on the root node, which has poor AT support
        // it is now treated as a fallback to ariaLabelForGrid for legacy support
        aria-label={ariaLabelForGrid || ariaLabel}
        aria-rowcount={isPlaceholderData ? 0 : rowCount}
        aria-colcount={colCount}
        aria-busy={isPlaceholderData}
      >
        <div onKeyDown={onHeaderKeyDown} role="presentation" className={classNames.headerWrapper}>
          {isHeaderVisible &&
            onRenderDetailsHeader(
              {
                componentRef: headerRef,
                selectionMode,
                layoutMode: layoutMode!,
                selection,
                columns: adjustedColumns,
                onColumnClick: onColumnHeaderClick,
                onColumnContextMenu: onColumnHeaderContextMenu,
                onColumnResized,
                onColumnIsSizingChanged,
                onColumnAutoResized,
                groupNestingDepth,
                isAllCollapsed: isCollapsed,
                onToggleCollapseAll: onToggleCollapse,
                ariaLabel: ariaLabelForListHeader,
                ariaLabelForSelectAllCheckbox,
                ariaLabelForSelectionColumn,
                selectAllVisibility,
                collapseAllVisibility: groupProps && groupProps.collapseAllVisibility,
                viewport,
                columnReorderProps,
                minimumPixelsForDrag,
                cellStyleProps,
                checkboxVisibility,
                indentWidth,
                onRenderDetailsCheckbox: onRenderCheckbox,
                rowWidth: sumColumnWidths(adjustedColumns),
                useFastIcons,
              },
              onRenderDetailsHeader,
            )}
        </div>
        <div onKeyDown={onContentKeyDown} role="presentation" className={classNames.contentWrapper}>
          {!disableSelectionZone ? (
            <SelectionZone
              ref={selectionZoneRef}
              selection={selection}
              selectionPreservedOnEmptyClick={selectionPreservedOnEmptyClick}
              selectionMode={selectionMode}
              isSelectedOnFocus={isSelectedOnFocus}
              selectionClearedOnEscapePress={isSelectedOnFocus}
              toggleWithoutModifierPressed={!isSelectedOnFocus}
              onItemInvoked={onItemInvoked}
              onItemContextMenu={onItemContextMenu}
              enterModalOnTouch={enterModalSelectionOnTouch}
              {...(selectionZoneProps || {})}
            >
              {list}
            </SelectionZone>
          ) : (
            list
          )}
        </div>
        {onRenderDetailsFooter({
          ...detailsFooterProps,
        })}
      </div>
    </div>
  );
};

@withViewport
export class DetailsListBase extends React.Component<IDetailsListProps, IDetailsListState> implements IDetailsList {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    checkboxVisibility: CheckboxVisibility.onHover,
    isHeaderVisible: true,
    compact: false,
    useFastIcons: true,
  };

  public static contextType = WindowContext;

  // References
  private _async: Async;
  private _root = React.createRef<HTMLDivElement>();
  private _header = React.createRef<IDetailsHeader>();
  private _groupedList = React.createRef<IGroupedList>();
  private _list = React.createRef<List>();
  private _focusZone = React.createRef<IFocusZone>();
  private _selectionZone = React.createRef<SelectionZone>();

  private _selection: ISelection;
  private _activeRows: { [key: string]: DetailsRowBase };
  private _dragDropHelper: DragDropHelper | undefined;
  private _initialFocusedIndex: number | undefined;

  private _columnOverrides: {
    [key: string]: IColumn;
  };

  public static getDerivedStateFromProps(
    nextProps: IDetailsListProps,
    previousState: IDetailsListState,
  ): IDetailsListState {
    return previousState.getDerivedStateFromProps(nextProps, previousState);
  }

  constructor(props: IDetailsListProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);

    this._activeRows = {};
    this._columnOverrides = {};

    this.state = {
      focusedItemIndex: -1,
      lastWidth: 0,
      adjustedColumns: this._getAdjustedColumns(props, undefined),
      isSizing: false,
      isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
      isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed,
      version: {},
      getDerivedStateFromProps: this._getDerivedStateFromProps,
    };

    warnMutuallyExclusive(COMPONENT_NAME, props, {
      selection: 'getKey',
    });

    this._selection =
      props.selection ||
      new Selection({
        onSelectionChanged: undefined,
        getKey: props.getKey,
        selectionMode: props.selectionMode,
      });

    if (!this.props.disableSelectionZone) {
      this._selection.setItems(props.items as IObjectWithKey[], false);
    }

    this._dragDropHelper = props.dragDropEvents
      ? new DragDropHelper({
          selection: this._selection,
          minimumPixelsForDrag: props.minimumPixelsForDrag,
        })
      : undefined;
    this._initialFocusedIndex = props.initialFocusedIndex;
  }

  public scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void {
    this._list.current && this._list.current.scrollToIndex(index, measureItem, scrollToMode);
    this._groupedList.current && this._groupedList.current.scrollToIndex(index, measureItem, scrollToMode);
  }

  public focusIndex(
    index: number,
    forceIntoFirstElement: boolean = false,
    measureItem?: (itemIndex: number) => number,
    scrollToMode?: ScrollToMode,
  ): void {
    const item = this.props.items[index];
    if (item) {
      this.scrollToIndex(index, measureItem, scrollToMode);

      const itemKey = this._getItemKey(item, index);
      const row = this._activeRows[itemKey];
      if (row) {
        this._setFocusToRow(row, forceIntoFirstElement);
      }
    }
  }

  public getStartItemIndexInView(): number {
    if (this._list && this._list.current) {
      return this._list.current.getStartItemIndexInView();
    } else if (this._groupedList && this._groupedList.current) {
      return this._groupedList.current.getStartItemIndexInView();
    }
    return 0;
  }

  public updateColumn(column: IColumn, options: { width?: number; newColumnIndex?: number }) {
    const NO_COLUMNS: IColumn[] = [];

    const { columns = NO_COLUMNS, selectionMode, checkboxVisibility, columnReorderOptions } = this.props;
    const { width, newColumnIndex } = options;
    const index = columns.findIndex(col => col.key === column.key);

    if (width) {
      this._onColumnResized(column, width, index!);
    }

    if (newColumnIndex !== undefined && columnReorderOptions) {
      const isCheckboxColumnHidden =
        selectionMode === SelectionMode.none || checkboxVisibility === CheckboxVisibility.hidden;

      const showCheckbox = checkboxVisibility !== CheckboxVisibility.hidden;
      const columnIndex = (showCheckbox ? 2 : 1) + index!;

      const draggedIndex = isCheckboxColumnHidden ? columnIndex - 1 : columnIndex - 2;
      const targetIndex = isCheckboxColumnHidden ? newColumnIndex - 1 : newColumnIndex - 2;

      const frozenColumnCountFromStart = columnReorderOptions.frozenColumnCountFromStart ?? 0;
      const frozenColumnCountFromEnd = columnReorderOptions.frozenColumnCountFromEnd ?? 0;
      const isValidTargetIndex =
        targetIndex >= frozenColumnCountFromStart && targetIndex < columns.length - frozenColumnCountFromEnd;

      if (isValidTargetIndex) {
        if (columnReorderOptions.onColumnDrop) {
          const dragDropDetails: IColumnDragDropDetails = {
            draggedIndex,
            targetIndex,
          };
          columnReorderOptions.onColumnDrop(dragDropDetails);
          /* eslint-disable deprecation/deprecation */
        } else if (columnReorderOptions.handleColumnReorder) {
          columnReorderOptions.handleColumnReorder(draggedIndex, targetIndex);
          /* eslint-enable deprecation/deprecation */
        }
      }
    }
  }

  public componentWillUnmount(): void {
    if (this._dragDropHelper) {
      // TODO If the DragDropHelper was passed via props, this will dispose it, which is incorrect behavior.
      this._dragDropHelper.dispose();
    }
    this._async.dispose();
  }

  public componentDidUpdate(prevProps: IDetailsListProps, prevState: IDetailsListState) {
    this._notifyColumnsResized();

    const doc = getDocumentEx(this.context);

    if (this._initialFocusedIndex !== undefined) {
      const item = this.props.items[this._initialFocusedIndex];
      if (item) {
        const itemKey = this._getItemKey(item, this._initialFocusedIndex);
        const row = this._activeRows[itemKey];
        if (row) {
          this._setFocusToRowIfPending(row);
        }
      }
    }

    if (
      this.props.items !== prevProps.items &&
      this.props.items.length > 0 &&
      this.state.focusedItemIndex !== -1 &&
      !elementContains(this._root.current, doc?.activeElement as HTMLElement, false)
    ) {
      // Item set has changed and previously-focused item is gone.
      // Set focus to item at index of previously-focused item if it is in range,
      // else set focus to the last item.
      const index =
        this.state.focusedItemIndex < this.props.items.length
          ? this.state.focusedItemIndex
          : this.props.items.length - 1;
      const item = this.props.items[index];
      const itemKey = this._getItemKey(item, this.state.focusedItemIndex);
      const row = this._activeRows[itemKey];
      if (row) {
        this._setFocusToRow(row);
      } else {
        this._initialFocusedIndex = index;
      }
    }
    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(this);
    }
  }

  public render(): JSX.Element {
    return (
      <DetailsListInner
        {...this.props}
        {...this.state}
        selection={this._selection}
        dragDropHelper={this._dragDropHelper}
        rootRef={this._root}
        listRef={this._list}
        groupedListRef={this._groupedList}
        focusZoneRef={this._focusZone}
        headerRef={this._header}
        selectionZoneRef={this._selectionZone}
        onGroupExpandStateChanged={this._onGroupExpandStateChanged}
        onColumnIsSizingChanged={this._onColumnIsSizingChanged}
        onRowDidMount={this._onRowDidMount}
        onRowWillUnmount={this._onRowWillUnmount}
        onColumnResized={this._onColumnResized}
        onColumnAutoResized={this._onColumnAutoResized}
        onToggleCollapse={this._onToggleCollapse}
        onActiveRowChanged={this._onActiveRowChanged}
        onBlur={this._onBlur}
        onRenderDefaultRow={this._onRenderRow}
      />
    );
  }

  public forceUpdate(): void {
    super.forceUpdate();
    this._forceListUpdates();
  }

  protected _onRenderRow = (
    props: IDetailsRowProps,
    defaultRender?: IRenderFunction<IDetailsRowProps>,
  ): JSX.Element => {
    return <DetailsRow {...props} />;
  };

  private _getDerivedStateFromProps = (
    nextProps: IDetailsListProps,
    previousState: IDetailsListState,
  ): IDetailsListState => {
    const {
      checkboxVisibility,
      items,
      setKey,
      selectionMode = this._selection.mode,
      columns,
      viewport,
      compact,
      dragDropEvents,
    } = this.props;

    const { isAllGroupsCollapsed = undefined } = this.props.groupProps || {};
    const newViewportWidth = (nextProps.viewport && nextProps.viewport.width) || 0;
    const oldViewportWidth = (viewport && viewport.width) || 0;
    const shouldResetSelection = nextProps.setKey !== setKey || nextProps.setKey === undefined;
    let shouldForceUpdates = false;

    if (nextProps.layoutMode !== this.props.layoutMode) {
      shouldForceUpdates = true;
    }

    let nextState = previousState;

    if (shouldResetSelection) {
      this._initialFocusedIndex = nextProps.initialFocusedIndex;
      // reset focusedItemIndex when setKey changes
      nextState = {
        ...nextState,
        focusedItemIndex: this._initialFocusedIndex !== undefined ? this._initialFocusedIndex : -1,
      };
    }

    if (!this.props.disableSelectionZone && nextProps.items !== items) {
      this._selection.setItems(nextProps.items, shouldResetSelection);
    }

    if (
      nextProps.checkboxVisibility !== checkboxVisibility ||
      nextProps.columns !== columns ||
      newViewportWidth !== oldViewportWidth ||
      nextProps.compact !== compact
    ) {
      shouldForceUpdates = true;
    }

    nextState = {
      ...nextState,
      ...this._adjustColumns(nextProps, nextState, true),
    };

    if (nextProps.selectionMode !== selectionMode) {
      shouldForceUpdates = true;
    }

    if (
      isAllGroupsCollapsed === undefined &&
      nextProps.groupProps &&
      nextProps.groupProps.isAllGroupsCollapsed !== undefined
    ) {
      nextState = {
        ...nextState,
        isCollapsed: nextProps.groupProps.isAllGroupsCollapsed,
        isSomeGroupExpanded: !nextProps.groupProps.isAllGroupsCollapsed,
      };
    }

    if (nextProps.dragDropEvents !== dragDropEvents) {
      this._dragDropHelper && this._dragDropHelper.dispose();
      this._dragDropHelper = nextProps.dragDropEvents
        ? new DragDropHelper({
            selection: this._selection,
            minimumPixelsForDrag: nextProps.minimumPixelsForDrag,
          })
        : undefined;
      shouldForceUpdates = true;
    }

    if (shouldForceUpdates) {
      nextState = {
        ...nextState,
        version: {},
      };
    }

    return nextState;
  };

  private _onGroupExpandStateChanged = (isSomeGroupExpanded: boolean): void => {
    this.setState({ isSomeGroupExpanded });
  };

  private _onColumnIsSizingChanged = (column: IColumn, isSizing: boolean): void => {
    this.setState({ isSizing });
  };

  private _getGroupNestingDepth(): number {
    const { groups } = this.props;
    let level = 0;
    let groupsInLevel = groups;

    while (groupsInLevel && groupsInLevel.length > 0) {
      level++;
      groupsInLevel = groupsInLevel[0].children;
    }

    return level;
  }

  private _onRowDidMount = (row: DetailsRowBase): void => {
    const { item, itemIndex } = row.props;
    const itemKey = this._getItemKey(item, itemIndex);
    this._activeRows[itemKey] = row; // this is used for column auto resize

    this._setFocusToRowIfPending(row);

    const { onRowDidMount } = this.props;
    if (onRowDidMount) {
      onRowDidMount(item, itemIndex);
    }
  };

  private _setFocusToRowIfPending(row: DetailsRowBase): void {
    const { itemIndex } = row.props;
    if (this._initialFocusedIndex !== undefined && itemIndex === this._initialFocusedIndex) {
      this._setFocusToRow(row);
      delete this._initialFocusedIndex;
    }
  }

  private _setFocusToRow(row: DetailsRowBase, forceIntoFirstElement: boolean = false): void {
    if (this._selectionZone.current) {
      this._selectionZone.current.ignoreNextFocus();
    }
    this._async.setTimeout((): void => {
      row.focus(forceIntoFirstElement);
    }, 0);
  }

  private _onRowWillUnmount = (row: DetailsRowBase): void => {
    const { onRowWillUnmount } = this.props;

    const { item, itemIndex } = row.props;
    const itemKey = this._getItemKey(item, itemIndex);
    delete this._activeRows[itemKey];

    if (onRowWillUnmount) {
      onRowWillUnmount(item, itemIndex);
    }
  };

  private _onToggleCollapse = (collapsed: boolean): void => {
    this.setState({
      isCollapsed: collapsed,
    });
    if (this._groupedList.current) {
      this._groupedList.current.toggleCollapseAll(collapsed);
    }
  };

  private _forceListUpdates(): void {
    if (this._groupedList.current) {
      this._groupedList.current.forceUpdate();
    }
    if (this._list.current) {
      this._list.current.forceUpdate();
    }
  }

  private _notifyColumnsResized(): void {
    this.state.adjustedColumns.forEach(column => {
      if (column.onColumnResize) {
        column.onColumnResize(column.currentWidth);
      }
    });
  }

  private _adjustColumns(
    newProps: IDetailsListProps,
    previousState: IDetailsListState,
    forceUpdate?: boolean,
    resizingColumnIndex?: number,
  ): IDetailsListState {
    const adjustedColumns = this._getAdjustedColumns(newProps, previousState, forceUpdate, resizingColumnIndex);
    const { viewport } = this.props;
    const viewportWidth = viewport && viewport.width ? viewport.width : 0;

    return {
      ...previousState,
      adjustedColumns,
      lastWidth: viewportWidth,
    };
  }

  /** Returns adjusted columns, given the viewport size and layout mode. */
  private _getAdjustedColumns(
    newProps: IDetailsListProps,
    previousState: IDetailsListState | undefined,
    forceUpdate?: boolean,
    resizingColumnIndex?: number,
  ): IColumn[] {
    const { items: newItems, layoutMode, selectionMode, viewport } = newProps;
    const viewportWidth = viewport && viewport.width ? viewport.width : 0;
    let { columns: newColumns } = newProps;

    const columns = this.props ? this.props.columns : [];
    const lastWidth = previousState ? previousState.lastWidth : -1;
    const lastSelectionMode = previousState ? previousState.lastSelectionMode : undefined;

    if (
      !forceUpdate &&
      lastWidth === viewportWidth &&
      lastSelectionMode === selectionMode &&
      (!columns || newColumns === columns)
    ) {
      return newColumns || [];
    }

    newColumns = newColumns || buildColumns(newItems, true);

    let adjustedColumns: IColumn[];

    if (layoutMode === DetailsListLayoutMode.fixedColumns) {
      adjustedColumns = this._getFixedColumns(newColumns, viewportWidth, newProps);

      // Preserve adjusted column calculated widths.
      adjustedColumns.forEach(column => {
        this._rememberCalculatedWidth(column, column.calculatedWidth!);
      });
    } else {
      adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps);

      adjustedColumns.forEach(column => {
        this._getColumnOverride(column.key).currentWidth = column.calculatedWidth;
      });
    }

    return adjustedColumns;
  }

  /** Builds a set of columns based on the given columns mixed with the current overrides. */
  private _getFixedColumns(newColumns: IColumn[], viewportWidth: number, props: IDetailsListProps): IColumn[] {
    const { selectionMode = this._selection.mode, checkboxVisibility, flexMargin, skipViewportMeasures } = this.props;
    let remainingWidth = viewportWidth - (flexMargin || 0);
    let sumProportionalWidth = 0;

    newColumns.forEach((col: IColumn) => {
      if (skipViewportMeasures || !col.flexGrow) {
        remainingWidth -= col.maxWidth || col.minWidth || MIN_COLUMN_WIDTH;
      } else {
        remainingWidth -= col.minWidth || MIN_COLUMN_WIDTH;
        sumProportionalWidth += col.flexGrow;
      }

      remainingWidth -= getPaddedWidth(col, props, true);
    });

    const rowCheckWidth =
      selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden ? CHECKBOX_WIDTH : 0;
    const groupExpandWidth = this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
    remainingWidth -= rowCheckWidth + groupExpandWidth;

    let widthFraction = remainingWidth / sumProportionalWidth;

    // Shrinks proportional columns to their max width and adds the remaining width to distribute to other columns.
    if (!skipViewportMeasures) {
      newColumns.forEach((column: IColumn) => {
        const newColumn: IColumn = { ...column, ...this._columnOverrides[column.key] };

        if (newColumn.flexGrow && newColumn.maxWidth) {
          const fullWidth = newColumn.flexGrow * widthFraction + newColumn.minWidth;
          const shrinkWidth = fullWidth - newColumn.maxWidth;

          if (shrinkWidth > 0) {
            remainingWidth += shrinkWidth;
            sumProportionalWidth -= (shrinkWidth / (fullWidth - newColumn.minWidth)) * newColumn.flexGrow;
          }
        }
      });
    }

    widthFraction = remainingWidth > 0 ? remainingWidth / sumProportionalWidth : 0;

    return newColumns.map(column => {
      const newColumn: IColumn = { ...column, ...this._columnOverrides[column.key] };

      // Delay computation until viewport width is available.
      if (!skipViewportMeasures && newColumn.flexGrow && remainingWidth <= 0 && viewportWidth === 0) {
        return newColumn;
      }

      if (!newColumn.calculatedWidth) {
        if (!skipViewportMeasures && newColumn.flexGrow) {
          // Assigns the proportion of the remaining extra width after all columns have met minimum widths.
          newColumn.calculatedWidth = newColumn.minWidth + newColumn.flexGrow * widthFraction;
          newColumn.calculatedWidth = Math.min(newColumn.calculatedWidth, newColumn.maxWidth || Number.MAX_VALUE);
        } else {
          newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
        }
      }

      return newColumn;
    });
  }

  /** Builds a set of columns to fix within the viewport width. */
  private _getJustifiedColumns(newColumns: IColumn[], viewportWidth: number, props: IDetailsListProps): IColumn[] {
    const { selectionMode = this._selection.mode, checkboxVisibility, skipViewportMeasures } = props;
    const rowCheckWidth =
      selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden ? CHECKBOX_WIDTH : 0;
    const groupExpandWidth = this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
    let totalWidth = 0; // offset because we have one less inner padding.
    let minimumWidth = 0;
    const availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
    const adjustedColumns: IColumn[] = newColumns.map((column, i) => {
      const baseColumn = {
        ...column,
        calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH,
      };

      const newColumn = {
        ...baseColumn,
        ...this._columnOverrides[column.key],
      };

      // eslint-disable-next-line deprecation/deprecation
      if (!(baseColumn.isCollapsible || baseColumn.isCollapsable)) {
        minimumWidth += getPaddedWidth(baseColumn, props);
      }

      totalWidth += getPaddedWidth(newColumn, props);

      return newColumn;
    });

    if (skipViewportMeasures) {
      return adjustedColumns;
    }

    let lastIndex = adjustedColumns.length - 1;

    // Shrink or remove collapsable columns.
    while (lastIndex >= 0 && totalWidth > availableWidth) {
      const column = adjustedColumns[lastIndex];

      const minWidth = column.minWidth || MIN_COLUMN_WIDTH;
      const overflowWidth = totalWidth - availableWidth;

      // eslint-disable-next-line deprecation/deprecation
      if (column.calculatedWidth! - minWidth >= overflowWidth || !(column.isCollapsible || column.isCollapsable)) {
        const originalWidth = column.calculatedWidth!;
        if (minimumWidth < availableWidth) {
          // Only adjust in cases where all the columns fit within the viewport
          column.calculatedWidth = Math.max(column.calculatedWidth! - overflowWidth, minWidth);
        }
        totalWidth -= originalWidth - column.calculatedWidth!;
      } else {
        totalWidth -= getPaddedWidth(column, props);
        adjustedColumns.splice(lastIndex, 1);
      }
      lastIndex--;
    }

    // Then expand columns starting at the beginning, until we've filled the width.
    for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
      const column = adjustedColumns[i];
      const isLast = i === adjustedColumns.length - 1;
      const overrides = this._columnOverrides[column.key];
      if (overrides && overrides.calculatedWidth && !isLast) {
        continue;
      }

      const spaceLeft = availableWidth - totalWidth;
      let increment: number;
      if (isLast) {
        increment = spaceLeft;
      } else {
        const maxWidth = column.maxWidth;
        const minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
        increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft;
      }

      column.calculatedWidth = (column.calculatedWidth as number) + increment;
      totalWidth += increment;
    }

    return adjustedColumns;
  }

  private _onColumnResized = (resizingColumn: IColumn, newWidth: number, resizingColumnIndex: number): void => {
    const newCalculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
    if (this.props.onColumnResize) {
      this.props.onColumnResize(resizingColumn, newCalculatedWidth, resizingColumnIndex);
    }

    this._rememberCalculatedWidth(resizingColumn, newCalculatedWidth);

    this.setState({
      ...this._adjustColumns(this.props, this.state, true, resizingColumnIndex),
      version: {},
    });
  };

  private _rememberCalculatedWidth(column: IColumn, newCalculatedWidth: number): void {
    const overrides = this._getColumnOverride(column.key);
    overrides.calculatedWidth = newCalculatedWidth;
    overrides.currentWidth = newCalculatedWidth;
  }

  private _getColumnOverride(key: string): IColumn {
    return (this._columnOverrides[key] = this._columnOverrides[key] || {});
  }

  /**
   * Callback function when double clicked on the details header column resizer
   * which will measure the column cells of all the active rows and resize the
   * column to the max cell width.
   *
   * @param column - double clicked column definition
   * @param columnIndex - double clicked column index
   * TODO: min width 100 should be changed to const value and should be consistent with the
   * value used on _onSizerMove method in DetailsHeader
   */
  private _onColumnAutoResized = (column: IColumn, columnIndex: number): void => {
    let max = 0;
    let count = 0;
    const totalCount = Object.keys(this._activeRows).length;

    for (const key in this._activeRows) {
      if (this._activeRows.hasOwnProperty(key)) {
        const currentRow = this._activeRows[key];
        currentRow.measureCell(columnIndex, (width: number) => {
          max = Math.max(max, width);
          count++;
          if (count === totalCount) {
            this._onColumnResized(column, max, columnIndex);
          }
        });
      }
    }
  };

  /**
   * Call back function when an element in FocusZone becomes active. It will translate it into item
   * and call onActiveItemChanged callback if specified.
   *
   * @param row - element that became active in Focus Zone
   * @param focus - event from Focus Zone
   */
  private _onActiveRowChanged = (el?: HTMLElement, ev?: React.FocusEvent<HTMLElement>): void => {
    const { items, onActiveItemChanged } = this.props;

    if (!el) {
      return;
    }

    // Check and assign index only if the event was raised from any DetailsRow element
    if (el.getAttribute('data-item-index')) {
      const index = Number(el.getAttribute('data-item-index'));
      if (index >= 0) {
        if (onActiveItemChanged) {
          onActiveItemChanged(items[index], index, ev);
        }
        this.setState({
          focusedItemIndex: index,
        });
      }
    }
  };

  private _onBlur = (event: React.FocusEvent<HTMLElement>): void => {
    this.setState({
      focusedItemIndex: -1,
    });
  };

  private _getItemKey(item: any, itemIndex: number): string | number {
    const { getKey } = this.props;

    let itemKey: string | number | undefined = undefined;
    if (item) {
      itemKey = item.key;
    }

    if (getKey) {
      itemKey = getKey(item, itemIndex);
    }

    if (!itemKey) {
      itemKey = itemIndex;
    }

    return itemKey;
  }
}

export function buildColumns(
  items: any[],
  canResizeColumns?: boolean,
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void,
  sortedColumnKey?: string,
  isSortedDescending?: boolean,
  groupedColumnKey?: string,
  isMultiline?: boolean,
  columnActionsMode?: ColumnActionsMode,
) {
  const columns: IColumn[] = [];

  if (items && items.length) {
    const firstItem = items[0];

    for (const propName in firstItem) {
      if (firstItem.hasOwnProperty(propName)) {
        columns.push({
          key: propName,
          name: propName,
          fieldName: propName,
          minWidth: MIN_COLUMN_WIDTH,
          maxWidth: 300,
          isCollapsible: !!columns.length,
          isMultiline: isMultiline === undefined ? false : isMultiline,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
          isRowHeader: false,
          columnActionsMode: columnActionsMode ?? ColumnActionsMode.clickable,
          isResizable: canResizeColumns,
          onColumnClick,
          isGrouped: groupedColumnKey === propName,
        });
      }
    }
  }

  return columns;
}

function getPaddedWidth(column: IColumn, props: IDetailsListProps, paddingOnly?: true): number {
  const { cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = props;

  return (
    (paddingOnly ? 0 : column.calculatedWidth!) +
    cellStyleProps.cellLeftPadding +
    cellStyleProps.cellRightPadding +
    (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
  );
}

function getGroupNestingDepth(groups: IDetailsListProps['groups']): number {
  let level = 0;
  let groupsInLevel = groups;

  while (groupsInLevel && groupsInLevel.length > 0) {
    level++;
    groupsInLevel = groupsInLevel[0].children;
  }

  return level;
}

interface IGroupedDetailsListIndexMap {
  [key: string]: { numOfGroupHeadersBeforeItem: number; totalRowCount: number };
}

function useGroupedDetailsListIndexMap(groups: IDetailsListProps['groups']) {
  return React.useMemo((): IGroupedDetailsListIndexMap => {
    const indexMap: IGroupedDetailsListIndexMap = {};
    if (groups) {
      let rowCount = 1;
      let numGroupHeaders = 1;
      for (const group of groups) {
        const { key } = group;
        indexMap[key] = { numOfGroupHeadersBeforeItem: numGroupHeaders, totalRowCount: rowCount };
        numGroupHeaders++;
        rowCount += group.count + 1;
      }
    }
    return indexMap;
  }, [groups]);
}
