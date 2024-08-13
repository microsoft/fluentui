import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  truncateBreadcrumbLongName,
  isTruncatableBreadcrumbContent,
  makeStyles,
  Tooltip,
  useIsOverflowItemVisible,
  Menu,
  MenuTrigger,
  useOverflowMenu,
  MenuPopover,
  MenuList,
  MenuItem,
  Button,
} from '@fluentui/react-components';
import { MoreHorizontalRegular, MoreHorizontalFilled, bundleIcon } from '@fluentui/react-icons';
import type { PartitionBreadcrumbItems } from '@fluentui/react-components';

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
    item: 'Item 5',
  },
  {
    key: 5,
    item: 'Item 6',
  },
  {
    key: 6,
    item: 'Item 7',
  },
  {
    key: 7,
    item: 'Item 8',
  },
];

const itemsWithLongNames: Item[] = [
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
    item: "Item 3 is long. Don't think about what you want to be, but what you want to do.",
  },
  {
    key: 3,
    item: 'Item 4',
  },
  {
    key: 4,
    item: 'Item 5 which is longer than 30 characters',
  },
];

const useTooltipStyles = makeStyles({
  tooltip: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

function renderItem(entry: Item, isLastItem: boolean) {
  return (
    <React.Fragment key={`item-${entry.key}`}>
      {isTruncatableBreadcrumbContent(entry.item, 30) ? (
        <BreadcrumbItem>
          <Tooltip withArrow content={entry.item} relationship="label">
            <BreadcrumbButton current={isLastItem}>{truncateBreadcrumbLongName(entry.item)}</BreadcrumbButton>
          </Tooltip>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <BreadcrumbButton current={isLastItem}>{entry.item}</BreadcrumbButton>
        </BreadcrumbItem>
      )}

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}

const BreadcrumbMenuItem: React.FC<{ item: Item }> = props => {
  const { item } = props;
  const isVisible = useIsOverflowItemVisible(item.key.toString());

  if (isVisible) {
    return null;
  }

  return <MenuItem>{item.item}</MenuItem>;
};

const MenuWithTooltip = (props: PartitionBreadcrumbItems<Item>) => {
  const { overflowItems, startDisplayedItems, endDisplayedItems } = props;
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();
  const tooltipStyles = useTooltipStyles();
  if (!isOverflowing && overflowItems && overflowItems.length === 0) {
    return null;
  }
  const overflowItemsCount = overflowItems ? overflowItems.length + overflowCount : overflowCount;
  const tooltipContent =
    overflowItemsCount > 3
      ? `${overflowItemsCount} items`
      : {
          children: getTooltipContent(overflowItems),
          className: tooltipStyles.tooltip,
        };

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <Tooltip withArrow content={tooltipContent} relationship="label">
          <Button
            id="menu"
            appearance="subtle"
            ref={ref}
            icon={<MoreHorizontal />}
            aria-label={`${overflowItemsCount} more items`}
            role="button"
          />
        </Tooltip>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {isOverflowing && startDisplayedItems.map((item: Item) => <BreadcrumbMenuItem item={item} key={item.key} />)}
          {overflowItems && overflowItems.map((item: Item) => <BreadcrumbMenuItem item={item} key={item.key} />)}
          {isOverflowing &&
            endDisplayedItems &&
            endDisplayedItems.map((item: Item) => <BreadcrumbMenuItem item={item} key={item.key} />)}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const getTooltipContent = (breadcrumbItems: readonly Item[] | undefined) => {
  if (!breadcrumbItems) {
    return '';
  }
  return breadcrumbItems.reduce((acc, initialValue, idx, arr) => {
    return (
      <>
        {acc}
        {arr[0].item !== initialValue.item && ' > '}
        {initialValue.item}
      </>
    );
  }, <React.Fragment />);
};

const BreadcrumbWithTooltipExample = () => {
  const { startDisplayedItems, overflowItems, endDisplayedItems }: PartitionBreadcrumbItems<Item> =
    partitionBreadcrumbItems({
      items,
      maxDisplayedItems: 3,
    });
  const lastIdx = items.length - 1;
  return (
    <Breadcrumb aria-label="breadcrumb-with-tootip">
      {startDisplayedItems.map(item => renderItem(item, lastIdx === item.key))}
      {overflowItems && (
        <MenuWithTooltip
          overflowItems={overflowItems}
          startDisplayedItems={startDisplayedItems}
          endDisplayedItems={endDisplayedItems}
        />
      )}
      {endDisplayedItems && endDisplayedItems.map(item => renderItem(item, lastIdx === item.key))}
    </Breadcrumb>
  );
};

export const BreadcrumbWithTooltip = () => {
  const itemsLength = itemsWithLongNames.length - 1;
  return (
    <>
      <h3>Breadcrumb with a tooltip</h3>
      <BreadcrumbWithTooltipExample aria-label="breadcrumb-with-tooltip" />
      <h3>Breadcrumb with long names</h3>
      <Breadcrumb aria-label="breadcrumb-with-long-names">
        {itemsWithLongNames.map(item => renderItem(item, itemsLength === item.key))}
      </Breadcrumb>
    </>
  );
};
