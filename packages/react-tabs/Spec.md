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

Subtle

The subtle appearance is similar to transparent, but a light background is displayed when hovering over a tab.

```tsx
<TabList appearance="subtle">{/* ... */}</TabList>
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

### TabPanel (future)

The initial vNext package will **not** provide a tab panel, but the tab list will be designed to support a tab panel in the future through composition.

Why not now?

- There are many approaches to handling tab panel content: show/hide, conditional render, navigation through a router
- We're not providing a manilla folder tab appearance, so there is no need for the tab panel to support styling for when the components are co-located.
- Creating a specific tab panel is trivial, creating a general-purpose tab panel is much more involved.

The tab panels should be able to be placed independently of the TabList.
Here's a possible approach:

```tsx
<TabList onTabSelected={(e,data) => setCurrentTab(data.value)}>
  <Tab value="tab1">One</Tab>
  <Tab value="tab2">Two</Tab>
  <Tab value="tab3">Three</Tab>
</TabList>

<TabPanels value={currentTab}>
  <TabPanel value="tab1">Tab Panel #1</TabPanel>
  <TabPanel value="tab2">Tab Panel #2</TabPanel>
  <TabPanel value="tab3">Tab Panel #3</TabPanel>
</TabPanels>
```

When they are co-located, maybe an aggregate component could wire the TabPanels and TabList together:

```tsx
<Tabs>
  <TabList>
    <Tab value="tab1">One</Tab>
    <Tab value="tab2">Two</Tab>
    <Tab value="tab3">Three</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="tab1">Tab Panel #1</TabPanel>
    <TabPanel value="tab2">Tab Panel #2</TabPanel>
    <TabPanel value="tab3">Tab Panel #3</TabPanel>
  </TabPanels>
</Tabs>
```

## API

### Tab

TabCommons.value supports an arbitrary identifier value.
This is similar to Accordian's selection approach.

```ts
export type TabValue = unknown;

export type TabCommons = {
  disabled?: boolean;
  disabledFocusable?: boolean;
  value: TabValue;
};
```

Each tab has an icon slot.

```ts
export type TabSlots = {
  root: IntrinsicShorthandProps<'div'>;
  icon?: IntrinsicShorthandProps<'span'>;
};
```

```ts
export type TabProps = ComponentProps<TabSlots> & TabCommons;
```

### TabList

The tab list has slots for the selection indicator.

```ts
export type TabListSlots = {
  root: IntrinsicShorthandProps<'div'>;
  selectionIndicator?: IntrinsicShorthandProps<'div'>;
};
```

The tab list supports tab selection events that include the value of the tab selected.

```ts
export type TabSelectedEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type TabSelectedData = {
  value: TabValue;
};

export type TabSelectedEventHandler = (event: TabSelectedEvent, data: TabSelectedData) => void;
```

Tab list supports default and selected values for controlled and uncontrolled scenarios.

```ts
export type TabListProps = ComponentProps<TabListSlots> & {
  appearance?: 'transparent' | 'subtle';
  defaultSelectedValue?: string | number;
  selectedValue?: string | number;
  size?: 'small' | 'medium';
  vertical?: boolean;
  verticalTabContent?: boolean;
  onTabSelected?: TabSelectedEventHandler;
};
```

The tab list communicates with tabs via context.
This applies appearance, size, and layout.
The tab can leverage the selectedValue and is expected to call selectTab when clicked.

By adding these properties to TabProps we could allow individual tabs to override these values.
However the expectation is that the tabs within a tab list have consistent layout and appearance.

```ts
export type TabListContextValue = TabListCommons & {
  appearance: 'transparent' | 'subtle';
  selectedValue: string;
  size: 'small' | 'medium';
  selectTab: SelectTabEventHandler;
  vertical: boolean;
};
```

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

### From v8

1. Replace occurances of `<Pivot>` with `<TabList>`
2. Replace occurances of `<PivotItem>` with `<Tab>`
3. Replace `<PivotItem>` content with handling onTabSelected to show/hide associated content.
4. Move PivotItem.headerText to be the content of Tab
5. Subscribe to onTabSelected to show/hide content when a tab is selected.

### From v0

1. Replace use of `<Menu>` with `<TabList>`
2. Replace items data with Tab instances, writing a `map` function as needed.

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

Whe the TabList has focus, the user can use the home/end keys to move focus to the first/last tab.

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

# Open issues

## Should this component support overflow?

The design spec details a menu button (...) that displays the list of tabs that were not able to be displayed due to limited space.

The team has raised some concers with providing this overflow functionality by default in the control.

Concerns:

- In the past, it made the v0 toolbar difficult to maintain. Customers hacked around it when it did not meet app requirements.
- In the past, taking a dependency on menu over-complicated the button component and increased the default footprint. It also created a tighter binding with the overflow props matching the menu props and children.
- It is one of many possible approaches such as scrolling, paging, multi-row, scroll-into-view. This may be best left as an application-level concern.
- The dropdown approach is called out by bootstrap as [problematic for usability and accessibility](https://react-bootstrap.github.io/components/tabs/#tabs-with-dropdown).
- Many (if not most) component libraries do not support dropdown overflow.
- For vNext, the goal is to keep the components as lean as possible. This feels like a heavy feature to enforce.

- [ ] What do our partners expect and need in the overflow scenario?
- [ ] Updated design spec needed that details the requirements for overflow

## Should there be a specific badge slot?

Currently the design details a badge and icon as slots the caller can fill. The badge appears before the icon and the icon before the tab content.

This presents a layout problem if badge is not a slot. If the caller provide a badge and text as the tab content and the icon via the slot, then the icon will appear before the badge.

Concerns:

- Historically, adding props for too narrow a use case has led to API bloat.

- [ ] Is the badge a common use case for partners? customer?
- [ ] Would it be better to have positional slots like Input will have (contentBefore, contentAfter)?
