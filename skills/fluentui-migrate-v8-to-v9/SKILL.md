---
name: fluentui-migrate-v8-to-v9
description: 'Guides migration from Fluent UI React v8 (@fluentui/react) to v9 (@fluentui/react-components). Use when asked to migrate a component or codebase, explain what replaces a v8 component, compare v8 and v9 APIs, or troubleshoot visual/styling issues after migration. Covers: component mapping, prop changes, architectural shifts (FluentProvider, Griffel makeStyles, slots, declarative children), and common troubleshooting.'
---

# Fluent UI v8 → v9 Migration

## Agent Output Template

After completing a migration session, report using this structure:

```
### Migration Report

**Scope:** <files changed> files, <components migrated> component types migrated
**Assumptions logged:** <count> (see inline `// MIGRATION ASSUMPTION:` comments)
**Unresolved deltas:** <list or "none">
**Shims still in place:** <list ShimComponent → target file — or "none">
**Shim removal plan:** <for each shim: target v9 component when ready to replace — or "n/a">
**Reference precedence used:** <component: decision made — or "none">
**Validation evidence:**
  - TypeScript check (<command used>): ✅ / ❌ <error count> (baseline was <baseline count>)
  - lint: ✅ / ❌ / ⏭️ skipped (no linter found)
  - tests: ✅ / ❌ / ⏭️ skipped (no test command found)
  - No remaining @fluentui/react imports: ✅ / ❌ <count remaining>
**Final status:** ✅ Complete / ⚠️ Partial (see unresolved deltas) / ❌ Blocked (<reason>)
```

---

## Migration Workflow

### Step 1 — Assess

**Determine source root first:**

1. Check `tsconfig.json` for `include` or `rootDir` to identify the source root (e.g., `src/`, `app/`, `lib/`)
2. In a monorepo or if multiple `tsconfig.json` files exist, ask the user: _"Which directory or package should I migrate? (e.g., `packages/my-app/src`)"_
3. If no tsconfig exists, default to searching from the repo root (`.`) and adjust from there

Replace `<SOURCE_ROOT>` in the commands below with the path you identified.

**Check for existing migration annotations:**

```sh
grep -rl "@fluent-migrate:" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

- If annotations are found → proceed to Step 3 (annotations are the work queue).
- If nothing is found → tell the user:

  > "No migration annotations found. Please run `npx @fluentui/cli migrate v8-to-v9 --path <SOURCE_ROOT>` first, then re-invoke the skill."

  Stop until the user confirms the CLI has been run.

### Setup Boundary

**Agents do not run installs.** Read `package.json` and report what's missing; the user installs.

Ready-to-proceed conditions (verify before starting Step 3):

- `@fluentui/react-components` is present in `package.json` dependencies
- A `FluentProvider` wrapper exists somewhere in the codebase (or the user has confirmed they will add one)

If either condition is unmet, report what's needed and stop until the user confirms setup is complete.

### Agent Execution Contract

**Phase order:** check for annotations (+ tsc baseline) → if missing, ask user to run CLI → process annotations (`auto` → `scaffold` → `manual` → `no-equivalent`) → validate → report (Output Template above)

**Baseline TypeScript check before starting:** run the repo's TypeScript check command (`tsc --noEmit` or the equivalent in `package.json` scripts) before any changes and record the error count. In the Validation step, report TypeScript as ✅ if post-migration error count ≤ baseline — do not block on pre-existing errors.

**Behavior-preserving default:** when uncertain, preserve existing behavior. Never silently drop functionality.

**Confidence threshold for `manual` annotations:** if you are less than ~80% confident in a mapping, add an inline comment and flag it — do not skip it silently:

```tsx
// MIGRATION ASSUMPTION: GroupedList mapped to Tree (expand/collapse usage detected). Verify if tabular layout was intended.
```

**Stop and escalate when:**

- TypeScript errors remain after processing annotations that you cannot resolve
- A `no-equivalent` annotation has no clear workaround from the component mapping table
- More than 2 unresolved `manual` annotations in the same file

In those cases: commit what's done, fill in the Output Template with status ⚠️ or ❌, list the blockers, and wait for user input.

### Step 2 — User Setup (reference only)

> **Agent note:** do not execute these commands. Report which packages are missing from `package.json` and wait for the user to confirm installation is complete before proceeding to Step 3.

```sh
npm install @fluentui/react-components @fluentui/react-icons
# If running v8 + v9 side-by-side:
npm install @fluentui/react-portal-compat
# Shim package for incremental migration (optional — see below):
npm install @fluentui/react-migration-v8-v9
```

