import * as React from 'react';
import { GroupedListV2, IGroup } from '@fluentui/react/lib/GroupedList';
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

export const GroupedListV2BasicExample: React.FunctionComponent = () => {
  const _selection = new Selection();
  const _items: Array<{ key: string }> = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }];
  const _groups: Array<IGroup> = [
    {
      count: 3,
      hasMoreData: true,
      isCollapsed: false,
      key: 'group0',
      name: 'group 0',
      startIndex: 2,
      level: 0,
      children: [],
    },
  ];

  function _onRenderCell(nestingDepth: number, item: any, itemIndex: number): JSX.Element {
    return (
      <DetailsRow
        columns={Object.keys(item)
          .slice(0, 2)
          .map(
            (value): IColumn => {
              return {
                key: value,
                name: value,
                fieldName: value,
                minWidth: 300,
              };
            },
          )}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex}
        selection={_selection}
        selectionMode={SelectionMode.multiple}
      />
    );
  }

  return <GroupedListV2 items={_items} groups={_groups} onRenderCell={_onRenderCell} selection={_selection} />;

  // const [isCompactMode, { toggle: toggleIsCompactMode }] = useBoolean(false);
  // const selection = useConst(() => {
  //   const s = new Selection();
  //   s.setItems(items, true);
  //   return s;
  // });

  // const onRenderCell = (
  //   nestingDepth?: number,
  //   item?: IExampleItem,
  //   itemIndex?: number,
  //   group?: IGroup,
  // ): React.ReactNode => {
  //   return item && typeof itemIndex === 'number' && itemIndex > -1 ? (
  //     <DetailsRow
  //       columns={columns}
  //       groupNestingDepth={nestingDepth}
  //       item={item}
  //       itemIndex={itemIndex}
  //       selection={selection}
  //       selectionMode={SelectionMode.multiple}
  //       compact={isCompactMode}
  //       group={group}
  //     />
  //   ) : null;
  // };

  // return (
  //   <div>
  //     <Toggle
  //       label="Enable compact mode"
  //       checked={isCompactMode}
  //       onChange={toggleIsCompactMode}
  //       onText="Compact"
  //       offText="Normal"
  //       styles={toggleStyles}
  //     />
  //     <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
  //       <GroupedListV2
  //         items={items}
  //         // eslint-disable-next-line react/jsx-no-bind
  //         onRenderCell={onRenderCell}
  //         selection={selection}
  //         selectionMode={SelectionMode.multiple}
  //         groups={groups}
  //         compact={isCompactMode}
  //       />
  //     </SelectionZone>
  //   </div>
  // );
};

// @ts-expect-error Storybook
GroupedListV2BasicExample.storyName = 'V2 Basic';
