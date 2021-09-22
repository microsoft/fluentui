# RFC: Asynchronously import hidden components

Driver: @czearing, @ecraig12345

(Background provided by @dzearing)

## Summary

When components such as `Tooltip` and `Menu` are not present in the DOM, expensive logic such as popper should be asynchronously imported to avoid bundle size related issues.

In experimental trials of using `React.lazy` it cut the `Tooltip` bundle size from **15.66 kB** to **3.77 kB** (both with gzip).

Before:
![46.05kB minified, 15.66kB gzip](https://i.imgur.com/hBbg3OE.png)

After:
![9.21kB minified, 3.77kB gzip](https://i.imgur.com/LrXqGcp.png)

This will help address the bundle size concerns of using these controls.

## Continuing the discussion

During v9, async imports were discussed but decided on being pushed to later due to other high priority issues that were blocking. This should be thoroughly looked into when the blocking issues are resolved which would likely be v10.

## Previously discussed concerns

While being investigated the prominent concerns that were mentioned had to do with:

1. We need to look at other partners and how they are splitting their code.
2. Some code splitting tools have issues with server side rendering.
3. How/can we support sync and async?

See the [pull request discussion](https://github.com/microsoft/fluentui/pull/19609) for more details about all of these concerns.

---

The remainder of this document is the original proposal, not incorporating various concerns that came up in the PR discussion.

## Background

In the past we've avoided the use of async imports to prescribe split points, because the technology was new, and bundlers didn't have strong support for it. We built a proprietary webpack plugin for managing re-aliasing. This was done before webpack supported async import split points, so that we could ensure the right files were aliased, rather than asking each partner to set this up. But (I believe) the only partner to take advantage of this plugin was OOUI. (Was very proprietary, not well documented, etc.) But now with async imports, we don't need plugins. With the new components being worked on and tools being modernized, we should revisit this issue.

If you don't know what they are; it is a way to asynchronously import source code. Bundlers use async imports as a cue for creating a split point in the bundle.

Read more about how React itself helps make this simple for components: https://reactjs.org/docs/code-splitting.html

## Problem statement

We have several scenarios where async imports would be beneficial for minimizing bundle size impact on our partners apps, especially for initial page load.

When a page loads, there is no need to load the code for `ContextualMenu` or positioning logic used by `Tooltip`/`Keytip`. That code should parse and initialize only when needed; when the user clicks a button to show a menu or hovers over an item that shows the `Tooltip`.

Currently, we are avoiding using our own components in meaningful places, with (unnecessary) concern of bundle bloat due to this issue.

Partners will likely do the same. (e.g. try to use `Tooltip`, find out they regressed 10k on initial paint impact and use an alternative solution.)

## Detailed Design or Proposal

Components such as `Tooltip` are split into 2 parts:

1. A synchronous tiny component

When a consumer imports `Tooltip`, they get the tiny part in their bundle which just registers handlers and logic to determine when the tooltip is visible.

```jsx
<>
{state.children}
{state.shouldRenderTooltip && (...)}
</>
```

2. A asynchronous heavy component

Once it becomes visible, we async import the actual `Tooltip` code, which in turn has graph edges to heavy things like `Popper` and styling.

```jsx
<Portal>
  <slots.root {...slotProps.root}>
    {state.pointing && <div ref={state.arrowRef} className={state.arrowClassName} />}
    <slots.content {...slotProps.content} />
  </slots.root>
</Portal>
```

### Example Implementation

```jsx
const RenderTooltipContent = React.lazy(() => import('./renderTooltipContent'));

export const renderTooltip = (state: TooltipState) => {
  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <React.Suspense fallback={null}>
          <RenderTooltipContent {...state} />
        </React.Suspense>
      )}
    </>
  );
};
```

We should consider async imports usage for things not initial-render-critical in converged components. All major bundlers support async imports. For scenarios where it does not such as AMD bundlers and old builds of webpack, partners are free to use a pre-bundle step to produce an AMD friendly bundle using a modern bundler.

### Pros and Cons

#### Pros

- When partners use the `Tooltip`, their main bundle size stays small, and the page load time hit is minimized by default.
- Components such as `Slider` can use the `Tooltip` directly without worrying as much about bundle impact.

#### Cons

- Partners who use old bundlers would potentially be affected.
  - We should avoid optimizing for old tech if there are way to work around it. Partners can stick on older builds, or pre-bundle the packages they want to use into an AMD compatible bundle. Without addressing this on their end, they're bound to hit this in other libraries. Azure does this currently.
