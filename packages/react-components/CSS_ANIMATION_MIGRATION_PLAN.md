# CSS Animation → Fluent Motion Migration Plan

## Overview

Migration of remaining CSS `@keyframes` animations and CSS `transition` properties in Fluent UI v9 component packages to the motion system (`react-motion` + `react-motion-components-preview`).

**Created:** March 2026

---

## Motion System Reference

### Core APIs (`@fluentui/react-motion`)

- `createMotionComponent` — plays animation once on mount
- `createPresenceComponent` — enter/exit animations driven by `visible` prop
- `createMotionComponentVariant` / `createPresenceComponentVariant` — create variants with preset defaults
- `PresenceGroup` — manages multiple presence animations together
- `motionTokens` — timing (`durationUltraFast` through `durationUltraSlow`) and easing curves

### Pre-built Components (`@fluentui/react-motion-components-preview`)

- `Fade` (+ `FadeSnappy`, `FadeRelaxed`)
- `Slide` (+ `SlideSnappy`, `SlideRelaxed`)
- `Scale` (+ `ScaleSnappy`, `ScaleRelaxed`)
- `Collapse` (+ `CollapseSnappy`, `CollapseRelaxed`, `CollapseDelayed`)
- `Blur`, `Rotate`, `Stagger`

Each has `.In` (mount-only enter) and `.Out` (mount-only exit) static methods.

### Key Facts

- `iterations: Infinity` is supported (`AtomMotion` extends `KeyframeEffectOptions`)
- Reduced motion: each atom accepts a `reducedMotion` override; default is `{ duration: 1 }` (instant)
- **No wrapper DOM elements** — components use `React.cloneElement` + ref forwarding
- Children must be intrinsic HTML elements or `React.forwardRef` components
- File naming convention: `{componentName}Motions.ts` next to the component

### Already-Migrated Components

| Component                              | Motion Used                                                                  | Package               |
| -------------------------------------- | ---------------------------------------------------------------------------- | --------------------- |
| AccordionPanel                         | `Collapse` via `presenceMotionSlot`                                          | react-accordion       |
| Calendar (slides, headers, day labels) | `DirectionalSlide`, `HeaderFade`, `Fade.In`                                  | react-calendar-compat |
| Dialog surface                         | `Scale` variant via `presenceMotionSlot`                                     | react-dialog          |
| Dialog backdrop                        | `FadeRelaxed`                                                                | react-dialog          |
| Drawer                                 | Custom `createPresenceComponent` + `fadeAtom`                                | react-drawer          |
| Menu surface                           | Custom `createPresenceComponent` + `fadeAtom` + `slideAtom`                  | react-menu            |
| MessageBar group                       | Custom `createPresenceComponent` + `fadeAtom` + `slideAtom`, `PresenceGroup` | react-message-bar     |
| Nav CategoryItem (expand icon)         | `Rotate` variant via `presenceMotionSlot`                                    | react-nav             |
| Nav SubItemGroup                       | `Collapse` via `presenceMotionSlot`                                          | react-nav             |
| Popover surface                        | Custom `createPresenceComponent` + `fadeAtom` + `slideAtom`                  | react-popover         |
| Toast container                        | `CollapseDelayed`                                                            | react-toast           |
| Tree (subtree + root)                  | `Collapse` via `presenceMotionSlot`                                          | react-tree            |

### Using Motion Tokens (inline styles, not motion components)

| Component               | Usage                                                       | Package         |
| ----------------------- | ----------------------------------------------------------- | --------------- |
| AccordionHeader chevron | `motionTokens` for CSS transition on inline rotation        | react-accordion |
| TreeItemChevron         | `durations`, `curves` for CSS transition on inline rotation | react-tree      |
| SplitNavItem            | `motionTokens` for CSS transition on opacity                | react-nav       |

### Deprecated (retained for backwards compatibility)

