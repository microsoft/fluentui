# Skeleton FluentUI spec

The Skeleton component is primarily leveraged to reserve a place in the layout for a content that will be shown asynchronous avoiding elements moving to adapt to new dimensions.

## Prior Art/Examples <a href="#prior-art" id="prior-art"></a>

- [Ant Design](https://ant.design/components/skeleton/)
- [Semantic UI](https://semantic-ui.com/elements/placeholder.html)
- [Fabric UI](https://developer.microsoft.com/en-us/fluentui#/controls/web/shimmer)
- [Vuetify](https://vuetifyjs.com/en/components/skeleton-loaders/)

## API

### Props

## &lt;Skeleton&gt; Properties <a href="#skeleton-properties" id="skeleton-properties"></a>

| Attribute Name | Type     | Default Value | Description                                                                                |
| -------------- | -------- | ------------- | ------------------------------------------------------------------------------------------ |
| `animation`    | `string` | `off`         | Define the animation for the Skeleton, possible "wave", "pulse" or "off" for no animation. |

## &lt;Skeleton.Line&gt; Properties <a href="#skeleton-line-properties" id="skeleton-line-properties"></a>

| Attribute Name | Type     | Default Value | Description                             |
| -------------- | -------- | ------------- | --------------------------------------- |
| `height`       | `string` | `100%`        | The height the line should fill.        |
| `width`        | `string` | `100%`        | The width the line should fill.         |
| `round`        | `bool`   | `false`       | Set whether should have rounded borders |

## &lt;Skeleton.Shape&gt; Properties <a href="#skeleton-shape-properties" id="skeleton-shape-properties"></a>

| Attribute Name | Type     | Default Value | Description                            |
| -------------- | -------- | ------------- | -------------------------------------- |
| `height`       | `string` | `0px`         | The height the line should fill.       |
| `width`        | `string` | `0px`         | The width the line should fill.        |
| `round`        | `bool`   | `false`       | Define if the shape should be a circle |

## Slots

| Name | Considerations         |
| ---- | ---------------------- |
| root | container for elements |

### Proposed React structure

#### Public usage

```TSX
<Skeleton />

<Skeleton>
  <Skeleton.Line />
  <Skeleton.Shape />
</Skeleton>
```

`Skeleton` would be used exclusively with children API.

#### Internal representation

```tsx
const Skeleton = () => <div>{children}</div>;

const SkeletonLine = () => <span />;

const SkeletonShape = () => <span />;
```

### DOM structure

```html
<div id="mySkeleton" class="skeleton-ui" aria-busy="true" role="alert" aria-live="polite">
    <span class="skeleton-ui__shape">
    <span class="skeleton-ui__line">
</div>
```

### Screenreader accessibility:

#### `root`:

Skeleton should be atomic and not have interactive elements inside, should be assigned a role="alert", aria-busy="true" to denotes that a widget is missing required owned element and aria-live="polite".

### Composition

_TBD_
