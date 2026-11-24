# Temporal Presence and Pose-Based Motion Atoms Specification

## Scope

This specification defines the public contract for:

1. Pose-based motion atoms in `@fluentui/react-motion-components-preview` (`fade`, `scale`, `slide`, `rotate`, `blur`, and their directional helpers `*In` / `*Out`).
2. Temporal presence components in `@fluentui/react-motion-components-preview` (`Fade`, `Scale`, `Slide`, `Rotate`, `Blur`, and `Collapse`, plus their timing variants).
3. Directional `.In` and `.Out` sub-components produced by `createPresenceComponent` and `createPresenceComponentVariant` in `@fluentui/react-motion` when `poseProps` is configured.

## 1. Pose-Based Motion Atoms

### General Helpers

The five general helpers are `fade`, `scale`, `slide`, `rotate`, and `blur`. Each returns a `MotionAtom` accepted by `createPresenceComponent` and `createMotionComponent`.

| Helper   | Required Pose Params               | Optional Params                                                | Keyframe Property          |
| -------- | ---------------------------------- | -------------------------------------------------------------- | -------------------------- |
| `fade`   | `from: number`, `to: number`       | `easing`, `delay`                                              | `opacity` (`fill: 'both'`) |
| `scale`  | `from: number`, `to: number`       | `easing`, `delay`                                              | `scale`                    |
| `slide`  | `from: SlidePose`, `to: SlidePose` | `easing`, `delay`                                              | `translate`                |
| `rotate` | `from: number`, `to: number`       | `axis` (`'x' \| 'y' \| 'z'`, default `'z'`), `easing`, `delay` | `rotate`                   |
| `blur`   | `from: string`, `to: string`       | `easing`, `delay`                                              | `filter: blur(...)`        |

Common rules:

- `duration: number` is required on every atom helper.
- `easing` defaults to `'linear'` and `delay` defaults to `0`.
- `SlidePose` is `{ x?: string; y?: string }`. An omitted axis inside an authored `SlidePose` defaults to `'0px'`.
- `fade` sets `fill: 'both'` so delayed fade-ins remain hidden during the delay phase. `scale`, `slide`, `rotate`, and `blur` do not add opacity or `fill`.

### Directional Helpers (`*In` and `*Out`)

Each family exports a neutral-boundary pair:

- `*In` arrives at the property's neutral value and forbids `to` (`to?: never`).
- `*Out` departs from the property's neutral value and forbids `from` (`from?: never`).

| Family   | Neutral Value            | `*In` Outer Param (`from`) | `*Out` Outer Param (`to`) |
| -------- | ------------------------ | -------------------------- | ------------------------- |
| `fade`   | `1`                      | Optional, defaults to `0`  | Optional, defaults to `0` |
| `scale`  | `1`                      | Optional, defaults to `0`  | Optional, defaults to `0` |
| `slide`  | `{ x: '0px', y: '0px' }` | Required `SlidePose`       | Required `SlidePose`      |
| `rotate` | `0` (around `axis`)      | Required `number`          | Required `number`         |
| `blur`   | `'0px'`                  | Required `string`          | Required `string`         |

`fadeIn`/`fadeOut` and `scaleIn`/`scaleOut` default the outer endpoint to `0` because invisible (`0`) and collapsed (`0`) are universal origins. `slide`, `rotate`, and `blur` require an authored outer endpoint because no single offset, angle, or blur radius applies across all layouts.

## 2. Temporal Presence Components

Each presence component separates the three temporal poses of a visibility lifecycle:

- **`from*`**: pose at the start of enter.
- **`in*`**: pose while present (root-only; omitted on `Collapse` because its present size is measured from the DOM).
- **`to*`**: pose at the end of exit. When omitted on the root component, exit mirrors `from*`.

### Component Pose Table

