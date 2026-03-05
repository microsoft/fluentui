# Components/List

The List is a component for rendering set of vertically stacked items (other layouts are being discussed). These items can be focusable, selectable, have one primary action and one or more secondary actions.

There are 2 basic use cases for List, based on the elements it contains:

(TL;DR at the end)

## Non-interactive list

A simple list with non-interactive elements inside of it. Imagine a list of ingredients for a dish or a list of requirements for a project.

Generally these items would not be focusable, since they don't provide any actions.

## Interactive lists

An interactive list is a List where each of its items has at least one action attached to it. Imagine a list of emails (clicking will open in), a list of contacts (clicking will open a conversation) or a list of installed apps (clicking will open it's details.)

To make the list interactive and navigable, the `navigationMode` should can be passed. Proper accessibility roles and keyboard navigation is used based on the navigation mode `items` or `composite`. More on this later.

### Adding an action

To add an action on the List Item, use `onAction` callback, which will be called when user clicks the list item,
presses `Enter` or `Space` (when selection is not enabled).

Using the `onAction` callback instead of `onClick` has multiple advantages, namely:

- you get the support of `Enter` and `Space` key for free
- when selection is enabled, only `Enter` triggers the action, and `Space` toggles selection

### Selection

Selection is a common feature for single and multi action list items. It's behavior is consistent across both use scenarios. Selection can be enabled by passing `selectionMode` property to the `List`.

**Selection can be toggled by clicking the checkbox or pressing `Space` on selected list item.**

When selection is enabled, the **selection is also the primary action** of the list item, which can be **triggered by mouse click or Enter**.

This behavior for Enter and click can be overriden by passing a custom `onAction` where `event.preventDefault()` is called and custom primary action can be triggered.
In this case, `Space` will still be used to toggle selection, but `Enter` and `click` will trigger the custom action.

**The `navigationMode` in case the selection is enabled defaults to `items`. If there are focusable elements inside each list item, make sure to change this to `composite` to get proper accessibility and keyboard navigation.**

The interactive lists can then be further divided into 2 different categories. The selection behavior is common for both of these.

### List items with a single action

A list item with single action is a list item which doesn't contain any focusable child elements. It can be selectable.

To ensure proper keyboard navigation and accessibility roles, pass the `navigationMode="items"` prop to the `List` This way the items will be made focusable and user will be able to navigate with up and down arrows.

### List items with multiple actions

If the list needs to support more than single click action, you can render additional focusable elements inside of the List Item.

To tell the List component that it should enable navigation inside of the items, pass the `navigationMode="composite"` property to it.

This makes sure the list is navigable with up and down arrows and user can enter the group (`ListItem`) to select the action they want to take with the list. It also switches the default roles to `grid` and `row`.

**When multiple actions are present on the list item, the list item roles should be `grid`, and `row` (this is automatic when `navigationMode="composite"` is passed). You also need to make sure each direct child of the `ListItem` component has a role `gridcell` to adhere to the a11y roles used.** You will get a warning in the console during development if this requirement is not fulfilled.

When List has multiple actions inside of the list item, the user can press **left and right arrow keys** to navigate inside of the list item. Pressing **up and down** arrow keys will move focus to the previous/next immediate list item.

**To summarize the navigation patterns:**

In the most complex scenario, user will be navigating a **selectable** list with a **custom primary action** and multiple **secondary actions**.

- When a list item is focused:
  - `Space` toggles the selection
  - `Enter` triggers the primary action
  - `Up/Down arrows` arrows move to previous/next list item
  - `Right arrow` enters the first focusable element **inside** the current list item
  - `Tab` goes to the next focusable item after the List
- When one of the element inside of the list item is focused:
  - `Up/Down arrows` moves focus to the previous/next list item
  - `Left/Rigth arrows` navigate among the secondary options in the list item. If the leftmost item is focused already and left arrow key is pressed, the parent list item is focused.
  - `Esc` focuses the parent list item

## TL;DR

- Use `navigationMode` prop to enable focusability of items and keyboard navigation
- Keyboard navigation and proper accessibility roles are inferred from the `navigationMode` prop:
  - `undefined` - no focusable items, no keyboard navigation, roles are `listitem` and `list`.
  - `items` - items are focusable, up and down arrow keys navigate between them. Default role is `list` and `listitem`, when selection is enabled, it is `listbox` and `option`.
  - `composite` - use when there are other focusable elements inside of the list items. This enables up/down arrow keys to move between items and right/left arrow keys to focus on the items inside.
    - composite navigation switches to role `grid` and `row`. **It is important for each direct child of `ListItem` in this case to have `gridcell` role, otherwise the screen readers get confused.**
- use `onAction` instead of `onClick` callback to register `click` mouse event and `Enter` / `Space` keyboard events
- Selection can be enabled with `selectionMode` property. When selectionMode is enabled, the List automatically behaves as if it was passed `navigationMode="single` and this doesn't have to be passed. Do not forget to set this to `composite`, if there are focusable elements inside.
- When Selection is enabled:
  - `Spacebar` and checkbox `click` always toggle selection
  - `Enter` and list item `click` toggle selection unless this behavior has been prevented in the `onAction` callback

## Best practices

### Do

- Use `tabIndex={0}` property on the `List` where the items have no actionable elements inside.
- Use `navigationMode="items"` property on the `ListItem` when the list items should be focusable.
- Use `navigationMode="composite"` property on the `ListItem` when the list items should be and there are other focusable elements inside of them.
- use `onAction` callback to register primary action (click or `Enter` key)
- Use `aria-label` property on the `ListItem` for custom screen reader label.
- Rely on default accessibility roles, which are switched based on the `navigationMode` prop.
- When `navigationMode` is `composite`, wrap each interactive item in `ListItem` in its own element with `role="gridcell"`.

### Don't

- Don't use `tabIndex` on the `ListItem`, use `navigationMode` to get proper accessibility and keyboard navigation.
- Don't use `navigationMode` on the `ListItem` if the list items have zero actionable elements, use `tabIndex={0}` on the `List` instead.
  This way the list itself is focusable and users can scroll by using up and down arrows after focusing it.
- Don't use `onClick` for the list action, use `onAction` instead which adds automatic support for `Enter` and `Spacebar` keys
  and works well with selection (`Enter`/`click` triggers the `onAction` callback, `Space` or checkbox click trigger selection)

## Props

| Name                   | Type                                      | Required           | Default | Description |
| ---------------------- | ----------------------------------------- | ------------------ | ------- | ----------- | --- |
| `as`                   | `"div" "ol" "ul"`                         | No                 |         |             |
| `navigationMode`       | `"items" "composite"`                     | No                 |         |             |
| `selectionMode`        | `"multiselect" "single"`                  | No                 |         |             |
| `selectedItems`        | `SelectionItemId[]`                       | No                 |         |             |
| `defaultSelectedItems` | `SelectionItemId[]`                       | No                 |         |             |
| `onSelectionChange`    | `EventHandler<OnListSelectionChangeData>` | No                 |         |             |
| `ref`                  | `Ref<HTMLDivElement                       | HTMLUListElement>` | No      |             |     |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';
import { tokens, Text, makeResetStyles } from '@fluentui/react-components';

const useTextStyle = makeResetStyles({
  color: tokens.colorNeutralForeground1,
});

export const Default = (): JSXElement => {
  const textStyle = useTextStyle();
  return (
    <List>
      <ListItem>
        <Text className={textStyle}>Asia</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Africa</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Europe</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>North America</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>South America</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Australia/Oceania</Text>
      </ListItem>
      <ListItem>
        <Text className={textStyle}>Antarctica</Text>
      </ListItem>
    </List>
  );
};
```

### List Active Element

You can use selection and custom styles to show the active element in a different way. This is useful for scenarios where you want to show the details of the selected item, for example.

In this example, we are also demonstrating how the `onFocus` prop can be utilized to change the selected item immediately upon receiving focus. This allows us to show the details of the selected item in the right panel as user navigates through the list with the keyboard.

```tsx
import { Button, makeStyles, Persona, mergeClasses, Text, tokens, SelectionItemId } from '@fluentui/react-components';
import { Mic16Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
  'Kristan Cable',
].map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

const useStyles = makeStyles({
  selectedInfo: {
    marginTop: '16px',
  },
  buttonWrapper: {
    alignSelf: 'center',
  },
  item: {
    cursor: 'pointer',
    padding: '2px 6px',
    justifyContent: 'space-between',
  },
  itemSelected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    '@media (forced-colors:active)': {
      background: 'Highlight',
    },
  },
  personaSelected: {
    '@media (forced-colors:active)': {
      forcedColorAdjust: 'none',
      color: 'HighlightText',
    },
  },
});