Wrap the app root (or each subtree using v9 components):

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
// If v9 inside v8 Callout/Panel:
import { PortalCompatProvider } from '@fluentui/react-portal-compat';

<FluentProvider theme={webLightTheme}>
  <PortalCompatProvider>
    {' '}
    {/* only if needed */}
    <App />
  </PortalCompatProvider>
</FluentProvider>;
```

### Step 3 — Migrate (annotation-driven)

Process the `@fluent-migrate:` annotations as a work queue. Get all annotations:

```sh
grep -rn "@fluent-migrate:" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

Work through them in this order, removing each annotation comment after applying the change:

#### 1. `auto` annotations — apply mechanically, no questions

```sh
grep -rn "@fluent-migrate:auto" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

Each annotation encodes exactly what to do in its payload. Apply the transformation on the line below the comment and remove the annotation. No user questions needed.

#### 2. `scaffold` annotations — generate boilerplate with TODO placeholders

```sh
grep -rn "@fluent-migrate:scaffold" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

Generate the appropriate boilerplate skeleton with `// TODO:` placeholders. Do **not** fill in semantic values (style values, layout intent, etc.). Remove the annotation on completion.

#### 3. `manual` annotations — read context, apply or ask

```sh
grep -rn "@fluent-migrate:manual" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

Read the surrounding code context to determine intent. The annotation's `note` field lists choices. Apply if confident (>80%), using the component mapping table and per-component references below as reference. If ambiguous, log an assumption comment or ask the user before applying. Remove the annotation on completion.

#### 4. `no-equivalent` annotations — surface to user

```sh
grep -rn "@fluent-migrate:no-equivalent" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

Do not attempt migration. Report each one to the user with the recommended alternative from the deprecation table below. Wait for user direction before proceeding. Remove the annotation only after the user provides a resolution.

#### Verify zero annotations remain

```sh
grep -r "@fluent-migrate:" <SOURCE_ROOT> --include="*.ts" --include="*.tsx"
```

Should return nothing. Any remaining annotations are blockers — include them in the Output Template as unresolved deltas, then proceed to Step 4.

### Step 4 — Validate

Run the host repo's own commands. Do not assume `npx tsc` or `npm test` — check `package.json` scripts first.

**Checklist (all must pass before reporting ✅ Complete):**

- [ ] **TypeScript** — TypeScript check command from `package.json` scripts (or `tsc --noEmit` if none) exits with error count ≤ baseline
- [ ] **Lint** — repo linter (eslint/biome/etc.) exits 0; if no linter found, mark ⏭️ skipped
- [ ] **Tests** — repo test command passes; if no test command found, mark ⏭️ skipped
- [ ] **No remaining v8 imports** — `grep -r "from '@fluentui/react'" <SOURCE_ROOT> --include="*.tsx" --include="*.ts"` returns nothing (only `@fluentui/react-components` imports remain)
- [ ] **Shims tracked** — every `*Shim` import still in the codebase is listed in the Output Template
- [ ] **Accessibility parity** — icon-only buttons have `aria-label`; all form controls have labels via `<Field>` or `<Label>`
- [ ] **No `styles` prop remaining** — `grep -r "styles={" <SOURCE_ROOT> --include="*.tsx"` returns nothing Fluent-related

**Go / No-go:**

- All ✅ → fill Output Template with status ✅ Complete
- Any ❌ → fill Output Template with status ❌ Blocked, list each failure

**Visual / runtime checks (open the app after migration):**

- **Unstyled components** → `FluentProvider` is missing or the component is rendered outside it
- **v9 components inside a v8 Callout / Panel / Modal have no styles** → add `PortalCompatProvider` (see Troubleshooting)
- **Icon-only buttons have no accessible name** → add `aria-label`
- **Form controls have no visible label** → label extraction step was missed; wrap with `<Field label="...">`
- **Console warnings about unknown props** → a v8 prop (e.g. `text`, `iconProps`, `componentRef`) was not removed

---

## Key Architectural Shifts

