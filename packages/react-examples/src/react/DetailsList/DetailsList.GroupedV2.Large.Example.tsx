import * as React from 'react';
import { DetailsHeader, DetailsList, IColumn, IDetailsHeaderProps, IGroup } from '@fluentui/react/lib/DetailsList';
import { GroupedListV2_unstable as GroupedListV2 } from '@fluentui/react/lib/GroupedListV2';

interface IDetailsListGroupedLargeExampleItem {
  key: string;
  name: string;
  value: string;
}

const getInitialItems = () => {
  const items = [];
  for (let i = 0; i < 1000; i++) {
    items.push({
      key: i.toString(),
      name: 'Item ' + i,
      value: i.toString(),
    });
  }

  return items;
};

const getInitialGroups = () => {
  const groups = [];
  for (let i = 0; i < 10; i++) {
    groups.push({
      key: i.toString(),
      name: i.toString(),
      startIndex: i * 100,
      count: 100,
      level: 0,
    });
  }

  return groups;
};

const onRenderDetailsHeader = (props: IDetailsHeaderProps) => {
  return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Expand collapse groups'} />;
};

export const DetailsListGroupedV2LargeExample: React.FC = () => {
  const [items] = React.useState<IDetailsListGroupedLargeExampleItem[]>(() => getInitialItems());
  const [groups] = React.useState<IGroup[]>(() => getInitialGroups());
  const [columns] = React.useState<IColumn[]>([
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'value', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
  ]);

  return (
    <DetailsList
      items={items}
      groups={groups}
      columns={columns}
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      ariaLabelForSelectionColumn="Toggle selection"
      checkButtonAriaLabel="select row"
      checkButtonGroupAriaLabel="select section"
      onRenderDetailsHeader={onRenderDetailsHeader}
      groupProps={{
        groupedListAs: GroupedListV2,
      }}
    />
  );
};

// @ts-expect-error Storybook
DetailsListGroupedV2LargeExample.storyName = 'V2 Grouped Large';
