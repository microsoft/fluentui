# Preview Components/Menu/MenuGrid

A menu grid displays a complex menu structured as grid with sub-actions. It is usually rendered inside of the `Menu` component.

## Best practices

### Do

- Use `MenuTrigger` as the first child of `Menu`.
- Use `MenuGrid` as the only child of `MenuPopover`.
- Use `MenuGridItem` instead of the `MenuGridRow` and `MenuGridCell` components when possible because `MenuGridItem` with its slots creates the proper grid structure for you.
- Use `{ visuallyHidden: true }` for the `firstSubAction` or `secondSubAction` slots of `MenuGridItem` if you want to omit a sub-action for certain menu grid items making the sub-actions asymmetric. This is necessary to maintain the proper grid structure.
- Use small transparent buttons inside of the cells for best layout.
- Use the `aria-label` attribute on `MenuGridItem` or `MenuGridRow` to set a proper row name which will be narrated for screen reader users when navigating in menu grid using the Down or Up arrow keys.

### Don't

- Don't use the `MenuGridItem` or `MenuGridRow` components as children of `MenuList`. They are only intended to work within `MenuGrid`.
- Don't place more than one actionable element to the `firstSubAction` or `secondSubAction` slot. If you need to provide more than two actionable elements for a menu grid item, use the `MenuGridRow` and `MenuGridCell` compound components and place each actionable element into its own `MenuGridCell` as instructed in the story below. Alternatively, consider creating a menu button as a submenu using one of the sub-action slots as also instructed in the story below and place your actions into the submenu.
- Don't make `MenuGridCell` components, `firstSubAction` and `secondSubAction` slots focusable using the `tabIndex` attribute with value `0` if they are empty or `visuallyHidden`, respectively.

## Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

## Subcomponents

### MenuGridCell

Define a MenuGridCell, using the `useMenuGridCell_unstable` hook.

#### Props

| Name             | Type                  | Required | Default | Description                                                                                   |
| ---------------- | --------------------- | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `as`             | `"div"`               | No       |         |                                                                                               |
| `visuallyHidden` | `boolean`             | No       |         | A MenuGridCell can be visually hidden, which is used for asymmetric grids @defaultvalue false |
| `ref`            | `Ref<HTMLDivElement>` | No       |         |                                                                                               |

### MenuGridGroup

Define a MenuGridGroup, using the `useMenuGridGroup_unstable` hook.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### MenuGridGroupHeader

Define a MenuGridGroupHeader, using the `useMenuGridGroupHeader_unstable` hook.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### MenuGridItem

Define a MenuGridItem, using the `useMenuGridItem_unstable` hook.

#### Props

| Name              | Type                                                                                                                                         | Required         | Default | Description |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`         | `((WithSlotShorthandValue<MenuGridCellProps>                                                                                                 | null) & string)` | No      |             | Component children are placed in this slot Avoid using the `children` property in this slot in favour of Component children whenever possible |
| `icon`            | `WithSlotShorthandValue<MenuGridCellProps>                                                                                                   | null`            | No      |             | Icon slot rendered as cell before content cell                                                                                                |
| `subText`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`            | No      |             | Additional descriptor to main content that creates a multiline layout                                                                         |
| `firstSubAction`  | `WithSlotShorthandValue<MenuGridCellProps>                                                                                                   | null`            | No      |             | Firstd sub-action slot rendered as cell after content cell                                                                                    |
| `secondSubAction` | `WithSlotShorthandValue<MenuGridCellProps>                                                                                                   | null`            | No      |             | Second sub-action slot rendered as cell after first sub-action cell                                                                           |
| `as`              | `"div"`                                                                                                                                      | No               |         |             |
| `ref`             | `Ref<HTMLDivElement>`                                                                                                                        | No               |         |             |

### MenuGridRow

Define a MenuGridRow, using the `useMenuGridRow_unstable` hook.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

## Examples

### Asymmetric

If `MenuGridItem` sub-actions are asymmetric, use the `visuallyHidden` property of the `firstSubAction` or `secondSubAction` slot to create an empty and visually hidden cell so the grid is structured correctly.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = [
  { name: 'Olivia Carter (owner)', removable: true },
  { name: 'Liam Thompson', removable: false },
  { name: 'Sophia Martinez (you)', removable: true },
  { name: 'Noah Patel', removable: false },
  { name: 'Emma Robinson', removable: false },
];

