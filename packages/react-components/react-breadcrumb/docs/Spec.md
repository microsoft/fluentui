# @fluentui/react-breadcrumb Spec

## Background

Breadcrumbs should be used as a navigational aid in your app or site. They indicate the current page's location within a hierarchy and help the user understand where they are in relation to the rest of that hierarchy.

### Fabric (v8)

```jsx
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';

const items: IBreadcrumbItem[] = [
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 2 with a long name', key: 'f2', onClick: _onBreadcrumbItemClicked },
  { text: 'This is folder 3 long', key: 'f3', onClick: _onBreadcrumbItemClicked },
  { text: 'This is non-clickable folder 4', key: 'f4' },
  { text: 'This is folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked, isCurrentItem: true },
];

export const BreadcrumbStaticExample: React.FunctionComponent = () => {
  return (
    <Breadcrumb
      items={items}
      maxDisplayedItems={3}
      ariaLabel="Breadcrumb with static width"
      overflowAriaLabel="More items"
    />
  );
};

function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}
```

### Northstar (v0)

```jsx
import { Breadcrumb } from '@fluentui/react-northstar';
import { ChevronEndMediumIcon } from '@fluentui/react-icons-northstar';

const BreadcrumbExampleIconDivider = props => (
  <Breadcrumb aria-label="breadcrumb">
    <Breadcrumb.Item>
      <Breadcrumb.Link href="">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Divider>
      <ChevronEndMediumIcon />
    </Breadcrumb.Divider>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="">Store</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Divider>
      <ChevronEndMediumIcon />
    </Breadcrumb.Divider>
    <Breadcrumb.Item aria-current="page">T-shirt</Breadcrumb.Item>
  </Breadcrumb>
);
```

## Prior Art