export const ListActiveElement = (): JSXElement => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(['Melda Bevel']);

  const onSelectionChange = React.useCallback(
    (_: React.SyntheticEvent | Event, data: { selectedItems: SelectionItemId[] }) => {
      setSelectedItems(data.selectedItems);
    },
    [],
  );

  const onFocus = React.useCallback((event: React.FocusEvent<HTMLLIElement>) => {
    // Ignore bubbled up events from the children
    if (event.target !== event.currentTarget) {
      return;
    }
    setSelectedItems([event.currentTarget.dataset.value as SelectionItemId]);
  }, []);

  return (
    <div>
      <List
        selectionMode="single"
        navigationMode="composite"
        selectedItems={selectedItems}
        onSelectionChange={onSelectionChange}
      >
        {items.map(({ name, avatar }) => (
          <ListItem
            key={name}
            value={name}
            className={mergeClasses(classes.item, selectedItems.includes(name) && classes.itemSelected)}
            data-value={name}
            aria-label={name}
            onFocus={onFocus}
            checkmark={null}
          >
            <Persona
              name={name}
              role="gridcell"
              secondaryText="Available"
              presence={{ status: 'available' }}
              className={mergeClasses(selectedItems.includes(name) && classes.personaSelected)}
              avatar={{
                image: {
                  src: avatar,
                },
              }}
            />

            <div role="gridcell" className={classes.buttonWrapper}>
              <Button
                aria-label={`Mute ${name}`}
                size="small"
                icon={<Mic16Regular />}
                onClick={e => {
                  e.stopPropagation();
                  alert(`Muting ${name}`);
                }}
              />
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.selectedInfo}>
        Currently selected:{' '}
        <Text block weight="bold">
          {selectedItems[0]}
        </Text>
      </div>
    </div>
  );
};
```

### Multiple Actions Different Primary

Similar to previous example, but this one implements a custom `onAction` prop on the `ListItem`,
allowing us to trigger a different action than the selection when the user clicks
on the list item or presses Enter.

The primary action can be triggered by clicking on the list item or pressing `Enter`.

The selection can be toggled by clicking on the checkbox or pressing `Space` when the item is focused.

To focus on the secondary actions, you can navigate between them by using left and right arrows.

```tsx
import {
  Button,
  Caption1,
  Image,
  makeResetStyles,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useListItemRootStyles = makeResetStyles({
  position: 'relative',
  flexGrow: '1',
  gap: '8px',
  border: '1px solid grey',
  alignItems: 'center',
  borderRadius: '8px',
  gridTemplate: `"preview preview preview" auto
      "header action secondary_action" auto / 1fr auto auto
    `,
});

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '300px',
  },
  listItem: {
    display: 'grid',
    padding: '8px',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  image: {
    height: '160px',
    maxWidth: '100%',
    borderRadius: '5px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 600,
    display: 'block',
  },
  checkmark: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 1,
  },
  preview: { gridArea: 'preview', overflow: 'hidden' },
  header: { gridArea: 'header' },
  action: { gridArea: 'action' },
  secondaryAction: { gridArea: 'secondary_action' },
});