| Area             | v8                                             | v9                                                               |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| Styling          | Runtime CSS-in-JS via `mergeStyles`            | Build-time atomic CSS via Griffel `makeStyles`                   |
| Theme            | `ThemeProvider` + JS theme object on context   | `FluentProvider` + CSS variables                                 |
| Theme tokens     | Component-specific (`buttonBackgroundHovered`) | Semantic design tokens (`colorNeutralBackground1Hover`)          |
| Style override   | `styles` prop on every component               | `className` prop + `makeStyles`                                  |
| Menu / pickers   | Data-driven (items array)                      | Declarative JSX children                                         |
| Render callbacks | `onRender*` props                              | Slots (accept JSX, shorthand, or render fn)                      |
| Ref              | `componentRef`                                 | `ref` (standard React ref)                                       |
| Aria props       | camelCase (`ariaLabel`)                        | Native HTML (`aria-label`)                                       |
| Icons            | `iconProps={{ iconName: 'Add' }}`              | `icon={<AddRegular />}` from `@fluentui/react-icons`             |
| Form labels      | `label` prop on the control                    | `<Field label="...">` wrapping the control                       |
| Polymorphism     | No `as` prop; use `href` on Button             | `as` prop changes rendered element: `<Button as="a" href="...">` |

## Slot System (v9 Core Concept)

v9 components expose named **slots** instead of `onRender*` callbacks. Every slot prop accepts:

1. **JSX element** — `icon={<AddRegular />}`
2. **Shorthand object** — `label={{ children: 'Name', style: { fontWeight: 'bold' } }}`
3. **`null`** — removes the slot entirely: `icon={null}`
4. **Render function** (advanced) — `icon={(props) => <span {...props} className="my-icon" />}`

```tsx
// v8 — render callback
<Button onRenderIcon={() => <MyIcon />} onRenderText={() => <b>Bold text</b>} />

// v9 — slots
<Button icon={<MyIcon />}>
  <b>Bold text</b>
</Button>

// v9 — shorthand object for extra props
<Button icon={{ children: <MyIcon />, style: { color: 'red' } }}>Label</Button>

// v9 — remove a default slot
<Button icon={null} />  // hides the default icon
```

## `disableButtonEnhancement` on Trigger Components

`MenuTrigger`, `PopoverTrigger`, and `DialogTrigger` automatically wrap their child in a `<button>` unless the child is already interactive. When using FluentUI button components (`Button`, `ToolbarButton`, `SplitButton`, etc.) as a trigger, always add `disableButtonEnhancement` to prevent nested `<button>` in the DOM:

```tsx
// WRONG — Button is already a <button>; without disableButtonEnhancement
// FluentUI wraps it in another <button> → invalid HTML
<MenuTrigger>
  <Button>Open menu</Button>  // ❌ nested <button><button>
</MenuTrigger>

// CORRECT — disableButtonEnhancement tells the trigger not to wrap
<MenuTrigger disableButtonEnhancement>
  <Button>Open menu</Button>  // ✅ single <button>
</MenuTrigger>

// OK — non-button trigger (e.g., custom div) does NOT need it
<PopoverTrigger>
  <div role="button" tabIndex={0}>Click me</div>  // ✅ wrapped in <button> → valid
</PopoverTrigger>
```

Rule of thumb: add `disableButtonEnhancement` when the trigger child is a FluentUI `Button`, `ToolbarButton`, `MenuItem`, `Tab`, or any component that already renders `<button>`.

## Component Mapping

