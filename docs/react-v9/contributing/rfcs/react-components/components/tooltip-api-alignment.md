# RFC: Align API of Tooltip component to allow composition

[@layershifter](https://github.com/layershifter)

## Summary

This RFC proposes API changes to `Tooltip` component. The goal is to unblock composition of components that follow "trigger" pattern.

## Background

In Fluent UI React v9 we have "trigger" pattern that is used in components that usually render out of DOM render (popovers, menus, dialogs). The snippet below shows a usage of `Menu` component:

```tsx
function App() {
  return (
    <Menu>
      <MenuTrigger>
        <button />
      </MenuTrigger>
      <MenuList />
    </Menu>
  );
}
```

`Popover` component also follow this pattern. Keynotes from an example above:

- `Menu` (_aka_ host component) manages connection between `*Trigger` and content (in this case `MenuList`) & controls state
- `MenuTrigger` (_aka_ trigger) clones a passed React element and adds additional handlers

`Tooltip` component also follows "trigger" pattern, but the implementation is more similar to what we have in Fluent UI React Northstar as it does not have _"host" <-> "trigger" <-> "content"_ connection:

```tsx
function App() {
  return (
    <Tooltip>
      <button />
    </Tooltip>
  );
}
```

## Problem statement

We noticed in [microsoft/fluentui#21115](https://github.com/microsoft/fluentui/issues/21115) that we have a problem with composition of components that are using "trigger" pattern:

```tsx
function App() {
  return (
    <Menu>
      <Tooltip content="Some content">
        <MenuTrigger>
          <button>Opens only a tooltip</button>
        </MenuTrigger>
      </Tooltip>
    </Menu>
  );
}
```

In the snippet above consumers are trying to have a menu and a tooltip on the same React element, but they are not able to do it. [microsoft/fluentui#21225](https://github.com/microsoft/fluentui/pull/21225) proposes a solution to solve that issue and relies on a waterfall model to pass props & handlers down:

```tsx
function App() {
  return (
    //  1️⃣ "Tooltip":
    //      - clones its trigger ("MenuTrigger")
    //      - adds custom handlers/props to a trigger
    <Tooltip content="Some content">
      {/* 2️⃣ "MenuTrigger": */}
      {/*    - clones its trigger ("button") */}
      {/*    - adds custom handlers/props to a trigger */}
      {/*    - ⚠️ merges and passes down all props passed to it */}
      <MenuTrigger>
        <button />
      </MenuTrigger>
    </Tooltip>
  );
}
```

In this case props that are needed are passed down from `Tooltip` to `button` and everything works like a charm 💎

```tsx
function App() {
  return (
    //  1️⃣ "MenuTrigger":
    //      - clones its trigger ("Tooltip")
    //      - adds custom handlers/props to a trigger
    <MenuTrigger>
      {/* 2️⃣ "Tooltip": */}
      {/*    - clones its trigger ("button") */}
      {/*    - adds custom handlers/props to a trigger */}
      {/*    - ⚠️ props passed to "Tooltip" are passed to "div" that wraps content */}
      <Tooltip content="Some content">
        <button />
      </Tooltip>
    </MenuTrigger>
  );
}
```

The snippet above looks almost the same as a previous, but it does not work 🙃 `Tooltip` passes props to `div` instead of a trigger, so `Menu` will be coupled with tooltip's content instead of a trigger.

This highlights the major difference in APIs between `Tooltip` and other `*Trigger`s:

```tsx
function App() {
  return (
    <>
      {/* "MenuTrigger" does not accept DOM props by typings, but will pass them to a trigger */}
      <MenuTrigger onClick={() => {}} />
      {/* "Tooltip" accepts DOM props and will pass them to "div" that wraps "content" */}
      <Tooltip onClick={() => {}} />
      {/* "content" on "Tooltip" is not a real slot, it's "React.ReactNode" */}
      <Tooltip content="Some content" />
    </>
  );
}
```

## Detailed Design or Proposal

The proposal is to update API shape of `Tooltip`:

- turn `content` to a real slot
- do not accept DOM props in TS interface

```tsx
function App() {
  return (
    <>
      {/*  Before */}
      <Tooltip content="Foo" />
      <Tooltip content="Foo" className="bar" />

      {/* After */}
      <Tooltip content="Foo" />
      <Tooltip content={{ children: 'Foo', className: 'bar' }} />
      {/*      👆 if "className" will passed directly to "Tooltip" we will get a TS error */}
    </>
  );
}
```

These changes were prototyped in [microsoft/fluentui#21245](https://github.com/microsoft/fluentui/pull/21245) (_CI is green_ 🟢) and reuse shared functionality introduced in [microsoft/fluentui#21225](https://github.com/microsoft/fluentui/issues/21225).

### Pros and Cons

- 👍 API alignment, `content` becomes a real slot
- 👍 composition works

## Discarded Solutions

Another option is to convert `Tooltip` to follow _"host" <-> "trigger" <-> "content"_:

```tsx
// ⚠️ not a real proposal
function App() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button />
      </TooltipTrigger>
      <TooltipContent />
    </Tooltip>
  );
}
```

But this will make API too verbose and complicated to use for composition.

## Open Issues
