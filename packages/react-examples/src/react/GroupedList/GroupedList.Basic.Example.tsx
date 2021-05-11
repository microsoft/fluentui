import * as React from 'react';
import { GroupedList, IGroup } from '@fluentui/react/lib/GroupedList';
import { IColumn, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { useBoolean, useConst } from '@fluentui/react-hooks';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';

const toggleStyles: Partial<IToggleStyles> = { root: { marginBottom: '20px' } };
const groupCount = 3;
const groupDepth = 3;
const items = createListItems(Math.pow(groupCount, groupDepth + 1));
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

const groups = createGroups(groupCount, groupDepth, 0, groupCount);

export const GroupedListBasicExample: React.FunctionComponent = () => {
  const [isCompactMode, { toggle: toggleIsCompactMode }] = useBoolean(false);
  const selection = useConst(() => {
    const s = new Selection();
    s.setItems(items, true);
    return s;
  });

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
        compact={isCompactMode}
        group={group}
      />
    ) : null;
  };

  return (
    <div>
      <Toggle
        label="Enable compact mode"
        checked={isCompactMode}
        onChange={toggleIsCompactMode}
        onText="Compact"
        offText="Normal"
        styles={toggleStyles}
      />
      <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
        <GroupedList
          items={items}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderCell={onRenderCell}
          selection={selection}
          selectionMode={SelectionMode.multiple}
          groups={groups}
          compact={isCompactMode}
        />
      </SelectionZone>
    </div>
  );
};
