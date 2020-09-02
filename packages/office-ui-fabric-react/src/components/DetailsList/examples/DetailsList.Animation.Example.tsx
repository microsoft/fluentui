import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

export interface IDetailsListAnimationExampleItem {
  key: number;
  name: string;
  value: number;
}

export interface IDetailsListAnimationExampleState {
  items: IDetailsListAnimationExampleItem[];
}

export class DetailsListAnimationExample extends React.Component<{}, IDetailsListAnimationExampleState> {
  private _allItems: IDetailsListAnimationExampleItem[];
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
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        getValueKey: this._getValueKey,
      },
      { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    this.state = {
      items: this._allItems,
    };
  }

  public componentDidMount(): void {
    const LOREM_IPSUM = (
      'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
      'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
      'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
      'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
    ).split(' ');
    let loremIndex = 0;
    function _lorem(wordCount: number): string {
      const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
      loremIndex = startIndex + wordCount;
      return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
    }
    const updateTimerFunc = () => {
      const newItems = this.state.items.slice();
      const i = Math.floor(Math.random() * 10);
      newItems[i] = { ...newItems[i], ...{ value: Math.floor(Math.random() * 2), name: _lorem(1) } };
      this.setState({ items: newItems });
      this.forceUpdate();
    };
    this._updateTimer = setInterval(updateTimerFunc, 2000);
  }

  public componentWillUnmount(): void {
    clearInterval(this._updateTimer);
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <Fabric>
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
      </Fabric>
    );
  }

  private _onItemInvoked = (item: IDetailsListAnimationExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  private _getValueKey(item: IDetailsListAnimationExampleItem, index: number, column: IColumn): string {
    const key =
      item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListAnimationExampleItem] : index;
    return key.toString();
  }

  private _getCellValueKey(item: IDetailsListAnimationExampleItem, index: number, column: IColumn): string {
    const key =
      item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListAnimationExampleItem] : index;
    return key.toString();
  }
}
