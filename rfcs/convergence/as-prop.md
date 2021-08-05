# RFC: Simplify handling of `as` prop

---

@layershifter @levithomason @ling1726

## Summary

Restrict `as` prop to accept only HTML elements due issues with typings and problems with developer experience.

## Typings problem

Fluent UI components should support `as` prop to allow consumers to customize HTML tags, it's especially useful for components like `Text`:

```tsx
<>
  {/* renders <span /> */}
  <Text />
  {/* renders <p /> */}
  <Text as="p" />
</>
```

However, currently components can accept `React.ElementType` in [`as` prop](https://github.com/microsoft/fluentui/blob/7f5086718eec496063c6830302c162117fcfc4ec/packages/react-utilities/src/compose/types.ts#L15):

```tsx
<Button as={Link} /> // renders <Link /> + additional props
```

These usages are a nightmare for typings since we must use really complicated generics in order to guarantee type safety ([`ComponentWithAs`](https://github.com/microsoft/fluentui/blob/c27c8fa7ae589a61267bd0a6f0f1c7a49a6be9c2/packages/react-compose/src/types.ts#L21)) and support polymorphism. There are few similar implementations:

- [react-polymorphic-box](https://github.com/kripod/react-polymorphic-box)
- [forwardRefWithAs from Reach UI](https://github.com/reach/reach-ui/blob/e1a6fba7042e1e023c4a3a4e7c15a13225500667/packages/utils/src/index.tsx#L191-L199)

Anyway, with these generics our component can still throw on unsupported props:

```tsx
// ✅ TS compiler will throw an error because "someProp" is not supported by "Button" and "Link"
<Button as={Link} someProp />
```

But, it still creates problems for customers when they will decide to compose our components:

```tsx
// Uses a React HOC to control rendering
// https://reactjs.org/docs/react-api.html#reactmemo
const MemoButton = React.memo(Button);

// ⚠ It should be enough for customers to use "ButtonProps", but "ComponentWithAs" requires different typings
function PrimaryButton(props: ButtonProps) {
  return <Button {...props} primary />;
}

function App() {
  return (
    <>
      {/* ✅ TS throws as "href" is not supported for "div" elements */}
      <Button as="div" href="#" />
      {/* no errors 🤷‍♂️ */}
      <MemoButton as="div" href="#" />

      {/* 💣 "as" and appropriate props are created by "ComponentWithAs" generic */}
      {/*     thus are not inside "ButtonProps" interface */}
      <PrimaryButton as="div" />
      <PrimaryButton type="submit" />
    </>
  );
}
```

**Retrospective note:** It was required to support React elements in `as` prop for [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) due requirements to HTML markup:

```tsx
<>
  {/* ✅ will render a proper markup expected by CSS styling */}
  {/* <div class="ui sidebar menu"/> */}
  <Sidebar as={Menu} />

  {/* ❌ styles will be different in this case */}
  {/* <div class="ui sidebar"><div class="ui menu" /></div> */}
  <Sidebar>
    <Menu />
  </Sidebar>
</>
```

On Fluent side we don't have such restrictions from styling system.

## Event handlers problem

_It's a real scenario from Teams._

Without this change we know that in `as` we can get a memoized component that forces us memoize event handlers:

```tsx
function Button() {
  // 💣 Oops, this will break memoized input, should be wrapped with React.useCallback()
  const handleClick = () => {};

  return <Element onClick={handleClick} />;
}

<Button as={MemoEl} />;
```

This can be extremely tricky for us and customers with hooks approach as they may not be aware of these requirements:

```tsx
function useButton(state) {
  state.onClick = React.useCallback(/* some code */);
}
function useCustomButton(state) {
  // 💣 this is not memoized anymore
  state.onClick = () => {
    state.onClick();
    /* some custom interactions */
  };
}
```

If `as` cannot accept React elements, there will be no need to memoize callbacks since it does not matter for primitive elements.

## Accessibility problem

Another problem is related to accessibility handling as we need to override attributes or key handling based on a passed element, for example:

```tsx
<>
  {/* renders <button /> */}
  <Button />
  {/* renders <div role="button" /> */}
  <Button as="div" />
</>
```

```ts
// A pseudocode to show possible logic
if (props.as !== 'button') {
  state.role = 'button';
}
```

However, if user passes a React component we won't know the HTML tag before rendering it:

```tsx
// 🤔 What does "SomeComponent" render?!
<Button as={SomeComponent} />
```

To solve this we can use tag detection in effects (like [Reakit does](https://github.com/reakit/reakit/blob/a211d94da9f3b683182568a56479b91afb1b85ae/packages/reakit/src/Button/Button.ts#L34-L39)), but it will cause a double render for `<Button as="div" />`:

- render a component
- resolve effects: check tagName and apply roles if needed, trigger an update
- render a component again

## Detailed Design or Proposal

Restrict `as` to HTML tags:

```diff
-  as?: React.ElementType;
+  as?: keyof JSX.IntrinsicElements;
```

With this change it will only be possible to pass HTML tags to the `as` prop:

```tsx
<>
  {/* ✅ renders <span /> */}
  <Text as="span" />
  {/* ❌ throws a compiler error */}
  <Button as={Link} />
</>
```

Scenarios with React elements are not so frequent, in this case is proposed to compose components instead:

```tsx
function LinkButton(props: ButtonProps & LinkProps) {
  // ⚠️ "components" are not support in hooks API yet, this will be covered in a separate RFC
  const { state, render } = useButton({
    components: { root: Link },
  });

  return render(state);
}
```

### Pros and Cons

- 👍 No need to memoize callbacks
- 👍 Simplify typings

- 👎 Makes `<Button as={Link} />` scenario harder

## Discarded Solutions

NA

## Open Issues

NA
