import * as React from 'react';
import {
  GroupedList,
  IGroup
} from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import {
  FocusZone
} from 'office-ui-fabric-react/lib/FocusZone';
import {
  Selection,
  SelectionMode,
  SelectionZone
} from 'office-ui-fabric-react/lib/utilities/selection/index';

import {
  createListItems,
  createGroups
} from '@uifabric/example-app-base';

const groupCount = 3;
const groupDepth = 3;

let _items: any[];
let _groups: IGroup[];

export class GroupedListBasicExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    _items = _items || createListItems(Math.pow(groupCount, groupDepth + 1));
    _groups = _groups || createGroups(groupCount, groupDepth, 0, groupCount);

    this._onRenderCell = this._onRenderCell.bind(this);
    this._selection = new Selection;
    this._selection.setItems(_items);
  }

  public render() {
    return (
      <FocusZone>
        <SelectionZone
          selection={ this._selection }
          selectionMode={ SelectionMode.multiple }
        >
          <GroupedList
            items={ _items }
            onRenderCell={ this._onRenderCell }
            selection={ this._selection }
            selectionMode={ SelectionMode.multiple }
            groups={ _groups }
          />
        </SelectionZone>
      </FocusZone>
    );
  }

  private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
    let {
      _selection: selection
    } = this;
    return (
      <DetailsRow
        columns={
          Object.keys(item).slice(0, 3).map((value): IColumn => {
            return {
              key: value,
              name: value,
              fieldName: value,
              minWidth: 300
            };
          })
        }
        groupNestingDepth={ nestingDepth }
        item={ item }
        itemIndex={ itemIndex }
        selection={ selection }
        selectionMode={ SelectionMode.multiple }
      />
    );
  }
}