const CustomListItem = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value } = props;

  // This will be triggered by user pressing Enter or clicking on the list item
  const onAction = React.useCallback(
    (event: React.SyntheticEvent | Event, { value: val }: { value: string | number }) => {
      // This prevents the change in selection on click/Enter
      event.preventDefault();
      alert(`Triggered custom action on ${val}`);
    },
    [],
  );

  return (
    <ListItem
      value={props.value}
      className={mergeClasses(listItemStyles, styles.listItem)}
      checkmark={{
        root: { role: 'gridcell' },
        className: styles.checkmark,
        'aria-label': value,
      }}
      aria-label={value}
      onAction={onAction}
    >
      <div role="gridcell" className={styles.preview}>
        <Image
          fit="cover"
          className={styles.image}
          src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
          alt="Presentation Preview"
        />
      </div>
      <div role="gridcell" className={styles.header}>
        <Text className={styles.title}>{props.title}</Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div role="gridcell" className={styles.action}>
        <Button
          appearance="primary"
          aria-label="Install"
          onClick={e => {
            e.preventDefault();
            alert('Installing!');
          }}
        >
          Install
        </Button>
      </div>
      <div role="gridcell" className={styles.secondaryAction}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              onClick={e => {
                e.preventDefault();
              }}
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              aria-label="More actions"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Uninstall
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Block
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </ListItem>
  );
};

