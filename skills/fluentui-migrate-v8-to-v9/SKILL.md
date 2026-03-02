---
name: fluentui-migrate-v8-to-v9
description: 'Guides migration from Fluent UI React v8 (@fluentui/react) to v9 (@fluentui/react-components). Use when asked to migrate a component or codebase, explain what replaces a v8 component, compare v8 and v9 APIs, or troubleshoot visual/styling issues after migration. Covers: component mapping, prop changes, architectural shifts (FluentProvider, Griffel makeStyles, slots, declarative children), and common troubleshooting.'
---

# Fluent UI v8 → v9 Migration

## Migration Workflow

### Step 1 — Assess

Find all files using v8:

```sh
# All files importing from @fluentui/react
grep -rl "@fluentui/react" src/ --include="*.tsx" --include="*.ts"

# Tally component usage to prioritize
grep -rh "from '@fluentui/react'" src/ | sort | uniq -c | sort -rn
```

Identify which components are used and how many times. Migrate high-count simple components first.

### Step 2 — Setup

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

### Step 3 — Migrate (file by file)

**Recommended order within a file:**

1. Update import statements (`@fluentui/react` → `@fluentui/react-components`)
2. Rename components per the mapping table below
3. Apply universal prop renames (applies to every component):
   - `componentRef` → `ref`
   - `ariaLabel` → `aria-label`
   - `ariaHidden` → `aria-hidden`
   - `ariaDescribedBy` → `aria-describedby`
   - `ariaLabelledBy` → `aria-labelledby`
   - Remove `styles` prop → replace with `makeStyles` + `className`
   - Combine class names with `mergeClasses(s.a, s.b, extra)` (replaces `cx` / `mergeStyles` for className composition)
   - Remove `theme` prop → handled by `FluentProvider`
4. Apply component-specific prop changes (see reference files below)
5. Replace v8-only utility imports (no v9 equivalent — remove the import and use the native alternative):
   - `useBoolean` → `React.useState<boolean>(false)` (`const [open, setOpen] = React.useState(false)`)
   - `KeyCodes.enter` / `KeyCodes.escape` → `event.key === 'Enter'` / `event.key === 'Escape'`
   - `NeutralColors.xxx` / `SharedColors.xxx` → `tokens.colorXxx` inside `makeStyles`
   - `mergeStyleSets` / `concatStyleSets` → `makeStyles` + `mergeClasses`
   - `getRTL()` / `rtl` on ThemeProvider → `dir="rtl"` prop on `FluentProvider`
   - `getTheme()` → use `tokens` in `makeStyles`; `createTheme()` → `createLightTheme(brandVariants)`
   - `getId('prefix')` → `useId('prefix')` from `@fluentui/react-components` (hook — call inside component)
6. Extract `label` props from form controls (TextField, SpinButton, Slider, ChoiceGroup):
   - **Preferred:** wrap the control in `<Field>` — it handles label, `required`, `validationMessage`, and `validationState` via context without any `useId` wiring:
     ```tsx
     import { Field, Input } from '@fluentui/react-components';
     <Field label="Email" required validationState="error" validationMessage="Required">
       <Input />
     </Field>;
     ```
   - **Alternative (manual):** separate `<Label htmlFor={id}>` + `useId` from `@fluentui/react-components`
7. Migrate `iconProps={{ iconName: 'X' }}` → `icon={<XRegular />}` (see [icons.md](references/icons.md))

**Recommended migration order across files:**

1. Simple renames with no API change (Separator→Divider, Toggle→Switch, Shimmer→Skeleton, etc.)
2. Components with prop renames only (Button, Checkbox, Tabs/Pivot, Input/TextField)
3. Components requiring label extraction (SpinButton, ChoiceGroup→RadioGroup, Slider)
4. Architectural changes (ContextualMenu→Menu JSX children, Stack→makeStyles, ThemeProvider→FluentProvider)

### Step 4 — Verify

```sh
# After each file or batch — catch type errors early:
npx tsc --noEmit

# Confirm no v8 imports remain:
grep -r "from '@fluentui/react'" src/ --include="*.tsx" --include="*.ts"
# Should only show @fluentui/react-components imports
```

**Visual / runtime checks (open the app after each batch):**

- **Unstyled components** (raw HTML with no Fluent design) → `FluentProvider` is missing or the component is rendered outside it
- **v9 components inside a v8 Callout / Panel / Modal have no styles** → add `PortalCompatProvider` (see Troubleshooting)
- **Icon-only buttons have no accessible name** → add `aria-label` to every button that has only an `icon` slot and no visible text
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

