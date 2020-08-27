# Breadcrumb FluentUI spec

A Breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.

## Prior Art/Examples <a href="#prior-art" id="prior-art"></a>

- [Ant Design](https://ant.design/components/breadcrumb/)
- [Bootstrap](https://getbootstrap.com/docs/4.3/components/breadcrumb/)
- [Auth0](https://styleguide.auth0.com/components/breadcrumb)
- [Atlas Kit](https://atlassian.design/components/breadcrumbs/examples)
- [Carbon](https://www.carbondesignsystem.com/components/breadcrumb/code/)
- [Fabric](https://developer.microsoft.com/en-us/fluentui#/controls/web/breadcrumb)
- [Lightning](https://www.lightningdesignsystem.com/components/breadcrumbs/)
- [Semantic UI](https://semantic-ui.com/collections/breadcrumb.html)
- [Material](https://material-ui.com/components/breadcrumbs/#breadcrumbs)

## API

### Props

## &lt;Breadcrumb&gt; Properties <a href="#breadcrumb-properties" id="breadcrumb-properties"></a>

| Attribute Name | Type                                     | Default Value | Description                                                                                 |     |
| -------------- | ---------------------------------------- | ------------- | ------------------------------------------------------------------------------------------- | --- |
| `items`        | `ShorthandValue<BreadcrumbItemProps>[]`  |               | A `BreadcrumbItem` collection of items to represent the current path within the application |     |
| `divider`      | `ShorthandValue<BreadcrumbDividerProps>` | `/`           | Represents the custom item to be used as divider between the `BreadcrumbItem`               |     |

## &lt;Breadcrumb.Item&gt; Properties <a href="#breadcrumbItem-line-properties" id="breadcrumbItem-line-properties"></a>

| Property Name | Type     | Default Value | Description                                                                      |
| ------------- | -------- | ------------- | -------------------------------------------------------------------------------- |
| `href`        | `string` |               | link to redirect when clicked in the item if not provided render an text element |
| `content`     | `string` |               | The text to be displayed.                                                        |

## &lt;Breadcrumb.Divider&gt; Properties <a href="#breadcrumb-divider-properties" id="breadcrumb-divider-properties"></a>

| Property Name | Type     | Default Value | Description                                       |
| ------------- | -------- | ------------- | ------------------------------------------------- |
| `icon`        | `custom` |               | The icon to be rendered as boundary for the items |

## Slots

| Name | Considerations         |
| ---- | ---------------------- |
| root | container for elements |

### Proposed React structure

#### Public usage

```tsx
<Breadcrumb divider="->" items={[
  {
    content: '',
    href: ''
  }
]}>

<Breadcrumb>
  <Breadcrumb.Item />
  <Breadcrumb.Divider />
  <Breadcrumb.Item />
</Breadcrumb>
```

#### Internal representation

```typescript
const Breadcrumb = () => (
  <nav class="breadcrumb-ui" aria-label="...">
    <ol>
      <li></li>
    </ol>
  </nav>
);

const BreadcrumbItem = () => <a></a>;

const BreadcrumbDivider = () => <span />;
```

### DOM structure

```html
<nav id="breadcrumb" class="breadcrumb-ui" aria-label="Breadcrumb">
  <ol>
    <li>
      <a class="breadcrumb-ui__item" href=""></a>
    </li>
    <li>
      <span class="breadcrumb-ui__divider"></span>
    </li>
    <li>
      <a class="breadcrumb-ui__item" href="" aria-current="page"></a>
    </li>
  </ol>
</nav>
```

### Screenreader accessibility:

- `aria-label` or `aria-labelledby` should be used in the root nav element to represent the breadcrumb trail making it a easy to locate navigation landmark.
- The link to the current page has `aria-current` set to page. If the element representing the current page is not a link, `aria-current` is optional.

### Keyboard interaction

The following is a set of keys that interact with the `Link` component:

| Key   | Description                          |
| ----- | ------------------------------------ |
| `tab` | Navigates beteween breadcrumb items. |
