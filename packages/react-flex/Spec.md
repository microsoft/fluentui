# Flex

## Background

Flex is a container-type component with the strict purpose of abstracting the implementation of a CSS flexbox in order to define the layout of its children components.

## Prior Art

Although layout seems to vary highly between the currently available component libraries, a consensus was reached through Open UI research over what Flex is and what current examples of approaches in different design systems.
You can see the published research [here](https://open-ui.org/components/flex.research) and the discussion [here](https://github.com/WICG/open-ui/pull/264).

Convergence tracking history can be found on [this](https://github.com/microsoft/fluentui/issues/16791) Github epic

## Comparison of [Stack](https://developer.microsoft.com/en-us/fluentui#/controls/web/stack) and [Flex](https://fluentsite.z22.web.core.windows.net/0.52.0/components/flex)

The immediate difference between Fluent UI React (Stack) and Northstar (Flex) is the default orientation.
While Flex opts to be exclusively an abstraction of CSS flexbox, Stack works like a pile by default (top to bottom, left to right) but offering the same features as Flex.
Below is a table of prop comparison:

### Stack/Flex

| Purpose                                                                                  | Stack                  | Flex        | Matching                  |
| ---------------------------------------------------------------------------------------- | ---------------------- | ----------- | ------------------------- |
| Wrapping of the items                                                                    | `wrap`                 | `wrap`      | matching                  |
| Padding of the container                                                                 | `padding`              | `padding`   | matching                  |
| Override of the component to render                                                      | `as`                   | `as`        | matching                  |
| Additional CSS class name(s) to apply                                                    | extends `HTMLElement`  | `className` | matching                  |
| Additional CSS styles to apply to the component instance                                 | extends `HTMLElement`  | `styles`    | matching                  |
| Horizontal alignment                                                                     | `horizontalAlign`      | `hAlign`    | different naming          |
| Vertical alignment                                                                       | `verticalAlign`        | `vAlign`    | different naming          |
| Grow the items to fill to the parent's size                                              | `verticalFill`         | `fill`      | different naming          |
| Defines the spacing between children                                                     | `childrenGap`          | `gap`       | different naming          |
| Defines the spacing between children                                                     | `gap` [DEPRECATED]     | -           | _See `childrenGap`/`gap`_ |
| Override for theme site variables to allow modifications of component styling via themes | through `IStackTokens` | `variables` | different naming          |
| Reverse the direction                                                                    | `reversed`             | -           | Flex missing              |
| Defines how much to grow the container in proportion to its siblings                     | `grow`                 | -           | Flex missing              |
| Prevents children from shrinking to fit the available space                              | `disableShrink`        | -           | Flex missing              |
| Defines the maximum height that the container can take                                   | `maxHeight`            | -           | Flex missing              |
| Defines the maximum width that the container can take                                    | `maxWidth`             | -           | Flex missing              |
| Show gray backgrounds to debug positioning                                               | -                      | `debug`     | Stack missing             |
| Defines strategy for distributing remaining space between items                          | -                      | `space`     | Stack missing             |
| Defines if container should be inline element                                            | -                      | `inline`    | Stack missing             |
| Changing the direction                                                                   | `horizontal`           | `column`    | opposite                  |
| -                                                                                        | -                      | `design`    | -                         |

### StackItem/FlexItem

| Description                                                                              | Stack                  | Flex                         | Matching         |
| ---------------------------------------------------------------------------------------- | ---------------------- | ---------------------------- | ---------------- |
| Controls item's alignment                                                                | `align`                | `align`                      | matching         |
| Defines how much to grow the item in proportion to its siblings                          | `grow`                 | `grow`                       | matching         |
| Defines at what ratio should the item shrink to fit the available space                  | `shrink`               | `shrink`                     | matching         |
| Additional CSS class name(s) to apply                                                    | `className`            | `className`                  | matching         |
| Additional CSS styles to apply to the component instance                                 | extends `HTMLElement`  | `styles`                     | matching         |
| Override for theme site variables to allow modifications of component styling via themes | through `IStackTokens` | `variables`                  | different naming |
| Defines a custom order for the item                                                      | `order`                | -                            | Flex missing     |
| Defines whether the item should be prevented from shrinking                              | `disableShrink`        | -                            | Flex missing     |
| Defines whether the item should take up 100% of the height of its parent                 | `verticalFill`         | -                            | Flex missing     |
| Push item towards opposite side in the container's direction                             | -                      | `push`                       | Stack missing    |
| Defines the flex-basis for the item                                                      | -                      | `size`                       | Stack missing    |
| -                                                                                        | -                      | `flexDirection` [DEPRECATED] | -                |
| -                                                                                        | -                      | `design`                     | -                |

## API proposal

<!-- link to the component's `.types.ts` file -->

### Flex

| Name              | Type                                                                                                  | Default value | Comments                                                                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `direction`       | string = "`row`", "`row-reverse`", "`column`", "`column-reverse`"                                     | "`row`"       | To further cement the idea of Flex being an abstraction of flexbox, this would bring the user to a closer experience of flexbox while also being less biased on our interpretation of the default direction. Absorbs Stack's `reversed`. |
| `horizontalAlign` | string (_see [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#values)_) | "`normal`"    | This name gives the user a more verbose and easily recognizable idea for what the prop does. Absorbs Flex's `space`.                                                                                                                     |
| `verticalAlign`   | string (_see [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items#values)_) | "`normal`"    | _see `horizontalAlign`'s comments._                                                                                                                                                                                                      |
| `gap`             | string (_see [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin#values)_)               | `0`           | `margin` setter for each of the children items.                                                                                                                                                                                          |
| `wrap`            | boolean                                                                                               | `false`       | Interfaces are already aligned. Simplification of `flex-wrap`.                                                                                                                                                                           |
| `as`              | `React.ElementType<React.HTMLAttributes<HTMLElement>>`                                                | "`div`"       | Perserving same implementation.                                                                                                                                                                                                          |
| `grow`            | boolean \| number \| string = "`inherit`", "`initial`", "`unset`"                                     | `0`           | Focusing again on abstracting, `grow` will affect all the FlexItem's `flex-grow` styles. A `true` value will translate into `1` for ease of use and retro-compatibility with Stack.                                                      |
| `shrink`          | boolean \| number \| string = "`inherit`", "`initial`", "`unset`"                                     | `1`           | Like `grow`, we're wrapping the item's `flex-shrink` with the `shrink` prop . A `true` value will translate into `1` for ease of use and coherence.                                                                                      |
| `inline`          | boolean                                                                                               | `false`       | Abstracts `display` by changing from `flex` to `flex-inline`. Same as the current Flex.                                                                                                                                                  |

#### _Deprecating_

| Original Component | Name                   | Comments                                                                                                                                                                                 |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack              | `reversed`             | Reversing is now done through the new `flex-direction` wrapper, the `direction` property.                                                                                                |
| Stack              | `disableShrink`        | Converted into a wrapper of `flex-shrink` for consistency and simplification.                                                                                                            |
| Stack              | `maxHeight`/`maxWidth` | Removed as this should be defined through a class/style override.                                                                                                                        |
| Stack              | `verticalFill`         | Redundant. Same as a style override of `height: 100%`.                                                                                                                                   |
| Stack/Flex         | `padding`              | Already extended from `HTMLElement`, we can avoid redundancy by leveraging the native prop here.                                                                                         |
| Flex               | `space`                | Given that `horizontalAlign` and `verticalAlign` are abstractions of `align-items` and `justify-content` respectively, spacing can now be defined through them instead of overriding it. |
| Flex               | `debug`                | Only helpful for development phases, extra layer of maintenance with a small added benefit to the user. User can alternatively use style overrides for the same effect.                  |
| Flex               | `fill`                 | Redundant. Same as a style override of `height: 100%; width: 100%`.                                                                                                                      |

### FlexItem

| Name     | Type                                                                                            | Default value | Comments                                                                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `align`  | string (_see [align-self](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self#values)_) | "`auto`"      | Abstraction of `align-self`.                                                                                                                             |
| `grow`   | boolean \| number \| string = "`inherit`", "`initial`", "`unset`"                               | `0`           | Abstraction of `flex-grow` and override of Flex's `grow`. A `true` value will translate into `1` for ease of use and retro-compatibility with Stack.     |
| `shrink` | boolean \| number \| string = "`inherit`", "`initial`", "`unset`"                               | `1`           | Abstraction of `flex-shrink` and override of Flex's `shrink`. A `true` value will translate into `1` for ease of use and retro-compatibility with Stack. |
| `push`   | boolean                                                                                         | `false`       | Defines an auto margin depending on the flex direction. Kept for retro-compatibility but perhaps can be removed.                                         |
| `basis`  | string (_see [flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis#values)_) | "`auto`"      | For clarity, renaming of v0 Flex's `size` prop to `basis`.                                                                                               |
| `order`  | number                                                                                          | `0`           | Abstraction of `order`.                                                                                                                                  |

#### _Deprecating_

| Original Component | Name            | Comments                                               |
| ------------------ | --------------- | ------------------------------------------------------ |
| StackItem          | `disableShrink` | Extraneous prop given the existance of `shrink`.       |
| StackItem          | `verticalFill`  | Redundant. Same as a style override of `height: 100%`. |
| FlexItem           | `size`          | Renamed to `basis`.                                    |

## Sample Code

### Basic

```HTML
<Flex>
 <span>1</span>
 <span>2</span>
</Flex>
```

### Direction

```HTML
<Flex direction="column-reverse">
  <span>bottom</span>
  <span>top</span>
</Flex>
```

### Alignment

```HTML
<Flex verticalAlign="center">
  <span>vertically centered</span>
  <span>vertically centered</span>
</Flex>
```

```HTML
<Flex horizontalAlign="center">
  <span>horizontally centered</span>
  <span>horizontally centered</span>
</Flex>
```

### Spacing

```HTML
<Flex gap="5rem">
  <span>5rem around me</span>
  <span>5rem around me</span>
</Flex>
```

### Wrapping

```HTML
<Flex wrap>
  <span>1</span>
  <span>2</span>
</Flex>
```

### Order

```HTML
<Flex>
  <span>2</span>
  <span order={1}>1</span>
</Flex>
```

### Growing

#### Globally

```HTML
<Flex grow>
  <span>wide</span>
  <span>wide</span>
</Flex>
```

#### Individually

```HTML
<Flex>
  <span>thin</span>
  <span grow>wide</span>
</Flex>
```

### Shrinking

#### Globally

```HTML
<Flex shrink={false}>
  <span>wide</span>
  <span>wide</span>
</Flex>
```

#### Individually

```HTML
<Flex>
  <span>thin</span>
  <span shrink={false}>wide</span>
</Flex>
```

### Complex example

```HTML
<Flex
  as="section"
  direction="row-reverse"
  horizontalAlign="space-between"
  verticalAlign="center"
  gap="5rem"
  wrap grow inline>
  <span order={3}>3</span>
  <span shrink={false}>1</span>
  <span basis="25%">2</span>
</Flex>
```

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

### _Migration from v8_

#### Stack

##### `disableShrink`

Renamed from `disableShrink` to `shrink`

Before

```HTML
<Stack disableShrink>
 items
</Stack>
```

After

```HTML
<Flex shrink="0">
  items
</Flex>
```

```HTML
<Flex shrink={false}>
  items
</Flex>
```

##### `horizontal`

Before

```HTML
<Stack horizontal>
 items
</Stack>
```

After

```HTML
<Flex>
  items
</Flex>
```

##### `childrenGap`

Renamed from `childrenGap` to `gap`

##### `reversed` [DEPRECATED]

Before

```HTML
<Stack reversed>
 items
</Stack>
```

Alternative

```HTML
<Flex direction="column-reverse">
  items
</Flex>
```

##### `maxHeight` [DEPRECATED]

Before

```HTML
<Stack maxHeight="30px">
 items
</Stack>
```

Alternative

```HTML
<Flex style={{maxHeight:"30px"}}>
  items
</Flex>
```

##### `maxWidth` [DEPRECATED]

Before

```HTML
<Stack maxWidth="30px">
 items
</Stack>
```

Alternative

```HTML
<Flex style={{maxWidth:"30px"}}>
  items
</Flex>
```

##### `verticalFill` [DEPRECATED]

Before

```HTML
<Stack verticalFill>
 items
</Stack>
```

Alternative

```HTML
<Flex style={{height: "100%"}}>
  items
</Flex>
```

##### `padding` [DEPRECATED]

#### StackItem

##### `disableShrink`

Renamed from `disableShrink` to `shrink`

Before

```HTML
<Stack>
 <Stack.Item grow>item</StackItem>
 <Stack.Item grow disableShrink>item</StackItem>
</Stack>
```

After

```HTML
<Flex>
  <Flex.Item grow>item</Flex.Item>
  <Flex.Item grow shrink="0">item</Flex.Item>
</Flex>
```

```HTML
<Flex>
  <Flex.Item grow>item</Flex.Item>
  <Flex.Item grow shrink={false}>item</Flex.Item>
</Flex>
```

##### `verticalFill` [DEPRECATED]

Before

```HTML
<Stack>
 <Stack.Item verticalFill>item</Stack.Item>
</Stack>
```

Alternative

```HTML
<Flex>
 <Flex.Item style={{height: "100%"}}>item</Flex.Item>
</Flex>
```

### _Migration from v0_

#### Flex

##### `column`

Before

```HTML
<Flex column>
 items
</Flex>
```

After

```HTML
<Flex direction="column">
  items
</Flex>
```

##### `hAlign`

Renamed from `hAlign` to `horizontalAlign`

##### `vAlign`

Renamed from `vAlign` to `verticalAlign`

##### `debug` [DEPRECATED]

Before

```HTML
<Flex debug>
 items
</Flex>
```

Alternative

```HTML
<Flex style={{
  border: "1px dotted grey",
  background: "lightgrey"
}}>
  items
</Flex>
```

##### `fill` [DEPRECATED]

Before

```HTML
<Flex fill>
 items
</Flex>
```

Alternative

```HTML
<Flex style={{
  height: "100%",
  width: "100%"
}}>
  items
</Flex>
```

##### `padding` [DEPRECATED]

Before

```HTML
<Flex padding="5px">
 items
</Flex>
```

Alternative

```HTML
<Flex style={{ padding: "5px" }}>
  items
</Flex>
```

##### `space` [DEPRECATED]

Before

```HTML
<Flex space="around">
 items
</Flex>
```

Alternative

```HTML
<Flex horizontalAlign="space-around">
  items
</Flex>
```

#### FlexItem

##### `size`

Renamed from `size` to `basis`
