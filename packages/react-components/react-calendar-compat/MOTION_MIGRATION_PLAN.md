# Calendar Motion Migration Plan

## Overview

This document outlines the plan to complete the migration of Calendar animations from CSS keyframe animations to Fluent UI v9 motion components.

**Branch:** `refactor/calendar-slide`
**Started:** Several months ago
**Status:** In progress, with blocking issues

---

## Current State

### What's Done

- [x] Created `DirectionalSlide` component in `calendarMotions.tsx`
- [x] Updated `EASING_FUNCTION_1` to use `motionTokens.curveDecelerateMax`
- [x] Wrapped `CalendarMonth` rows with `DirectionalSlide`
- [x] Wrapped `CalendarDayGrid` rows with `DirectionalSlide`
- [x] Fixed `PresenceComponent.In` and `.Out` types in `react-motion`
- [x] Documented duration constant mappings to motion tokens
- [x] Created beachball change files

### What's Broken

- [ ] **Critical:** Invalid DOM nesting (`<div>` inside `<tbody>`)
- [ ] CSS animations still applied alongside motion components (double animation)
- [ ] Hardcoded duration instead of motion tokens

---

## Blocking Issue: Invalid DOM Nesting

### Problem

The `Slide.In` motion component wraps its children in a `<div>` element. When used inside a `<tbody>`, this creates invalid HTML:

```html
<tbody>
  <tr>
    ...
  </tr>
  <div>
    <!-- ❌ Invalid: div cannot be child of tbody -->
    <div>
      <tr>
        ...
      </tr>
    </div>
  </div>
</tbody>
```

### Error Message

```
<tbody> cannot contain a nested <div>.
```

### Why This Matters

- Browsers may render content incorrectly or unpredictably
- Accessibility tools may not interpret the structure correctly
- React logs errors in development mode
- Some browsers silently move misplaced elements, breaking layout

---

## Solution Options

### Option A: Restructure Calendar Grid to Use CSS Grid (Recommended)

**Approach:** Replace `<table>` with CSS Grid layout using `<div>` elements.

**Pros:**

- Full compatibility with motion components
- More flexible layout possibilities
- Modern approach used by other v9 components
- `transform` animations work reliably on `<div>` elements

**Cons:**

- Larger refactor
- May need to update accessibility attributes
- Potential visual regression testing needed

**Implementation:**

1. Replace `<table>` → `<div role="grid">`
2. Replace `<tbody>` → `<div>` (no role needed)
3. Replace `<tr>` → `<div role="row">`
4. Replace `<td>` → `<div role="gridcell">`
5. Apply CSS Grid styles for layout
6. Wrap rows with `DirectionalSlide`

**Estimated effort:** 2-3 days

---

### Option B: Keep CSS Animations for Row Transitions

**Approach:** Revert the row animation changes and keep using CSS `@keyframes` for table rows.

**Pros:**

- Minimal changes
- CSS animations work correctly on `<tr>` elements
- Quick to implement

**Cons:**

- Inconsistent with v9 motion system
- No access to motion behavior context (e.g., reduced motion preferences handled differently)
- Doesn't advance the migration goal

**Implementation:**

1. Remove `DirectionalSlide` wrappers from `CalendarDayGrid.tsx`
2. Remove `DirectionalSlide` wrappers from `CalendarMonth.tsx`
3. Keep CSS animation classes applied via `useCalendarDayGridStyles_unstable`
4. Document why CSS is used for this specific case

**Estimated effort:** 0.5 days

---

### Option C: Apply Motion to Table Wrapper Instead of Rows

**Approach:** Animate the entire table or tbody as a single unit when navigating.

**Pros:**

- Valid DOM structure
- Uses motion components

**Cons:**

- Different visual effect (whole grid slides vs. individual rows)
- May not match original design intent
- Could feel less refined

**Implementation:**

1. Move `DirectionalSlide` to wrap the entire `<table>` element
2. Use key prop on wrapper to trigger animation on navigation
3. Remove row-level motion wrappers

**Estimated effort:** 0.5 days

---

### Option D: Create a Table-Compatible Motion Component

**Approach:** Create a new motion component that doesn't wrap children in `<div>`.

**Pros:**

- Keeps table structure
- Uses WAAPI for animations

**Cons:**

- Requires changes to `react-motion` package
- Complex to implement correctly
- May have browser compatibility issues (transforms on `<tr>`)

**Implementation:**

1. Investigate if `react-motion` can support a "no-wrapper" mode
2. Create `TableRowMotion` component that applies animation directly
3. Handle the fact that `<tr>` doesn't reliably support transforms in all browsers

**Estimated effort:** 3-5 days (with research)

---

## Recommended Approach

**Option A (CSS Grid restructure)** is recommended for the following reasons:

1. **Future-proof:** Aligns with modern layout practices
2. **Full motion support:** Works seamlessly with motion components
3. **Consistency:** Matches patterns used in other v9 components
4. **Flexibility:** Enables future enhancements to the calendar layout

If time is constrained, **Option B (keep CSS)** is acceptable as a fallback, with documentation explaining the limitation.

---

## Implementation Plan

### Phase 1: Fix Blocking Issues (Priority: High)

#### Task 1.1: Restructure CalendarDayGrid to CSS Grid

