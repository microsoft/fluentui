import * as React from 'react';
import {
  GroupedList,
  IGroup
} from '../../../../components/GroupedList/index';
import { IColumn } from '../../../../DetailsList';
import { DetailsRow } from '../../../../components/DetailsList/DetailsRow';
import {
  FocusZone
} from '../../../../FocusZone';
import {
  Selection,
  SelectionMode,
  SelectionZone
} from '../../../../utilities/selection/index';

import {
  createListItems,
  createGroups
} from '../../../utilities/data';

const groupCount = 15;
const groupDepth = 3;
const items = createListItems(Math.pow(groupCount, groupDepth + 1));

export class GroupedListBasicExample extends React.Component<any, any> {
  private _selection: Selection;
  private _groups: IGroup[];

  constructor() {
    super();
    this._onRenderCell = this._onRenderCell.bind(this);
    this._selection = new Selection;
    this._selection.setItems(items);

    this._groups = createGroups(groupCount, groupDepth, 0, groupCount);
  }

  public render() {
    return (
      <FocusZone>
        <SelectionZone
          selection={ this._selection }
          selectionMode={ SelectionMode.multiple }
          >
          <GroupedList
            items={ items }
            onRenderCell={ this._onRenderCell }
            selection={ this._selection }
            selectionMode={ SelectionMode.multiple }
            groups={ this._groups }
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
        canSelectItem={ () => true }
        />
    );
  }
}