| Component  | Pose Props                                   | Default `from*`  | Default `in*`    | Default `to*`    | Opacity Coupling                  |
| ---------- | -------------------------------------------- | ---------------- | ---------------- | ---------------- | --------------------------------- |
| `Fade`     | `fromOpacity`, `inOpacity`, `toOpacity`      | `0`              | `1`              | `fromOpacity`    | Primary property                  |
| `Scale`    | `fromScale`, `inScale`, `toScale`            | `0.9`            | `1`              | `fromScale`      | `animateOpacity` (default `true`) |
| `Slide`    | `fromX`, `fromY`, `inX`, `inY`, `toX`, `toY` | `'0px'`, `'0px'` | `'0px'`, `'0px'` | `fromX`, `fromY` | `animateOpacity` (default `true`) |
| `Rotate`   | `fromAngle`, `inAngle`, `toAngle`            | `-90`            | `0`              | `fromAngle`      | `animateOpacity` (default `true`) |
| `Blur`     | `fromRadius`, `inRadius`, `toRadius`         | `'10px'`         | `'0px'`          | `fromRadius`     | `animateOpacity` (default `true`) |
| `Collapse` | `fromSize`, `toSize`                         | `'0px'`          | Measured DOM     | `fromSize`       | `animateOpacity` (default `true`) |

### Multi-Axis Group Completion (`Slide`)

`Slide` couples `x` and `y` within each temporal pose:

- If neither `toX` nor `toY` is provided on the root, exit returns to `(fromX, fromY)`.
- If either `toX` or `toY` is provided, the exit pose is authored as a whole and the omitted sibling axis uses `'0px'` rather than inheriting from `from*` or a variant default.
- The same whole-pose rule applies when authoring one axis of `(fromX, fromY)` or `(inX, inY)` on a variant that defaulted the other axis.

### Shared Timing Parameters

`@fluentui/react-motion` exports `PresenceDuration`, `PresenceEasing`, `PresenceDelay`, and `BasePresenceParams` (re-exported from `@fluentui/react-motion-components-preview`):

- Enter timing: `duration`, `easing`, `delay`.
- Exit timing: `exitDuration` (defaults to `duration`), `exitEasing` (defaults to `easing`), `exitDelay` (defaults to `delay`).

## 3. Directional `.In` and `.Out` Contract (Prism-Strict)

When `createPresenceComponent(motion, { poseProps })` is called with `poseProps`, the generated `.In` and `.Out` components enforce one-way endpoint contracts at both compile time and runtime:

### `.In` (One-Way Enter)

- Accepts `from*` pose props and enter timing (`duration`, `easing`, `delay`).
- Omits `in*`, `to*`, and exit timing (`exitDuration`, `exitEasing`, `exitDelay`).
- Plays the component's `enter` motion once on mount, animating from the resolved `from*` pose to the component's default present pose (or the variant's `in*` pose).

### `.Out` (One-Way Exit)

- Accepts `to*` pose props and timing (`duration`, `easing`, `delay`, `exitDuration`, `exitEasing`, `exitDelay`).
- Omits `in*` and `from*`.
- Plays the component's `exit` motion once on mount, animating from the component's default present pose (or the variant's `in*` pose) to the resolved `to*` pose.
- Copies explicit ordinary timing (`duration`, `easing`, `delay`) to the corresponding `exit*` key before merging variant defaults, unless the explicit `exit*` prop is also supplied. Explicit `exitDuration`, `exitEasing`, and `exitDelay` (including `0`) always take precedence over their ordinary counterparts.
- Finishing `.Out` does not unmount its child; use the root presence component with `visible` and `unmountOnExit` for visibility-controlled mounting.

### Variants and `replayKey`

- `createPresenceComponentVariant` preserves the parent component's `poseProps` metadata and the exact `.In` and `.Out` omit types.
- A variant that sets a custom `in*` default (for example `inAngle: 15`) applies that present pose as the destination of `Variant.In` and the origin of `Variant.Out`.
- Changing `replayKey` on `.In` or `.Out` replays the mounted animation without remounting the child DOM.