- [ ] Create new styles using CSS Grid in `useCalendarDayGridStyles.styles.ts`
- [ ] Update `CalendarDayGrid.tsx` to use `<div>` with appropriate ARIA roles
- [ ] Update `CalendarGridRow.tsx` to render `<div role="row">` instead of `<tr>`
- [ ] Ensure keyboard navigation still works with `useArrowNavigationGroup`
- [ ] Verify visual appearance matches current implementation

#### Task 1.2: Restructure CalendarMonth Grid

- [ ] Update month button grid to use CSS Grid if using table structure
- [ ] Verify `DirectionalSlide` works correctly after restructure

#### Task 1.3: Remove Duplicate CSS Animations

- [ ] Remove CSS animation class applications from `useCalendarDayGridStyles_unstable`
- [ ] Clean up unused animation styles (or keep for fallback)
- [ ] Verify only motion component animations are running

### Phase 2: Complete Token Migration (Priority: Medium)

#### Task 2.1: Migrate Duration Constants

- [ ] Replace hardcoded `367` in `DirectionalSlide` with appropriate motion token
- [ ] Decision: Use `motionTokens.durationSlower` (400ms) or create custom duration
- [ ] Update `animations.ts` to export token-based values for any remaining CSS usage

#### Task 2.2: Migrate Remaining Easing Functions

- [ ] Evaluate `EASING_FUNCTION_2` usage and migrate if applicable
- [ ] Document any intentional deviations from motion tokens

### Phase 3: Testing & Validation (Priority: High)

#### Task 3.1: Unit Tests

- [ ] Verify all existing tests pass without DOM nesting warnings
- [ ] Add tests for animation direction (vertical/horizontal)
- [ ] Add tests for backwards animation

#### Task 3.2: Visual Regression Tests

- [ ] Run VR tests: `yarn nx run vr-tests-react-components:test`
- [ ] Review any visual differences
- [ ] Update snapshots if changes are intentional

#### Task 3.3: Accessibility Testing

- [ ] Test keyboard navigation after restructure
- [ ] Verify screen reader announces grid correctly
- [ ] Test with reduced motion preference enabled

#### Task 3.4: Manual Testing

- [ ] Test month navigation (left/right arrows)
- [ ] Test year navigation
- [ ] Test in different themes
- [ ] Test in RTL mode

### Phase 4: Cleanup (Priority: Low)

#### Task 4.1: Remove Dead Code

- [ ] Remove unused CSS animation keyframes if fully migrated
- [ ] Remove unused style variants (e.g., `verticalForward` CSS classes)
- [ ] Clean up any temporary comments or TODOs

#### Task 4.2: Documentation

- [ ] Update component documentation if API changed
- [ ] Add inline comments explaining motion implementation
- [ ] Update change file description if needed

---

## Files to Modify

| File                                 | Changes Needed                                   |
| ------------------------------------ | ------------------------------------------------ |
| `CalendarDayGrid.tsx`                | Restructure to CSS Grid, update JSX              |
| `CalendarGridRow.tsx`                | Change from `<tr>` to `<div role="row">`         |
| `useCalendarDayGridStyles.styles.ts` | Add CSS Grid styles, remove duplicate animations |
| `CalendarMonth.tsx`                  | Verify motion works after any shared changes     |
| `calendarMotions.tsx`                | Update duration to use motion tokens             |
| `animations.ts`                      | Complete token migration or document exceptions  |

---

## Risk Mitigation

### Visual Regression Risk

- Run VR tests before and after each phase
- Keep screenshots of current behavior for comparison
- Have design review if significant visual changes occur

### Accessibility Risk

- Test with axe-core after restructure
- Verify ARIA roles are correctly applied
- Test keyboard navigation thoroughly

### Performance Risk

- Monitor bundle size changes
- Check animation performance on lower-end devices
- Ensure no unnecessary re-renders from key changes

---

## Success Criteria

1. ✅ No DOM nesting warnings in tests or console
2. ✅ Animations match original visual design
3. ✅ All existing unit tests pass
4. ✅ Visual regression tests pass (or changes approved)
5. ✅ Keyboard navigation works correctly
6. ✅ Screen reader announces calendar grid properly
7. ✅ Reduced motion preference is respected
8. ✅ Duration and easing use motion tokens (or documented exceptions)

---

## Open Questions

1. **Should we use `durationSlower` (400ms) or keep the original 367ms?**

   - Recommendation: Use token for consistency, the 33ms difference is imperceptible

2. **Should the fade animation in CalendarDay also migrate to motion components?**

   - Currently only slide is migrated; fade uses CSS

3. **Is the "first transition week" / "last transition week" animation still needed?**

   - These appear to be edge case animations; evaluate if they're necessary

4. **Should we support a CSS fallback for browsers that don't support WAAPI?**
   - Modern browsers all support it; evaluate based on browser support requirements

---

## Timeline Estimate

| Phase                             | Estimated Duration |
| --------------------------------- | ------------------ |
| Phase 1: Fix Blocking Issues      | 2-3 days           |
| Phase 2: Complete Token Migration | 0.5 days           |
| Phase 3: Testing & Validation     | 1-2 days           |
| Phase 4: Cleanup                  | 0.5 days           |
| **Total**                         | **4-6 days**       |

---

## References

- [Fluent UI Motion Documentation](https://react.fluentui.dev/?path=/docs/motion-introduction--docs)
- [react-motion package](../../react-motion/)
- [react-motion-components-preview](../../react-motion-components-preview/)
- [CSS Grid Layout Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [ARIA Grid Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role)
