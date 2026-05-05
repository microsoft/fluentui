## Advanced Configuration

### Child Window Rendering

When rendering on the main browser window, many components need access to `window` or `document` for applying styling, listening for events, or measuring things. However it is possible to render to child windows and elements hosted in `iframe` elements.

In these cases, the target element is hosted in a different context, and thus have a different `window` reference. To aid in providing components with the correct instances of `window` or `document`, React context can be used to provide the tree of React components with the correct instance.

#### Configuring rendering

We need to configure a renderer for `makeStyles()` and pass a `targetDocument` to `RendererProvider` & `FluentProvider`:

You can check complete example at [CodeSandbox](https://codesandbox.io/s/fluentuireact-components-render-into-iframe-l62ke).

### Media Queries Sorting

Fluent UI React v9 uses Griffel as CSS-in-JS to apply styles. To provide deterministic behavior, styles applied by Griffel [are sorted](https://griffel.js.org/react/guides/atomic-css#lvfha-order-of-pseudo-classes), the same applies to media queries. Fluent UI does not provide an opinionated default to sort media queries as the order may vary depending on the specific needs of the application.

To configure the sorting behavior, please pass `compareMediaQueries` function with the same signature as sort functions in e.g. `Array.prototype.sort`.

For mobile-first methodology, consider using [`sort-css-media-queries`](https://github.com/dutchenkoOleg/sort-css-media-queries):

### Content Security Policies (CSP)

To add `nonce` attribute need for [Content Security Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), please use `styleElementAttributes` to specify it:

### IdPrefixProvider

Having multiple applications using `FluentProvider` on a single web page can cause interop problems when they come from different bundles, more details in [microsoft/fluentui#26496](https://github.com/microsoft/fluentui/pull/26496).

### React 18

It's possible to handle id prefixing natively with React 18 using the [`createRoot`](https://react.dev/reference/react-dom/client/createRoot#parameters) API by configuring `identifierPrefix` on it:

### React 16 & 17

Adding the `IdPrefixProvider` component around the `FluentProvider` will resolve the issue of losing styling on components and IDs collisions in an application.

## References

- [https://griffel.js.org/react/api/create-dom-renderer](https://griffel.js.org/react/api/create-dom-renderer)
