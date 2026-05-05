# Components/Breadcrumb

For detailed guidance on when and how to use this component, go to Fluent 2 Breadcrumbs.

## Props

| Name        | Type                                                                                                                                           | Required | Default  | Description                                                                                                                                                                                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `list`      | `WithSlotShorthandValue<{ as?: "ol"; } & Omit<DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "children"> & { ...; }> | null`    | No       |                                                                                                                                                                                                                                                                                                                       | Ordered list which contains items. |
| `as`        | `"nav"`                                                                                                                                        | No       |          |                                                                                                                                                                                                                                                                                                                       |
| `focusMode` | `"tab" "arrow"`                                                                                                                                | No       | 'tab'    | Sets the focus behavior for the Breadcrumb. `tab` This behaviour will cycle through all elements inside of the Breadcrumb when pressing the Tab key and then release focus after the last inner element. `arrow` This behaviour will cycle through all elements inside of the Breadcrumb when pressing the Arrow key. |
| `size`      | `"small" "medium" "large"`                                                                                                                     | No       | 'medium' | Controls size of Breadcrumb items and dividers.                                                                                                                                                                                                                                                                       |
| `ref`       | `Ref<HTMLElement>`                                                                                                                             | No       |          |                                                                                                                                                                                                                                                                                                                       |

## Subcomponents

### BreadcrumbItem

BreadcrumbItem component is a wrapper for BreadcrumbLink and BreadcrumbButton.
It can be used as a non-interactive item.

#### Props

| Name   | Type                       | Required | Default  | Description                                     |
| ------ | -------------------------- | -------- | -------- | ----------------------------------------------- |
| `as`   | `"li"`                     | No       |          |                                                 |
| `size` | `"small" "medium" "large"` | No       | 'medium' | Controls size of Breadcrumb items and dividers. |
| `ref`  | `Ref<HTMLLIElement>`       | No       |          |                                                 |

### BreadcrumbButton

A button component which is used inside the Breadcrumb.

#### Props

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required            | Default  | Description                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `icon`              | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null`               | No       |                                                 | Icon that renders either before or after the `children` as specified by the `iconPosition` prop. |
| `as`                | `"a" "button"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No                  |          |                                                 |
| `disabledFocusable` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false    |
| false               | When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons. |
| `size`              | `"small" "medium" "large"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No                  | 'medium' | Controls size of Breadcrumb items and dividers. |
| `current`           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No                  | false    | Defines current sate of BreadcrumbButton.       |
| `ref`               | `Ref<HTMLAnchorElement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | HTMLButtonElement>` | No       |                                                 |                                                                                                  |

### BreadcrumbDivider

A divider component which is used inside the Breadcrumb

#### Props

| Name  | Type                 | Required | Default | Description |
| ----- | -------------------- | -------- | ------- | ----------- |
| `as`  | `"li"`               | No       |         |             |
| `ref` | `Ref<HTMLLIElement>` | No       |         |             |

## Examples

### Breadcrumb Size

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-components';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export const BreadcrumbSize = (): JSXElement => {
  return (
    <>
      <Breadcrumb aria-label="Small breadcrumb example with buttons" size="small">
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton icon={<CalendarMonth />}>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 3</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 4</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Medium breadcrumb example with buttons" size="medium">
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton icon={<CalendarMonth />}>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 3</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton current>Item 4</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb aria-label="Large breadcrumb example with buttons" size="large">
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton icon={<CalendarMonth />}>Item 2</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton>Item 3</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton icon={<CalendarMonth />} current>
            Item 4
          </BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
```

### Breadcrumb With Overflow

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

  const hasHiddenItems = overflowItems && overflowItems.length > 0;

  return (
    <div className={styles.example}>
      <Overflow hasHiddenItems={hasHiddenItems}>
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

export const BreadcrumbWithOverflow = (): JSXElement => {
  return <BreadcrumbOverflowExample />;
};
```

### Breadcrumb With Tooltip

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const BreadcrumbWithTooltip = (): JSXElement => {
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
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton } from '@fluentui/react-components';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = 'https://www.bing.com/';

export const Default = (): JSXElement => {
  return (
    <Breadcrumb aria-label="Breadcrumb default example">
      <BreadcrumbItem>
        <BreadcrumbButton href={path}>Item 1</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href={path} icon={<CalendarMonth />}>
          Item 2
        </BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href={path}>Item 3</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton href={path} current>
          Item 4
        </BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
```
