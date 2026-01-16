# Calendar Motion Migration Plan

## Overview

Migration of Calendar animations from CSS keyframe animations to Fluent UI v9 motion components.

**Last Updated:** January 2026
**Status:** Phase 2 complete (all animations migrated to motion components)

---

## Current State

### Completed (Phase 1: Slide Animations)

- ✅ Created `DirectionalSlide` component using `Slide.In` from `@fluentui/react-motion-components-preview`
- ✅ Migrated `CalendarDayGrid` row animations to motion components
- ✅ Migrated `CalendarMonth` row animations to motion components
- ✅ Updated `CalendarGridRow` to use `React.forwardRef` (required for motion ref)
- ✅ Using `motionTokens.durationSlower` (400ms) and `motionTokens.curveDecelerateMax`

### Completed (Phase 2: CSS Animation Migration)

- ✅ Migrated `CalendarYear` row animations to `DirectionalSlide` motion components
- ✅ Removed CSS slide animations from `CalendarPicker` styles
- ✅ Created `HeaderFade` component using `Fade.In` from `@fluentui/react-motion-components-preview`
- ✅ Migrated header fade animations in `CalendarDay`, `CalendarMonth`, `CalendarYear`
- ✅ Removed CSS fade animations from `useCalendarDayStyles.styles.ts`
- ✅ Removed CSS fade animations from `useCalendarPickerStyles.styles.ts`
- ✅ Marked animation constants as `@deprecated` in `animations.ts`

---

## Phase 2: Remaining CSS Animation Migration (COMPLETED)

### Summary

All CSS animations have been migrated to motion components:

#### 1. CalendarYear/CalendarPicker Slide Animations ✅

- Added `DirectionalSlide` wrappers around year rows in `CalendarYear.tsx`
- Removed CSS slide animation styles from `useCalendarPickerStyles.styles.ts`
- Uses same pattern as CalendarMonth

#### 2. Header Fade Animations ✅

- Created `HeaderFade` component using `Fade.In` from `@fluentui/react-motion-components-preview`
- Uses `motionTokens.durationGentle` (~250ms) for timing
- Component uses `navigationKey` prop to trigger animation on value change
- Migrated in `CalendarDay.tsx`, `CalendarMonth.tsx`, `CalendarYear.tsx`
- Removed CSS fade animations from style files

#### 3. Animation Constants ✅

- All animation constants in `animations.ts` marked as `@deprecated`
- Constants retained for backwards compatibility only

### Migration Order (COMPLETED)

1. **CalendarYear slide animations** ✅

   - Same pattern as CalendarMonth
   - Removed `SLIDE_*_IN20` and `DURATION_3` usage

2. **Header fade animations** ✅

   - Created `HeaderFade` component with `navigationKey` for triggering
   - Used standard motion tokens (slight deviation from original easing accepted)

3. **Animation constants deprecated** ✅
   - All exports marked `@deprecated` for backwards compatibility

---

## Validation Tasks

- [x] Build passes: `yarn nx run react-calendar-compat:build`
- [x] Unit tests pass: `yarn nx run react-calendar-compat:test`
- [ ] Run VR tests: `yarn nx run vr-tests-react-components:test-vr`
- [ ] Test keyboard navigation
- [ ] Test reduced motion preference (`prefers-reduced-motion`)
- [ ] Cross-browser validation (Chrome, Firefox, Safari)

---

## Files Modified

| File                                 | Status | Changes                                                |
| ------------------------------------ | ------ | ------------------------------------------------------ |
| `CalendarDayGrid.tsx`                | ✅     | `DirectionalSlide` wrappers for day rows               |
| `CalendarGridRow.tsx`                | ✅     | Added `React.forwardRef`                               |
| `CalendarMonth.tsx`                  | ✅     | `DirectionalSlide` wrappers for month rows, HeaderFade |
| `CalendarYear.tsx`                   | ✅     | `DirectionalSlide` wrappers for year rows, HeaderFade  |
| `calendarMotions.tsx`                | ✅     | Created `DirectionalSlide` and `HeaderFade` components |
| `useCalendarDayGridStyles.styles.ts` | ✅     | Removed CSS slide animations                           |
| `useCalendarPickerStyles.styles.ts`  | ✅     | Removed CSS slide and fade animations                  |
| `CalendarDay.tsx`                    | ✅     | Added `HeaderFade` for header                          |
| `useCalendarDayStyles.styles.ts`     | ✅     | Removed CSS fade animation                             |
| `animations.ts`                      | ✅     | All exports marked `@deprecated`                       |

---

## References

- [Fluent UI Motion Documentation](https://react.fluentui.dev/?path=/docs/motion-introduction--docs)
- [react-motion-components-preview](../../react-motion-components-preview/)
