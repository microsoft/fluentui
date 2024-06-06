# Breadcrumb Migration

### Fabric (v8) property mapping

While the logic in the V8 Breadcrumb component was cooked in, V9 offers partners more flexibility in implementation.
Here's how the API of v8's `Breadcrumb` compares to the one from v9's `Breadcrumb` component:

#### New props

- `size`

#### Props no longer supported with an equivalent functionality in Breadcrumb V9:

- `maxDisplayedItems`and `overflowIndex` - will be part of `partitionBreadcrumbItems` method.
- `className` => Slot system supports it by default. We don't need to provide it explicitly.
- `items` => Use `children` prop instead.
- `componentRef` => NOT SUPPORTED - use `ref` instead.
- `focusZoneProps` => use `focusMode` instead.
- `overflowButtonAs` => Custom component for the overflow button - use custom overflow button instead.
- `styles` => Use style customization through `className` instead.
- `theme`
- `overflowAriaLabel` => Aria label for the overflow button.

#### Props no longer supported

- `dividerAs`

- `onRenderOverflowIcon` => Render a custom overflow icon in place of the default icon `...`.
- `onGrowData` => Method that determines how to group the length of the breadcrumb. Return undefined to never increase breadcrumb length.
- `onReduceData` => Method that determines how to reduce the length of the breadcrumb. Return undefined to never reduce breadcrumb length.

As BreadcrumbItem part of `children` prop, a user decides how to render an item.
The following props are not needed anymore.

- `onRenderItem` => Custom render function to render each crumb. Default renders as a link.
- `onRenderItemContent` => Custom render function to render the content within a crumb. Default renders the text.
- `tooltipHostProps` => Extra props for the TooltipHost which wraps each breadcrumb item.

Fabric Breadcrumb `items` prop as part of `IBreadcrumbData` interface contains the following props:
BreadcrumbItem component contains similar props in V9.

- `key` => not supported
- `text` => use `children` prop of BreadcrumbItem component.
- `as` => type('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a') - Optional prop to render the item as a heading of your choice. You can also use this to force items to render as links instead of buttons (by default, any item with a href renders as a link, and any item without a href renders as a button). This is not generally recommended because it may prevent activating the link using the keyboard. In V9 It's part of BreadcrumbItem prop.
- `href` => URL to navigate to when this breadcrumb item is clicked. If provided, the breadcrumb will be rendered as a link.
- `isCurrentItem` => Whether this is the breadcrumb item the user is currently navigated to. If true, aria-current="page" will be applied to this breadcrumb item.
- `onClick` => Callback for when the breadcrumb item is selected.
- `onRender` => A function to render the outer content of the crumb (the link).
- `onRenderContent` => A function to render the inner content of the crumb (the text inside the link).
- `role` => Optional role for the breadcrumb item (which renders as a button by default)

#### Property Mapping

| v8 `Breadcrumb`     | v9 `Breadcrumb` |
| ------------------- | --------------- |
| `ariaLabel`         |                 |
| `className`         |                 |
| `componentRef`      |                 |
| `dividerAs`         |                 |
| `focusZoneProps`    |                 |
| `maxDisplayedItems` |                 |
|                     | `size`          |

### Northstar property mapping

#### Props which are repeating in each component

These props are the same in all the components.
`as` prop had different defaults in different components.
BreadcrumbDivider has default `span`. BreadcrumbLink has `a` and Breadcrumb has `nav`.

- `accessibility` => Accessibility behavior if overridden by the user.
- `as` => type React.ElementType - An element type to render as (string or component).
- `className`
- `content` => Shorthand for primary content.
- `design` => type ComponentDesignProp
- `styles` =>
- `variables` => Override for theme site variables to allow modifications of component styling via themes.

#### Property Mapping

| Northstar `Breadcrumb` | v9 `Breadcrumb` |
| ---------------------- | --------------- |
| `accessibility`        |                 |
| `as`                   |                 |
| `className`            |                 |
| `content`              |                 |
| `design`               |                 |
|                        |                 |
| `size`                 | `size`          |
| `styles`               |                 |
| `variables`            |                 |

#### Breadcrumb component:

- `size` => use as it is.

#### BreadcrumbItem component:

In V9 BreadcrumbItem is `li` component which is wrapper for `BreadcrumbButton`.
`BreadcrumbButton` has props `current` and `disabled`.

- `active` => Indicates if the link is the active. Use `current` instead.
- `disabled` => The Breadcrumb Item can be disabled.

#### Property Mapping

| Northstar `BreadcrumbItem` | v9 `BreadcrumbButton` |
| -------------------------- | --------------------- |
| `active`                   | `current`             |
| `disabled`                 | `disabled`            |
