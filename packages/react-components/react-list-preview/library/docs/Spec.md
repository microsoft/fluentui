# @fluentui/react-list-preview Spec

## Background

A List is a component that displays a set of vertically stacked components.

If you are displaying more than one dimension of the data, the List probably isn't the proper component to use, instead, consider using Table or DataGrid.

The List supports plain list items, interactive list items with one action or multiple actions. It also has support for single and multi selection built in. This can be utilized in either uncontrolled or controlled way.

All of the List scenarios are also accessible, as the whole component was built with accessibility in mind. It is easily navigable with a keyboard and supports different screen reader applications. Proper aria roles are inferred by the usage and their overrides are validated during development.

## Prior Art

- [Fluent UI v0 docs](https://fluentsite.z22.web.core.windows.net/components/list/definition)
- [Fluent UI v8 docs](https://developer.microsoft.com/en-us/fluentui#/controls/web/list)
- [Open UI research](https://open-ui.org/components/list.research/)

## Sample Code

```tsx
<List navigationMode="items">
  {names.map(name => (
    <ListItem key={name} onAction={() => alert(`Triggered custom action!`)}>
      {name}
    </ListItem>
  ))}
</List>
```

## Variants

### Navigable / Non-Navigable

The items are not focusable/navigable by default. To make the items focusable, `navigationMode` prop is passed with a value of `"items"` or `"composite"`.

**`"items"`** is used for items with single action, where only vertical navigation between list items is required. It is also the default behavior when selection is enabled.

**`"composite"`** is used when there are secondary focusable elements inside each list item (multiple actions).

### Selectable / Non-Selectable

The user can enable the built in selction mechanism by passing `selectionMode` prop. This can be either `"single"` or `"multiselect"`.

The selection is controlled by using the `selectedItems` prop along with `onSelectionChange` callback.

### Actions

Actions on the `ListItem` are triggered with a `click` and `Enter` or `Space` key.

When **selection** is enabled, the **default action** is to **toggle** the selection.

To add a custom action, the `onAction: (event: ListItemActionEvent => void)` callback is used.

If selection is enabled, this `onAction` is only triggered for click and `Enter`. `Space` is reserved for selection. **The default action -- toggling the selection, can be disabled by calling `event.preventDefault()` and custom logic can be implemented instead.**

If selection is disabled, the whole `ListItem` acts as a button and `click`, `Enter` and `Space` all trigger the `onAction` callback.

## API

See API at [List.types.ts](../src/components/List/List.types.ts) and [ListItem.types.ts](../src/components/ListItem/ListItem.types.ts)

## Structure

### Public

```html
<List>
  <ListItem />
  <ListItem />
  <ListItem />
</List>
```

### DOM

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

By default the `ul`/`li` elements are used for rendering. Aria roles are determined based on `selectionMode` and `navigationMode` props.

When the rendered role is "grid", `gridcell` roles have to be added by user to adhere to the a11y requirements of the screen readers.

## Migration

See the Migration Guide at [MIGRATION.md](./MIGRATION.md).

## Behaviors

### Component States

#### Selection

The list supports selection, it can be enabled by setting the `selectionMode` prop to `"single"` or `"multiselect"`. To control the selection, the `selectedItems` and `onSelectionChange` props can be utilized.

### Interactions

#### Mouse/Pointer

Clicking/Tapping on the List Item will **toggle selection**, if selection is enabled. It will also **trigger `onAction`** callback before that, where this behavior can be **prevented** and custom action can be triggered.

Clicking on the **checkbox** in the `checkmark` slot doesn't trigger the `onAction` callback and **always toggles** the **selection**.

#### Keyboard

By default, the list items are not focusable and keyboard navigation is disabled. To enable the keyboard navigation, `navigationMode` prop is passed with a value of `"items"` or `"composite"`.

**items**

- items are now focusable
- `ArrowDown` moves the focus to the next `ListItem`
- `ArrowUp` moves the focus to the previous `ListItem`
- `Tab` moves the focus outside of the list to the next element
- `Enter` triggers the `onAction` callback and toggles selection (this can be prevented in `onAction`)
- `Space` toggles selection if enabled, triggers the `onAction` callback if selection is disabled

**composite**

- same as `items`, plus:
- `ArrowRight` focuses the first element inside the `ListItem` and then the next one inside
- `ArrowLeft` focuses the previous focusable element inside the `ListItem` or the `ListItem` itself if the first element is focused
- `Esc` focuses the parent `ListElement`

Used when there are other focusable elements inside of list item. Same as **items**, but adds `Arrow Left` and `Arrow Right` key navigation to enter the list item and navigate inside. `Escape` will focus the parent list item.

#### Screen readers

The keyboard navigation works regardless of screen readers being enabled. Users can also utilize screen reader specific keyboard shortcuts to navigate in the list.

When the navigation mode is `"composite"` and there are other focusable elements in the `ListItem`, `grid` navigation keyboard shortcuts can be used (after properly adding the `gridcell` role to the `ListItem` children).

## Accessibility

### HTML elements

By default, the `List` renders as `ul` and `ListItem` as `li`. This can be changed to render as `ol` or `div` (with `li` and `div` for `ListItem`). There is validation in place which prevents the developer from rendering `ListItem` as `div` inside of `ul` and otherwise.

### Roles

The proper accessibility roles are inferred based on the props passed.

By default, `list` and `listitem` roles are used.

When selection is enabled and `navigationMode` is `single`, `listbox` and `option` roles are used.

When selection is enabled and `navigationMode` is `composite`, since the `ListItem` can be now be navigated into, `grid` and `row` roles are used. In this case, the validation is in place outside of `production` environment making sure the developer uses `gridcell` role on each of the `ListItem`'s child element, as this is required for proper `grid` accessibility.

### Role overrides

Roles can be overriden and the their proper use is validated. The developer will receive a warning in the console if the roles used are different from the expected.