| v8                                | v9                                                         | Notes                                                                                                                                             |
| --------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ActionButton`                    | `Button`                                                   | `appearance="transparent"`                                                                                                                        |
| `Breadcrumb`                      | `Breadcrumb`                                               | `items` array → declarative `BreadcrumbItem`/`BreadcrumbButton`/`BreadcrumbLink` children — see [breadcrumb.md](references/breadcrumb.md)         |
| `Calendar`                        | `CalendarCompat`                                           | `@fluentui/react-calendar-compat`                                                                                                                 |
| `Callout`                         | `Popover`                                                  | Composable trigger/surface; `target` ref → `PopoverTrigger` — see [callout.md](references/callout.md)                                             |
| `Checkbox`                        | `Checkbox`                                                 | API mostly same                                                                                                                                   |
| `ChoiceGroup`                     | `RadioGroup`                                               | Renamed; options array → `Radio` children                                                                                                         |
| `Coachmark`                       | `TeachingPopover`                                          | Composable trigger/surface/header/body/footer — see [teachingpopover.md](references/teachingpopover.md)                                           |
| `CommandBar` / `CommandBarButton` | `Toolbar`                                                  | Data-driven → JSX children — see [toolbar.md](references/toolbar.md)                                                                              |
| `CommandButton`                   | `MenuButton`                                               |                                                                                                                                                   |
| `CompoundButton`                  | `CompoundButton`                                           | New package                                                                                                                                       |
| `ColorPicker`                     | `ColorPicker`                                              | New v9 API; `IColor` → `HSV`, `onChange` → `onColorChange` — see [colorpicker.md](references/colorpicker.md)                                      |
| `ComboBox`                        | `Combobox`                                                 | options array → `Option` children — see [dropdown.md](references/dropdown.md)                                                                     |
| `ContextualMenu`                  | `Menu`                                                     | Data-driven → JSX children — see [menu.md](references/menu.md)                                                                                    |
| `DatePicker`                      | `DatePickerCompat`                                         | `@fluentui/react-datepicker-compat`                                                                                                               |
| `DefaultButton`                   | `Button`                                                   |                                                                                                                                                   |
| `DetailsList`                     | `DataGrid` / `Table`                                       | Read-only/simple tabular → `Table`+`TableHeader`+`TableRow`+`TableCell`; selection+sort → `DataGrid` — see [datagrid.md](references/datagrid.md)  |
| `Dialog`                          | `Dialog`                                                   | Composable children; `hidden` → `open` (inverted) — see [dialog.md](references/dialog.md)                                                         |
| `DocumentCard`                    | `Card`                                                     | `DocumentCard*` → `Card`/`CardHeader`/`CardFooter`/`CardPreview` — see [card.md](references/card.md)                                              |
| `Dropdown`                        | `Dropdown`                                                 | options array → `Option` children — see [dropdown.md](references/dropdown.md)                                                                     |
| `Fabric`                          | `FluentProvider`                                           |                                                                                                                                                   |
| `Facepile`                        | `AvatarGroup`                                              | personas array → children                                                                                                                         |
| `FocusTrapZone`                   | `Dialog` / `Popover trapFocus` / `@fluentui/react-tabster` | Built-in v9 components handle trapping; for custom traps: `import { useFocusFinders } from '@fluentui/react-tabster'`                             |
| `FocusZone`                       | `@fluentui/react-tabster`                                  | Arrow-key navigation: `useMergedTabsterAttributes_unstable` or use components that handle it natively (TabList, Menu, etc.)                       |
| `GroupedList`                     | `Tree` / `List` / `DataGrid`                               | Depends on usage (expand/collapse → Tree; flat list → List; tabular → DataGrid) — see [tree.md](references/tree.md)                               |
| `Icon`                            | `@fluentui/react-icons`                                    | SVG components                                                                                                                                    |
| `IconButton`                      | `Button`                                                   | Use `icon` slot only, no text                                                                                                                     |
| `Image`                           | `Image`                                                    | `imageFit` → `fit`; no wrapper div; `shouldFadeIn` removed — see [image.md](references/image.md)                                                  |
| `Label`                           | `Label`                                                    | Custom required indicator; prefer `<Field>` for form controls — see [label.md](references/label.md)                                               |
| `Layer`                           | `Portal`                                                   |                                                                                                                                                   |
| `Link`                            | `Link`                                                     | `inline` prop for prose context; `appearance="subtle"`; `disabledFocusable` — see [link.md](references/link.md)                                   |
| `List`                            | `List`                                                     | `items`+`onRenderCell` → `<ListItem>` children; `navigationMode`/`selectionMode` added — see [list.md](references/list.md)                        |
| `MessageBar`                      | `MessageBar`                                               | Composable children; `messageBarType` → `intent` — see [messagebar.md](references/messagebar.md)                                                  |
| `Modal`                           | `Dialog`                                                   | `isOpen` → `open`; `isBlocking` → `modalType` — see [dialog.md](references/dialog.md)                                                             |
| `Nav`                             | `Nav`                                                      | `groups` array → declarative `NavItem`/`NavCategory` children; `NavDrawer` for side panels — see [nav.md](references/nav.md)                      |
| `OverflowSet`                     | `Overflow`                                                 | Hook-based; `onRenderItem`/`onRenderOverflowButton` → `OverflowItem` + `useOverflowMenu` — see [overflow.md](references/overflow.md)              |
| `Overlay`                         | `Portal`                                                   |                                                                                                                                                   |
| `Panel`                           | `OverlayDrawer`                                            | `isOpen`/`type`/`onRenderFooterContent` restructured — see [drawer.md](references/drawer.md)                                                      |
| `Popup`                           | `Popover` / `Dialog`                                       | Non-modal overlay → `Popover`; blocking/modal behavior → `Dialog`                                                                                 |
| `PeoplePicker`                    | `TagPicker`                                                | `onResolveSuggestions` → filter `<TagPickerOption>` children; composable structure — see [tagpicker.md](references/tagpicker.md)                  |
| `Persona`                         | `Persona`                                                  | Slot-based; flat image/initials props → `avatar` slot; `PersonaPresence` enum → string status — see [persona.md](references/persona.md)           |
| `Pivot` / `PivotItem`             | `TabList` / `Tab`                                          | Content moves outside TabList — see [tabs.md](references/tabs.md)                                                                                 |
| `PrimaryButton`                   | `Button`                                                   | `appearance="primary"`                                                                                                                            |
| `ProgressIndicator`               | `ProgressBar`                                              | `percentComplete` → `value`; label → `<Field>` — see [progressbar.md](references/progressbar.md)                                                  |
| `Rating`                          | `Rating`                                                   | `rating` → `value`; `readOnly` → `RatingDisplay`; `icon` string → `iconFilled`/`iconOutline` components — see [rating.md](references/rating.md)   |
| `SearchBox`                       | `SearchBox`                                                | `onSearch` → `onKeyDown`; `onClear` → `onChange` with `''`; `underlined` → `appearance="underline"` — see [searchbox.md](references/searchbox.md) |
| `Separator`                       | `Divider`                                                  | Simple rename; new `appearance`/`inset` props — see [separator.md](references/separator.md)                                                       |
| `Shimmer`                         | `Skeleton`                                                 | `isDataLoaded` removed; `shimmerElements` → `<SkeletonItem>` children — see [skeleton.md](references/skeleton.md)                                 |
| `Slider`                          | `Slider`                                                   | New package; label extraction, `onChange` type change — see [slider.md](references/slider.md)                                                     |
| `SpinButton`                      | `SpinButton`                                               | New package; label extraction, `onChange` type change — see [spinbutton.md](references/spinbutton.md)                                             |
| `Spinner`                         | `Spinner`                                                  | `SpinnerSize` enum → string `size`; `labelPosition` renamed — see [spinner.md](references/spinner.md)                                             |
| `SplitButton`                     | `SplitButton` with `Menu` trigger                          |                                                                                                                                                   |
| `Stack` / `StackItem`             | `makeStyles` + flexbox                                     | No v9 equivalent — see [stack.md](references/stack.md)                                                                                            |
| `SwatchColorPicker`               | `SwatchPicker`                                             | `colorCells` array → `<ColorSwatch>` children; `onChange` → `onSelectionChange` — see [swatchpicker.md](references/swatchpicker.md)               |
| `TagPicker`                       | `TagPicker`                                                | `onResolveSuggestions` → filter `<TagPickerOption>` children — see [tagpicker.md](references/tagpicker.md)                                        |
| `TeachingBubble`                  | `TeachingPopover`                                          | Composable trigger/surface/header/body/footer — see [teachingpopover.md](references/teachingpopover.md)                                           |
| `Text`                            | `Text`                                                     | `variant` → `size`+`weight`; `nowrap` → `wrap={false}`; use presets (`Body1`, `Title2`, etc.) — see [text.md](references/text.md)                 |
| `TextField`                       | `Input` / `Textarea`                                       | multiline → Textarea — see [input.md](references/input.md)                                                                                        |
| `ThemeProvider`                   | `FluentProvider`                                           | see [theme.md](references/theme.md)                                                                                                               |
| `TimePicker`                      | `TimePickerCompat`                                         | `@fluentui/react-timepicker-compat`                                                                                                               |
| `Toggle`                          | `Switch`                                                   | `onText`/`offText` removed; `onChange` type changed; `inlineLabel` → `labelPosition` — see [switch.md](references/switch.md)                      |
| `ToggleButton`                    | `ToggleButton`                                             | New package                                                                                                                                       |
| `Tooltip`                         | `Tooltip`                                                  | Children = trigger; `directionalHint` → `positioning`; `relationship` required — see [tooltip.md](references/tooltip.md)                          |

### New in v9 (no v8 equivalent)

`Accordion`, `Avatar`, `AvatarGroup`, `Badge` / `CounterBadge` / `PresenceBadge`, `Carousel`, `Drawer`, `InfoLabel`, `Popover`, `Toast` / `Toaster`, `TabList`

#### Toast / Toaster (quick start)

v9 provides a first-class toast system. If the v8 codebase used a third-party library (react-toastify, etc.) or custom toast state, migrate to `Toaster`:

```tsx
import { useToastController, Toaster, Toast, ToastTitle, ToastBody } from '@fluentui/react-components';

