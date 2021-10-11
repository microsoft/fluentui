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
  IDetailsColumnProps,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { createListItems, IExampleItem } from '@fluentui/example-data';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';
import {
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuItemProps,
  IContextualMenuProps,
} from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/components/Button';

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

// interface DetailsListKeyboardAccessibleResizeAndReorderExampleState {
//   items: IExampleItem[];
//   columns: IColumn[];
//   isColumnReorderEnabled: boolean;
//   frozenColumnCountFromStart: string;
//   frozenColumnCountFromEnd: string;
//   showContextualMenu: boolean;
// }

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

  const getDragDropEvents = (): IDragDropEvents => {
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
  };

  const onItemInvoked = (item: IExampleItem) => alert(`Item invoked ${item.name}`);

  const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | string => {
    const key = column.key as keyof IExampleItem;
    if (key === 'name') {
      return <Link data-selection-invoke={true}>{item[key]}</Link>;
    }
    return String(item[key]);
  };

  const insertBeforeItem = (item: IExampleItem) => {
    const draggedItems = selection.isIndexSelected(draggedIndex)
      ? (selection.getSelection() as IExampleItem[])
      : [draggedItem!];

    const insertIndex = items.indexOf(item);
    const listItems = items.filter(itm => draggedItems.indexOf(itm) === -1);

    items.splice(insertIndex, 0, ...draggedItems);

    setItems(listItems);
  };

  // const onRenderHeader = (props: IDetailsColumnProps) => {
  //   console.log('props ', props);
  //   const ref: React.MutableRefObject<null> = React.createRef();
  //   const { column } = props;
  //   // const menuProps: IContextualMenuProps = {
  //   //   shouldFocusOnMount: true,
  //   //   contextualMenuItemAs: (props: IContextualMenuItemProps) => (
  //   //     <div onClick={() => this._resizeColumn(column)}>{props.item.text}</div>
  //   //   ),
  //   //   items: [{ key: 'resize', text: 'Resize' }],
  //   // };

  //   // return <DefaultButton text={column.fieldName} menuProps={menuProps} />;
  //   const menuItems: IContextualMenuItem[] = [
  //     {
  //       key: 'Resize',
  //       text: 'Resize',
  //       onClick: () => console.log('Resize clicked'),
  //     },
  //   ];

  //   <div>
  //     <a ref={ref} onClick={() => onShowContextualMenu} href="#">
  //       {column.fieldName}
  //     </a>
  //     <ContextualMenu
  //       items={menuItems}
  //       hidden={false}
  //       target={ref}
  //       onItemClick={onHideContextualMenu}
  //       onDismiss={onHideContextualMenu}
  //     />
  //   </div>;
  // };

  // const onShowContextualMenu = () => setShowContextualMenu(true);

  // const onHideContextualMenu = () => setShowContextualMenu(false);

  const selection = new Selection();
  const dragDropEvents = getDragDropEvents();
  const [draggedItem, setDraggedItem] = React.useState(undefined);
  const [draggedIndex, setDraggedIndex] = React.useState(-1);
  const [items, setItems] = React.useState<IExampleItem[]>(createListItems(10, 0));
  const [columns, setColumns] = React.useState<IColumn[]>(buildColumns(items, true));
  const [isColumnReorderEnabled, setIsColumnReorderEnabled] = React.useState<boolean>(true);
  const [frozenColumnCountFromStart, setFrozenColumnCountFromStart] = React.useState<string>('1');
  const [frozenColumnCountFromEnd, setFrozenColumnCountFromEnd] = React.useState<string>('0');
  // const [showContextualMenu, setShowContextualMenu] = React.useState<boolean>(false);

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
          setKey="items"
          items={items}
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
    </div>
  );
};
