import * as React from 'react';
import { GroupedList } from 'office-ui-fabric-react/lib/GroupedList';
import { IColumn, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Toggle, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { useBoolean, useConst } from '@uifabric/react-hooks';
import { createListItems, createGroups, IExampleItem } from '@uifabric/example-data';

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

  const onRenderCell = (nestingDepth: number, item: IExampleItem, itemIndex: number): JSX.Element => {
    return (
      <DetailsRow
        columns={columns}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex}
        selection={selection}
        selectionMode={SelectionMode.multiple}
        compact={isCompactMode}
      />
    );
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
      <FocusZone>
        <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
          <GroupedList
            items={items}
            onRenderCell={onRenderCell}
            selection={selection}
            selectionMode={SelectionMode.multiple}
            groups={groups}
            compact={isCompactMode}
          />
        </SelectionZone>
      </FocusZone>
    </div>
  );
};
