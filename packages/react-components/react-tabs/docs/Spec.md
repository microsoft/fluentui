# @fluentui/react-tabs Spec

# Tabs

**GitHub Epic issue** - [Tabs/Pivot Convergence #20338](https://github.com/microsoft/fluentui/issues/20338)
**Figma** - [Tabs](https://www.figma.com/file/dK5AnDvvnSTWV9lduQWeDk/Tabs)

## Background

Tabs allow for navigation between two or more content views and relies on text headers to
articulate the different sections of content.

There are a few different components typically provided for tabs:

- Tab or tab header. This is the individual tab the user clicks to display content. It most often has text, an icon, or both.
- Tab list or tab strip. This is a container for tabs and provides single selection behavior.
- Tab panel. This is a container for the content to display when an associated tab is selected.

In some cases the tab list and tab panels are provided together in a "tabs" aggregate component. This is historically done to provide the manilla folder tab style where the tab list and tab panels are arranged next to each other.

## Prior Art - Open UI

Naming: The Open UI component naming matrix indicates Tabs is the most common and popular name for this component.
Only Fabric/Fluent UI v8 and earlier named it Pivot.

The [Tabs Research](https://open-ui.org/components/tabs.research) notes part naming and terminology are not
very consistent across libraries.

The API and implementations depend on how tabs are conceptualized and integrated with existing components.
For example, a set of tabs can be thought of as:

- a set styled buttons with radio selection behavior
- a menu list of menu items that toggle
- a command bar with radio buttons plus other commands and components
- a stack of components expected to render their state based on single/multi-select data.

Features common to most libraries:

- Grouping and consistent appearance across tabs within the same tab list
- Focus trap and keyboard commands for switching tabs
  - Left/Right and Up/Down arrow keys when focus trapped
  - Ctrl+Tab/Ctrl+Shift+Tab for cycling next/previous
- Text, an icon, or text with icon for tab content
- Horizontal or vertical layout
- LTR and RTL layout (i.e. ordering of tabs)
- Overflow or scrolling when tabs do not fit within available space

Features common to some libraries:

- Keyboard commands for individual tab focus navigation
  - Tab/Shift+Tab to cycle focus through tabs
  - Space bar to select currently focused tab
- Tab list containing both tabs and tab panels.
- Conditionally render or show/hide of tab panels based on current tab selection.

Advanced features supported by only a few libraries:

- Close/Hide individual tabs
- Tabs with drop-down content menus
- Reordering tabs, sometimes with drag-and-drop
- State indicators via badges
- Show or scroll to a specific tab (i.e. ensure visible and selected)

Given the ARIA standard roles of tablist and tab we can follow with TabList and Tab components.

## Prior Art - Comparison with v0 and v8

The existing components are:

- v0 - [Menu](https://fluentsite.z22.web.core.windows.net/0.59.0/components/menu/definition)
- v8 - [Pivot](https://developer.microsoft.com/en-us/fluentui#/controls/web/pivot)

### Approach

v0 Menu provides tabs, toolbars, menus, and breadcrumbs.
v0 Menu supports tabs interaction when accessibility={tabListBehavior}

v8 provides a separate Pivot component with tabs behavior and appearance customization.

### Appearances

#### **Pivot**

A 'Pivot' appears as a horizontal set of borderless buttons with an underline indicating current selection.

v0 and v8 provide a 'Pivot' appearance.
v0: underlined=true
v8: by default

#### **Block Tab**

A 'Block Tab' appears as a horizontal set of borderless buttons.
The selection has an active color, rectangular background.

Both v0 and v8 provide the 'Block Tab' appearance.
v0: by default
v8: linkFormat="tabs"

#### **Variations**

v0 supports decorating tabs with arrows pointing toward the associated content.
v0: pointing=true

v8 supports a large tab style with increased padding per tab.
v8: linkSize="large"

### Tab Item Content

Both v0 and v8 support text, icon, and text and icon as tab content.
v0 additionally supports menus as tab content.

Both v0 and v8 support custom rendering of tab content through a render props per item.

### Tab Panel

v0 does not provide a tab panel since it is implemented through the menu component.
v8 supports the tab panel as the children of PivotItem. The tab content is provided through the header property.

## Sample Code

### Default

By default tabs are arranged horizontally.
Content within the tab is arranged horizontally.
It is centered (horizontally and vertically).
The default appearance is transparent.

```tsx
<TabList>
  <Tab value="tab1">One</Tab>
  <Tab value="tab2">Two</Tab>
  <Tab value="tab3">Three</Tab>
</TabList>
```

### Vertical

The vertical prop causes the tabs to be arranged vertically.
Content within the tab is still arranged horizontally and centered.

```tsx
<TabList vertical>
  <Tab value="tab1">One</Tab>
  <Tab value="tab2">Two</Tab>
  <Tab value="tab3">Three</Tab>
</TabList>
```

### Vertical Tab content

The verticalTabContent prop causes the content within the tab to be arranged vertically.
The content is still centered.
If the icon prop is set, the rendered icon is part of the vertical tab content.

```tsx
<TabList verticalTabContent>
  <Tab value="tab1">One</Tab>
  <Tab value="tab2">Two</Tab>
  <Tab value="tab3">Three</Tab>
</TabList>

<TabList vertical verticalTabContent>
  <Tab value="tab1">One</Tab>
  <Tab value="tab2">Two</Tab>
  <Tab value="tab3">Three</Tab>
</TabList>
```

### Appearance

The default appearance is transparent.
Transparent has no border and background styles.
The selection indicator is a brand color line below the tab.
Hovering over a tab shows a gray line below the tab.

```tsx
<TabList>
  {/* ... */}
</TabList>

<TabList appearance="transparent">
  {/* ... */}
</TabList>
```

The subtle appearance is similar to transparent, but a light background is displayed when hovering over a tab.

```tsx
<TabList appearance="subtle">{/* ... */}</TabList>
```

### Size

Small and medium sizes are supported.
The size affects the padding and spacing between elements.
Size can also affect the default icon (and badge) size.
The default size is medium.

```tsx
<TabList size="small">
  {/* ... */}
</TabList>

<TabList size="medium">
  {/* ... */}
</TabList>
```

### With Icon

When the icon slot is filled, an icon is positioned before the tab content.

```tsx
<TabList>
  <Tab icon={<CheckboxComposite />} value="allowed">
    Allowed
  </Tab>
  <Tab icon={<BlockedSite />} value="blocked">
    Blocked
  </Tab>
</TabList>
```

An icon only tab is displayed when the icon slot is filled and tab content is omitted.

```tsx
<TabList>
  <Tab icon={<CheckboxComposite />} value="allowed" />
  <Tab icon={<BlockedSite />} value="blocked" />
</TabList>
```

## API

### Tab

See API at [Tab.types.ts](./src/components/Tab/Tab.types.ts).

Notes:

- `TabCommons.value` supports an arbitrary identifier value. This is similar to Accordion's selection approach.
- Each tab has an `icon` slot.

### TabList

See API at [TabList.types.ts](./src/components/TabList/TabList.types.ts).

Notes:

- The tab list only has the `root` slot.
- The tab list supports tab selection events that include the value of the tab selected.
- Tab list supports default and selected values for controlled and uncontrolled scenarios.
- The tab list communicates with tabs via context. This applies `appearance`, `size`, and `layout`.
- The tab can leverage the `selectedValue` and is expected to call `selectTab` when clicked.
- By adding these context properties to `TabProps` we could allow individual tabs to override these values. However the expectation is that the tabs within a tab list have a consistent layout and appearance.

## Structure

- _**Public**_

```tsx
<TabList>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

- _**DOM**_

```html
<div role="tablist">
  <div role="tab">One</div>
  <div role="tab">Two</div>
  <div role="tab">Three</div>
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### Selection

TabList provides single selection of a tab.

#### **Programmatic**

The TabList.selectedKey can control the currently selected tab.
The onTabSelected event informs callers of a selection change.
The event data includes the tab value.

#### **Mouse/Touch**

Clicking the tab selects it.

#### **Keyboard**

The tab list will support the prescribed [ARIA keyboard interaction](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-19).

A Tablist allows focus of individual tabs.

When the TabList has focus, the user can use arrow keys to move focus to the next or previous tab.
The keys are based on layout. Horizontal uses left/right arrows and vertical uses up/down arrows.

When the TabList has focus, the user can use the home/end keys to move focus to the first/last tab.

A tab is selected when the spacebar/enter key is pressed for a focused tab.

The `TAB` key moves focus out of the tabs.

## Accessibility

ARIA provides tab-specific roles:

- [tab](https://www.w3.org/TR/wai-aria-1.1/#tab): A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
- [tablist](https://www.w3.org/TR/wai-aria-1.1/#tablist): A list of tab elements, which are references to tabpanel elements.
- [tabpanel](https://www.w3.org/TR/wai-aria-1.1/#tabpanel): A container for the resources associated with a tab, where each tab is contained in a tablist.

TabList and Tab will apply the `tablist` and `tab` ARIA roles.
The `tabpanel` will be reserved for possible future component.

### Screen readers

Screen readers will read each tab's content.

# Future

## Overflow Button/Dropdown

The design spec details a menu button (...) that displays the list of tabs that were not able to be displayed due to limited space. We have some concerns providing overflow as a default feature of tabs. The v1 of TabList and Tab will not include overflow.

- Overflow made the v0 toolbar difficult to maintain. Customers hacked around it when it did not meet app requirements.
- In v8, taking a dependency on menu over-complicated the button component and increased the default footprint. It also created a tighter binding with the overflow props matching the menu props and children.
- Overflow dropdown is one of many possible approaches such as scrolling, paging, multi-row, scroll-into-view. This may be best left as an application-level concern.
- The dropdown approach is called out by bootstrap as [problematic for usability and accessibility](https://react-bootstrap.github.io/components/tabs/#tabs-with-dropdown).
- Many (if not most) component libraries do not support dropdown overflow.
- There is not a general purpose overflow solution in vNext infrastructure. The team needs to explore options and formulate an approach.

### Tab with Badge

The design spec shows a badge which is arranged near the icon or text. The initial vNext package will not provide a badge variant or badge slot.

- It is unclear if the badge is a common enough scenario to warrant the package dependency on react-badge.
- The positioning of the badge relative to other parts is not confirmed in the design spec
- Other controls may want to overlay a badge. We may want a general purpose badge overlay solution.
- The badge appears most often in an app bar scenario. It is unclear if the items with badges are really tabs, or some other kind of command button. We may have a future app bar/nav bar/toolbar component that handles the badge scenario.

> The intial work to explore supporting a badge used a BadgeTab variant.

### TabPanel

While the design spec does not cover tab panels, v8 Pivot supports them through the content of the PivotItem. They are also a common scenario when the tabs are adjacent to the content associated with each tab.

- There are many approaches to handling tab panel content: show/hide, conditional render, navigation through a router
- We're not providing a manilla folder tab appearance, so there is no need for the tab panel to support styling for when the components are co-located. We may want to have a manilla folder appearance.

If/When we do support tab panels,

- we should provide flexible composition. The tabs should be able to be placed independent of the tab panels in the DOM. The caller should be able to wire the two together easily through event callbacks or state binding.
- we should make connecting tabs and tab panels easy by a Tabs container component that wires them together.
