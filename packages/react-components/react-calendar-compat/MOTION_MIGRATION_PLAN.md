# Calendar Motion Migration Plan

## Overview

Migration of Calendar animations from CSS keyframe animations to Fluent UI v9 motion components.

**Last Updated:** January 2026
**Status:** Phase 1 complete (slide animations migrated), Phase 2 in progress (remaining CSS animations)

---

## Current State

### Completed (Phase 1: Slide Animations)

- ✅ Created `DirectionalSlide` component using `Slide.In` from `@fluentui/react-motion-components-preview`
- ✅ Migrated `CalendarDayGrid` row animations to motion components
- ✅ Migrated `CalendarMonth` row animations to motion components
- ✅ Updated `CalendarGridRow` to use `React.forwardRef` (required for motion ref)
- ✅ Using `motionTokens.durationSlower` (400ms) and `motionTokens.curveDecelerateMax`

### Remaining CSS Animations (Phase 2)

The following CSS animations in `animations.ts` are still actively used:

| Animation           | Used In                         | Purpose                              |
| ------------------- | ------------------------------- | ------------------------------------ |
| `FADE_IN`           | `CalendarDay`, `CalendarPicker` | Header/button fade on navigation     |
| `SLIDE_*_IN20`      | `CalendarPicker`                | Button row slide (month/year picker) |
| `DURATION_2`        | `CalendarDay`, `CalendarPicker` | Fade animation duration              |
| `DURATION_3`        | `CalendarPicker`                | Slide animation duration             |
| `EASING_FUNCTION_1` | `CalendarPicker`                | Slide timing (migrated to token)     |
| `EASING_FUNCTION_2` | `CalendarDay`, `CalendarPicker` | Fade timing (no exact token)         |

### Unused (Can Be Removed)

- `FADE_OUT`, `SLIDE_DOWN_OUT20`, `SLIDE_UP_OUT20`, `TRANSITION_ROW_DISAPPEARANCE`
- `DURATION_1`, `DURATION_4`

---

## Phase 2: Remaining CSS Animation Migration

### Analysis

There are two categories of remaining CSS animations:

#### 1. CalendarPicker Button Row Animations

**Location:** `useCalendarPickerStyles.styles.ts` (lines 141-163)
**Current implementation:** CSS `@keyframes` with `FADE_IN` + `SLIDE_*_IN20`

**Migration approach:** Wrap button rows with `DirectionalSlide` (same pattern as CalendarMonth)

```tsx
// CalendarMonth.tsx (line ~255) - already using this pattern:
<DirectionalSlide key={rowKey} {...{ animationDirection, animateBackwards }}>
  <div role="row" className={classNames.buttonRow}>
    {/* month buttons */}
  </div>
</DirectionalSlide>
```

**Files to modify:**

- `CalendarPicker.tsx` - Add `DirectionalSlide` wrapper around button rows
- `useCalendarPickerStyles.styles.ts` - Remove CSS animation styles from `buttonRow`

**Complexity:** Low - follows existing pattern from CalendarMonth

#### 2. Header Fade Animations

**Location:** `useCalendarDayStyles.styles.ts` (line 67-71), `useCalendarPickerStyles.styles.ts` (line 72-76)
**Current implementation:** CSS `@keyframes` with `FADE_IN`, `DURATION_2`, `EASING_FUNCTION_2`

**Migration approach:** Use `Fade.In` from `@fluentui/react-motion-components-preview`

```tsx
import { Fade } from '@fluentui/react-motion-components-preview';

// Wrap the header text that animates
<Fade.In duration={motionTokens.durationGentle}>
  <span aria-live="polite">{yearString}</span>
</Fade.In>;
```

**Challenge:** `EASING_FUNCTION_2` (`cubic-bezier(.1,.25,.75,.9)`) has no exact motion token equivalent. Options:

1. Use closest token (`motionTokens.curveEasyEase` or similar)
2. Keep custom easing value (acceptable deviation)
3. Accept slight visual difference with standard token

**Files to modify:**

- `CalendarDay.tsx` - Wrap month/year header with `Fade.In`
- `CalendarPicker.tsx` - Wrap current item button text with `Fade.In`
- `useCalendarDayStyles.styles.ts` - Remove CSS animation styles
- `useCalendarPickerStyles.styles.ts` - Remove CSS animation styles

**Complexity:** Medium - needs state management to trigger fade on navigation

### Recommended Migration Order

1. **CalendarPicker button rows** (Low effort, high impact)

   - Same pattern already proven in CalendarMonth
   - Removes `SLIDE_*_IN20` and `DURATION_3` usage

2. **Header fade animations** (Medium effort)

   - Requires adding state to track navigation changes
   - May need to accept `EASING_FUNCTION_2` deviation

3. **Cleanup animations.ts** (After above complete)
   - Remove all unused exports
   - Consider removing file entirely if everything migrated

---

## Validation Tasks

- [ ] Run VR tests: `yarn nx run vr-tests-react-components:test-vr`
- [ ] Test keyboard navigation
- [ ] Test reduced motion preference (`prefers-reduced-motion`)
- [ ] Cross-browser validation (Chrome, Firefox, Safari)

---

## Files Modified

| File                                 | Status | Changes                                         |
| ------------------------------------ | ------ | ----------------------------------------------- |
| `CalendarDayGrid.tsx`                | ✅     | `DirectionalSlide` wrappers for day rows        |
| `CalendarGridRow.tsx`                | ✅     | Added `React.forwardRef`                        |
| `CalendarMonth.tsx`                  | ✅     | `DirectionalSlide` wrappers for month rows      |
| `calendarMotions.tsx`                | ✅     | Created `DirectionalSlide` component            |
| `useCalendarDayGridStyles.styles.ts` | ✅     | Removed CSS slide animations                    |
| `CalendarPicker.tsx`                 | ⏳     | Pending: Add `DirectionalSlide` for button rows |
| `useCalendarPickerStyles.styles.ts`  | ⏳     | Pending: Remove CSS animations                  |
| `CalendarDay.tsx`                    | ⏳     | Pending: Add `Fade.In` for header               |
| `useCalendarDayStyles.styles.ts`     | ⏳     | Pending: Remove CSS fade animation              |
| `animations.ts`                      | ⏳     | Pending: Remove unused exports                  |

---

## References

- [Fluent UI Motion Documentation](https://react.fluentui.dev/?path=/docs/motion-introduction--docs)
- [react-motion-components-preview](../../react-motion-components-preview/)
