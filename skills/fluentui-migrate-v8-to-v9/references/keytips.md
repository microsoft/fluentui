# Keytips Migration

v9 Keytips are in **`@fluentui/react-keytips`** (Fluent UI contrib), not the main `@fluentui/react-components` package.

```sh
npm install @fluentui/react-keytips
```

v9 components do **not** have a `keytipProps` prop — keytips are attached via the `useKeytipRef` hook.

## Component Renames

| v8              | v9        | Notes                    |
| --------------- | --------- | ------------------------ |
| `KeytipLayer`   | `Keytips` | Mount once near the root |
| `useKeytipData` | —         | No equivalent            |
| `KeytipData`    | —         | No equivalent            |

## Prop Mapping — KeytipLayer → Keytips

| v8                     | v9                   | Notes                                                                |
| ---------------------- | -------------------- | -------------------------------------------------------------------- |
| `keytipStartSequence`  | `startSequence`      | Type changed: `IKeytipTransitionKey[]` → `string` (e.g. `"alt+f10"`) |
| `keytipExitSequence`   | `exitSequence`       | Same type change                                                     |
| `keytipReturnSequence` | `returnSequence`     | Same type change                                                     |
| `onEnterKeytipMode`    | `onEnterKeytipsMode` | Renamed; type changed to `EventHandler`                              |
| `onExitKeytipMode`     | `onExitKeytipsMode`  | Renamed; type changed to `EventHandler`                              |
| `content`              | `content`            | Unchanged                                                            |
| `styles`               | —                    | Component is logic-only, no styles                                   |
| —                      | `invokeEvent`        | New: event that triggers keytips                                     |
| —                      | `startDelay`         | New: delay before entering keytip mode                               |

## Prop Mapping — IKeytipProps → KeytipProps

| v8                    | v9                 | Notes                                                  |
| --------------------- | ------------------ | ------------------------------------------------------ |
| `content`             | `content`          | Unchanged                                              |
| `keySequences`        | `keySequences`     | Unchanged                                              |
| `hasMenu`             | `hasMenu`          | Unchanged                                              |
| `visible`             | `visible`          | Unchanged                                              |
| `hasDynamicChildren`  | `dynamic`          | Renamed                                                |
| `hasOverflowSubMenu`  | —                  | Use `hasMenu` instead                                  |
| `overflowSetSequence` | `overflowSequence` | Renamed                                                |
| `callOutProps`        | `positioning`      | Type changed to `PositioningProps`                     |
| `disabled`            | —                  | Not supported; keytips don't show on disabled elements |
| `onExecute`           | `onExecute`        | Type changed to `ExecuteKeytipEventHandler`            |
| `onReturn`            | `onReturn`         | Type changed to `ReturnKeytipEventHandler`             |
| `styles`              | —                  | Not supported                                          |
| `theme`               | —                  | Not supported                                          |

## useKeytipRef Changes

| v8 (useKeytipRef) | v9  | Notes                        |
| ----------------- | --- | ---------------------------- |
| `keytipProps`     | —   | Use individual props instead |
| `ariaDescribedBy` | —   | Not supported                |
| `disabled`        | —   | Not supported                |

## Before / After

### Before

```tsx
import { DefaultButton } from '@fluentui/react';
<DefaultButton keytipProps={{ content: 'B', keySequences: ['b'] }}>Action</DefaultButton>;
```

### After

```tsx
import { Button } from '@fluentui/react-components';
import { Keytips, useKeytipRef } from '@fluentui/react-keytips';

// Mount once near root:
<Keytips startSequence="alt+f10" />;

// Attach to any component:
const keytipRef = useKeytipRef({ keySequences: ['b'], content: 'B' });
<Button ref={keytipRef}>Action</Button>;
```
