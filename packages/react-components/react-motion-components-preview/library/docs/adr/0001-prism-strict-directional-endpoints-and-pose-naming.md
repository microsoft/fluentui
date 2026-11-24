# ADR 0001: Prism-Strict Directional Endpoints and Temporal Pose Naming

- **Status**: Accepted
- **Scope**: `@fluentui/react-motion`, `@fluentui/react-motion-components-preview`

## Context

Prior to this change, presence components in `@fluentui/react-motion-components-preview` used single-endpoint `out*` props (`outOpacity`, `outScale`, `outX`, `outY`, `outAngle`, `outRadius`, `outSize`), and motion atom helpers mixed directional names with presence-oriented parameter names (`fromX`/`fromY` vs. `outX`/`outY`). That model had three limitations:

1. **Asymmetric enter/exit trajectories were impossible.** A toast or drawer could not enter from one side (`fromX="-24px"`) and exit to another (`toX="24px"`) without writing a custom `PresenceMotionFn`.
2. **Present poses could not be customized.** Components assumed a fixed present state (for example opacity `1` or scale `1`), preventing dimmed or offset settled poses (`inOpacity`, `inScale`, `inX`/`inY`, `inAngle`, `inRadius`).
3. **Directional `.In` and `.Out` sub-components exposed irrelevant or ambiguous props.** Allowing both `from*` and `to*` (or `in*` and `exitDuration`) on `.In` and `.Out` forced callers to reason about whether `from*` meant "start of enter" or "start of this playback", and allowed silent no-op props such as `exitDuration` on `.In`.

## Decision

### 1. Adopt Temporal `from*` / `in*` / `to*` Naming on Presence Components

Replace `out*` with three temporal pose roles:

- `from*`: origin pose when entering (`enter` start).
- `in*`: settled pose while visible (`enter` end / `exit` start), root-only.
- `to*`: destination pose when exiting (`exit` end). When omitted on the root component, `to*` mirrors `from*` so symmetric transitions stay concise (`<Slide visible={open} fromY="20px">`).

`Collapse` uses `fromSize` and `toSize` without an `inSize` prop because its settled size is measured from the DOM (`scrollHeight` / `scrollWidth`).

### 2. Enforce Prism-Strict `.In` and `.Out` Contracts via `poseProps`

`createPresenceComponent(motion, { poseProps })` declares pose prop mappings (`{ from, in?, to }`, or nested arrays of mappings for coupled multi-axis groups with optional `neutral` values). When `poseProps` is provided:

- `.In` accepts only `from*` pose props and enter timing (`duration`, `easing`, `delay`), omitting `in*`, `to*`, and `exitDuration` / `exitEasing` / `exitDelay`. It animates `from*` -> default (or variant) `in*`.
- `.Out` accepts only `to*` pose props and timing (`duration`/`exitDuration`, `easing`/`exitEasing`, `delay`/`exitDelay`), omitting `in*` and `from*`. It animates default (or variant) `in*` -> `to*`.
- `createPresenceComponentVariant` propagates `poseProps` metadata and the `InOmit` / `OutOmit` type parameters so variants keep the exact same directional contracts.
- Components created without `poseProps` retain the full motion parameter surface on `.In` and `.Out` for backward compatibility.

### 3. Align Atom Helpers to `from`/`to` with Neutral-Boundary `*In`/`*Out` Pairs

General atom helpers (`fade`, `scale`, `slide`, `rotate`, `blur`) take explicit `from` and `to` poses plus required `duration`. Directional helpers (`*In` and `*Out`) lock one endpoint to the property's neutral value and forbid the opposite endpoint at the type level (`to?: never` on `*In`, `from?: never` on `*Out`), mirroring the Prism-strict contract of `.In` and `.Out` components.

## Alternatives Considered

### Dual-Endpoint `.In` and `.Out` (Allowing Both `from*` and `to*` on Both Sub-Components)

An earlier draft allowed authoring both `from*` and `to*` on `.In` and `.Out` so a one-way motion could specify an arbitrary source and destination. That design was rejected because:

- On `.Out`, `from*` changed meaning relative to the root component (on root, `from*` is the enter start; on `.Out`, `from*` would have meant the present pose).
- It broke symmetry with the directional atom helpers (`fadeIn` forbids `to`, `fadeOut` forbids `from`).
- Arbitrary two-point one-way animations that do not start or end at the present pose belong to general atom helpers (`fade({ from, to, duration })`) and `createMotionComponent`, not presence `.In`/`.Out`.

### Keeping `out*` and Adding Separate `exit*` Pose Props

Keeping `outScale` and adding `exitScale` would preserve old names but leave `out*` meaning "enter start" whenever `exit*` differed. Renaming to `from*` / `in*` / `to*` while `@fluentui/react-motion-components-preview` is in preview makes the temporal roles self-describing.

## Consequences

- **Positive**: Every prop on root, `.In`, `.Out`, and atom helpers has one unambiguous temporal meaning (`from*` = entering origin, `in*` = present pose, `to*` = exiting destination).
- **Positive**: Invalid combinations (`to*` or `exitDuration` on `.In`, `from*` on `.Out`, `in*` on either directional component) fail at compile time with clear TypeScript errors, including on derived variants.
- **Positive**: Coupled multi-axis groups (`Slide`) automatically fill omitted sibling axes with `'0px'`, avoiding accidental leakage of variant defaults across axes.
- **Trade-off**: Removing `out*` props is a breaking change for preview consumers; internal Fluent UI consumers (`react-dialog`, `react-nav`, `react-calendar-compat`, `react-calendar-preview`) are updated in the same change set.
- **Trade-off**: Callers that want a one-way animation between two non-neutral endpoints use `createMotionComponent` with the general pose atoms (`fade`, `scale`, `slide`, `rotate`, `blur`) or a variant with a custom `in*` pose.
