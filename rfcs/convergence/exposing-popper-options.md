# RFC:

@ling1726

## Summary

In the v9 library, we have invested in [Popper.js](https://popper.js.org/) as the tool to managed positioned elements.
The `usePopper` utility in `@fluentui/react-positioning` contains multiple configuration options for popper and custom
popper modifiers that can be used in different scenarios. These configuration options were mainly taken from v0 from
the different requirements for positioned elements in Teams.

In v9, there is no uniform usage of the configuration options for all components apart from a small subset of necessary
options that are required. This RFC proposes a way to configure popper uniformly in v9 components for consumers.

## Background

Configuring positioned props in both v0 and v8 are done inconsistently. Here are some examples

v8:

```tsx
<Callout
  {...props} // ICalloutProps interface
/>

<ContextualMenu
  calloutProps={calloutProps} // ICalloutProps interface
  // also can spread calloutProps
  calloutMaxHeight
  bounds
  directionalHintFixed
/>
```

v0:

```tsx
<Popup
  align
  position
  offset
/>

<Menu
  items={[
    { menu: popper: { align, position, offset }}
  ]}
/>
```

## Problem statement

There is a subset of `usePopper` options that are currently used by all converged components that need positioning.
These options are spread into the component's props:

```tsx
<Tooltip position="bottom" align="center" />
<Popover position="bottom" align="center" />
<Menu position="bottom" align="center" />
```

There are other popper options that are used in some components but not others, examples of these options are:

- `coverTarget` - allows the positioned element to cover the target

There are also additional options that are not used by any converge component that might be used in the future like:

- `autoSize` - Allows the positioned element to change size based on viewport size
- `flipBoundary` - Determines what bounds to use to flip the positioning

Issues and bugs can be triggered because certain use cases require more precise configuration of popper. The most likely
result would be that a popper configuration is exposed for one component but not others.

## Detailed Design or Proposal

### Equal popper configuration

Each converged component that uses popper should allow an equal level of configuration. This ensures that our positioned
components can behave consistently across the library. Any fixes that require exposing another popper configuration will
be available to **all** components that use popper.

This proposal does not mean that all popper options must be public, but that if one component exposes a popper configuration,
then all components should do so equally.

We can achieve this with an agreement that the current `PositioningProps` would be supported by all v9 components, while
internal popper options can still belong to `PopperOptions` type in the `react-positioning` package.

```tsx
import { PositioningProps } from '@fluentui/react-positioning';

export interface TooltipProps extends PositioningProps {}

export interface MenuProps extends PositioningProps {}

export interface PopoverProps extends PositioningProps {}
```

### `positioning` configuration object

The next step to this proposal is to make sure that all components which use a positioned element should allow users
to configure popper through a `positioning` configuration object:

```tsx
import { PositioningProps } from '@fluentui/react-positioning';

export interface TooltipProps {
  positioning?: PositioningProps;
}

export interface MenuProps {
  positioning?: PositioningProps;
}

export interface PopoverProps {
  positioning?: PositioningProps;
}
```

Slots that use popper should use a similar pattern if a top level `positioning` option is not clear enough:

```tsx
import { PositioningProps } from '@fluentui/react-positioning';

export interface ComponentWithPositionedSlotProps {
  positionedSlot: React.HTMLAttributes<HTMLElement> & { positioning?: PositioningProps };
}
```

### Pros and Cons

#### Pros

- Positioning capability is consistent across the library
- Fixes to positioned elements through extra configuration can be used across the library
- Configuring positioned elements is consistent across components and clear for users
- If a better underlying library than `Popper` exists, we can replace it by implementing the `PositioniningProps`interface
- Technically a new `positioning`prop is a breaking API change, but can be done in a non-breaking way

#### Cons

- Some components will not need all complex configuiration
- Encourage users to use complicated solutions to their problems
- Adding configuration required only by a single component is expensive
- Technically a new `positioning`prop is a breaking API change, but can be done in a non-breaking way

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->
