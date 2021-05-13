import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, IDetailsColumnProps } from '@fluentui/react/lib/DetailsList';
import { ActionButton } from '@fluentui/react/lib/Button';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';

export interface IDetailsListProportionalColumnsExampleItem {
  key: number;
  name: string;
  value: number;
}

export interface IDetailsListAnimationExampleState {
  items: IDetailsListProportionalColumnsExampleItem[];
}

export class DetailsListProportionalColumnsExample extends React.Component<{}, IDetailsListAnimationExampleState> {
  private _allItems: IDetailsListProportionalColumnsExampleItem[];
  private _columns: IColumn[];
  private _updateTimer: any;

  constructor(props: {}) {
    super(props);

    // Populate with items for demos.
    this._allItems = [];
    for (let i = 0; i < 200; i++) {
      this._allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i,
      });
    }

    this._columns = [
      {
        key: 'column1',
        name: 'Number 1',
        fieldName: 'name',
        flexGrow: 1,
        minWidth: 100,
        isResizable: true,
        getValueKey: this._getValueKey,
        onRenderHeader: (
          colProps?: IDetailsColumnProps,
          defaultRender?: IRenderFunction<IDetailsColumnProps>,
        ): JSX.Element | null => (
          <ActionButton onClick={this._onColumnButtonInvoked}>
            {(defaultRender && defaultRender(colProps)) || <></>}
          </ActionButton>
        ),
      },
      {
        key: 'column2',
        name: 'Number 2',
        fieldName: 'value',
        minWidth: 100,
        isResizable: true,
      },
      {
        key: 'column3',
        name: 'Number 3',
        fieldName: 'value',
        flexGrow: 2,
        minWidth: 100,
        isResizable: true,
      },
    ];

    this.state = {
      items: this._allItems,
    };
  }

  public componentWillUnmount(): void {
    clearInterval(this._updateTimer);
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <DetailsList
        items={items}
        columns={this._columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
        onItemInvoked={this._onItemInvoked}
        enableUpdateAnimations={true}
        getCellValueKey={this._getCellValueKey}
      />
    );
  }

  private _onColumnButtonInvoked = (): void => {
    alert('Custom header button invoked');
  };

  private _onItemInvoked = (item: IDetailsListProportionalColumnsExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  private _getValueKey(item: IDetailsListProportionalColumnsExampleItem, index: number, column: IColumn): string {
    const key =
      item && column && column.fieldName
        ? item[column.fieldName as keyof IDetailsListProportionalColumnsExampleItem]
        : index;
    return key.toString();
  }

  private _getCellValueKey(item: IDetailsListProportionalColumnsExampleItem, index: number, column: IColumn): string {
    const key =
      item && column && column.fieldName
        ? item[column.fieldName as keyof IDetailsListProportionalColumnsExampleItem]
        : index;
    return key.toString();
  }
}
