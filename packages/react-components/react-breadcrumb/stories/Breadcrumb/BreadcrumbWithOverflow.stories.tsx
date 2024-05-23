import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  ButtonProps,
  makeStyles,
  tokens,
  Button,
  Menu,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Overflow,
  OverflowItem,
  OverflowDivider,
  Tooltip,
} from '@fluentui/react-components';
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import type { PartitionBreadcrumbItems } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

type Item = {
  key: number;
  item?: string;
  itemProps?: {
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    href?: string;
  };
};

const items: Item[] = [
  {
    key: 0,
    item: 'Item 0',
    itemProps: {
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 1,
    item: 'Item 1',
    itemProps: {
      icon: <CalendarMonth />,
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 2,
    item: 'Item 2',
    itemProps: {
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 3,
    item: 'Item 3',
    itemProps: {
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 4,
    item: 'Item 4',
    itemProps: {
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 5,
    item: 'Item 5',
    itemProps: {
      icon: <CalendarMonthRegular />,
      disabled: true,
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 6,
    item: 'Item 6',
    itemProps: {
      href: 'https://react.fluentui.dev/',
    },
  },
  {
    key: 7,
    item: 'Item 7',
    itemProps: {
      href: 'https://react.fluentui.dev/',
    },
  },
];

const useExampleStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: 'hidden',
    padding: '5px',
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
    height: 'fit-content',
    minWidth: '200px',
    resize: 'horizontal',
    width: '600px',
  },
});

const useTooltipStyles = makeStyles({
  tooltip: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const MenuItem: React.FC<{ id: string; item: Item }> = props => {
  const { item, id } = props;
  const isVisible = useIsOverflowItemVisible(id);
  const href = item.itemProps?.href || '';

  if (isVisible) {
    return null;
  }

  return (
    <MenuItemLink {...item.itemProps} href={href}>
      {item.item}
    </MenuItemLink>
  );
};

const OverflowGroupDivider: React.FC<{
  groupId: number;
}> = props => {
  return (
    <OverflowDivider groupId={props.groupId.toString()}>
      <BreadcrumbDivider data-group={props.groupId} />
    </OverflowDivider>
  );
};

const renderBreadcrumbItem = (el: Item, isLastItem: boolean = false) => {
  return (
    <React.Fragment key={`button-items-${el.key}`}>
      <OverflowItem id={el.key.toString()} priority={isLastItem ? el.key : undefined} groupId={el.key.toString()}>
        <BreadcrumbItem>
          <BreadcrumbButton {...el.itemProps} current={isLastItem}>
            {el.item}
          </BreadcrumbButton>
        </BreadcrumbItem>
      </OverflowItem>
      {!isLastItem && <OverflowGroupDivider groupId={el.key} />}
    </React.Fragment>
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

const OverflowMenu = (props: PartitionBreadcrumbItems<Item>) => {
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
    <BreadcrumbItem>
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
            {isOverflowing &&
              startDisplayedItems.map((item: Item) => <MenuItem id={item.key.toString()} item={item} key={item.key} />)}
            {overflowItems &&
              overflowItems.map((item: Item) => <MenuItem id={item.key.toString()} item={item} key={item.key} />)}
            {isOverflowing &&
              endDisplayedItems &&
              endDisplayedItems.map((item: Item) => <MenuItem id={item.key.toString()} item={item} key={item.key} />)}
          </MenuList>
        </MenuPopover>
      </Menu>
    </BreadcrumbItem>
  );
};
const BreadcrumbOverflowExample = () => {
  const styles = useExampleStyles();

  const { startDisplayedItems, overflowItems, endDisplayedItems }: PartitionBreadcrumbItems<Item> =
    partitionBreadcrumbItems({
      items,
      maxDisplayedItems: 5,
    });

  return (
    <div className={styles.example}>
      <Overflow>
        <Breadcrumb>
          {startDisplayedItems.map((item: Item) => renderBreadcrumbItem(item, false))}
          <OverflowMenu
            overflowItems={overflowItems}
            startDisplayedItems={startDisplayedItems}
            endDisplayedItems={endDisplayedItems}
          />
          <BreadcrumbDivider />
          {endDisplayedItems &&
            endDisplayedItems.map((item: Item) => {
              const isLastItem = item.key === items.length - 1;
              return renderBreadcrumbItem(item, isLastItem);
            })}
        </Breadcrumb>
      </Overflow>
    </div>
  );
};

export const BreadcrumbWithOverflow = () => {
  return <BreadcrumbOverflowExample />;
};
