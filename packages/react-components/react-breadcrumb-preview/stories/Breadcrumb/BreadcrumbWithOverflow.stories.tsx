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
} from '@fluentui/react-breadcrumb-preview';
import type { PartitionBreadcrumbItems } from '@fluentui/react-breadcrumb-preview';

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

const renderButton = (el: ButtonItem, isLastItem: boolean = false) => {
  return (
    <React.Fragment key={`button-items-${el.key}`}>
      <OverflowItem id={el.key.toString()} priority={isLastItem ? el.key : undefined} groupId={el.key.toString()}>
        <BreadcrumbItem>
          <BreadcrumbButton {...el.buttonProps} current={isLastItem}>
            {el.item}
          </BreadcrumbButton>
        </BreadcrumbItem>
      </OverflowItem>
      {!isLastItem && <OverflowGroupDivider groupId={el.key} />}
    </React.Fragment>
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
          {startDisplayedItems.map((item: ButtonItem) => renderButton(item, false))}
          <ControlledOverflowMenu
            overflowItems={overflowItems}
            startDisplayedItems={startDisplayedItems}
            endDisplayedItems={endDisplayedItems}
          />
          <BreadcrumbDivider />
          {endDisplayedItems &&
            endDisplayedItems.map((item: ButtonItem) => {
              const isLastItem = item.key === buttonItems.length - 1;
              return renderButton(item, isLastItem);
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
        'Interactive Breadcrumb: When the maximum number is exceeded, items in the middle auto-collapse into an overflow menu.',
        'Tooltip should be shown on `hover` for the overlfow menu.',
        '\nThe first and last items should always appear  in the breadcrumb. Breadcrumbs should never wrap.',
        'Non-interactive Breadcrumb runs the entire available space where the control is placed.',
        'If the space is limited, the string will truncate the end of it.',
      ].join('\n'),
    },
  },
};
