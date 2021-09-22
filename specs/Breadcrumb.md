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

## Props

## &lt;Breadcrumb&gt; Properties <a href="#breadcrumb-divider-properties" id="breadcrumb-divider-properties"></a>

| Property Name | Type   | Default Value | Description         |
| ------------- | ------ | ------------- | ------------------- |
| `size`        | `enum` | `medium`      | The Breadcrumb size |

## &lt;Breadcrumb.Divider&gt; Properties <a href="#breadcrumb-divider-properties" id="breadcrumb-divider-properties"></a>

| Property Name | Type             | Default Value | Description                                          |
| ------------- | ---------------- | ------------- | ---------------------------------------------------- |
| `content`     | `ShorthandValue` | `/`           | The content to be rendered as boundary for the items |

## Slots

| Name | Considerations         |
| ---- | ---------------------- |
| root | container for elements |

### Proposed React structure

#### Public usage

```jsx
<Breadcrumb>
  <Breadcrumb.Item />
  <Breadcrumb.Divider />
  <Breadcrumb.Item />
</Breadcrumb>
```

#### Internal representation

```jsx
const Breadcrumb = () => (
  <nav role="navigation" class="breadcrumb-ui" aria-label="...">
    <div role="list">{children}</div>
  </nav>
);

const BreadcrumbItem = () => <div role="listitem">{children}</div>;

const BreadcrumbDivider = () => <span aria-hidden="true">{children}</span>;
```

`Breadcrumb` will support only `children` api.

### DOM structure

```html
<nav id="breadcrumb" class="breadcrumb-ui" aria-label="Breadcrumb">
  <div role="list">
    <div role="listitem" class="breadcrumb-ui__item"></div>
    <span aria-hidden="true" class="breadcrumb-ui__divider"></span>
    <div role="listitem" class="breadcrumb-ui__item"></div>
  </div>
</nav>
```

### Screenreader accessibility:

- `aria-label` or `aria-labelledby` should be used in the root nav element to represent the breadcrumb trail making it a easy to locate navigation landmark.
- The link to the current page has `aria-current` set to page. If the element representing the current page is not a link, `aria-current` is optional.

### Keyboard interaction

The following is a set of keys that interact with the `Link` component:

| Key   | Description                         |
| ----- | ----------------------------------- |
| `tab` | Navigates between breadcrumb items. |