- [Open UI research](https://open-ui.org/components/breadcrumb)
- [Convergence epic](https://github.com/microsoft/fluentui/issues/26480)

### Comparison of [Fabric Breadcrumb](https://developer.microsoft.com/en-us/fluentui#/controls/web/breadcrumb) and [Northstar Breadcrumb](https://fluentsite.z22.web.core.windows.net/0.57.0/components/breadcrumb/definition)

### Components

| Purpose                                                                | Fabric     | Northstar         | Matching? |
| ---------------------------------------------------------------------- | ---------- | ----------------- | --------- |
| Breadcrumb is a component that indicates the path of the current page  | Breadcrumb | Breadcrumb        | ⚠️        |
| BreadcrumbItem an actionable item within a Breadcrumb                  |            | BreadcrumbItem    | ❌        |
| BreadcrumbDivider divides BreadcrumbItem components within Breadcrumb  |            | BreadcrumbDivider | ❌        |
| An BreadcrumbLink represents a anchor to be used inside the Breadcrumb |            | BreadcrumbLink    | ❌        |

## Sample Code

By default BreadcrumbButton should be used.

```jsx
const BreadcrumbV9Example = props => (
  <Breadcrumb aria-label="breadcrumb">
    <BreadcrumbItem>
      <BreadcrumbButton onClick={() => {}}>
        Home
      </BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbButton onClick={() => {}}>
        Gallery
      </BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbItem current={true}>
      <BreadcrumbButton onClick={() => {}}>
        About
      </BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
  </>
);
```

## Variants

### Appearance

Breadcrumb can be:

- transparent (default)
- subtle

### BreadcrumbItem variants

- Non-clickable element which is BreadcrumbItem component.
- Button - BreadcrumbButton component.
- Link - BreadcrumbLink component.
- Dropdown menu - can be added by a partner using JSX composition.

### Icon

BreadcrumbItem can have an icon with text or just icon.

### Size

Breadcrumb can have the following sizes: `small`, `medium` and `large`.

### Tooltip

Tooltips appear on collapsed menu or truncated name of item.

### Dropdown menu

Dropdown contains collapsed items.

## API

## Structure

### Components

| Component         | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| Breadcrumb        | Wrapper for the Breadcrumb component. Contains `nav` and `ol` elements.  |
| BreadcrumbDivider | Divider component                                                        |
| BreadcrumbItem    | `li` element. Can contain BreadcrumbButton or BreadcrumbLink components. |
| BreadcrumbLink    | Breadcrumb Link                                                          |
| BreadcrumbButton  | Breadcrumb Button                                                        |

### Breadcrumb

#### Anatomy

![visual anatomy of the Breadcrumb component](./assets/breadcrumb-anatomy.png)

#### DOM

```HTML
<nav aria-label="breadcrumb">
  <ol>
  {children}
  </ol>
</nav>
```

#### Breadcrumb structure:

- root `nav` element
- list `ol` element

#### API

| Property     | Values                     | Default       | Purpose                          |
| ------------ | -------------------------- | ------------- | -------------------------------- |
| appearance   | `transparent`, `subtle`    | `transparent` | Sets appearance                  |
| dividerType  | `chevron`, `slash`         | `chevron`     | Sets type of divider             |
| iconPosition | `before`, `after`          | `before`      | Sets icon position for all items |
| size         | `small`, `medium`, `large` | `medium`      | Defines size of the Breadcrumb   |

### BreadcrumbItem

#### Anatomy

![visual anatomy of the BreadcrumbItem component](./assets/breadcrumb-item-anatomy.png)

BreadcrumbItem can be:

- Button - BreadcrumbButton component is used inside BreadcrumbItem.
- Link - BreadcrumbLink is used inside BreadcrumbItem.
- Non-clickable content
- Dropdown Menu
- Icon (optional)

It can contain a tooltip.

#### DOM

Non-clickable element

```HTML
<li>
  {children}
</li>
```

Link

```HTML
<li>
  <a href="#">
    {children}
  </a>
</li>
```

Button

```HTML
<li>
  <button>
    {children}
  </button>
</li>
```

Usage

```jsx
<BreadcrumbItem>
  Item 1
</BreadcrumbItem>
<BreadcrumbItem>
  <BreadcrumbButton onClick={() => console.log('smth...')}>
    Item 2
  </BreadcrumbButton>
</BreadcrumbItem>
<BreadcrumbItem>
  <BreadcrumbLink href="#">
    Item 3
  <BreadcrumbLink>
</BreadcrumbItem>
```

#### API

| Property     | Values            | Default  | Purpose                |
| ------------ | ----------------- | -------- | ---------------------- |
| current      | boolean           | false    | Indicates current page |
| icon         | _slot_            |          | Sets icon              |
| iconPosition | `before`, `after` | `before` | Sets icon position     |

#### Breadcrumb icon

```jsx
<BreadcrumbItem icon={<IconComponent />}>Item</BreadcrumbItem>
<BreadcrumbItem icon={<IconComponent />} iconPosition="after">
  <BreadcrumbButton>Item</BreadcrumbButton>
</BreadcrumbItem>
<BreadcrumbItem icon={<IconComponent />}>
  <BreadcrumbLink>Item</BreadcrumbLink>
</BreadcrumbItem>
```

### BreadcrumbDivider

#### DOM

```HTML
  <li class="fui-BreadcrumbDivider">
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.65 3.15a.5.5 0 000 .7L9.79 8l-4.14 4.15a.5.5 0 00.7.7l4.5-4.5a.5.5 0 000-.7l-4.5-4.5a.5.5 0 00-.7 0z" fill="currentColor" />
    </svg>
  </li>
```

Type of the divider is passed from the `Breadcrumb` component. In case if partner wants to have a custom divider it should be passed as `children` prop.
Slash divider can be only for small Breadcrumb.

```jsx
<Breadcrumb size="large" >
  <BreadcrumbItem>Item</BreadcrumbItem>
  <BreadcrumbDivider>
    <ArrowRight16Filled />
  </BreadcrumbDivider>
  <BreadcrumbItem>Item</BreadcrumbItem>
</Breadcrumb>
<Breadcrumb size="small" dividerType="slash">
  <BreadcrumbItem>Item</BreadcrumbItem>
  <BreadcrumbDivider />
  <BreadcrumbItem>Item</BreadcrumbItem>
</Breadcrumb>
```

### BreadcrumbButton

```jsx
<BreadcrumbButton onClick={() => console.log('smth...')}>Button Item</BreadcrumbButton>
```

Under the hood @fluentui/react-button component is used.

### BreadcrumbLink

```jsx
<BreadcrumbLink href="#">
  Link Item
<BreadcrumbLink>
```

For Link @fluentui/react-link component is used.

## Migration

### Fabric (v8) property mapping

This should be moved to MIGRATION.md later.
Here's how the API of v8's `Breadcrumb` compares to the one from v9's `Breadcrumb` component:

#### New props

- `appearance`

#### Props no longer supported with an equivalent functionality in Breadcrumb V9:

- `maxDisplayedItems`and `overflowIndex` - will be part of `partitionBreadcrumbItems` method
- `className` => Slot system supports it by default. We don't need to provide it explicitly.
- `items` => Use `children` prop instead.
- `componentRef`
- `dividerAs` => Divider is a separate component. Type of divider is passed to the Breadcrumb component.
- `focusZoneProps` => use `focusMode` instead.
- `overflowButtonAs` => Custom component for the overflow button. - use custom overflow button instead.
- `styles`
- `theme`
- `overflowAriaLabel` => Aria label for the overflow button.

#### Props no longer supported

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
| `styles`               |                 |
| `variables`            |                 |

#### Breadcrumb component:

- `size` => use as it is.

#### BreadcrumbItem component:

- `active` => Indicates if the link is the active.
- `disabled` => The Breadcrumb Item can be disabled.

#### Property Mapping

| Northstar `BreadcrumbItem` | v9 `BreadcrumbItem` |
| -------------------------- | ------------------- |
| `active`                   | `current`           |
| `disabled`                 | `disabled`          |

## Behaviors

#### Overflow

The default position of ellipses should be the second element because from a UX perspective root folder should be shown.

#### Collapse functionality turns on when:

- There's not enough space
- When `maxDisplayedItems` prop is provided and number of items is bigger than `maxDisplayedItems`.

By default `Overflow` component is used to hide items when there's not enough space.
Also, `maxDisplayedItems` prop can be provided. By default `maxDisplayedItems` is equal `6` elements.
This logic can be combined with `Overflow` component.

Getting `overflowItems` is handled by `partitionBreadcrumbItems` method.

```js
const DEFAULT_OVERFLOW_INDEX = 1;
export type PartitionBreadcrumbItemsOptions<T> = {
  items: readonly T[];
  maxDisplayedItems?: number;
  overflowIndex?: number;
};

export type PartitionBreadcrumbItems<T> = {
  startDisplayedItems: readonly T[];
  overflowItems?: readonly T[];
  endDisplayedItems?: readonly T[];
};

/**
 * Get the displayed items and overflow items based on the array of BreadcrumbItems.
 *
 * @param options - Configure the partition options
 *
 * @returns Three arrays split into displayed items and overflow items based on maxDisplayedItems.
 */
export const partitionBreadcrumbItems = <T>(
  options: PartitionBreadcrumbItemsOptions<T>,
): PartitionBreadcrumbItems<T> => {
  // implementation
  return {
    startDisplayedItems,
    overflowItems,
    endDisplayedItems,
  };
};
```

In case if there are no overflowItems original array is returned.

```jsx
const { startDisplayedItems, overflowItems, endDisplayedItems } = partitionBreadcrumbItems({
  items,
  maxDisplayedItems: 4,
  overflowIndex: 2,
});
<Breadcrumb size="large">
  {startDisplayedItems.map(item => renderButton(item))}
  {overflowItems && renderMenu(overflowItems)}
  {endDisplayedItems &&
    endDisplayedItems.map(item => {
      const isLastItem = item.key === buttonItems.length - 1;
      return renderButton(item, isLastItem);
    })}
</Breadcrumb>;
```

It should be done by the partners using JSX composition.
For Menu `@fluentui/react-menu` component should be used.

`maxDisplayedItems` and `overflowIndex` are part of `partitionBreadcrumbItems` which is helper in Breadcrumb utils.

#### Truncate long names:

Currently truncation of long names should be done by partners. It's recommended to truncate a name when there are more than 30 symbols.

### Mouse

#### Breadcrumb item as Button

![Breadcrumb item as Button](./assets/button-beadcrumb.png)

#### Breadcrumb item as Link

![Breadcrumb item as Link](./assets/link-beadcrumb.png)

Breadcrumb can have the folloing states:

- Rest
- Hover
- Pressed
- Selected
- Focused
- Disabled
- Active

![Breadcrumb states](./assets/beadcrumb-states.png)

#### Non-interactive Breadcrumb Item

Non-interactive style variation for places where the Breadcrumb is purely representational or informational. Usually this instance is mostly used to describe file path location, etc.

![Non-interactive Breadcrumb](./assets/breadcrumb-not-interactive.png)

#### Tooltip

Tooltip is shown `onHover` on collapsed menu or items with long names.
![Breadcrumb Tooltip](./assets/breadcrumb-tooltip.png)

Tooltipls can be multiline. It is recommended to use content no longer than 80 symbols.

### Keyboard

When navigating via keyboard, focus will be place initially on the first breadcrumb item. Left and right arrow keys move through the breadcrumb items.

![Breadcrumb keyboard interaction](./assets/breadcrumb-keyboard-interaction.png)

- Tab => Focus on breadcrumb trail or the first item only.
- Arrow => Move focus to items in the string.
- Enter or Space => Selects the item; opens the page; expand collapsed items.

#### Collapsed items - Menu

If the overflow button is in focus, `Enter`, `Arrow down` or `Space` activate the overflow menu.
![Breadcrumb interaction with collapsed items](./assets/breadcrumb-collapsed-items.png)

- Enter, Arrow Down or Space => Expand collapsed items.

## Accessibility

Use the `tab` key to navigate to the first item of the string and `arrow` keys to move through previous and next items.
Each item is conisdered a ListItem with nested links.
Tab stops don't apply for non-interactive Breadcrumbs.

![Breadcrumb Accessibility](./assets/a11y-breadcrumb.png)

Use button roles for actions in the same space (overflow).
![Breadcrumb Accessibility Overflow](./assets/a11y-breadcrumb-overflow.png)

### Truncated text

![Breadcrumb Accessibility Truncated Text](./assets/a11y-breadcrumb-truncated-text.png)