// 1. Mount <Toaster> once near the root (inside FluentProvider):
<Toaster toasterId="main" />;

// 2. Dispatch toasts from anywhere using the controller hook:
const { dispatchToast } = useToastController('main');

dispatchToast(
  <Toast>
    <ToastTitle>Upload complete</ToastTitle>
    <ToastBody>Your file has been saved.</ToastBody>
  </Toast>,
  { intent: 'success' },
);
```

`intent` values: `"info"` (default) | `"success"` | `"warning"` | `"error"`.

#### InfoLabel (quick start)

`InfoLabel` combines a `Label` with an info icon that shows a `Tooltip`. Use it to replace the v8 pattern of `TooltipHost` wrapping an info icon placed beside a `Label`:

```tsx
// v8 — manual pattern: label + TooltipHost + info icon
import { Label, TooltipHost } from '@fluentui/react';
<TooltipHost content="This field is required for billing.">
  <Label htmlFor="field">
    Invoice number <Icon iconName="Info" />
  </Label>
</TooltipHost>;

// v9 — InfoLabel (built-in)
import { InfoLabel } from '@fluentui/react-components';
<InfoLabel info="This field is required for billing." htmlFor="field">
  Invoice number
</InfoLabel>;
```

### Deprecated with no v9 equivalent

| v8                 | Recommended alternative                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `ActivityItem`     | Build with `Avatar` + `Text` + `makeStyles` flexbox layout                                                       |
| `Announced`        | Use a visually-hidden live region: `<div role="status" aria-live="polite" aria-atomic="true">...</div>`          |
| `HoverCard`        | Use `<Popover>` with `onMouseEnter`/`onMouseLeave` on the trigger (or `openOnHover` prop if available)           |
| `MarqueeSelection` | Use browser selection APIs or a custom `onPointerDown`/`onPointerMove` drag-select implementation                |
| `Pickers`          | Use `TagPicker` (multi-select) or `Combobox`/`Dropdown` (single/multi-select) — see tagpicker.md and dropdown.md |
| `ResizeGroup`      | Use the `Overflow` component (`<Overflow>` + `<OverflowItem>`) — see [overflow.md](references/overflow.md)       |
| `ScrollablePane`   | Use `overflow: auto` on a CSS container + `position: sticky` for sticky headers; no FluentUI wrapper needed      |

---

## Common Troubleshooting

**Components render with no styles**
Wrap the app (or subtree) with `FluentProvider`:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
<FluentProvider theme={webLightTheme}>
  <App />
</FluentProvider>;
```

