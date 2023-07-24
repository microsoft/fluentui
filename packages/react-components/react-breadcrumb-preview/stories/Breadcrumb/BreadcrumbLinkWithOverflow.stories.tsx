import * as React from 'react';
import {
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
  BreadcrumbLink,
  BreadcrumbDivider,
  BreadcrumbLinkProps,
  partitionBreadcrumbItems,
} from '@fluentui/react-breadcrumb-preview';
import type { PartitionBreadcrumbItems } from '@fluentui/react-breadcrumb-preview';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

type LinkItem = {
  key: number;
  item?: string;
  linkProps: {
    'aria-label'?: string;
    href?: string;
    icon?: BreadcrumbLinkProps['icon'];
    disabled?: boolean;
    iconPosition?: 'before' | 'after';
  };
};

const linkItems: LinkItem[] = [
  {
    key: 0,
    item: 'Item 0',
    linkProps: {
      href: 'https://developer.microsoft.com/',
    },
  },
  {
    key: 1,
    item: 'Item 1',
    linkProps: {
      href: 'https://developer.microsoft.com/',
      icon: <CalendarMonth />,
    },
  },
  {
    key: 2,
    item: 'Item 2',
    linkProps: {
      href: 'https://developer.microsoft.com/',
    },
  },
  {
    key: 3,
    linkProps: {
      'aria-label': 'Item 3',
      href: 'https://developer.microsoft.com/',
      icon: <CalendarMonth />,
    },
  },
  {
    key: 4,
    item: 'Item 4',
    linkProps: {
      href: 'https://developer.microsoft.com/',
      icon: <CalendarMonthRegular />,
      iconPosition: 'after',
    },
  },
  {
    key: 5,
    item: 'Item 5',
    linkProps: {
      href: 'https://developer.microsoft.com/',
      disabled: true,
    },
  },
  {
    key: 6,
    item: 'Item 6',
    linkProps: {
      href: 'https://developer.microsoft.com/',
    },
  },
];

function renderLink(el: LinkItem, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`link-items-${el.key}`}>
      <OverflowItem id={el.key.toString()} priority={isLastItem ? el.key : undefined} groupId={el.key.toString()}>
        <BreadcrumbItem>
          <BreadcrumbLink
            {...el.linkProps}
            target="_blank"
            current={isLastItem}
            href={isLastItem ? undefined : el.linkProps?.href}
          >
            {el.item}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </OverflowItem>
      {!isLastItem && <OverflowGroupDivider groupId={el.key} />}
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
    width: '500px',
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

const OverflowBreadcrumbButton: React.FC<{ id: string; item: LinkItem }> = props => {
  const { item, id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem {...item.linkProps}>{item.item}</MenuItem>;
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

const ControlledOverflowMenu = (props: PartitionBreadcrumbItems<LinkItem>) => {
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
            startDisplayedItems.map((item: LinkItem) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
          {overflowItems &&
            overflowItems.map((item: LinkItem) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
          {isOverflowing &&
            endDisplayedItems &&
            endDisplayedItems.map((item: LinkItem) => (
              <OverflowBreadcrumbButton id={item.key.toString()} item={item} key={item.key} />
            ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
const BreadcrumbControlledOverflowExample = () => {
  const styles = useExampleStyles();

  const { startDisplayedItems, overflowItems, endDisplayedItems }: PartitionBreadcrumbItems<LinkItem> =
    partitionBreadcrumbItems({
      items: linkItems,
      maxDisplayedItems: 4,
    });

  return (
    <div className={mergeClasses(styles.example, styles.horizontal)}>
      <Overflow padding={40}>
        <Breadcrumb>
          {startDisplayedItems.map((item: LinkItem) => renderLink(item, false))}
          <ControlledOverflowMenu
            overflowItems={overflowItems}
            startDisplayedItems={startDisplayedItems}
            endDisplayedItems={endDisplayedItems}
          />
          <BreadcrumbDivider />
          {endDisplayedItems &&
            endDisplayedItems.map((item: LinkItem) => {
              const isLastItem = item.key === linkItems.length - 1;
              return renderLink(item, isLastItem);
            })}
        </Breadcrumb>
      </Overflow>
    </div>
  );
};

export const BreadcrumbLinkWithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <BreadcrumbControlledOverflowExample />
    </div>
  );
};
