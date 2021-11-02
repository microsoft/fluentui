# @fluentui/react-tabs Spec

# Tabs

**GitHub Epic issue** - [Tabs/Pivot Convergence #20338](https://github.com/microsoft/fluentui/issues/20338)

## Background

Tabs allow for navigation between two or more content views and relies on text headers to articulate the different sections of content.

## Prior Art - Open UI

Tabs component name: The Open UI component naming matrix indicates Tabs is the most common and popular name for this component. Only Fabric/Fluent UI v8 and earlier named it Pivot.

The [Tabs Research](https://open-ui.org/components/tabs.research) notes part naming and terminology are not
consistent across libraries. ARIA does provide tab-specific roles:

- [tab](https://www.w3.org/TR/wai-aria-1.1/#tab): A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
- [tablist](https://www.w3.org/TR/wai-aria-1.1/#tablist): A list of tab elements, which are references to tabpanel elements.
- [tabpanel](https://www.w3.org/TR/wai-aria-1.1/#tabpanel): A container for the resources associated with a tab, where each tab is contained in a tablist.

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

## Prior Art - Comparison with v0 and v8

The existing components are:

- v0 - [Menu](https://fluentsite.z22.web.core.windows.net/0.59.0/components/menu/definition)
- v8 - [Pivot](https://developer.microsoft.com/en-us/fluentui#/controls/web/pivot)

### Approach

v0 provides tabs, toolbars, menus, and even breadcrumbs with the Menu components.
v0 supports tabs behavior when accessibility={tabListBehavior}

v8 provides a separate Pivot component with tabs behavior and appearance customization.

### Appearance

#### **Pivot**

A 'Pivot' appears as a horizontal set of borderless buttons with an underline indicating current selection.
Both v0 and v8 provide a 'Pivot' appearance.
v8 by default and v0 when underlined and primary props are true.

#### **Block Tab**

A 'Block Tab' appears as a horizontal set of borderless buttons.
The selection has an active color, rectangular background.

Both v0 and v8 provide the 'Block Tab' appearance.
v0 by default and v8 when the linkFormat prop equals "tabs".

#### **Varations**

v0 supports decorating tabs with arrows pointing toward the associated content when the pointing prop is set.

v8 supports a large tab style with increased padding per tab.

### Tab Item Content

Both v0 and v8 support text, icon, and text and icon as tab content.
v0 additionally supports menus as tab content.

Both v0 and v8 support custom rendering of tab content through a render props callbacks per item.

### Overflow

v0 support overflow when behaving as a toolbar with the accessibility={menuAsToolbarBehavior}.
This is mutually exclusive with the accessibility={tabListBehavior}.

v8 supports overflow with the overflowBehavor prop of 'menu' or 'none'.

## Sample Code

### Default

tabs are stacked horizontally
tab content is stacked horizontally
default appearance

```tsx
<TabList>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

With Icons

```tsx
<TabList>
  <Tab icon={<CheckboxComposite />}>Allowed</Tab>
  <Tab icon={<BlockedSite />}>Blocked</Tab>
</TabList>
```

### Vertical

tabs are stacked vertically, tab content is stacked horizontally

```tsx
<TabList vertical>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

### App Bar

Tab content is stacked vertically

> TODO: Verify with design that tabs in appbar layout are meant to integrate into some vertical command bar later?
> TODO: Ask design about app bar and difference between allowing tabs to layout vertically
> TODO: Ask design if appbar can ever be horizontal layout
> TODO: Ask design if transparent | subtle appearance can be applied to appBar rather than appBar having distinct appearance

```tsx
<TabList appBar>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

-or-

```tsx
<TabList vertical>
  <Tab vertical>One</Tab>
  <Tab vertical>Two</Tab>
  <Tab vertical>Three</Tab>
</TabList>
```

### Appearance

> TODO: Confirm with design if transparent is the default.
> TODO: Confirm with design there is not a manilla folder tab appearance.
> TODO: Ask design what the subtle and transparent styles are for focus, hover, pressed, disabled.

```tsx
<TabList>{/* ... */}</TabList>

<TabList appearance="transparent">{/* ... */}</TabList>
```

```tsx
<TabList appearance="subtle">{/* ... */}</TabList>
```

### Badges

> TODO: How to support multiple badge types as a slot?
> TODO: How to specify icon for basic badge in a slot?

```tsx
<TabList>
  <Tab>Files</Tab>
  <Tab>Search</Tab>
  <Tab badge={<CounterBadge count={5} />}>Messages</Tab>
</TabList>
```

### Overflow

Handling overflow is a built-in feature of tabs and replaceable via a slot.

```tsx
<TabList overflow={</MyOverflowButton}>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>
```

## API

### Tab

- TabCommons.value supports an arbitrary identifier for each tab that can be paired with a future tab panel. This is similar to Accordian's selection approach.

```ts
export type TabValue = unknown;

export type TabCommons = {
  appearance: 'transparent' | 'subtle';
  disabled: boolean;
  disabledFocusable: boolean;
  size: 'small' | 'medium';
  value: TabValue;
  vertical: boolean;
};
```

TabContextValue provides context from TabsList

- default appearance, size, and vertical
- default selectionIndicator slot
- single-selection behavior
- click handling

> TODO: How best to provide a default selectionIndicator slot from a parent?

```ts
export type TabContextValue = Partial<Omit<TabCommons, 'value'>> & {
  selected: boolean;
  selectionIndicator: IntrinsicShorthandProps<'div'>;
  onClick(ev: React.MouseEvent | React.KeyboardEvent): void;
};
```

```ts
export type TabSlots = {
  root: IntrinsicShorthandProps<'div'>;
  badge?: ObjectShorthandProps<BadgeProps>;
  icon?: IntrinsicShorthandProps<'span'>;
  selectionIndicator?: IntrinsicShorthandProps<'div'>;
};
```

```ts
export type TabProps = ComponentProps<TabSlots> & Partial<TabCommons>;
```

### TabList

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

```ts
export type TabListProps = ComponentProps<TabListSlots> & {
  appearance?: 'transparent' | 'subtle';
  defaultSelectedKey?: string | number;
  selectedKey?: string | number;
  size?: 'small' | 'medium';
  vertical?: boolean;
  verticalTab?: boolean;
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

- Replace occurances of `<Pivot>` with `<TabList>`
- Replace occurances of `<PivotItem>` with `<Tab>`
- Replace `<PivotItem>` content with handling onTabSelected to show/hide associated content.
- Move PivotItem.headerText to be the content of Tab

### From v0

- Replace use of `<Menu>` with `<TabList>` (full rewrite)

## Behaviors

### Selection

The TabList will provide single-selection of a tab.

### Programmatic Selection

The TabList.selectedKey can control the currently selected tab.
If the tab to be selected is in the overflow, it will be moved into the set of visible tabs.

> TODO: Do we need an announce here?

### Overflow

The overflow part will screen read as a button with text indicating to click for a list of other available tabs.

### Mouse/Touch

Clicking the tab will raise the TabsList.onTabSelected event

### Keyboard

TabsList will focus trap on the set of tabs.
When focused on the tabs, the user can cycle through tabs with arrow keys.
The arrow keys are based on layout. Horizontal: left/right, Vertical: up/down
The TAB key moves focus from tabs to overflow to next control in the tab order.

> TODO: Should Ctrl+Tab and Shift+Ctrl+Tab be supported?

### Screen readers

Screen readers will read each tab's content when moused over similar to button.
The ARIA tablist and tab roles will inform the screen reader.

## Accessibility

TabList and Tab will apply the `tablist` and `tab` ARIA roles.
See the behaviors for selection, focus trap, and programmatic accessibility.