**v9 components inside v8 `Callout` / `Panel` have no styles**
v8 portals render their children outside the `FluentProvider` DOM subtree, so v9 CSS variable injection doesn't reach them. Fix: add `PortalCompatProvider` inside `FluentProvider` — it makes v8 portals inherit the v9 theme context.

```tsx
import { PortalCompatProvider } from '@fluentui/react-portal-compat';
<FluentProvider>
  <PortalCompatProvider>{/* app */}</PortalCompatProvider>
</FluentProvider>;
```

**v8 `Callout` appears beneath a v9 `Dialog` (z-index stacking)**
v9 portals render to `document.body` by default, appearing above the v8 layer host even when they shouldn't. Fix: tell v9 portals to mount inside the same v8 layer host so both share the same stacking context.

```tsx
import { PortalMountNodeProvider } from '@fluentui/react-components';
const mountNode = document.getElementById('fluent-default-layer-host');
<FluentProvider>
  <PortalMountNodeProvider mountNode={mountNode}>{/* app */}</PortalMountNodeProvider>
</FluentProvider>;
```

**When to use which:**

- `PortalCompatProvider` — v9 components _inside_ a v8 portal have no styles (theme context problem)
- `PortalMountNodeProvider` — v9 and v8 portals have wrong z-order relative to each other (stacking problem)

**`styles` prop no longer exists**
Replace with `makeStyles` + `className`:

```tsx
// v8
<Button styles={{ root: { color: 'red' } }} />;

// v9
const useStyles = makeStyles({ btn: { color: 'red' } });
const s = useStyles();
<Button className={s.btn} />;
```

---

## Shim Package — Incremental Migration

`@fluentui/react-migration-v8-v9` provides shim components that **accept v8 props but render v9 components**. Use them to unblock the build during incremental migration, then replace shims with native v9 components file-by-file.

