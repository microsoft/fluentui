# Headless Toast

A **headless** Toast + Toaster system powered by the same `@fluentui/react-toast` state machine
as the styled Fluent v9 implementation, but with zero built-in CSS — all visual design comes from you.

## How it works

| Concept         | Responsibility                                                          |
| --------------- | ----------------------------------------------------------------------- |
| State machine   | `@fluentui/react-toast` (shared with Fluent v9)                         |
| Rendering shell | `ToastContainer` — renders a `div[popover="manual"]` per active toast   |
| Positioning     | **Your CSS** — target `[popover="manual"]` or a custom wrapper          |
| Styling         | **Your CSS / Tailwind / CSS-in-JS** — applied to the dispatched content |

## Basic usage

```tsx
// 1. Mount the Toaster (usually near the app root)
<Toaster toasterId="app" />;

// 2. Dispatch from anywhere
const { dispatchToast } = useToastController('app');

dispatchToast(
  <div className="rounded-lg border bg-white p-4 shadow">
    <ToastTitle>Changes saved</ToastTitle>
    <ToastBody>Your file has been uploaded.</ToastBody>
  </div>,
  { intent: 'success', timeout: 4000 },
);
```

## Positioning toasts with CSS

Because `ToastContainer` uses the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API),
each toast is painted in the browser **top layer** outside the normal document flow.
Override the UA defaults to place toasts wherever you need:

```css
/* Bottom-end corner — adjust to taste */
[popover='manual'] {
  position: fixed;
  inset: auto 16px 16px auto; /* top right bottom left */
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
}
```

## Stacking & animation

Stacking multiple toasts (spacing them vertically) and entry / exit animations are **your responsibility**.
Common approaches:

- **CSS `@starting-style` + `transition`** for fade/slide animations
- **JS layout** — measure rendered popovers and offset each one by the height of the previous
- **A portal wrapper** — forgo `Toaster` and use `useToaster` from `@fluentui/react-toast` directly
  to render toasts inside a custom positioned container

## Context API

Sub-components (`ToastTitle`, `ToastBody`, `ToastFooter`) read from `ToastContext` automatically
when rendered inside dispatched content. Access the context yourself with `useToastContext()` to
build custom dismiss buttons without a dedicated `ToastTrigger`:

```tsx
const DismissButton = () => {
  const { requestOpenChange } = useToastContext();
  return <button onClick={e => requestOpenChange({ type: 'dismissClick', open: false, event: e })}>Dismiss</button>;
};
```
