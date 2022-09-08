import * as React from 'react';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';
import {
  GroupedListV2_unstable as GroupedListV2,
  Selection,
  SelectionMode,
  DetailsRow,
  IGroup,
  IColumn,
} from '@fluentui/react';

const groupCount = 5;
const groupDepth = 5;
const items = createListItems(Math.pow(groupCount, groupDepth + 1));
const groups = createGroups(groupCount, groupDepth, 0, groupCount);

const columns = Object.keys(items[0])
  .slice(0, 3)
  .map(
    (key: string): IColumn => ({
      key: key,
      name: key,
      fieldName: key,
      minWidth: 300,
    }),
  );

const selection = new Selection();
selection.setItems(items);

const onRenderCell = (
  nestingDepth?: number,
  item?: IExampleItem,
  itemIndex?: number,
  group?: IGroup,
): React.ReactNode => {
  return item && typeof itemIndex === 'number' && itemIndex > -1 ? (
    <DetailsRow
      columns={columns}
      groupNestingDepth={nestingDepth}
      item={item}
      itemIndex={itemIndex}
      selection={selection}
      selectionMode={SelectionMode.multiple}
      group={group}
    />
  ) : null;
};

const Scenario = () => {
  return (
    <GroupedListV2
      items={items}
      groups={groups}
      onRenderCell={onRenderCell}
      selection={selection}
      selectionMode={SelectionMode.multiple}
    />
  );
};

export default Scenario;