**Strategy:** swap the import path + add `Shim` suffix → build passes → migrate to native v9 → remove shim.

### Available shims

| Shim                 | Replaces                          | Import                            |
| -------------------- | --------------------------------- | --------------------------------- |
| `DefaultButtonShim`  | `DefaultButton`                   | `@fluentui/react-migration-v8-v9` |
| `PrimaryButtonShim`  | `PrimaryButton`                   | `@fluentui/react-migration-v8-v9` |
| `ActionButtonShim`   | `ActionButton`                    | `@fluentui/react-migration-v8-v9` |
| `CommandButtonShim`  | `CommandButton`                   | `@fluentui/react-migration-v8-v9` |
| `CompoundButtonShim` | `CompoundButton`                  | `@fluentui/react-migration-v8-v9` |
| `MenuButtonShim`     | `MenuButton` (v8)                 | `@fluentui/react-migration-v8-v9` |
| `ToggleButtonShim`   | `ToggleButton` (v8)               | `@fluentui/react-migration-v8-v9` |
| `CheckboxShim`       | `Checkbox`                        | `@fluentui/react-migration-v8-v9` |
| `MenuItemShim`       | `ContextualMenuItem` item objects | `@fluentui/react-migration-v8-v9` |
| `StackShim`          | `Stack`                           | `@fluentui/react-migration-v8-v9` |
| `StackItemShim`      | `Stack.Item`                      | `@fluentui/react-migration-v8-v9` |

### Usage pattern

```tsx
// Step 1 — swap import to shim (v8 props still work, component now renders v9)
import { PrimaryButtonShim as PrimaryButton } from '@fluentui/react-migration-v8-v9';

// No other changes needed — v8 props are accepted as-is:
<PrimaryButton text="Submit" onClick={handleSubmit} />;

// Step 2 — later, replace with native v9
import { Button } from '@fluentui/react-components';
<Button appearance="primary" onClick={handleSubmit}>
  Submit
</Button>;
```

### Theme helpers

```ts
import { createV8Theme, createV9Theme, createBrandVariants } from '@fluentui/react-migration-v8-v9';

// Make v8 components match your v9 theme during side-by-side migration:
const v8CompatTheme = createV8Theme(myV9Theme, myBrandVariants);

// Make v9 components match your existing v8 theme:
const v9CompatTheme = createV9Theme(myV8Theme);

// Derive a v9 BrandVariants ramp from a v8 IPalette:
const brandVariants = createBrandVariants(myV8Palette);
```

---

## Per-Component Detail References

> **Reference Precedence Rule:** per-component files in `references/` are more specific than this file. When they conflict, trust the reference file.

Load the relevant file when doing detailed migration work on a specific component:

