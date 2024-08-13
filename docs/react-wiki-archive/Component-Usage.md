## Overriding the rendered DOM element

Some components like the `<Link />` component allow you to override the rendered DOM node. This can be useful in cases where you want to control the rendered output.

The Link component has the following default behavior

```jsx
// This will render as an anchor as there is an href.
<Link href="https://www.github.com" />
```

```jsx
// Because there is no href this will render a button.
<Link onClick={() => alert('Hello')} />
```

If for some reason the above does not fit your usecase you can chose to override by proving a HTML tag name or a React Component.

Lets say your application would require Links to be rendered as `<Route />` elements.

```jsx
import { Route } from './router';

// Specify what to render by providing a Component
<Link as={Route} onClick={() => alert('Hello')} />;
```

If your link has complex children that also require onClick you might run into trouble when Fluent UI React renders a button as a child of a button. In that case you could override the HTML component of the parent by providing the `as` prop.

```jsx
// Specify what to render by providing an HTML tag name
<Link as="div" onClick={() => alert('Hello')}>
  <Link onClick={() => alert('World')}>World</Link>
</Link>
```
