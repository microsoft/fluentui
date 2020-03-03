# Document a feature

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Website](#website)
- [Components](#components)
- [Props](#props)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

When creating a component, a special directory is created under the `docs/src/examples` location. Here you can develop different usage examples for your component that will appear in the [doc site][1].

Our docs are generated from doc block comments, `propTypes`, and hand written examples.

## Website

Developing against the doc site is a good way to try your component as you build it. Run the doc site with:

```sh
yarn start
```

## Components

A doc block should appear above a component class or function to describe it:

```tsx
/**
 * A <Select /> is sugar for <Dropdown selection />.
 * @see Dropdown
 */
function Select(props) {
  return <Dropdown {...props} selection />;
}
```

## Props

A doc block should appear above each prop in `propTypes` to describe them:

> Limited props shown for brevity.

```tsx
Label.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A label can reduce its complexity. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the label. */
  color: PropTypes.oneOf(Label._meta.props.color),

  /** Place the label in one of the upper corners . */
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(Label._meta.props.corner)]),

  /** Add an icon by icon className or pass an <Icon /> */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
```

## Examples

Usage examples for a component live in `docs/src/examples`. The examples follow the doc site examples (e.g. [button][1]).

Adding documentation for new components is a bit tedious. The best way to do this (for now) is to copy an existing
component's and update it.

[1]: https://microsoft.github.io/fluent-ui-react/components/button
