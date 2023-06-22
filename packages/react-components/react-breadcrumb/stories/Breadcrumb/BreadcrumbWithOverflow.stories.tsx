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
} from '@fluentui/react-breadcrumb';
import type { PartitionBreadcrumbItems } from '@fluentui/react-breadcrumb';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

type Item = {
  key: number;
  item?: string;
  buttonProps?: {
    onClick?: () => void;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

const buttonItems: Item[] = [
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

const OverflowBreadcrumbButton: React.FC<{ id: string; item: Item }> = props => {
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

const ControlledOverflowMenu = (props: PartitionBreadcrumbItems<Item>) => {
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
            startDisplayedItems.map((item: Item) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
          {overflowItems &&
            overflowItems.map((item: Item) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
          {isOverflowing &&
            endDisplayedItems &&
            endDisplayedItems.map((item: Item) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
const BreadcrumbControlledOverflowExample = () => {
  const styles = useExampleStyles();

  const { startDisplayedItems, overflowItems, endDisplayedItems }: PartitionBreadcrumbItems<Item> =
    partitionBreadcrumbItems({
      items: buttonItems,
      maxDisplayedItems: 4,
    });

  return (
    <div className={mergeClasses(styles.example, styles.horizontal)}>
      <Overflow>
        <Breadcrumb>
          {startDisplayedItems.map((item: Item) => {
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
            endDisplayedItems.map((item: Item) => {
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

export const BreadcrumbWithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <BreadcrumbControlledOverflowExample />
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