export const MultipleActionsDifferentPrimary = (): JSXElement => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <List
      className={classes.list}
      navigationMode="composite"
      selectionMode="multiselect"
      selectedItems={selectedItems}
      onSelectionChange={(e, data) => setSelectedItems(data.selectedItems)}
    >
      <CustomListItem title="Example List Item" value="card-1" />
      <CustomListItem title="Example List Item" value="card-2" />
      <CustomListItem title="Example List Item" value="card-3" />
      <CustomListItem title="Example List Item" value="card-4" />
      <CustomListItem title="Example List Item" value="card-5" />
      <CustomListItem title="Example List Item" value="card-6" />
      <CustomListItem title="Example List Item" value="card-7" />
      <CustomListItem title="Example List Item" value="card-8" />
      <CustomListItem title="Example List Item" value="card-9" />
    </List>
  );
};
```

### Multiple Actions Selection

Item with multiple actions. It has selection enabled, which is also it's primary action.
The selection can be toggled by clicking on the item or pressing the `Space` key.

Because the selection is the action on the item, to properly narrate the state of selection
we are using the role grid / row / gridcell here to properly announce when the selection on the
item is toggled.

To enable the user to navigate inside of the list items by pressing the `RightArrow` key,
the `navigationMode` prop should be set to `composite`.

```tsx
import {
  Button,
  Caption1,
  Image,
  makeResetStyles,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useListItemRootStyles = makeResetStyles({
  position: 'relative',
  flexGrow: '1',
  gap: '8px',
  border: '1px solid grey',
  alignItems: 'center',
  borderRadius: '8px',
  gridTemplate: `"preview preview preview" auto
      "header action secondary_action" auto / 1fr auto auto
    `,
});

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '300px',
  },
  listItem: {
    display: 'grid',
    padding: '8px',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  image: {
    height: '160px',
    maxWidth: '100%',
    borderRadius: '5px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 600,
    display: 'block',
  },
  checkmark: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 1,
  },
  preview: { gridArea: 'preview', overflow: 'hidden' },
  header: { gridArea: 'header' },
  action: { gridArea: 'action' },
  secondaryAction: { gridArea: 'secondary_action' },
});

const CustomListItem = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value, title } = props;

  return (
    <ListItem
      value={value}
      className={mergeClasses(listItemStyles, styles.listItem)}
      checkmark={{
        root: { role: 'gridcell' },
        className: styles.checkmark,
        'aria-label': value,
      }}
      aria-label={value}
    >
      <div role="gridcell" className={styles.preview}>
        <Image
          fit="cover"
          className={styles.image}
          src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
          alt="Presentation Preview"
        />
      </div>
      <div role="gridcell" className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div role="gridcell" className={styles.action}>
        <Button
          appearance="primary"
          aria-label="Install"
          onClick={e => {
            e.preventDefault();
            alert('Installing!');
          }}
        >
          Install
        </Button>
      </div>
      <div role="gridcell" className={styles.secondaryAction}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              onClick={e => {
                e.preventDefault();
              }}
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              aria-label="More actions"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Uninstall
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Block
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </ListItem>
  );
};