export const Asymmetric = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(item => (
            <MenuGridItem
              key={item.name}
              firstSubAction={
                item.removable ? (
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<DeleteRegular />}
                    aria-label={`Remove ${item.name}`}
                  />
                ) : (
                  { visuallyHidden: true }
                )
              }
              icon={
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${item.name}`}
                />
              }
              aria-label={item.name}
            >
              {item.name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const Default = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(name => (
            <MenuGridItem
              key={name}
              aria-label={name}
              icon={
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${name}`}
                />
              }
              firstSubAction={
                <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
              }
            >
              {name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
```

### Grouping Items

A menu grid can be divided into separate groups, using the `MenuGridGroup` and `MenuGridGroupHeader`
components. This ensures the correct accessible markup is rendered for screen reader users.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridGroup, MenuGridGroupHeader, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = {
  people: ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'],
  agentsAndBots: ['Facilitator', 'Copilot'],
};

export const GroupingItems = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          <MenuGridGroup>
            <MenuGridGroupHeader>People</MenuGridGroupHeader>
            {items.people.map(name => (
              <MenuGridItem
                key={name}
                icon={
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<GlobePersonRegular />}
                    aria-label={`Profile card for ${name}`}
                  />
                }
                firstSubAction={
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<DeleteRegular />}
                    aria-label={`Remove ${name}`}
                  />
                }
                aria-label={name}
              >
                {name}
              </MenuGridItem>
            ))}
          </MenuGridGroup>
          <MenuGridGroup>
            <MenuGridGroupHeader>Agents and bots</MenuGridGroupHeader>
            {items.agentsAndBots.map(name => (
              <MenuGridItem
                key={name}
                icon={
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<GlobePersonRegular />}
                    aria-label={`Profile card for ${name}`}
                  />
                }
                firstSubAction={
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<DeleteRegular />}
                    aria-label={`Remove ${name}`}
                  />
                }
                aria-label={name}
              >
                {name}
              </MenuGridItem>
            ))}
          </MenuGridGroup>
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
```

### More Complex Menus

If you need to create a more complex menu grid layout, e.g., with more than two sub-actions, you can use the `MenuGridRow` and `MenuGridCell` directly to achieve the desired structure, though the use of `MenuGridItem` is highly recommended whenever possible.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow } from '@fluentui/react-menu-grid-preview';
import { CameraRegular, DeleteRegular, GlobePersonRegular, PhoneRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const MoreComplexMenus = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(name => (
            <MenuGridRow key={name} aria-label={name}>
              <MenuGridCell>
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${name}`}
                />
              </MenuGridCell>
              <MenuGridCell>{name}</MenuGridCell>
              <MenuGridCell>
                <Button size="small" appearance="transparent" icon={<PhoneRegular />} aria-label="Audio call" />
              </MenuGridCell>
              <MenuGridCell>
                <Button size="small" appearance="transparent" icon={<CameraRegular />} aria-label="Video call" />
              </MenuGridCell>
              <MenuGridCell>
                <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
              </MenuGridCell>
            </MenuGridRow>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
```

### With Submenu

If you need to provide a submenu for a `MenuGridItem`, use a menu button, e.g. "More actions", provided via `firstSubAction` or `secondSubAction` slots.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { MoreHorizontalRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

const Submenu = () => {
  return (
    <Menu positioning={{ autoSize: true }}>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          size="small"
          icon={<MoreHorizontalRegular />}
          aria-label="More actions"
          onKeyDown={event => {
            if (event.key === 'ArrowDown') {
              // Prevent arrow down from opening the menu to enable navigation in grid instead
              event.preventDefault();
            }
          }}
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Show profile </MenuItem>
          <MenuItem>Audio call</MenuItem>
          <MenuItem>Video call</MenuItem>
          <MenuItem>Remove</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const WithSubmenu = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(name => (
            <MenuGridItem key={name} firstSubAction={<Submenu />} aria-label={name}>
              {name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
```
