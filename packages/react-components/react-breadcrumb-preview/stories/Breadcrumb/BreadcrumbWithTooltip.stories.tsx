import * as React from 'react';
import {
  makeStyles,
  shorthands,
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
    item: "Item 3 is long even for tooltip. Don't think about what you want to be, but what you want to do.",
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
    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
  },
});

function renderItem(entry: Item, isLastItem: boolean) {
  return (
    <React.Fragment key={`item-${entry.key}`}>
      {isTruncatableBreadcrumbContent(entry.item, 30) ? (
        <Tooltip withArrow content={truncateBreadcrumLongTooltip(entry.item)} relationship="label">
          <BreadcrumbItem>
            <BreadcrumbButton current={isLastItem}>{truncateBreadcrumbLongName(entry.item)}</BreadcrumbButton>
          </BreadcrumbItem>
        </Tooltip>
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

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <Tooltip
          withArrow
          content={{
            children: getTooltipContent(overflowItems),
            className: tooltipStyles.tooltip,
          }}
          relationship="label"
        >
          <Button
            id="menu"
            appearance="subtle"
            ref={ref}
            icon={<MoreHorizontal />}
            aria-label={`${overflowCount} more items`}
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
      <h3>Interactive Breadcrumb with a tooltip</h3>
      <BreadcrumbWithTooltipExample aria-label="interactive-breadcrumb-with-tooltip" />
      <h3>Breadcrumb with long names</h3>
      <Breadcrumb aria-label="breadcrumb-with-long-names">
        {itemsWithLongNames.map(item => renderItem(item, itemsLength === item.key))}
      </Breadcrumb>
    </>
  );
};

BreadcrumbWithTooltip.parameters = {
  docs: {
    description: {
      story: [
        'Interactive items have tooltips when their names are longer than 30 symbols.',
        'Tooltips are truncated when its content is longer than 80 symbols.',
        'Non-interactive Breadcrumb runs the entire available space where the control is placed.',
        'If the space is limited, the string will truncate the end of it.',
      ].join('\n\n'),
    },
  },
};
