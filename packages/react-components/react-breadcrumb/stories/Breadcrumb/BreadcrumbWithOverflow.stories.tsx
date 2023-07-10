import * as React from 'react';
import {
  ButtonProps,
  makeStyles,
  mergeClasses,
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
  MenuItem,
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
  truncateBreadcrumbLongName,
  truncateBreadcrumLongTooltip,
  isTruncatableBreadcrumbContent,
} from '@fluentui/react-breadcrumb';
import type { PartitionBreadcrumbItems } from '@fluentui/react-breadcrumb';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

type ButtonItem = {
  key: number;
  item?: string;
  buttonProps?: {
    onClick?: () => void;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

type Item = {
  key: number;
  item: string;
};

const buttonItems: ButtonItem[] = [
  {
    key: 0,
    item: 'Item 0',
    buttonProps: {
      onClick: () => console.log('item 0 was clicked'),
    },
  },
  {
    key: 1,
    item: 'Item 1',
    buttonProps: {
      icon: <CalendarMonth />,
      onClick: () => console.log('item 1 was clicked'),
    },
  },
  {
    key: 2,
    item: 'Item 2',
    buttonProps: {
      onClick: () => console.log('item 2 was clicked'),
    },
  },
  {
    key: 3,
    item: 'Item 3',
    buttonProps: {
      onClick: () => console.log('item 3 was clicked'),
    },
  },
  {
    key: 4,
    item: 'Item 4',
    buttonProps: {
      onClick: () => console.log('item 4 was clicked'),
    },
  },
  {
    key: 5,
    item: 'Item 5',
    buttonProps: {
      icon: <CalendarMonthRegular />,
      iconPosition: 'after',
      onClick: () => console.log('item 5 was clicked'),
    },
  },
  {
    key: 6,
    item: 'Item 6',
    buttonProps: {
      onClick: () => console.log('item 6 was clicked'),
      disabled: true,
    },
  },
  {
    key: 7,
    item: 'Item 7',
    buttonProps: {
      onClick: () => console.log('item 7 was clicked'),
    },
  },
];

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

const useOverflowMenuStyles = makeStyles({
  menu: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  menuButton: {
    alignSelf: 'center',
  },
});

const useExampleStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
  },
  horizontal: {
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '600px',
  },
});

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.overflow('auto'),
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
    minHeight: '600px', //lets the page remain at a minimum height when vertical tabs are resized
  },
});

const OverflowBreadcrumbButton: React.FC<{ id: string; item: ButtonItem }> = props => {
  const { item, id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem {...item.buttonProps}>{item.item}</MenuItem>;
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

const ControlledOverflowMenu = (props: PartitionBreadcrumbItems<ButtonItem>) => {
  const { overflowItems, startDisplayedItems, endDisplayedItems } = props;
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  const styles = useOverflowMenuStyles();

  if (!isOverflowing && overflowItems && overflowItems.length === 0) {
    return null;
  }

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          className={styles.menuButton}
          ref={ref}
          icon={<MoreHorizontal />}
          aria-label={`${overflowCount} more tabs`}
          role="tab"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList className={styles.menu}>
          {isOverflowing &&
            startDisplayedItems.map((item: ButtonItem) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
          {overflowItems &&
            overflowItems.map((item: ButtonItem) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
          {isOverflowing &&
            endDisplayedItems &&
            endDisplayedItems.map((item: ButtonItem) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
const BreadcrumbControlledOverflowExample = () => {
  const styles = useExampleStyles();

  const { startDisplayedItems, overflowItems, endDisplayedItems }: PartitionBreadcrumbItems<ButtonItem> =
    partitionBreadcrumbItems({
      items: buttonItems,
      maxDisplayedItems: 4,
    });

  return (
    <div className={mergeClasses(styles.example, styles.horizontal)}>
      <Overflow>
        <Breadcrumb>
          {startDisplayedItems.map((item: ButtonItem) => {
            return (
              <React.Fragment key={`start-items-${item.key}`}>
                <OverflowItem id={`${item.key}`} groupId={item.key.toString()}>
                  <BreadcrumbItem>
                    <BreadcrumbButton {...item.buttonProps}>{item.item}</BreadcrumbButton>
                  </BreadcrumbItem>
                </OverflowItem>
                <OverflowGroupDivider groupId={item.key} />
              </React.Fragment>
            );
          })}
          <ControlledOverflowMenu
            overflowItems={overflowItems}
            startDisplayedItems={startDisplayedItems}
            endDisplayedItems={endDisplayedItems}
          />
          <BreadcrumbDivider />
          {endDisplayedItems &&
            endDisplayedItems.map((item: ButtonItem) => {
              const isLastItem = item.key === buttonItems.length - 1;

              return (
                <React.Fragment key={`end-items-${item.key}`}>
                  <OverflowItem
                    id={item.key.toString()}
                    priority={isLastItem ? item.key : undefined}
                    groupId={item.key.toString()}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbButton {...item.buttonProps} current={isLastItem}>
                        {item.item}
                      </BreadcrumbButton>
                    </BreadcrumbItem>
                  </OverflowItem>
                  {!isLastItem && <OverflowGroupDivider groupId={item.key} />}
                </React.Fragment>
              );
            })}
        </Breadcrumb>
      </Overflow>
    </div>
  );
};

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

export const BreadcrumbWithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h2>Interactive Breadcrumb with overflow</h2>
      <BreadcrumbControlledOverflowExample />
      <h2>Non-interactive Breadcrumb with overflow</h2>
      For non-interactive Breadcrumbs tooltips are used instead of overflow menu.
      <BreadcrumbItemOverflowExample />
    </div>
  );
};

BreadcrumbWithOverflow.parameters = {
  docs: {
    description: {
      story: [
        'The maximum number of items in a breadcrumb can be customized. We recommend a maximum of 6 items or fewer.',
        'When the maximum number is exceeded, items in the middle auto-collapse into an overflow menu.',
        '\nThe first and last items should always appear  in the breadcrumb. Breadcrumbs should never wrap.',
      ].join('\n'),
    },
  },
};