export const MultipleActionsSelection = (): JSXElement => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <List
      className={classes.list}
      navigationMode="composite"
      selectionMode="multiselect"
      selectedItems={selectedItems}
      onSelectionChange={(e, data) => setSelectedItems(data.selectedItems)}
    >
      <CustomListItem title="Example List Item" value="card-1" />
      <CustomListItem title="Example List Item" value="card-2" />
      <CustomListItem title="Example List Item" value="card-3" />
      <CustomListItem title="Example List Item" value="card-4" />
      <CustomListItem title="Example List Item" value="card-5" />
      <CustomListItem title="Example List Item" value="card-6" />
      <CustomListItem title="Example List Item" value="card-7" />
      <CustomListItem title="Example List Item" value="card-8" />
      <CustomListItem title="Example List Item" value="card-9" />
    </List>
  );
};
```

### Multiple Actions With Primary

Base item with multiple actions. Doesn't support selection, but the list items have a primary action
that can be triggered by clicking on the item or pressing Enter.

**To make the navigation work properly, the `navigationMode` prop should be set to `composite`.**
This will allow the user to navigate inside of the list items by pressing the `Right Arrow` key.
It also sets the `grid` role automatically to the list.

> ⚠️ _In cases where `grid` role is used, it is important that every direct children of `ListItem`_ > _has role `gridcell`. Also each focusable item should be in its own "gridcell". This makes sure the _ > _screen readers work properly._

```tsx
import {
  Button,
  Caption1,
  Image,
  makeResetStyles,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Text,
  tokens,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useListItemRootStyles = makeResetStyles({
  position: 'relative',
  flexGrow: '1',
  gap: '8px',
  border: '1px solid grey',
  alignItems: 'center',
  borderRadius: '8px',
  gridTemplate: `"preview preview preview" auto
      "header action secondary_action" auto / 1fr auto auto
    `,
});

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '300px',
  },
  listItem: {
    display: 'grid',
    padding: '8px',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  image: {
    height: '160px',
    maxWidth: '100%',
    borderRadius: '5px',
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 600,
    display: 'block',
  },
  preview: { gridArea: 'preview', overflow: 'hidden' },
  header: { gridArea: 'header' },
  action: { gridArea: 'action' },
  secondaryAction: { gridArea: 'secondary_action' },
});

const CustomListItem = (props: { title: string; value: string }) => {
  const listItemStyles = useListItemRootStyles();
  const styles = useStyles();
  const { value } = props;

  // This will be triggered by user pressing Enter or clicking on the list item
  const onAction = React.useCallback((event: React.SyntheticEvent | Event) => {
    // This prevents the change in selection on click/Enter
    event.preventDefault();
    alert(`Triggered custom action!`);
  }, []);

  return (
    <ListItem
      value={props.value}
      className={mergeClasses(listItemStyles, styles.listItem)}
      aria-label={value}
      onAction={onAction}
    >
      <div role="gridcell" className={styles.preview}>
        <Image
          fit="cover"
          className={styles.image}
          src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
          alt="Presentation Preview"
        />
      </div>
      <div role="gridcell" className={styles.header}>
        <Text className={styles.title}>{props.title}</Text>
        <Caption1 className={styles.caption}>You created 53m ago</Caption1>
      </div>
      <div role="gridcell" className={styles.action}>
        <Button
          appearance="primary"
          aria-label="Install"
          onClick={e => {
            e.preventDefault();
            alert('Installing!');
          }}
        >
          Install
        </Button>
      </div>
      <div role="gridcell" className={styles.secondaryAction}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              onClick={e => e.preventDefault()}
              aria-label="More actions"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Uninstall
              </MenuItem>
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  alert('Clicked menu item');
                }}
              >
                Block
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </ListItem>
  );
};

export const MultipleActionsWithPrimary = (): JSXElement => {
  const classes = useStyles();

  return (
    <List navigationMode="composite" className={classes.list}>
      <CustomListItem title="Example List Item" value="card-1" />
      <CustomListItem title="Example List Item" value="card-2" />
      <CustomListItem title="Example List Item" value="card-3" />
      <CustomListItem title="Example List Item" value="card-4" />
      <CustomListItem title="Example List Item" value="card-5" />
      <CustomListItem title="Example List Item" value="card-6" />
      <CustomListItem title="Example List Item" value="card-7" />
      <CustomListItem title="Example List Item" value="card-8" />
      <CustomListItem title="Example List Item" value="card-9" />
    </List>
  );
};
```

### Single Action

When the list item should have a custom primary action on it, you can pass the `onAction` prop to the `ListItem` component.
This callback will also be automatically called when the user presses the Enter or Space key on the list item.

To learn more about what event triggered the action, you can check the `event.details.originalEvent`.

To enable keyboard navigation between the list items, the `navigationMode` prop should be set to `items`.

```tsx
import { Persona } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const names = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
];

