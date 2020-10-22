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

10/20/2020 Iteration

### mergeProps - Break this down into using existing utils and patterns to merge objects, only the user knows what needs to be done.
- Spread for shallow
- CX for class name concat
- Any deep util for deep merges

Problems we ran into with magic mergeProps function:
- Name of prop isn't enough to know how to merge it (className might be PropTypes or simply a user config, not HTML class)
- Trying to code our way out of doing the wrong thing is more complex than custom merging props objects
- Drilling into JSX / children
- When and how to wrap callback props and what logic should be in there
- Infinite loops, mutating deep merges require keeping a stack  
```jsx
      // Heads Up!
      // We encounter className as a key of propTypes but it is a checker fn
      // Do not stringify function values, check that val is not a checker function.
      // TODO: We actually never can know which `className` keys are safe to merge.
      //       The key alone is not enough to know that it is an HTML className attribute that needs merged.
      //       It could be some config for example, at any level of the tree.
```

We should try allowing only shorthand props objects to simplify conversion of prop values and expectations.
This will remove a lot of complexity and code on our end.
Also, we see in the wild most ppl use props objects anyway.
Finally, it is highly unlikely that you need to pass just one prop which is aliased to the correct key for you.
Typically, you need to pass many props so you cannot use shorthand literals anyways.

### defaultProps in hooks
A component and its author owns defaultProps for a component.
They alone should be responsible for merging defaults into props.
This means a hook should not take in "author's defaults" and try to merge them since it will get the logic wrong.
The hook only needs to return the state it defines, the other author can merge defaults into the state. 