| Component                                        | Status                                                 | Package               |
| ------------------------------------------------ | ------------------------------------------------------ | --------------------- |
| `createSlideStyles`                              | Deprecated — popover/menu now use `surfaceMotion` slot | react-positioning     |
| Animation constants (`FADE_IN`, `SLIDE_*`, etc.) | All deprecated                                         | react-calendar-compat |

### Not a Visual Animation (should NOT be migrated)

| Component   | Usage                                                                   | Package     |
| ----------- | ----------------------------------------------------------------------- | ----------- |
| Toast Timer | CSS animation `onAnimationEnd` used as a timing mechanism (opacity 0→0) | react-toast |

---

## Migration Candidates

### Group A — Direct Migrations (real DOM elements, no DOM changes)

#### A1. ProgressBar — indeterminate animation

**Package:** `react-progress`
**File:** `packages/react-components/react-progress/library/src/components/ProgressBar/useProgressBarStyles.styles.ts`
**Risk:** Low | **Breaking:** No

**Current:** CSS keyframe on the `bar` slot (real DOM element):

- `indeterminateProgressBar`: `left: -33% → left: 100%`, 3s linear infinite
- Reduced-motion fallback: opacity pulse `0.2 → 1 → 0.2`, 3s infinite

**Migration:**

1. Create `progressBarMotions.ts`:
   ```ts
   export const IndeterminateMotion = createMotionComponent({
     keyframes: [{ left: '-33%' }, { left: '100%' }],
     duration: 3000,
     iterations: Infinity,
     easing: motionTokens.curveLinear,
     reducedMotion: {
       keyframes: [{ opacity: 0.2 }, { opacity: 1 }, { opacity: 0.2 }],
       duration: 3000,
       iterations: Infinity,
     },
   });
   ```
2. In `renderProgressBar.tsx`, wrap `<state.bar />` with `<IndeterminateMotion>` when indeterminate.
3. Remove `animationName`/`animationDuration`/`animationTimingFunction`/`animationIterationCount` and the `@media prefers-reduced-motion` block from styles. Keep static layout styles.

**Files to modify:**

- `useProgressBarStyles.styles.ts` — remove animation CSS
- `renderProgressBar.tsx` — wrap bar with motion component
- New: `progressBarMotions.ts`

---

#### A2. Calendar — finish migration, clean up legacy code

**Package:** `react-calendar-compat`
**Files:**

- `packages/react-components/react-calendar-compat/library/src/utils/animations.ts`
- `packages/react-components/react-calendar-compat/library/src/components/CalendarDayGrid/useCalendarDayGridStyles.styles.ts`
- `packages/react-components/react-calendar-compat/library/src/components/CalendarDayGrid/CalendarMonthHeaderRow.tsx`
  **Risk:** Low | **Breaking:** No

**Current:** Most animation constants are deprecated and replaced by `calendarMotions.tsx` (`DirectionalSlide`, `HeaderFade`). But `CalendarDayGrid` still imports `FADE_IN`, `DURATION_2`, `EASING_FUNCTION_2` for the `weekDayLabelCell` fade-in animation.

**Migration:**

1. In `CalendarMonthHeaderRow.tsx`, wrap each `<th>` with `<Fade.In>` (using `motionTokens.durationGentle` to match `DURATION_2`). Motion components use `cloneElement` — no wrapper DOM element, safe inside `<tr>`.
2. Remove `animationDuration`, `animationFillMode`, `animationName`, `animationTimingFunction` from `useWeekDayLabelCellStyles` in `useCalendarDayGridStyles.styles.ts`.
3. Remove the `import { DURATION_2, EASING_FUNCTION_2, FADE_IN } from '../../utils'` line.
4. Mark `FADE_IN`, `DURATION_2`, `EASING_FUNCTION_2` as `@deprecated` in `animations.ts`.

**Files to modify:**

- `CalendarMonthHeaderRow.tsx` — wrap `<th>` with `Fade.In`
- `useCalendarDayGridStyles.styles.ts` — remove animation CSS + import
- `animations.ts` — deprecate remaining exports

---

#### A3. Spinner — root rotation (partial)

