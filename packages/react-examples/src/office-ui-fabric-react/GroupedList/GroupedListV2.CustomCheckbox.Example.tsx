import * as React from 'react';
import {
  GroupHeader,
  IGroupHeaderCheckboxProps,
  IGroupHeaderProps,
  IGroupRenderProps,
  IGroup,
} from 'office-ui-fabric-react/lib/GroupedList';
import { GroupedListV2_unstable as GroupedListV2 } from 'office-ui-fabric-react/lib/GroupedListV2';
import { IColumn, IObjectWithKey, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { useConst } from '@uifabric/react-hooks';
import { createListItems, createGroups, IExampleItem } from '@uifabric/example-data';

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

export const GroupedListV2CustomCheckboxExample: React.FunctionComponent = () => {
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
          <GroupedListV2
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
