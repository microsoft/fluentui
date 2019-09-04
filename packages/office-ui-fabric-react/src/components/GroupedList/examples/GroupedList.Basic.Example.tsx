import * as React from 'react';
import { GroupedList, IGroup } from 'office-ui-fabric-react/lib/GroupedList';
import { IColumn, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { createListItems, createGroups, IExampleItem } from '@uifabric/example-data';

const groupCount = 3;
const groupDepth = 3;

export interface IGroupedListExampleState {
  isCompactMode?: boolean;
}

export class GroupedListBasicExample extends React.Component<{}, IGroupedListExampleState> {
  private _items: IExampleItem[];
  private _columns: IColumn[];
  private _groups: IGroup[];
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this._items = createListItems(Math.pow(groupCount, groupDepth + 1));
    this._columns = Object.keys(this._items[0])
      .slice(0, 3)
      .map(
        (key: string): IColumn => ({
          key: key,
          name: key,
          fieldName: key,
          minWidth: 300
        })
      );
    this._groups = createGroups(groupCount, groupDepth, 0, groupCount);

    this._selection = new Selection();
    this._selection.setItems(this._items);

    this.state = {
      isCompactMode: false
    };
  }

  public render(): JSX.Element {
    const { isCompactMode } = this.state;

    return (
      <div>
        <Toggle
          label="Enable compact mode"
          checked={isCompactMode}
          onChange={this._onChangeCompactMode}
          onText="Compact"
          offText="Normal"
          styles={{ root: { marginBottom: '20px' } }}
        />
        <FocusZone>
          <SelectionZone selection={this._selection} selectionMode={SelectionMode.multiple}>
            <GroupedList
              items={this._items}
              onRenderCell={this._onRenderCell}
              selection={this._selection}
              selectionMode={SelectionMode.multiple}
              groups={this._groups}
              compact={isCompactMode}
            />
          </SelectionZone>
        </FocusZone>
      </div>
    );
  }

  private _onRenderCell = (nestingDepth: number, item: IExampleItem, itemIndex: number): JSX.Element => {
    return (
      <DetailsRow
        columns={this._columns}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex}
        selection={this._selection}
        selectionMode={SelectionMode.multiple}
        compact={this.state.isCompactMode}
      />
    );
  };

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };
}
