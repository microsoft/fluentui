# @fluentui/react-tabs Spec

# Tabs

**GitHub Epic issue** - [Tabs/Pivot Convergence #20338](https://github.com/microsoft/fluentui/issues/20338)

## Background

Tabs allow for navigation between two or more content views and relies on text headers to
articulate the different sections of content.

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

#### **Varations**

v0 supports decorating tabs with arrows pointing toward the associated content.
v0: pointing=true

v8 supports a large tab style with increased padding per tab.
v8: linkSize="large"

### Tab Item Content

Both v0 and v8 support text, icon, and text and icon as tab content.
v0 additionally supports menus as tab content.

Both v0 and v8 support custom rendering of tab content through a render props per item.

### Overflow

v0 support overflow when behaving as a toolbar.
v0: accessibility={menuAsToolbarBehavior}. This is mutually exclusive with accessibility={tabListBehavior}.

v8 supports overflow
v8: overflowBehavior="menu" | overflowBehavior="none"

## Sample Code

### Default

- tabs are arranged horizontally
- tab content is arranged horizontally, centered within each tab boundary
- transparent appearance

```tsx
<TabList>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

### Vertical

- tabs are arranged vertically

```tsx
<TabList vertical>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

### Vertical Tab content

- tab content is arranged vertically

```tsx
<TabList verticalContent>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>

<TabList vertical verticalContent>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

### Appearance

Transparent (default)

- no border and background styles
- selection is indicated by a primary line below the tab
- hovering over a tab shows a secondary line below the tab

```tsx
<TabList>
  <Tab />
  <Tab />
  <Tab />
</TabList>

<TabList appearance="transparent">{/* ... */}</TabList>
```

Subtle

- similar to transparent, but a light background is set when hovering over a tab

```tsx
<TabList appearance="subtle">{/* ... */}</TabList>
```

### With Icon

- icon is positioned before the tab content

```tsx
<TabList>
  <Tab icon={<CheckboxComposite />}>Allowed</Tab>
  <Tab icon={<BlockedSite />}>Blocked</Tab>
</TabList>
```

- icon only when content omitted

```tsx
<TabList>
  <Tab icon={<CheckboxComposite />} />
  <Tab icon={<BlockedSite />} />
</TabList>
```

### With Badge

```tsx
<TabList>
  <Tab>Files</Tab>
  <Tab>Search</Tab>
  <Tab badge={<Badge>New</Badge>}>Semantic Search</Tab>
</TabList>
```

### Overflow

- overflow is a menu button
- replaceable via a slot

```tsx
<TabList overflow={</MyOverflowButton}>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

## API

### Tab

TabCommons.value supports an arbitrary identifier value.
The value for each tab can be used to display the associated tab panel (future).
This is similar to Accordian's selection approach.

> TODO: Should value be called key since the tab list has selectedKey?
> If so, should this key be applied to the tab as a key attribute?

```ts
export type TabValue = unknown;

export type TabCommons = {
  disabled: boolean;
  disabledFocusable: boolean;
  value: TabValue;
};
```

TabContextValue provides context from TabsList

- default appearance, size, and vertical
- default selectionIndicator slot
- single-selection behavior
- click handling

> TODO: To provide a selectionIndicator slot implementation from the parent
> should it be IntrinsicShorthandProps or IntrinsicShorthandValue?

```ts
export type TabContextValue = Partial<Omit<TabCommons, 'value'>> & {
  appearance: 'transparent' | 'subtle';
  selected: boolean;
  selectionIndicator: IntrinsicShorthandProps<'div'>;
  size: 'small' | 'medium';
  vertical: boolean;
  onClick(ev: React.MouseEvent | React.KeyboardEvent): void;
};
```

Each tab has badge and icon slots.

```ts
export type TabSlots = {
  root: IntrinsicShorthandProps<'div'>;
  badge?: ObjectShorthandProps<BadgeProps>;
  icon?: IntrinsicShorthandProps<'span'>;
};
```

```ts
export type TabProps = ComponentProps<TabSlots> & Partial<TabCommons>;
```

### TabList

The tab list has slots for the selection indicator passed to each tab via context,
and a slot for the overflow menu button.

```ts
export type TabListSlots = {
  root: IntrinsicShorthandProps<'div'>;
  selectionIndicator?: IntrinsicShorthandProps<'div'>;
  overflow: ObjectShorthandProps<MenuProps>;
};
```

```ts
export type TabSelectedEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type TabSelectedData = {
  value: TabValue;
};

export type TabSelectedEventHandler = (event: TabSelectedEvent, data: TabSelectedData) => void;
```

Tab list support default and selected keys for controlled and uncontrolled scenarios.

```ts
export type TabListProps = ComponentProps<TabListSlots> & {
  appearance?: 'transparent' | 'subtle';
  defaultSelectedKey?: string | number;
  selectedKey?: string | number;
  size?: 'small' | 'medium';
  vertical?: boolean;
  verticalContent?: boolean;
  onTabSelected?: TabSelectedEventHandler;
};
```

## Structure

- _**Public**_

```tsx
<TabList appBar>
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

TabList provides single select of a tab.

Programmatic

- The TabList.selectedKey can control the currently selected tab.

Mouse/Touch

- Clicking the tab selects it.

Keyboard

- Tablist focus traps the and allows focus of individual tabs.
- Arrow keys move focus forward/backward.
- The arrow keys are based on layout. Horizontal: left/right, Vertical: up/down.
- A tab is selected when the spacebar is pressed for a focused tab.
- The `TAB` key moves focus from the tabs to the overflow button.

Events

- Tab list raises the onTabSelected event whenever a tab is selected.
- The event data includes the tab value.

### Overflow

- When there are more tabs than can fit in the available space, the overflow appears.
- Clicking the overflow button displays the non-visible tabs as a menu.
- Selecting a tab from the menu will replace the last visible tab with the selected tab.

## Accessibility

ARIA provides tab-specific roles:

- [tab](https://www.w3.org/TR/wai-aria-1.1/#tab): A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
- [tablist](https://www.w3.org/TR/wai-aria-1.1/#tablist): A list of tab elements, which are references to tabpanel elements.
- [tabpanel](https://www.w3.org/TR/wai-aria-1.1/#tabpanel): A container for the resources associated with a tab, where each tab is contained in a tablist.

TabList and Tab will apply the `tablist` and `tab` ARIA roles.
The `tabpanel` will be reserved for possible future component.

### Screen readers

Screen readers will read tab content and focus of the overflow button.