**Package:** `react-spinner`
**File:** `packages/react-components/react-spinner/library/src/components/Spinner/useSpinnerStyles.styles.ts`
**Risk:** Medium | **Breaking:** No

**Current:** Root `spinner` slot has a 360° rotation animation (1.5s linear infinite) — this is a real DOM element.

**Migration:**

1. Create `spinnerMotions.ts`:
   ```ts
   export const SpinnerRotation = createMotionComponent({
     keyframes: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
     duration: 1500,
     iterations: Infinity,
     easing: motionTokens.curveLinear,
     reducedMotion: { duration: 1800 },
   });
   ```
2. Wrap `<state.spinner>` with `<SpinnerRotation>` in `renderSpinner.tsx`.
3. Remove root rotation `animationName`/`animationDuration`/etc. from styles.

**Files to modify:**

- `useSpinnerStyles.styles.ts` — remove root rotation CSS
- `renderSpinner.tsx` — wrap spinner with motion component
- New: `spinnerMotions.ts`

---

### Group B — Require Pseudo-Element → Real Element Refactoring

All candidates in this group animate `::before`/`::after` pseudo-elements. The Web Animations API cannot target pseudo-elements, so each requires converting the pseudo-element to a real child DOM element, then wrapping that element with a motion component.

**This is a breaking DOM structure change** — consumers targeting `::before`/`::after` in custom CSS will be affected.

---

#### B1. SkeletonItem — wave/pulse overlay

**Package:** `react-skeleton`
**File:** `packages/react-components/react-skeleton/library/src/components/SkeletonItem/useSkeletonItemStyles.styles.ts`
**Risk:** Medium | **Breaking:** Yes (DOM structure)

**Current:** Two CSS keyframe animations on `::after` pseudo-element:

- `wave`: `translateX(-100%) → translateX(100%)`, 3s infinite, ease-in-out
- `pulse`: opacity `1 ↔ 0.4`, 1s infinite, ease-in-out

**Migration:**

1. Add `animationOverlay` slot (`<span>`) to `SkeletonItem.types.ts`.
2. Initialize slot in `useSkeletonItem.ts`.
3. Render in `renderSkeletonItem.tsx`: `<root><animationOverlay /></root>`.
4. Create `skeletonItemMotions.ts`:

   ```ts
   export const SkeletonWaveMotion = createMotionComponent({
     keyframes: [{ transform: 'translateX(-100%)' }, { transform: 'translateX(100%)' }],
     duration: 3000,
     iterations: Infinity,
     easing: 'ease-in-out',
     reducedMotion: { duration: 1, iterations: 1 },
   });

   export const SkeletonPulseMotion = createMotionComponent({
     keyframes: [{ opacity: 1 }, { opacity: 0.4 }, { opacity: 1 }],
     duration: 1000,
     iterations: Infinity,
     easing: 'ease-in-out',
     reducedMotion: { duration: 1, iterations: 1 },
   });
   ```

5. Wrap `<animationOverlay />` with the appropriate motion component based on `animation` prop.
6. Move `::after` positioning/visual styles to the new slot; remove animation CSS.

**Files to modify:**

- `SkeletonItem.types.ts` — add slot
- `useSkeletonItem.ts` — initialize slot
- `useSkeletonItemStyles.styles.ts` — move styles, remove animation CSS
- `renderSkeletonItem.tsx` — render slot + wrap with motion
- New: `skeletonItemMotions.ts`

---

#### B2. Spinner — tail arc animations (full migration)

**Package:** `react-spinner`
**File:** `packages/react-components/react-spinner/library/src/components/Spinner/useSpinnerStyles.styles.ts`
**Risk:** High | **Breaking:** Yes (DOM structure)

**Current:** `spinnerTail::before` and `::after` have coordinated arc expand/collapse animations using `conic-gradient` backgrounds. They use `animation: inherit` to synchronize timing with the parent.

**Migration:**

1. Convert `spinnerTail::before` and `::after` to two real child `<span>` elements.
2. Move `conic-gradient` backgrounds and positioning to the new elements.
3. Create motion components for arc animations in `spinnerMotions.ts`.
4. Coordinate timing with root rotation (A3 above).

