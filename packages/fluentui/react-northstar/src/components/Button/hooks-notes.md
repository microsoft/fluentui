# Testing Hooks Approach

## Surprises / Confusions

### Default Props

**Expected**: Did not expect any default props for `icon`, `loader`, or `content`.
**Actual**: The state returned from useButton wrapped all slots in spans via default props of `{ as: 'span' }`.
**Proposal**: Do not add default props for `as` unless required for base usage.

The intuition is also that there is no way to skip rendering these slots since there are always props defined.
There may be additional magic to capture this case, but it is not intuitive.

### mergeProps root vs top-level keys

When merging props, it was confusing that some keys (classes, styles) go under `root`, while other keys (children) to at the top-level of the object.
Since all these props are intended for the "root element", it is unintuitive to have to put them in two different places:

```jsx
mergeProps(state, {
  children: props.content, // <----------------------------
  dataFoo: 'works',
  root: {
    dataFoo: 'fail :(', // <----------------------------
  },
});
```

### mergeProps `children` is an object

**Expected**: To pass a string to the `children` "prop" in `mergeProps`
**Actual**: We need to pass an object since `children` is actually a props object for a child element and not the actual `children`.
**Proposal**: Keep the definition and behavior of `props.children` in mergeProps consistent with React's definition and behavior of children.

In order to render a string, we needed to defined props.children.children = 'my string'

```jsx
const myProps = {
  children: {
    // this slot is called 'content' in v0
    children: props.content, // children.children is extra weird
    className: classes.content,
    styles: resolvedStyles.content,
  },
};

mergeProps(state, myProps);
```

### Fix!

```jsx
<Button icon={<UserIcon />} iconPosition="end" content={<div>Yaya!</div>} />
```

We have these constraints:

- Children can never be an object, why? Must be valid React children
- Props objects passed to mergeProps should be identical to props objects spread on components
- Library should be able to render props.children in a helpful place in the template
- User must be able to redefine ALL children if they need to
