import * as React from 'react';
import {
  ButtonProps,
  makeStyles,
  shorthands,
  tokens,
  Button,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Overflow,
  OverflowItem,
  MenuItemLink,
  OverflowDivider,
} from '@fluentui/react-components';
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
} from '@fluentui/react-breadcrumb-preview';
import type { PartitionBreadcrumbItems } from '@fluentui/react-breadcrumb-preview';

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
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
    height: 'fit-content',
    minWidth: '200px',
    resize: 'horizontal',
    width: '600px',
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

const OverflowMenu = (props: PartitionBreadcrumbItems<Item>) => {
  const { overflowItems, startDisplayedItems, endDisplayedItems } = props;
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing && overflowItems && overflowItems.length === 0) {
    return null;
  }

  const overflowItemsCount = overflowItems ? overflowItems.length + overflowCount : overflowCount;

  return (
    <BreadcrumbItem>
      <Menu hasIcons>
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="subtle"
            ref={ref}
            icon={<MoreHorizontal />}
            aria-label={`${overflowItemsCount} more items`}
            role="button"
          />
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
      maxDisplayedItems: 4,
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

BreadcrumbWithOverflow.parameters = {
  docs: {
    description: {
      story: [
        'The maximum number of items in a breadcrumb can be customized. We recommend a maximum of 6 items or fewer.',
        'Interactive Breadcrumb: When the maximum number is exceeded, items in the middle auto-collapse into an overflow menu.',
        'Tooltip should be added to the overflow menu.',
        '\nThe first and last items should always appear  in the breadcrumb. Breadcrumbs should never wrap.',
        'Non-interactive Breadcrumb runs the entire available space where the control is placed.',
        'If the space is limited, the string will truncate the end of it.',
      ].join('\n'),
    },
  },
};
