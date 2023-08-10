import * as React from 'react';
import { makeStyles, shorthands, Tooltip } from '@fluentui/react-components';
import { MoreHorizontalRegular, MoreHorizontalFilled, bundleIcon } from '@fluentui/react-icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  truncateBreadcrumbLongName,
  truncateBreadcrumLongTooltip,
  isTruncatableBreadcrumbContent,
} from '@fluentui/react-breadcrumb-preview';
import type { PartitionBreadcrumbItems } from '@fluentui/react-breadcrumb-preview';

const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

type Item = {
  key: number;
  item: string;
};

const items: Item[] = [
  {
    key: 0,
    item: 'Item 1',
  },
  {
    key: 1,
    item: 'Item 2',
  },
  {
    key: 2,
    item: 'Item 3',
  },
  {
    key: 3,
    item: 'Item 4',
  },
  {
    key: 4,
    item: 'Item 5 which is longer than 30 characters',
  },
  {
    key: 5,
    item: "Item 6 is long even for tooltip. Don't think about what you want to be, but what you want to do.",
  },
];

function renderItem(entry: Item, isLastItem: boolean) {
  return (
    <React.Fragment key={`item-${entry.key}`}>
      {isTruncatableBreadcrumbContent(entry.item, 30) ? (
        <Tooltip withArrow content={truncateBreadcrumLongTooltip(entry.item)} relationship="label">
          <BreadcrumbItem current={isLastItem}>{truncateBreadcrumbLongName(entry.item)}</BreadcrumbItem>
        </Tooltip>
      ) : (
        <BreadcrumbItem current={isLastItem}>{entry.item}</BreadcrumbItem>
      )}

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.overflow('auto'),
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
  },
});

const getTooltipContent = (breadcrumbItems: readonly Item[]) => {
  return breadcrumbItems.reduce((acc, initialValue, idx, arr) => {
    return (
      <div style={{ display: 'flex' }}>
        {acc}
        {arr[0].item !== initialValue.item && <BreadcrumbDivider />}
        {initialValue.item}
      </div>
    );
  }, <div style={{ display: 'flex' }} />);
};

const BreadcrumbItemOverflowExample = () => {
  const { startDisplayedItems, overflowItems, endDisplayedItems }: PartitionBreadcrumbItems<Item> =
    partitionBreadcrumbItems({
      items,
      maxDisplayedItems: 3,
    });
  const lastIdx = items.length - 1;
  return (
    <Breadcrumb aria-label="breadcrumb-with-overflow">
      {startDisplayedItems.map(item => renderItem(item, lastIdx === item.key))}
      {overflowItems && (
        <BreadcrumbItem>
          <Tooltip withArrow content={getTooltipContent(overflowItems)} relationship="label">
            <BreadcrumbButton icon={<MoreHorizontal />} aria-label={`more items`} />
          </Tooltip>
        </BreadcrumbItem>
      )}
      {endDisplayedItems && endDisplayedItems.map(item => renderItem(item, lastIdx === item.key))}
    </Breadcrumb>
  );
};

export const BreadcrumbItemWithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <BreadcrumbItemOverflowExample />
    </div>
  );
};

BreadcrumbItemWithOverflow.parameters = {
  docs: {
    description: {
      story: ['For non-interactive Breadcrumbs tooltips are used instead of overflow menu.'].join('\n'),
    },
  },
};
