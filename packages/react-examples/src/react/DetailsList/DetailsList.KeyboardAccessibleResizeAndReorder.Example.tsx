/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import {
  DetailsList,
  Selection,
  IColumn,
  buildColumns,
  IColumnReorderOptions,
  IDragDropEvents,
  IDragDropContext,
  ColumnActionsMode,
  IDetailsList,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { TextField, ITextFieldStyles, ITextField } from '@fluentui/react/lib/TextField';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';
import { ContextualMenu, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import Dialog, { DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { IFocusZone } from '@fluentui/react-focus';
import { getDocument } from '@fluentui/utilities';

const RESIZE = 'Resize';
const REORDER = 'Reorder';
const theme = getTheme();
const margin = '0 30px 20px 0';
const dragEnterClass = mergeStyles({
  backgroundColor: theme.palette.neutralLight,
});
const controlWrapperClass = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
});
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { margin: margin },
  fieldGroup: { maxWidth: '100px' },
};
const togglesStyles: Partial<IToggleStyles> = { root: { margin } };

const dialogStyles = { main: { maxWidth: 450 } };

function copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

export const DetailsListKeyboardAccessibleResizeAndReorderExample: React.FunctionComponent = () => {
  const handleColumnReorder = (draggedIndex: number, targetIndex: number) => {
    const draggedItems = columns[draggedIndex];
    const newColumns: IColumn[] = [...columns];

    // insert before the dropped item
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedItems);
    setColumns(newColumns);
  };

  const getColumnReorderOptions = (): IColumnReorderOptions => {
    return {
      frozenColumnCountFromStart: parseInt(frozenColumnCountFromStart, 10),
      frozenColumnCountFromEnd: parseInt(frozenColumnCountFromEnd, 10),
      handleColumnReorder: handleColumnReorder,
    };
  };

  const validateNumber = (value: string): string =>
    isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : '';

  const onChangeStartCountText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string) =>
    setFrozenColumnCountFromStart(text);

  const onChangeEndCountText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string) =>
    setFrozenColumnCountFromEnd(text);

  const onChangeColumnReorderEnabled = (event: React.MouseEvent<HTMLElement>, checked: boolean) =>
    setIsColumnReorderEnabled(checked);

  const onItemInvoked = (item: IExampleItem) => alert(`Item invoked ${item.name}`);

  const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | string => {
    const key = column.key as keyof IExampleItem;
    if (key === 'name') {
      return <Link data-selection-invoke={true}>{item[key]}</Link>;
    }
    return String(item[key]);
  };

  const resizeColumn = (column: IColumn) => {
    columnToEdit.current = column;
    clickHandler.current = RESIZE;
    showDialog();
  };

  const reorderColumn = (column: IColumn) => {
    columnToEdit.current = column;
    clickHandler.current = REORDER;
    showDialog();
  };

  const confirmDialog = () => {
    const detailsList = detailsListRef.current;

    if (textfieldRef.current) {
      input.current = Number(textfieldRef.current.value);
    }

    if (columnToEdit.current && input.current && detailsList) {
      if (clickHandler.current === RESIZE) {
        const width = input.current;
        detailsList.updateColumn(columnToEdit.current, { width: width });
      } else if (clickHandler.current === REORDER) {
        const targetIndex = selection.mode ? input.current + 1 : input.current;
        detailsList.updateColumn(columnToEdit.current, { newColumnIndex: targetIndex });
      }
    }

    input.current = null;
    hideDialog();
  };

  const onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      setContextualMenuProps(getContextualMenuProps(ev, column));
    }
  };

  const getContextualMenuProps = (ev: React.MouseEvent<HTMLElement>, column: IColumn): IContextualMenuProps => {
    const items = [
      { key: 'resize', text: 'Resize', onClick: () => resizeColumn(column) },
      { key: 'reorder', text: 'Reorder', onClick: () => reorderColumn(column) },
      { key: 'sort', text: 'Sort', onClick: () => sortColumn(column) },
    ];

    return {
      items: items,
      target: ev.currentTarget as HTMLElement,
      gapSpace: 10,
      isBeakVisible: true,
      onDismiss: onHideContextualMenu,
    };
  };

  const hideDialog = () => setIsDialogHidden(true);

  const showDialog = () => setIsDialogHidden(false);

  const sortColumn = (column: IColumn): void => {
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    const newSortedItems = copyAndSort(sortedItems, column.fieldName!, isSortedDescending);

    columns.map(col => {
      col.isSorted = col.key === column.key;

      if (col.isSorted) {
        col.isSortedDescending = isSortedDescending;
      }

      return col;
    });

    setSortedItems(newSortedItems);
  };

  const onHideContextualMenu = React.useCallback(() => setContextualMenuProps(undefined), []);

  const [draggedItem, setDraggedItem] = React.useState(undefined);
  const [selection] = React.useState(new Selection());
  const [draggedIndex, setDraggedIndex] = React.useState(-1);
  const [items, setItems] = React.useState<IExampleItem[]>(createListItems(5, 0));
  const [sortedItems, setSortedItems] = React.useState<IExampleItem[]>(items);
  const [columns, setColumns] = React.useState<IColumn[]>(
    buildColumns(items, true, onColumnClick, undefined, false, undefined, undefined, ColumnActionsMode.hasDropdown),
  );
  const [isColumnReorderEnabled, setIsColumnReorderEnabled] = React.useState<boolean>(true);
  const [frozenColumnCountFromStart, setFrozenColumnCountFromStart] = React.useState<string>('0');
  const [frozenColumnCountFromEnd, setFrozenColumnCountFromEnd] = React.useState<string>('0');
  const [isDialogHidden, setIsDialogHidden] = React.useState(true);
  const textfieldRef = React.useRef<ITextField>(null);
  const columnToEdit = React.useRef<IColumn | null>(null);
  const clickHandler = React.useRef<string>(RESIZE);
  const [contextualMenuProps, setContextualMenuProps] = React.useState<IContextualMenuProps | undefined>(undefined);
  const detailsListRef = React.useRef<IDetailsList>(null);
  const input = React.useRef<number | null>(null);
  const focusZoneRef = React.useRef<IFocusZone>(null);

  const insertBeforeItem = React.useCallback(
    (item: IExampleItem) => {
      const draggedItems = selection.isIndexSelected(draggedIndex)
        ? (selection.getSelection() as IExampleItem[])
        : [draggedItem!];

      const insertIndex = items.indexOf(item);
      const listItems = items.filter(itm => draggedItems.indexOf(itm) === -1);

      items.splice(insertIndex, 0, ...draggedItems);

      setItems(listItems);
    },
    [draggedIndex, draggedItem, items, selection],
  );

  React.useEffect(() => {
    //sets keyboard focus back to header of column that was reordered.
    if (clickHandler.current === REORDER && columnToEdit.current) {
      let columnHeaderReorderedIndex = -1;
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].key === columnToEdit.current.key) {
          columnHeaderReorderedIndex = i;
          break;
        }
      }
      const element = getDocument()?.querySelector(`[id*=${columns[columnHeaderReorderedIndex].key}]`);
      const columnHeaderReordered = (element as HTMLElement) ?? undefined;

      focusZoneRef.current?.focusElement(columnHeaderReordered);
    }
  }, [columns]);

  const getDragDropEvents = React.useCallback((): IDragDropEvents => {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
        return true;
      },
      canDrag: (item?: any) => {
        return true;
      },
      onDragEnter: (item?: any, event?: DragEvent) => {
        // return string is the css classes that will be added to the entering element.
        return dragEnterClass;
      },
      onDragLeave: (item?: any, event?: DragEvent) => {
        return;
      },
      onDrop: (item?: any, event?: DragEvent) => {
        if (draggedItem) {
          insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        setDraggedItem(item);
        setDraggedIndex(itemIndex!);
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        setDraggedItem(undefined);
        setDraggedIndex(-1);
      },
    };
  }, [draggedItem, insertBeforeItem]);

  const dragDropEvents = getDragDropEvents();

  const resizeDialogContentProps = {
    type: DialogType.normal,
    title: 'Resize Column',
    closeButtonAriaLabel: 'Close',
    subText: 'Enter desired column width pixels:',
  };

  const reorderDialogContentProps = {
    type: DialogType.normal,
    title: 'Reorder Column',
    closeButtonAriaLabel: 'Close',
    subText: 'Enter which column to move this to (use 1-based indexing):',
  };

  const modalProps = {
    titleAriaId: 'Dialog',
    subtitleAriaId: 'Dialog sub',
    isBlocking: false,
    styles: dialogStyles,
  };

  return (
    <div>
      <div className={controlWrapperClass}>
        <Toggle
          label="Enable column reorder"
          checked={isColumnReorderEnabled}
          onChange={onChangeColumnReorderEnabled}
          onText="Enabled"
          offText="Disabled"
          styles={togglesStyles}
        />
        <TextField
          label="Number of left frozen columns"
          onGetErrorMessage={validateNumber}
          value={frozenColumnCountFromStart}
          onChange={onChangeStartCountText}
          styles={textFieldStyles}
        />
        <TextField
          label="Number of right frozen columns"
          onGetErrorMessage={validateNumber}
          value={frozenColumnCountFromEnd}
          onChange={onChangeEndCountText}
          styles={textFieldStyles}
        />
      </div>
      <MarqueeSelection selection={selection}>
        <DetailsList
          componentRef={detailsListRef}
          focusZoneProps={{ componentRef: focusZoneRef }}
          setKey="items"
          items={sortedItems}
          columns={columns}
          selection={selection}
          selectionPreservedOnEmptyClick={true}
          onItemInvoked={onItemInvoked}
          onRenderItemColumn={onRenderItemColumn}
          dragDropEvents={dragDropEvents}
          columnReorderOptions={isColumnReorderEnabled ? getColumnReorderOptions() : undefined}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
        />
      </MarqueeSelection>
      {contextualMenuProps && <ContextualMenu {...contextualMenuProps} />}

      <Dialog
        hidden={isDialogHidden}
        onDismiss={hideDialog}
        dialogContentProps={clickHandler.current === RESIZE ? resizeDialogContentProps : reorderDialogContentProps}
        modalProps={modalProps}
      >
        <TextField
          componentRef={textfieldRef}
          ariaLabel={clickHandler.current === RESIZE ? 'Enter column width' : 'Enter column index '}
        />
        <DialogFooter>
          <PrimaryButton onClick={confirmDialog} text={clickHandler.current} />
          <DefaultButton onClick={hideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