| v8                                | v9                                | Notes                                                                                                                    |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `ActionButton`                    | `Button`                          | `appearance="transparent"`                                                                                               |
| `Breadcrumb`                      | `Breadcrumb`                      | New package                                                                                                              |
| `Calendar`                        | `CalendarCompat`                  | `@fluentui/react-calendar-compat`                                                                                        |
| `Callout`                         | `Popover`                         | Composable trigger/surface; `target` ref → `PopoverTrigger` — see [callout.md](references/callout.md)                    |
| `Checkbox`                        | `Checkbox`                        | API mostly same                                                                                                          |
| `ChoiceGroup`                     | `RadioGroup`                      | Renamed; options array → `Radio` children                                                                                |
| `Coachmark`                       | `TeachingPopover`                 |                                                                                                                          |
| `CommandBar` / `CommandBarButton` | `Toolbar`                         | Data-driven → JSX children — see [toolbar.md](references/toolbar.md)                                                     |
| `CommandButton`                   | `MenuButton`                      |                                                                                                                          |
| `CompoundButton`                  | `CompoundButton`                  | New package                                                                                                              |
| `ComboBox`                        | `Combobox`                        | options array → `Option` children — see [dropdown.md](references/dropdown.md)                                            |
| `ContextualMenu`                  | `Menu`                            | Data-driven → JSX children — see [menu.md](references/menu.md)                                                           |
| `DatePicker`                      | `DatePickerCompat`                | `@fluentui/react-datepicker-compat`                                                                                      |
| `DefaultButton`                   | `Button`                          |                                                                                                                          |
| `DetailsList`                     | `DataGrid`                        | columns/selection/sort API restructured — see [datagrid.md](references/datagrid.md)                                      |
| `Dialog`                          | `Dialog`                          | Composable children; `hidden` → `open` (inverted) — see [dialog.md](references/dialog.md)                                |
| `DocumentCard`                    | `Card`                            |                                                                                                                          |
| `Dropdown`                        | `Dropdown`                        | options array → `Option` children — see [dropdown.md](references/dropdown.md)                                            |
| `Fabric`                          | `FluentProvider`                  |                                                                                                                          |
| `Facepile`                        | `AvatarGroup`                     | personas array → children                                                                                                |
| `FocusTrapZone` / `FocusZone`     | Tabster                           | https://tabster.io                                                                                                       |
| `GroupedList`                     | `Tree`                            |                                                                                                                          |
| `Icon`                            | `@fluentui/react-icons`           | SVG components                                                                                                           |
| `IconButton`                      | `Button`                          | Use `icon` slot only, no text                                                                                            |
| `Image`                           | `Image`                           | New package                                                                                                              |
| `Label`                           | `Label`                           | New package                                                                                                              |
| `Layer`                           | `Portal`                          |                                                                                                                          |
| `Link`                            | `Link`                            | Better accessibility                                                                                                     |
| `List`                            | `List`                            | Performance improvements                                                                                                 |
| `MessageBar`                      | `MessageBar`                      | Composable children; `messageBarType` → `intent` — see [messagebar.md](references/messagebar.md)                         |
| `Modal`                           | `Dialog`                          | `isOpen` → `open`; `isBlocking` → `modalType` — see [dialog.md](references/dialog.md)                                    |
| `Nav`                             | `Nav`                             | New package                                                                                                              |
| `OverflowSet`                     | `Overflow`                        |                                                                                                                          |
| `Overlay`                         | `Portal`                          |                                                                                                                          |
| `Panel`                           | `OverlayDrawer`                   | `isOpen`/`type`/`onRenderFooterContent` restructured — see [drawer.md](references/drawer.md)                             |
| `PeoplePicker`                    | `TagPicker`                       |                                                                                                                          |
| `Persona`                         | `Persona`                         | New package                                                                                                              |
| `Pivot` / `PivotItem`             | `TabList` / `Tab`                 | Content moves outside TabList — see [tabs.md](references/tabs.md)                                                        |
| `PrimaryButton`                   | `Button`                          | `appearance="primary"`                                                                                                   |
| `ProgressIndicator`               | `ProgressBar`                     | `percentComplete` → `value`; label → `<Field>` — see [progressbar.md](references/progressbar.md)                         |
| `Rating`                          | `Rating`                          |                                                                                                                          |
| `SearchBox`                       | `SearchBox`                       | New package                                                                                                              |
| `Separator`                       | `Divider`                         |                                                                                                                          |
| `Shimmer`                         | `Skeleton`                        |                                                                                                                          |
| `Slider`                          | `Slider`                          | New package; label extraction, `onChange` type change — see [slider.md](references/slider.md)                            |
| `SpinButton`                      | `SpinButton`                      | New package; label extraction, `onChange` type change — see [spinbutton.md](references/spinbutton.md)                    |
| `Spinner`                         | `Spinner`                         | `SpinnerSize` enum → string `size`; `labelPosition` renamed — see [spinner.md](references/spinner.md)                    |
| `SplitButton`                     | `SplitButton` with `Menu` trigger |                                                                                                                          |
| `Stack` / `StackItem`             | `makeStyles` + flexbox            | No v9 equivalent — see [stack.md](references/stack.md)                                                                   |
| `SwatchColorPicker`               | `SwatchPicker`                    |                                                                                                                          |
| `TagPicker`                       | `TagPicker`                       | New package                                                                                                              |
| `TeachingBubble`                  | `TeachingPopover`                 |                                                                                                                          |
| `Text`                            | `Text`                            | New package                                                                                                              |
| `TextField`                       | `Input` / `Textarea`              | multiline → Textarea — see [input.md](references/input.md)                                                               |
| `ThemeProvider`                   | `FluentProvider`                  | see [theme.md](references/theme.md)                                                                                      |
| `TimePicker`                      | `TimePickerCompat`                | `@fluentui/react-timepicker-compat`                                                                                      |
| `Toggle`                          | `Switch`                          |                                                                                                                          |
| `ToggleButton`                    | `ToggleButton`                    | New package                                                                                                              |
| `Tooltip`                         | `Tooltip`                         | Children = trigger; `directionalHint` → `positioning`; `relationship` required — see [tooltip.md](references/tooltip.md) |

### New in v9 (no v8 equivalent)

`Accordion`, `Avatar`, `AvatarGroup`, `Badge` / `CounterBadge` / `PresenceBadge`, `Carousel`, `Drawer`, `InfoLabel`, `Popover`, `ProgressBar`, `Skeleton`, `Switch`, `SwatchPicker`, `Toast` / `Toaster`, `TeachingPopover`, `TabList`

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

### Deprecated with no v9 equivalent

`ActivityItem`, `Announced`, `HoverCard`, `MarqueeSelection`, `Pickers`, `ResizeGroup`, `ScrollablePane`

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
