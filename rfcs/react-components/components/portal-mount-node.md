# RFC: Extend `mountNode` prop in `Portal`

[@layeshifter](https://github.com/layershifter)

## Summary

This RFC proposes extending the `mountNode` prop in the `Portal` component and its underlying components such as `Tooltip` and `Popup` to accept an object.

## Background

The `Portal` component has a `mountNode` prop that allows customizing the element to which the `Portal` will be attached. However, there is no way to customize classes applied to that element. Customization is needed to apply styles such as custom `z-index`es. We need to be able to customize the `mountNode` element to apply this type of custom styles ([microsoft/fluentui#26758](https://github.com/microsoft/fluentui/issues/26758)).

## Problem statement

Currently, there is no way to customize classes applied to that element.

## Detailed Design or Proposal

The proposal is to allow passing objects to the `mountNode` prop. This can be achieved by extending the `mountNode` prop to accept an object, which can be one of the following:

```tsx
function App() {
  return (
    <>
      {/* Current usage, already exists */}
      <Portal mountNode={element} />

      {/* Proposed usages */}
      <Portal mountNode={element} />
      <Portal mountNode={{ element }} />
      <Portal mountNode={{ className: 'foo' }} />
    </>
  );
}
```

### Pros and Cons

- 👍 Similar to `positioning` prop.
- 👍 Not a breaking change.
- 👎 May create the impression that `mountNode` is a slot.

## Discarded Solutions

### Deprecate `mountNode`, add `portal` prop

```tsx
function App() {
  return (
    <>
      <Portal portal={element} />
      <Portal portal={{ element }} />
      <Portal portal={{ className: 'foo' }} />
    </>
  );
}
```

### Pros and Cons

- 👍 Similar to the `positioning` prop.
- 👎 Can create an impression that `portal` is a slot.
- 👎 Creates a breaking change in the future.
- 👎 `<Portal portal={element} />` is not obvious as `<Portal mountNode={element} />`.

### Add `mountNodeClassName` prop

```tsx
function App() {
  return (
    <>
      {/* Current usage, already exists */}
      <Portal mountNode={element} />

      {/* Proposed usages */}
      <Portal mountNode={element} mountNodeClassName="foo" />
    </>
  );
}
```

### Pros and Cons

- 👎 Does not scale: what if we will need to add another property to manage?