**Complexity:** High — the `animation: inherit` pattern for timing synchronization and multi-element `conic-gradient` choreography need careful porting.

**Files to modify:**

- `Spinner.types.ts` — add slots if needed
- `useSpinner.ts` — initialize new elements
- `useSpinnerStyles.styles.ts` — move pseudo-element styles to real elements
- `renderSpinner.tsx` — render new elements with motion wrappers
- `spinnerMotions.ts` — add arc motion components

---

#### B3. Nav — selection indicator & icon animations

**Package:** `react-nav`
**File:** `packages/react-components/react-nav/library/src/components/sharedNavStyles.styles.ts`
**Risk:** Medium | **Breaking:** Yes (DOM structure)

**Current:**

- **Indicator** (`::after` pseudo-element): `background: transparent → brandColor`, `durationFaster`, `curveLinear`, `animationFillMode: both`
- **Icon fill/unfill** (`.fui-Icon-filled` / `.fui-Icon-regular` children): opacity + color crossfade

**Migration:**

1. **Indicator:** Convert `::after` to a real child `<span>` indicator element. Add as a new slot. Wrap with `Fade` motion component triggered by selection state.
2. **Icon animations:** Target `.fui-Icon-filled`/`.fui-Icon-regular` children. Options:
   - Wrap the `icon` slot with a presence component
   - Or use `createMotionComponent` with a ref attached to the icon element

**Files to modify:**

- `sharedNavStyles.styles.ts` — remove indicator/icon animation CSS
- `NavItem`, `NavCategoryItem`, `NavSubItem`, `AppItem` — types (new slot), hooks, renders
- New: `navMotions.ts` or add to existing shared file

---

#### B4. Focus border animations (7 components, identical pattern)

**Packages:** `react-input`, `react-textarea`, `react-select`, `react-spinbutton`, `react-combobox`, `react-tag-picker`
**Risk:** Medium-High | **Breaking:** Yes (DOM structure)

**Files:**
| Component | Style File |
|-----------|-----------|
| Input | `react-input/.../useInputStyles.styles.ts` |
| Textarea | `react-textarea/.../useTextareaStyles.styles.ts` |
| Select | `react-select/.../useSelectStyles.styles.ts` |
| SpinButton | `react-spinbutton/.../useSpinButtonStyles.styles.ts` |
| Combobox | `react-combobox/.../useComboboxStyles.styles.ts` |
| Dropdown | `react-combobox/.../useDropdownStyles.styles.ts` |
| TagPickerControl | `react-tag-picker/.../useTagPickerControlStyles.styles.ts` |

**Current:** `::after` pseudo-element with `transform: scaleX(0→1)` on `:focus-within`. Enter: `durationNormal`/`curveDecelerateMid`. Exit: `durationUltraFast`/`curveAccelerateMid`.

**Migration:**

1. Create a shared `FocusBorderMotion` utility (e.g., in `react-field` or a shared location).
2. For each component: convert `::after` to a real `<span>` child for the focus indicator.
3. Add React focus state management (`onFocus`/`onBlur` handlers to detect `:focus-within`).
4. Use `createPresenceComponent` with scaleX enter/exit driven by `visible={isFocused}`.
5. Apply to all 7 components using the shared utility.

**Complexity:** Medium per component, high aggregate. The CSS `:focus-within` → React state conversion adds event handler complexity.

---

#### B5. Tab animated indicator

**Package:** `react-tabs`
**File:** `packages/react-components/react-tabs/library/src/components/Tab/useTabAnimatedIndicator.styles.ts`
**Risk:** High | **Breaking:** Yes (DOM structure)

**Current:** `::after` pseudo-element with CSS transition on `transform` (translateX/Y + scaleX/Y), driven by CSS custom properties (`--offset`, `--scale`) set from React state. `durationSlow`, `curveDecelerateMax`.

**Migration:**