export const SingleAction = (): JSXElement => {
  return (
    <List navigationMode="items">
      {names.map(name => (
        <ListItem key={name} aria-label={`${name}, available`} onAction={() => alert(`Triggered custom action!`)}>
          <Persona
            name={name}
            secondaryText="Available"
            presence={{ status: 'available' }}
            avatar={{
              image: {
                src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
```

### Single Action Selection

Any List can be selectable. You have an option to control the selection state yourself or let the List manage it for you.

You can pass `selectionMode` prop with value "single" or "multiselect" to the List component to get support for selection.
The items can be toggled by clicking on the list item, or pressing `Spacebar` or `Enter` when the item is focused. Keyboard navigation is automatically enabled and `navigationMode` is set to `items`.

Also this example only has one action in the list item, and it's for toggling the selection. The roles for this one are listbox and option.

```tsx
import { Persona } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
].map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

export const SingleActionSelection = (): JSXElement => {
  const defaultSelectedItems = ['Demetra Manwaring', 'Bart Merrill'];

  return (
    <List selectionMode="multiselect" defaultSelectedItems={defaultSelectedItems} aria-label="People example">
      {items.map(({ name, avatar }, i) => (
        <ListItem
          key={name}
          value={name}
          aria-label={name}
          checkmark={{ 'aria-label': name }}
          disabledSelection={i > 3} // Example of disabling selection for last 2 items
        >
          <Persona
            name={name}
            secondaryText="Available"
            presence={{ status: 'available' }}
            avatar={{
              image: {
                src: avatar,
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
```

### Single Action Selection Controlled

This example shows how to use the `selectedItems` and `onSelectionChange`
props to control the selection state of the List and keep track of it in the parent component.

This is more in line with how we expect the selection to be used in production environment.

```tsx
import { Button, makeStyles, Persona, SelectionItemId } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
].map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

const useStyles = makeStyles({
  buttonControls: {
    display: 'flex',
    columnGap: '8px',
    marginBottom: '16px',
  },
});

export const SingleActionSelectionControlled = (): JSXElement => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(['Demetra Manwaring', 'Bart Merrill']);

  return (
    <div>
      <div className={classes.buttonControls}>
        <Button onClick={e => setSelectedItems(items.map(({ id }) => id))}>Select all</Button>
      </div>

      <List
        selectionMode="multiselect"
        selectedItems={selectedItems}
        onSelectionChange={(_, data) => setSelectedItems(data.selectedItems)}
        aria-label="People example"
      >
        {items.map(({ name, avatar }) => (
          <ListItem key={name} value={name} aria-label={name} checkmark={{ 'aria-label': name }}>
            <Persona
              name={name}
              secondaryText="Available"
              presence={{ status: 'available' }}
              avatar={{
                image: {
                  src: avatar,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
```

### Single Action Selection Different Primary

This example is similar to the previous one, but it implements a custom primary action on `ListItem`,
allowing us to trigger a
**different action than the selection when the user clicks on the list item or presses Enter**
. This is useful when you want to have a primary action on the list item, but still want
to allow the user to select it.

To change the default action on the `ListItem` (when user clicks on it or presses Enter), you can use the
`onAction` prop. By calling `event.preventDefault()` in the `onAction` callback, you can prevent the default
action (toggling the selection) from happening. This way, you can perform a completely custom action.
In this example, the custom action is an alert that triggers when the user
clicks on the list item or presses Enter.

**The selection can still be toggled by clicking on the checkbox or pressing `Space` when the item is focused.**

```tsx
import { Persona, SelectionItemId } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';
import type { ListItemProps } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
].map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

export const SingleActionSelectionDifferentPrimary = (): JSXElement => {
  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(['Demetra Manwaring', 'Bart Merrill']);

  // This will be triggered by user pressing Enter or clicking on the list item
  const onAction = React.useCallback(
    (event: React.SyntheticEvent | Event, { value: val }: { value: ListItemProps['value'] }) => {
      // This prevents the change in selection on click/Enter
      event.preventDefault();
      alert(`Triggered custom action on ${val}`);
    },
    [],
  );

  return (
    <List
      aria-label="People example"
      selectionMode="multiselect"
      selectedItems={selectedItems}
      onSelectionChange={(_, data) => setSelectedItems(data.selectedItems)}
    >
      {items.map(({ name, avatar }, index) => (
        <ListItem
          key={name}
          value={name}
          aria-label={name}
          onAction={onAction}
          checkmark={{ 'aria-label': name }}
          disabledSelection={index === 2}
        >
          <Persona
            name={name}
            secondaryText="Available"
            presence={{ status: 'available' }}
            avatar={{
              image: {
                src: avatar,
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
```

### Virtualized List

When creating a list of large size, one way of making sure you are getting the best performance
is to use virtualization. In this example we are leveraging the `react-window` package.

Please note that if the virtualized list contains non-actionable list items, scrolling should be achieved
by using the `tabIndex={0}` property on the List.

> ⚠️ _It is important to manually set `aria-setsize` and `aria-posinset` attributes on the list items, since_ > _the virualization will only render the visible items. Relying on the DOM state for these attributes will not work._

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FixedSizeList } from 'react-window';
import { List, ListItem } from '@fluentui/react-components';
import { tokens, Text, makeResetStyles } from '@fluentui/react-components';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua & Deps',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Rep',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo {Democratic Rep}',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland {Republic}',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea North',
  'Korea South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar, {Burma}',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'St Kitts & Nevis',
  'St Lucia',
  'Saint Vincent & the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome & Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const useTextStyle = makeResetStyles({
  color: tokens.colorNeutralForeground1,
});

const CountriesList = React.forwardRef<HTMLUListElement>((props: React.ComponentProps<typeof List>, ref) => (
  <List aria-label="Countries" tabIndex={0} {...props} ref={ref} />
));

export const VirtualizedList = (): JSXElement => {
  const textStyle = useTextStyle();
  return (
    <FixedSizeList
      height={400}
      itemCount={countries.length}
      itemSize={20}
      width="100%"
      itemData={countries}
      outerElementType={CountriesList}
    >
      {({ index, style, data }) => (
        <ListItem style={style} aria-setsize={countries.length} aria-posinset={index + 1}>
          <Text className={textStyle}>{data[index]}</Text>
        </ListItem>
      )}
    </FixedSizeList>
  );
};
```

### Virtualized List With Actionable Items

Virtualized list can also be used with interactive elements.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FixedSizeList } from 'react-window';
import { List, ListItem } from '@fluentui/react-components';
import { tokens, Text, makeResetStyles } from '@fluentui/react-components';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua & Deps',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Rep',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo {Democratic Rep}',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland {Republic}',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea North',
  'Korea South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar, {Burma}',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'St Kitts & Nevis',
  'St Lucia',
  'Saint Vincent & the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome & Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const CountriesList = React.forwardRef<HTMLUListElement>((props: React.ComponentProps<typeof List>, ref) => (
  <List navigationMode="items" aria-label="Countries" {...props} ref={ref} />
));

const useTextStyle = makeResetStyles({
  color: tokens.colorNeutralForeground1,
});

export const VirtualizedListWithActionableItems = (): JSXElement => {
  const textStyle = useTextStyle();
  return (
    <FixedSizeList
      height={400}
      itemCount={countries.length}
      itemSize={20}
      width="100%"
      itemData={countries}
      outerElementType={CountriesList}
    >
      {({ index, style, data }) => (
        <ListItem
          style={style}
          aria-setsize={countries.length}
          aria-posinset={index + 1}
          onAction={() => alert(data[index])}
        >
          <Text className={textStyle}>{data[index]}</Text>
        </ListItem>
      )}
    </FixedSizeList>
  );
};
```
