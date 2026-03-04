# Nav Migration

v8 `Nav` used a `groups` array of `INavLinkGroup` with nested `INavLink` items. v9 `Nav` uses declarative JSX children (`NavItem`, `NavCategory`, `NavCategoryItem`) and integrates with `NavDrawer` for side-drawer navigation.

Import from `@fluentui/react-components` — no separate package required.

## Architecture Shift

| v8                         | v9                                     |
| -------------------------- | -------------------------------------- |
| `groups` array prop        | `<NavCategory>` / `<NavItem>` children |
| `INavLink.name`            | `<NavItem>` children (text)            |
| `INavLink.url`             | `href` on `<NavItem>`                  |
| `INavLink.onClick`         | `onClick` on `<NavItem>`               |
| `INavLink.links` (nesting) | `<NavCategory>` + `<NavCategoryItem>`  |
| `onLinkClick`              | `onNavItemSelect` on `<Nav>`           |
| `onLinkExpandClick`        | `onNavCategoryItemToggle` on `<Nav>`   |
| `selectedKey`              | `selectedValue` on `<Nav>`             |

## Component Tree

```tsx
import {
  Nav,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-components';
```

| v9 Component       | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| `NavDrawer`        | Side-drawer container (replaces `Panel` + `Nav`) |
| `NavDrawerHeader`  | Header with hamburger button                     |
| `NavDrawerBody`    | Scrollable body area                             |
| `Nav`              | The nav list (standalone or inside `NavDrawer`)  |
| `NavItem`          | Leaf navigation item                             |
| `NavCategory`      | Expandable group (like v8 `INavLinkGroup`)       |
| `NavCategoryItem`  | The clickable header of a `NavCategory`          |
| `NavSubItemGroup`  | Sub-items under a `NavCategoryItem`              |
| `NavSubItem`       | A child item in a sub-group                      |
| `NavDivider`       | Horizontal divider between items                 |
| `NavSectionHeader` | Non-interactive section label                    |

## Nav Props

| v8 `INavProps`       | v9 `NavProps`              | Notes                     |
| -------------------- | -------------------------- | ------------------------- |
| `groups`             | JSX children               |                           |
| `selectedKey`        | `selectedValue`            |                           |
| `initialSelectedKey` | `defaultSelectedValue`     |                           |
| `onLinkClick`        | `onNavItemSelect`          | `(_, data) => data.value` |
| `onLinkExpandClick`  | `onNavCategoryItemToggle`  |                           |
| `isOnTop`            | Use `NavDrawer`            |                           |
| `styles`             | `className` + `makeStyles` |                           |
| `theme`              | —                          | Use `FluentProvider`      |

## Before / After

```tsx
// v8 — data-driven groups
import { Nav } from '@fluentui/react';

<Nav
  selectedKey="home"
  onLinkClick={(_, item) => navigate(item?.url)}
  groups={[
    {
      links: [
        { name: 'Home', url: '/', key: 'home', iconProps: { iconName: 'Home' } },
        {
          name: 'Settings',
          url: '',
          key: 'settings',
          links: [{ name: 'Profile', url: '/profile', key: 'profile' }],
        },
      ],
    },
  ]}
/>;

// v9 — declarative JSX
import { Nav, NavItem, NavCategory, NavCategoryItem, NavSubItemGroup, NavSubItem } from '@fluentui/react-components';
import { HomeRegular, SettingsRegular } from '@fluentui/react-icons';

<Nav selectedValue="home" onNavItemSelect={(_, data) => navigate(data.value as string)}>
  <NavItem icon={<HomeRegular />} value="home" href="/">
    Home
  </NavItem>
  <NavCategory value="settings">
    <NavCategoryItem icon={<SettingsRegular />}>Settings</NavCategoryItem>
    <NavSubItemGroup>
      <NavSubItem value="profile" href="/profile">
        Profile
      </NavSubItem>
    </NavSubItemGroup>
  </NavCategory>
</Nav>;
```

## Accessibility Notes

- Add `href` to all `NavItem`s that change the URL — even when using JS routing
- Ensure hamburger icon buttons have an accessible name
- Don't combine expand/collapse with link navigation on the same item
