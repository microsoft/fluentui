import * as React from 'react';
import {
  GroupHeader,
  GroupedList,
  IGroupHeaderCheckboxProps,
  IGroupHeaderProps,
  IGroupRenderProps,
  IGroup,
} from '@fluentui/react/lib/GroupedList';
import { IColumn, IObjectWithKey, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { Icon } from '@fluentui/react/lib/Icon';
import { useConst } from '@fluentui/react-hooks';
import { createListItems, createGroups, IExampleItem } from '@fluentui/example-data';

const groupCount = 3;
const groupDepth = 1;

const groupProps: IGroupRenderProps = {
  onRenderHeader: (props?: IGroupHeaderProps): JSX.Element => (
    <GroupHeader onRenderGroupHeaderCheckbox={onRenderGroupHeaderCheckbox} {...props} />
  ),
};

/* This is rendered within a checkbox, so it must not be interactive itself. */
const onRenderGroupHeaderCheckbox = (props?: IGroupHeaderCheckboxProps) => {
  const iconStyles = { root: { fontSize: '36px' } };

  return props?.checked ? (
    <Icon iconName="ToggleRight" styles={iconStyles} />
  ) : (
    <Icon iconName="ToggleLeft" styles={iconStyles} />
  );
};

export const GroupedListCustomCheckboxExample: React.FunctionComponent = () => {
  const items: IObjectWithKey[] = useConst(() => createListItems(Math.pow(groupCount, groupDepth + 1)));
  const groups = useConst(() => createGroups(groupCount, groupDepth, 0, groupCount));
  const columns = useConst(() =>
    Object.keys(items[0])
      .slice(0, 3)
      .map(
        (key: string): IColumn => ({
          key: key,
          name: key,
          fieldName: key,
          minWidth: 300,
        }),
      ),
  );
  const selection = useConst(() => new Selection({ items }));

  const onRenderCell = React.useCallback(
    (nestingDepth?: number, item?: IExampleItem, itemIndex?: number, group?: IGroup): React.ReactNode => (
      <DetailsRow
        columns={columns}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={itemIndex!}
        selection={selection}
        selectionMode={SelectionMode.multiple}
        group={group}
      />
    ),
    [columns, selection],
  );

  return (
    <div>
      <FocusZone>
        <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
          <GroupedList
            items={items}
            onRenderCell={onRenderCell}
            selection={selection}
            selectionMode={SelectionMode.multiple}
            groups={groups}
            groupProps={groupProps}
          />
        </SelectionZone>
      </FocusZone>
    </div>
  );
};