- **Icons** (`iconProps` → `@fluentui/react-icons`, name mapping) → [references/icons.md](references/icons.md)
- **Button** (all variants, full prop table) → [references/button.md](references/button.md)
- **Checkbox** (`indeterminate` → `checked="mixed"`, CheckboxShim) → [references/checkbox.md](references/checkbox.md)
- **ChoiceGroup / RadioGroup** (`options` array → `Radio` children) → [references/radiogroup.md](references/radiogroup.md)
- **Facepile / AvatarGroup** (`personas` array → children) → [references/avatargroup.md](references/avatargroup.md)
- **Menu / ContextualMenu** (data-driven → JSX) → [references/menu.md](references/menu.md)
- **TextField / Input / Textarea** → [references/input.md](references/input.md)
- **Pivot / TabList** (content separation) → [references/tabs.md](references/tabs.md)
- **SpinButton** (label extraction, `onChange` signature change) → [references/spinbutton.md](references/spinbutton.md)
- **Slider** (label extraction, `onChange` signature change, `showValue` removed) → [references/slider.md](references/slider.md)
- **Stack → makeStyles flexbox** → [references/stack.md](references/stack.md)
- **Theme / FluentProvider / makeStyles** → [references/theme.md](references/theme.md)
- **Dialog / Modal** (composable structure, `hidden` inversion, `modalType`) → [references/dialog.md](references/dialog.md)
- **Dropdown / Combobox** (options array → `Option` children, `onOptionSelect`) → [references/dropdown.md](references/dropdown.md)
- **DetailsList / DataGrid** (column definitions, selection Set, sort) → [references/datagrid.md](references/datagrid.md)
- **Panel / Drawer** (`PanelType` → position + size, `DrawerHeader`, `DrawerBody`) → [references/drawer.md](references/drawer.md)
- **Tooltip** (`directionalHint` → `positioning`, `relationship` prop, forwardRef trigger) → [references/tooltip.md](references/tooltip.md)
- **MessageBar** (`messageBarType` → `intent`, composable body/actions) → [references/messagebar.md](references/messagebar.md)
- **Spinner** (`SpinnerSize` enum → string `size`, `labelPosition` renames) → [references/spinner.md](references/spinner.md)
- **ProgressIndicator → ProgressBar** (`percentComplete` → `value`, label → `<Field>`) → [references/progressbar.md](references/progressbar.md)
- **Callout → Popover** (composable trigger/surface, `directionalHint` → `positioning`, `trapFocus`) → [references/callout.md](references/callout.md)
- **CommandBar → Toolbar** (data-driven → JSX children, overflow with `Overflow`/`OverflowItem`) → [references/toolbar.md](references/toolbar.md)
- **ColorPicker** (`IColor` → `HSV`, `onChange` → `onColorChange`, sub-component renames) → [references/colorpicker.md](references/colorpicker.md)
- **Keytips** (now in `@fluentui/react-keytips` contrib, `KeytipLayer` → `Keytips`, `useKeytipRef` changes) → [references/keytips.md](references/keytips.md)
- **Card / CardHeader / CardFooter / CardPreview** → [references/card.md](references/card.md)
- **Image** → [references/image.md](references/image.md)
- **Label** → [references/label.md](references/label.md)
- **Textarea** (`TextField multiline` → `Textarea`) → [references/textarea.md](references/textarea.md)
- **Separator → Divider** → [references/separator.md](references/separator.md)
- **Charts** (`@fluentui/react-charting` → `@fluentui/react-charts`, native v9 + FluentProvider) → [references/charts.md](references/charts.md)
- **Link** (`inline` prop for prose, `appearance="subtle"`, `disabledFocusable`) → [references/link.md](references/link.md)
- **SearchBox** (`onSearch` → `onKeyDown`, `onClear` → `onChange` with `''`, `underlined` → `appearance`) → [references/searchbox.md](references/searchbox.md)
- **Persona** (slot-based; `imageUrl`/`imageInitials`/`presence` → slots; size/presence enum → string) → [references/persona.md](references/persona.md)
- **Nav** (`groups` array → `NavItem`/`NavCategory` JSX; `NavDrawer` for side panels) → [references/nav.md](references/nav.md)
- **OverflowSet → Overflow** (hook-based; `onRenderItem` → `OverflowItem`; `useOverflowMenu`) → [references/overflow.md](references/overflow.md)
- **GroupedList → Tree / List / DataGrid** (choose target by usage; `items`+`groups` → declarative `TreeItem` children) → [references/tree.md](references/tree.md)
- **TagPicker / PeoplePicker** (`onResolveSuggestions` → filter `TagPickerOption` children; composable structure) → [references/tagpicker.md](references/tagpicker.md)
- **Toggle → Switch** (`onText`/`offText` removed; `onChange` type changed; `inlineLabel` → `labelPosition`) → [references/switch.md](references/switch.md)
- **Shimmer → Skeleton** (`isDataLoaded` removed; `shimmerElements` → `<SkeletonItem>` JSX) → [references/skeleton.md](references/skeleton.md)
- **TeachingBubble / Coachmark → TeachingPopover** (composable; multi-step carousel support) → [references/teachingpopover.md](references/teachingpopover.md)
- **Rating** (`rating` → `value`; `readOnly` → `RatingDisplay`; `icon` string → component type; half-star `step`) → [references/rating.md](references/rating.md)
- **Breadcrumb** (`items` array → `BreadcrumbItem`/`BreadcrumbButton`/`BreadcrumbLink` JSX; overflow via `Overflow`) → [references/breadcrumb.md](references/breadcrumb.md)
- **Text** (`variant` → `size`+`weight`; `nowrap` → `wrap={false}`; use presets `Body1`, `Title2`, etc.) → [references/text.md](references/text.md)
- **List** (`items`+`onRenderCell` → `<ListItem>` children; `navigationMode`; `selectionMode`; `onAction`) → [references/list.md](references/list.md)
- **SwatchColorPicker → SwatchPicker** (`colorCells` → `<ColorSwatch>` children; `onChange` → `onSelectionChange`; `ImageSwatch`/`EmptySwatch`) → [references/swatchpicker.md](references/swatchpicker.md)
