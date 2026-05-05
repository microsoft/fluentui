# Tabs (Pivot) Migration

## v8 Pivot & PivotItem

In v8, you declare a `Pivot` with a list of `PivotItem` components as children.

- The tab name is declared in the `headerText` property.
- The associated content for each tab is declared within the `PivotItem`.
- This binds the tab and tab content together in the DOM hierarchy.

For example,

## v9 TabList & Tab

In v9, there is a similar approach of a `TabList` containing `Tab` components.

The key difference is the `Tab` children are rendered as the label of the tab.

- The associated content that is shown/hidden is separate from the `Tab` and `TabList`.
- This allows for much richer tab label, for the associated content to be placed anywhere in the DOM, and for more control over when and how associated content is rendered.

### Migration Steps

To migrate from `Pivot` to `TabList`

- replace `Pivot` with `TabList` and `PivotItem` with `Tab`
- move all the `PivotItem` content under a sibling element of `TabList`
- move the `headerText` into the `Tab`'s children.
- add the `onTabSelect` event handler to set the selected tab value as state
- update the content element to render the selected tabs content.

For example, here is the previous `Pivot` example migrated to use `TabList`

## Pivot -> TabList Props Mapping

| v8                 | v9                             |
| ------------------ | ------------------------------ |
|                    | appearance                     |
| componentRef       | ref                            |
| className          | className                      |
| defaultSelectedKey | defaultSelectedValue           |
| focusZoneProps     | (removed)                      |
| getTabId           | (removed)                      |
| headersOnly        | (removed)                      |
| linkFormat         | (removed)                      |
| linkSize           | size                           |
| onLinkClick        | onTabSelect                    |
| overflowAriaLabel  | (removed)                      |
| overflowBehavior   | (removed)                      |
| selectedKey        | selectedValue                  |
| styles             | (use makeStyles and className) |
| theme              | (use FluentProvider)           |
|                    | vertical                       |

## PivotItem -> Tab Props Mapping

| v8                | v9             |
| ----------------- | -------------- |
| componentRef      | ref            |
| linkText          | (removed)      |
| headerText        | (use children) |
| headerButtonProps | (removed)      |
| itemKey           | value          |
| ariaLabel         | aria-label     |
| itemCount         | (removed)      |
| itemIcon          | icon (slot)    |
| onRenderItemLink  | (removed)      |
| keytipProps       | (removed)      |
| alwaysRender      | (removed)      |
