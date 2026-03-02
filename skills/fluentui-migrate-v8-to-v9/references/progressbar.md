# ProgressIndicator → ProgressBar Migration

## Key Changes

- Component renamed: `ProgressIndicator` → `ProgressBar`
- `percentComplete` prop renamed to `value` (same 0–1 range, `max` defaults to `1`)
- `label` prop removed → wrap `ProgressBar` in `<Field label="...">`
- `description` prop removed → use `<Field hint="...">`
- Indeterminate state: v8 omits `percentComplete`; v9 omits `value`
- `barHeight` removed → use `thickness` prop

## Before / After Example

### Determinate progress

```tsx
// v8
import { ProgressIndicator } from '@fluentui/react';

<ProgressIndicator label="Uploading files" description="12 of 100 files" percentComplete={0.12} />;
```

```tsx
// v9
import { Field, ProgressBar } from '@fluentui/react-components';

<Field label="Uploading files" hint="12 of 100 files">
  <ProgressBar value={0.12} />
</Field>;
```

### Indeterminate progress

```tsx
// v8 — omit percentComplete
<ProgressIndicator label="Loading" />;

// v9 — omit value
import { Field, ProgressBar } from '@fluentui/react-components';

<Field label="Loading">
  <ProgressBar />
</Field>;
```

### Without label (aria-label only)

```tsx
// v8
<ProgressIndicator percentComplete={0.5} ariaLabel="Upload progress" />;

// v9
import { ProgressBar } from '@fluentui/react-components';

<ProgressBar value={0.5} aria-label="Upload progress" />;
```

## Custom max value

```tsx
// v9 — use max prop when your value range is not 0–1
import { Field, ProgressBar } from '@fluentui/react-components';

const filesUploaded = 42;
const totalFiles = 100;

<Field label="Uploading files" hint={`${filesUploaded} of ${totalFiles}`}>
  <ProgressBar value={filesUploaded} max={totalFiles} />
</Field>;
```

## Thickness

```tsx
// v9 — thin or medium bar
<ProgressBar value={0.5} thickness="large" />
// thickness: "medium" (default) | "large"
```

## IProgressIndicatorProps → ProgressBarProps

| v8                | v9                         | Notes                                                                |
| ----------------- | -------------------------- | -------------------------------------------------------------------- |
| `percentComplete` | `value`                    | Same 0–1 range; `max` defaults to `1`                                |
| `label`           | `<Field label="...">`      | Wrap `ProgressBar` in `Field`                                        |
| `description`     | `<Field hint="...">`       | `hint` slot on `Field`                                               |
| `ariaLabel`       | `aria-label`               | Native HTML prop                                                     |
| `ariaValueText`   | `aria-valuetext`           | Native HTML prop                                                     |
| `barHeight`       | `thickness`                | `"medium"` \| `"large"`                                              |
| `progressHidden`  | —                          | Conditionally render the component instead                           |
| `className`       | `className`                |                                                                      |
| `styles`          | `className` + `makeStyles` |                                                                      |
| `theme`           | `FluentProvider`           |                                                                      |
| `componentRef`    | `ref`                      |                                                                      |
| —                 | `max`                      | New — custom maximum value (default `1`)                             |
| —                 | `color`                    | New — `"brand"` (default) \| `"success"` \| `"warning"` \| `"error"` |
