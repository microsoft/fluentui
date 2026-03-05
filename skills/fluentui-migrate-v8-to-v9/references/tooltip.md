# Tooltip Migration

## Architecture Change

In v8, `Tooltip` wraps its trigger child and the child does **not** need to be a `forwardRef` component.

In v9, the child of `Tooltip` **is** the trigger and **must** be able to accept a `ref` — meaning it must be either a native DOM element or a component wrapped with `React.forwardRef`. The trigger child automatically receives the necessary ARIA attributes.

## Before / After Example

### Before

```tsx
import { Tooltip, DirectionalHint } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react';

<Tooltip content="This button deletes the item" directionalHint={DirectionalHint.bottomCenter}>
  <DefaultButton text="Delete" />
</Tooltip>;
```

### After

```tsx
import { Tooltip, Button } from '@fluentui/react-components';

<Tooltip content="This button deletes the item" relationship="description" positioning="below">
  <Button>Delete</Button>
</Tooltip>;
```

## `relationship` Prop (required — no v8 equivalent)

The `relationship` prop controls the ARIA semantics of the tooltip:

| `relationship`   | Effect                                          | When to use                                         |
| ---------------- | ----------------------------------------------- | --------------------------------------------------- |
| `"description"`  | Adds `aria-describedby` pointing to the tooltip | Tooltip adds context to an already-labelled element |
| `"label"`        | Adds `aria-labelledby` pointing to the tooltip  | Tooltip IS the accessible name (icon-only buttons)  |
| `"inaccessible"` | No ARIA wiring                                  | Purely decorative tooltips                          |

**Important:** For icon-only buttons where the tooltip is the accessible name, use `relationship="label"` and remove `aria-label` from the button.

## DirectionalHint → positioning

| v8 `DirectionalHint` | v9 `positioning`  |
| -------------------- | ----------------- |
| `topCenter`          | `"above"`         |
| `topLeftEdge`        | `"above-start"`   |
| `topRightEdge`       | `"above-end"`     |
| `topAutoEdge`        | `"above"`         |
| `bottomCenter`       | `"below"`         |
| `bottomLeftEdge`     | `"below-start"`   |
| `bottomRightEdge`    | `"below-end"`     |
| `bottomAutoEdge`     | `"below"`         |
| `leftCenter`         | `"before"`        |
| `leftTopEdge`        | `"before-top"`    |
| `leftBottomEdge`     | `"before-bottom"` |
| `rightCenter`        | `"after"`         |
| `rightTopEdge`       | `"after-top"`     |
| `rightBottomEdge`    | `"after-bottom"`  |

## Icon-only Button Tooltip

```tsx
// v8 — title prop or Tooltip wrapping
import { IconButton } from '@fluentui/react';
<IconButton iconProps={{ iconName: 'Delete' }} title="Delete item" />;

// v9 — use Tooltip with relationship="label"
import { Tooltip, Button } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';

<Tooltip content="Delete item" relationship="label">
  <Button icon={<DeleteRegular />} />
</Tooltip>;
```

**Do not** add both `aria-label` and `relationship="label"` — that creates duplicate labelling.

## Tooltip on a Custom Component

If wrapping a custom component that does not forward `ref`, use `React.forwardRef`:

```tsx
// v9 — custom trigger component must forward ref
const MyTrigger = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button ref={ref} {...props} />
));

<Tooltip content="Tooltip on custom component" relationship="description">
  <MyTrigger>Custom trigger</MyTrigger>
</Tooltip>;
```

## Controlled Visible State

```tsx
// v9 — show/hide programmatically
const [visible, setVisible] = React.useState(false);

<Tooltip
  content="Programmatic tooltip"
  relationship="description"
  visible={visible}
  onVisibleChange={(_, data) => setVisible(data.visible)}
>
  <Button onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>
    Focus me
  </Button>
</Tooltip>;
```

## ITooltipProps → TooltipProps

| v8                     | v9                         | Notes                                                 |
| ---------------------- | -------------------------- | ----------------------------------------------------- |
| `content`              | `content`                  | ReactNode in both                                     |
| `directionalHint`      | `positioning`              | See table above                                       |
| `delay`                | `showDelay` / `hideDelay`  | Separate delays in v9; milliseconds                   |
| `id`                   | —                          | ID is auto-managed via `relationship` ARIA wiring     |
| `calloutProps`         | —                          | No direct equivalent; use `positioning` for placement |
| `hostClassName`        | —                          | Removed                                               |
| `directionalHintFixed` | —                          | Use `positioning` with an offset                      |
| `isBeakVisible`        | `withArrow`                | `withArrow={true}` shows the arrow                    |
| `beakWidth`            | —                          | Removed                                               |
| `onRenderContent`      | `content` slot             | Pass ReactNode to `content`                           |
| `styles`               | `className` + `makeStyles` |                                                       |
| `theme`                | `FluentProvider`           |                                                       |
| —                      | `relationship`             | **Required** — controls ARIA semantics                |
| —                      | `visible`                  | New — controlled visibility                           |
| —                      | `onVisibleChange`          | New — `(ev, data) => data.visible`                    |
