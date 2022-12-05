import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import {
  DetailsList,
  Selection,
  IColumn,
  IGroup,
  buildColumns,
  IColumnReorderOptions,
  IDragDropEvents,
  IDragDropContext,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { IExampleItem } from '@fluentui/example-data';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';

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
  root: { margin },
  fieldGroup: { maxWidth: '100px' },
};
const togglesStyles: Partial<IToggleStyles> = { root: { margin } };

interface IDetailsListGroupedDragAndDropExampleItem {
  key: string;
  name: string;
  value: string;
}

interface IDetailsListGroupedDragDropExampleState {
  items: IDetailsListGroupedDragAndDropExampleItem[];
  columns: IColumn[];
  groups: IGroup[];
  isColumnReorderEnabled: boolean;
  frozenColumnCountFromStart: string;
  frozenColumnCountFromEnd: string;
}

const getInitialItems = () => {
  const items = [];
  for (let i = 0; i < 1000; i++) {
    items.push({
      key: i.toString(),
      name: 'Item ' + i,
      value: i.toString() + ' value',
    });
  }

  return items;
};

const getInitialGroups = () => {
  const groups = [];
  for (let i = 0; i < 10; i++) {
    groups.push({
      key: i.toString(),
      name: i.toString(),
      startIndex: i * 10,
      count: 10,
      level: 0,
    });
  }

  return groups;
};

export class DetailsListGroupedDragDropExample extends React.Component<{}, IDetailsListGroupedDragDropExampleState> {
  private _selection: Selection;
  private _dragDropEvents: IDragDropEvents;
  private _draggedItem: IExampleItem | undefined;
  private _draggedIndex: number;

  constructor(props: {}) {
    super(props);

    this._selection = new Selection();
    this._dragDropEvents = this._getDragDropEvents();
    this._draggedIndex = -1;

    const items = getInitialItems();

    this.state = {
      items,
      groups: getInitialGroups(),
      columns: buildColumns(items, true),
      isColumnReorderEnabled: true,
      frozenColumnCountFromStart: '1',
      frozenColumnCountFromEnd: '0',
    };

    const columns = buildColumns(items, true);
    console.log(columns);
  }

  public render(): JSX.Element {
    const {
      items,
      columns,
      groups,
      isColumnReorderEnabled,
      frozenColumnCountFromStart,
      frozenColumnCountFromEnd,
    } = this.state;
    return (
      <div>
        <div className={controlWrapperClass}>
          <Toggle
            label="Enable column reorder"
            checked={isColumnReorderEnabled}
            onChange={this._onChangeColumnReorderEnabled}
            onText="Enabled"
            offText="Disabled"
            styles={togglesStyles}
          />
          <TextField
            label="Number of left frozen columns"
            onGetErrorMessage={this._validateNumber}
            value={frozenColumnCountFromStart}
            onChange={this._onChangeStartCountText}
            styles={textFieldStyles}
          />
          <TextField
            label="Number of right frozen columns"
            onGetErrorMessage={this._validateNumber}
            value={frozenColumnCountFromEnd}
            onChange={this._onChangeEndCountText}
            styles={textFieldStyles}
          />
        </div>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            setKey="items"
            items={items}
            columns={columns}
            groups={groups}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={this._onRenderItemColumn}
            dragDropEvents={this._dragDropEvents}
            columnReorderOptions={this.state.isColumnReorderEnabled ? this._getColumnReorderOptions() : undefined}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _handleColumnReorder = (draggedIndex: number, targetIndex: number) => {
    const draggedItems = this.state.columns[draggedIndex];
    const newColumns: IColumn[] = [...this.state.columns];

    // insert before the dropped item
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedItems);
    this.setState({ columns: newColumns });
  };

  private _getColumnReorderOptions(): IColumnReorderOptions {
    return {
      frozenColumnCountFromStart: parseInt(this.state.frozenColumnCountFromStart, 10),
      frozenColumnCountFromEnd: parseInt(this.state.frozenColumnCountFromEnd, 10),
      handleColumnReorder: this._handleColumnReorder,
    };
  }

  private _validateNumber(value: string): string {
    return isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : '';
  }

  private _onChangeStartCountText = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string,
  ): void => {
    this.setState({ frozenColumnCountFromStart: text });
  };

  private _onChangeEndCountText = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string,
  ): void => {
    this.setState({ frozenColumnCountFromEnd: text });
  };

  private _onChangeColumnReorderEnabled = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isColumnReorderEnabled: checked });
  };

  private _getDragDropEvents(): IDragDropEvents {
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
        if (this._draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        this._draggedItem = item;
        this._draggedIndex = itemIndex!;
        // event?.stopPropagation();
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        this._draggedItem = undefined;
        this._draggedIndex = -1;
      },
    };
  }

  private _onItemInvoked = (item: IExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  private _onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | string => {
    const key = column.key as keyof IExampleItem;
    if (key === 'name') {
      return <Link data-selection-invoke={true}>{item[key]}</Link>;
    }

    return String(item[key]);
  };

  private _insertBeforeItem(item: IExampleItem): void {
    const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
      ? (this._selection.getSelection() as IExampleItem[])
      : [this._draggedItem!];

    const insertIndex = this.state.items.indexOf(item);
    const items = this.state.items.filter(itm => draggedItems.indexOf(itm) === -1);

    items.splice(insertIndex, 0, ...draggedItems);

    this.setState({ items });
  }
}
