# RFC: Imperative WAAPI Slide Animation for Popovers

## Summary

Replace the declarative `PositioningSlide` React component with an imperative approach that uses `slideAtom`/`fadeAtom` to generate animation definitions and leverages the existing `useAnimateAtoms` hook to call `element.animate()` in response to the `fui-positioningend` event—eliminating React state changes and re-renders during the enter animation.

## Background

The current implementation in this branch uses `PositioningSlide`, a declarative React component that:

1. Waits for the `fui-positioningend` event
2. Reads `data-popper-placement` to determine animation direction
3. Triggers a React state change to render `Slide.In` with the correct offsets

This causes an additional React re-render cycle for each popover open, which may impact performance.

## Proposed Solution

### Create `useSlideAnimation` hook

A new hook in `@fluentui/react-positioning` that:

- Accepts `distance`, `duration`, `easing`, and `animateOpacity` parameters
- Uses `useAnimateAtoms()` from `@fluentui/react-motion` to get the animate function (which already handles `isReducedMotion` internally and provides `AnimationHandle` for cleanup)
- Uses `useIsReducedMotion()` from `@fluentui/react-motion` to get the reduced motion flag to pass to `useAnimateAtoms`
- Returns a callback ref that attaches a `fui-positioningend` event listener, reads `data-popper-placement`, computes offsets via `getSlideOffsets`, generates atoms via `slideAtom` + `fadeAtom`, and invokes the animate function
- Sets initial `opacity: 0` style imperatively; stores the `AnimationHandle` in a ref for cleanup on unmount

### Update PopoverSurface

In `renderPopoverSurface.tsx`:

- Remove the `<PositioningSlide>` wrapper
- Integrate the new `useSlideAnimation` hook in `usePopoverSurface.ts`, merging its ref with the existing positioning `containerRef`

### Update MenuPopover

In `renderMenuPopover.tsx`:

- Same approach: remove wrapper, integrate hook in `useMenuPopover.ts`

### Atom imports

Import `slideAtom` and `fadeAtom` from `@fluentui/react-motion-components-preview` and compose them into an array of `AtomMotion` objects to pass to `useAnimateAtoms`.

### Cleanup

Store the `AnimationHandle` returned by `useAnimateAtoms` in a ref, and call `handle.cancel()` and `handle.dispose()` in a cleanup function (useEffect return or callback ref cleanup).

### New public APIs

Export `useAnimateAtoms` and `useIsReducedMotion` from `@fluentui/react-motion` (previously `@internal`).

### Deprecation

The `PositioningSlide` component is kept for backward compatibility but could be deprecated in favor of the imperative `useSlideAnimation` hook.

## Implementation Status

- [x] Export `useAnimateAtoms` and `useIsReducedMotion` from `@fluentui/react-motion`
- [x] Export `AnimationHandle` type from `@fluentui/react-motion`
- [x] Create `useSlideAnimation` hook in react-positioning
- [x] Update `usePopoverSurface.ts` to use the new hook
- [x] Update `renderPopoverSurface.tsx` to remove `PositioningSlide` wrapper
- [x] Update `useMenuPopover.ts` to use the new hook
- [x] Update `renderMenuPopover.tsx` to remove `PositioningSlide` wrapper
- [x] Add tests for the new hook
- [ ] Decide on `PositioningSlide` deprecation/removal