1. Convert `::after` to a real `<span>` child element.
2. Use the motion system's `imperativeRef` to programmatically trigger animations when selected tab changes.
3. Calculate target position/scale in React (already done for CSS vars) and animate via `element.animate()` through the imperative API.

**Complexity:** High — the dynamic CSS custom property interpolation is a sophisticated pattern. The imperative API may be needed since target values change on each tab switch.

**Files to modify:**

- `useTabAnimatedIndicator.styles.ts` — remove transition CSS
- `Tab.types.ts` — add indicator slot
- `useTab.ts` — initialize slot
- `renderTab.tsx` — render indicator element with motion

---

#### B6. Avatar — active/inactive ring

**Package:** `react-avatar`
**File:** `packages/react-components/react-avatar/library/src/components/Avatar/useAvatarStyles.styles.ts`
**Risk:** Medium | **Breaking:** Yes (DOM structure)

**Current:** Multi-property CSS transitions on `::before` (ring) and `::after` (shadow):

- `transform` + `margin`: `durationUltraSlow`, `curveEasyEaseMax`
- `opacity`: `durationSlower`, `curveLinear`
- Root element also has active/inactive transitions

**Migration:**

1. Convert `::before` (ring) and `::after` (shadow) to real child `<span>` elements.
2. Create `createPresenceComponent` for the active state, composing multiple atoms with different timings:
   - Scale/margin atom: `durationUltraSlow`, `curveEasyEaseMax`
   - Opacity atom: `durationSlower`, `curveLinear`
3. Drive with `visible={active}` prop.

**Files to modify:**

- `Avatar.types.ts` — add ring/shadow slots
- `useAvatar.ts` — initialize slots
- `useAvatarStyles.styles.ts` — move pseudo-element styles, remove transition CSS
- `renderAvatar.tsx` — render new elements with motion wrappers
- New: `avatarMotions.ts`

---

#### B7. Drawer separator

**Package:** `react-drawer`
**File:** `packages/react-components/react-drawer/library/src/shared/drawerSeparatorStyles.ts`
**Risk:** Low-Medium | **Breaking:** Yes (DOM structure)

**Current:** `::before`/`::after` pseudo-elements with opacity transition, `durationNormal`, `curveEasyEase`. Used by `DrawerHeader` (bottom separator) and `DrawerFooter` (top separator).

**Migration:**

1. Convert separator pseudo-elements to real `<span>` elements in `DrawerHeader`/`DrawerFooter`.
2. Wrap with `Fade` motion component driven by drawer open state.

**Files to modify:**

- `drawerSeparatorStyles.ts` — remove pseudo-element styles
- `DrawerHeader` / `DrawerFooter` — types (new slot), hooks, renders

---

## Implementation Phases

| Phase | Candidates                               | Risk        | Breaking? | Estimated Scope            |
| ----- | ---------------------------------------- | ----------- | --------- | -------------------------- |
| **1** | A1 (ProgressBar), A2 (Calendar)          | Low         | No        | 3 files each               |
| **2** | A3 (Spinner root), B7 (Drawer separator) | Low-Medium  | B7: DOM   | ~4 files each              |
| **3** | B1 (SkeletonItem), B3 (Nav indicators)   | Medium      | Yes: DOM  | ~5 files each              |
| **4** | B4 (Focus borders × 7), B6 (Avatar ring) | Medium-High | Yes: DOM  | ~21 files + shared utility |
| **5** | B5 (Tab indicator), B2 (Spinner full)    | High        | Yes: DOM  | ~5 files each              |

---

## Verification Checklist (per migration)

- [ ] Storybook stories render correctly with visual parity
- [ ] `yarn test` passes for the affected package
- [ ] `prefers-reduced-motion` behavior is preserved
- [ ] No visual regression with existing CSS overrides (for DOM refactors)
- [ ] Infinite animations loop correctly without memory leaks
- [ ] Animation interruptibility works (e.g., rapid focus/blur, state toggles)
- [ ] Cross-browser validation (Chrome, Firefox, Safari)
- [ ] API report (`*.api.md`) updated if public types change
