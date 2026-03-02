# Codemod Catalog: FluentUI v8 → v9

This catalog classifies every known v8→v9 migration pattern by how much can be automated.

## Tier Classification

| Tier  | Label      | Definition                                                                                     |
| ----- | ---------- | ---------------------------------------------------------------------------------------------- |
| **1** | Mechanical | Safe, idempotent, 1:1 transforms. Full automation with high confidence.                        |
| **2** | Partial    | Automatable with caveats — value transforms, structural prop moves, require validation.        |
| **3** | Manual     | Architectural changes requiring human judgment. Flag with TODO comment, do not auto-transform. |

---

## Tier 1 — Mechanical (Safe to Automate)

### 1.1 Deprecated Package Imports → Supported Packages

> Codemod name: `deprecated-packages`

| Deprecated import             | Replacement                           | Extra action                                                     |
| ----------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| `@fluentui/react-alert`       | `@fluentui/react-toast`               | Add `// TODO: also consider @fluentui/react-message-bar` comment |
| `@fluentui/react-infobutton`  | `@fluentui/react-infolabel`           | Rename `InfoButton` → `InfoLabel` in same file                   |
| `@fluentui/react-virtualizer` | `@fluentui-contrib/react-virtualizer` |                                                                  |

**Source of truth**: `packages/react-components/deprecated/*/README.md`

### 1.2 Hook Import Migration

| v8 import                            | v9 import                                |
| ------------------------------------ | ---------------------------------------- |
| `useId` from `@fluentui/react-hooks` | `useId` from `@fluentui/react-utilities` |

### 1.3 Deprecated Props → Supported Replacements

> Codemod name: `deprecated-props`

| Component            | Deprecated prop       | Replacement            | Transform type  |
| -------------------- | --------------------- | ---------------------- | --------------- |
| `TableSelectionCell` | `hidden`              | `invisible`            | Rename          |
| `Popover`            | `legacyTrapFocus`     | `inertTrapFocus`       | Rename          |
| `Calendar` (compat)  | `overlayedWithButton` | `overlaidWithButton`   | Rename          |
| `PositioningOptions` | `positionFixed`       | `strategy="fixed"`     | Value transform |
| `TagPickerList`      | `disableAutoFocus`    | _(remove — no effect)_ | Remove prop     |

**Source of truth**: search `@deprecated` across `packages/react-components/` before implementing.

### 1.4 Aria Prop Renames (All Components)

All components: v8 used camelCase custom props; v9 uses native HTML attributes.

| v8 prop             | v9 prop            |
| ------------------- | ------------------ |
| `ariaLabel`         | `aria-label`       |
| `ariaHidden`        | `aria-hidden`      |
| `ariaDescribedBy`   | `aria-describedby` |
| `ariaLabelledBy`    | `aria-labelledby`  |
| `ariaPositionInSet` | `aria-posinset`    |
| `ariaSetSize`       | `aria-setsize`     |

### 1.5 Ref Migration (All Components)

| v8             | v9    |
| -------------- | ----- |
| `componentRef` | `ref` |

### 1.6 Import Path Consolidation

v8 allowed deep path imports (e.g. `@fluentui/react/lib/Button`). v9 uses the barrel export only.

```ts
// v8 (both forms valid)
import { Button } from '@fluentui/react';
import { Button } from '@fluentui/react/lib/Button';

// v9 (only barrel)
import { Button } from '@fluentui/react-components';
```

Codemod: rewrite any `@fluentui/react/lib/*` to the barrel `@fluentui/react-components` (with correct named export per component-mapping).

### 1.7 Direct Component Renames (1:1, No Prop Changes)

| v8 component        | v9 component     | Notes                                    |
| ------------------- | ---------------- | ---------------------------------------- |
| `Separator`         | `Divider`        | Same import package                      |
| `Toggle`            | `Switch`         |                                          |
| `Shimmer`           | `Skeleton`       |                                          |
| `ProgressIndicator` | `ProgressBar`    |                                          |
| `ComboBox`          | `Combobox`       | Case change only                         |
| `ThemeProvider`     | `FluentProvider` | theme prop also needs migration (Tier 2) |
| `Fabric`            | `FluentProvider` |                                          |
| `Panel`             | `Drawer`         |                                          |
| `Layer`             | `Portal`         |                                          |
| `DocumentCard`      | `Card`           |                                          |
| `SearchBox`         | `SearchBox`      | Same name, new package                   |
| `Breadcrumb`        | `Breadcrumb`     | Same name, new package                   |
| `Spinner`           | `Spinner`        | Same name, new package                   |
| `Tooltip`           | `Tooltip`        | Same name, new package                   |
| `Slider`            | `Slider`         | Same name, new package                   |
| `MessageBar`        | `MessageBar`     | Same name, new package                   |
| `Nav`               | `Nav`            | Same name, new package                   |

---

## Tier 2 — Partially Automatable (Validate Output)

### 2.1 Button Variant → appearance Prop

| v8 component       | v9 equivalent                     | Transform          |
| ------------------ | --------------------------------- | ------------------ |
| `DefaultButton`    | `Button`                          | Rename             |
| `PrimaryButton`    | `Button appearance="primary"`     | Rename + add prop  |
| `ActionButton`     | `Button appearance="transparent"` | Rename + add prop  |
| `CommandButton`    | `Button`                          | Rename             |
| `CommandBarButton` | `Button`                          | Rename             |
| `ToggleButton`     | `ToggleButton`                    | Import change only |
| `CompoundButton`   | `CompoundButton`                  | Import change only |

**Caveat**: `IconButton` requires removing text children — flag if children exist.

### 2.2 Button `text` Prop → `children`

```tsx
// v8
<PrimaryButton text="Submit" />
// v9
<Button appearance="primary">Submit</Button>
```

Automatable when `text` is a static string literal. Flag if `text` is a variable or expression — generate TODO comment.

### 2.3 Button `primary` Prop → `appearance`

```tsx
// v8: <Button primary />
// v9: <Button appearance="primary" />
```

Straightforward prop value transform.

### 2.4 Checkbox `indeterminate` → `checked="mixed"`

```tsx
// v8: <Checkbox indeterminate={true} />
// v9: <Checkbox checked="mixed" />
```

Safe when `indeterminate` is statically `true`. Flag dynamic values.

### 2.5 TextField `multiline` → `Textarea`

```tsx
// v8: <TextField multiline rows={3} />
// v9: <Textarea rows={3} />
```

Automatable when `multiline` is statically `true`. When dynamic (e.g. `multiline={isMultiline}`), generate TODO comment and leave unchanged.

### 2.6 Pivot/TabList Prop Renames

| v8 `Pivot` prop      | v9 `TabList` prop      |
| -------------------- | ---------------------- |
| `defaultSelectedKey` | `defaultSelectedValue` |
| `selectedKey`        | `selectedValue`        |
| `onLinkClick`        | `onTabSelect`          |
| `linkSize`           | `size`                 |

| v8 `PivotItem` prop | v9 `Tab` prop                   |
| ------------------- | ------------------------------- |
| `itemKey`           | `value`                         |
| `headerText`        | children (move to JSX children) |
| `itemIcon`          | `icon` slot                     |

**Caveat**: `headerText` → children requires moving prop to JSX children — automatable for static string values.

### 2.7 Input Prop Renames

| v8 `TextField` prop | v9 `Input` prop               |
| ------------------- | ----------------------------- |
| `prefix`            | `contentBefore`               |
| `suffix`            | `contentAfter`                |
| `inputClassName`    | `input` slot                  |
| `underlined`        | `appearance="underline"`      |
| `borderless`        | `appearance="filled-lighter"` |
| `elementRef`        | `ref`                         |

### 2.8 RadioGroup Prop Renames

| v8 `ChoiceGroup`     | v9 `RadioGroup`   |
| -------------------- | ----------------- |
| `defaultSelectedKey` | `defaultValue`    |
| `selectedKey`        | `value`           |
| `ariaLabelledBy`     | `aria-labelledby` |

### 2.9 `styles` Prop → TODO Comment

The `styles` prop is removed in v9. Codemod should:

1. Remove the `styles` prop
2. Insert `{/* TODO: migrate styles to makeStyles — see https://aka.ms/fluentui-v9-styles */}` comment above the JSX element

**Do not attempt to auto-convert style objects** — they require manual `makeStyles` authoring.

### 2.10 `mergeStyles` / `mergeStyleSets` → TODO Comment

Flag any imports of `mergeStyles`, `mergeStyleSets`, `IStyle` from `@fluentui/react`:

- Add `// TODO: replace mergeStyles with makeStyles from @fluentui/react-components` comment
- Do not remove the code — leave it for manual migration

### 2.11 Icon Migration (Requires Name Mapping Table)

```tsx
// v8
<Button iconProps={{ iconName: 'Add' }} />;

// v9
import { AddRegular } from '@fluentui/react-icons';
<Button icon={<AddRegular />} />;
```

Automatable **only if** an icon name → React component mapping table exists. Without the table, flag all `iconProps` usages with:

```ts
// TODO: replace iconProps={{ iconName: 'Add' }} with icon slot using @fluentui/react-icons
```

---

## Tier 3 — Manual Only (Flag and Comment)

These patterns require architectural changes. A codemod should **detect and annotate** but not transform.

### 3.1 ContextualMenu / menuProps → Menu JSX Children

**Why manual**: Items array must be converted to JSX component hierarchy with correct component types per item type.

```tsx
// v8 — data-driven
<ContextualMenu items={[
  { key: 'a', text: 'Action A', onClick: handleA },
  { key: 'div1', itemType: ContextualMenuItemType.Divider },
  { key: 'sub', text: 'Submenu', subMenuProps: { items: [...] } },
]} />

// v9 — declarative
<Menu>
  <MenuTrigger>...</MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem onClick={handleA}>Action A</MenuItem>
      <MenuDivider />
      <Menu>
        <MenuTrigger><MenuItem hasSubmenu>Submenu</MenuItem></MenuTrigger>
        <MenuPopover><MenuList>...</MenuList></MenuPopover>
      </Menu>
    </MenuList>
  </MenuPopover>
</Menu>
```

**Codemod action**: detect `ContextualMenu` usages, insert `// TODO: migrate ContextualMenu to Menu with JSX children` comment.

### 3.2 Stack / StackItem → makeStyles + Flexbox

**Why manual**: Stack's layout props map to CSS flexbox properties that require per-component `makeStyles` definitions.

**Codemod action**: detect `Stack` imports and usages, insert comment. Optionally offer `StackShim` as a temporary bridge.

```ts
// TODO: Replace Stack with makeStyles flexbox — see fluentui-v8-to-v9 skill stack.md
```

### 3.3 Label Extraction from Component Props

**Why manual**: Components like `TextField`, `ChoiceGroup`, `CheckBox` had a `label` prop that v9 splits into a separate `<Label>` element requiring a `useId`-linked `htmlFor`/`aria-labelledby`.

```tsx
// v8
<TextField label="Email" />

// v9 — requires new Label element and ID coordination
const emailId = useId('email');
<Label htmlFor={emailId}>Email</Label>
<Input id={emailId} />
```

**Codemod action**: flag `label` props on `TextField`, `ChoiceGroup`, `SpinButton`, `Slider` with TODO comment.

### 3.4 ChoiceGroup options Array → RadioGroup + Radio Children

**Why manual**: `options` array maps to `Radio` components — data-driven patterns need to become JSX.

**Codemod action**: detect `ChoiceGroup options={...}` and insert TODO comment.

### 3.5 Facepile personas Array → AvatarGroup Children

**Why manual**: `personas` array + overflow logic needs to be refactored to `AvatarGroup` + `AvatarGroupItem` + `AvatarGroupPopover` using `partitionAvatarGroupItems`.

**Codemod action**: detect `Facepile` usages, insert TODO comment.

### 3.6 Custom Theme Migration

**Why manual**: v8 `IPalette` → v9 `BrandVariants` requires expanding 9 theme colors to 16 + mapping semantic tokens.

**Codemod action**: detect `ThemeProvider theme={customVar}` where theme is not a Fluent built-in, insert TODO comment with reference to theme shim utilities.

### 3.7 onRender\* Callbacks → Slot Pattern

**Why manual**: Each `onRender*` prop maps to a specific v9 slot, and the slot API (accepts JSX, shorthand, or render function) requires case-by-case analysis.

**Codemod action**: detect any `onRender` prop names and insert TODO comment per occurrence.

### 3.8 DetailsList → DataGrid

**Why manual**: Completely different API — columns, rows, selection, sorting all change significantly.

**Codemod action**: detect `DetailsList` imports and flag with TODO comment.

### 3.9 Pivot Content → State-Managed Tab Content

**Why manual**: `PivotItem` children (tab content) must be extracted out of the `TabList` hierarchy and rendered conditionally based on selected tab state.

**Codemod action**: after renaming `Pivot` → `TabList`, detect `Tab` components with children that aren't the tab label and insert TODO comment.

---

## Summary: What to Build as Codemods

### MVP Codemods (per spec)

| Codemod               | Tier | Status           |
| --------------------- | ---- | ---------------- |
| `deprecated-packages` | 1    | Required for MVP |
| `deprecated-props`    | 1    | Required for MVP |

### Recommended Next Codemods (High ROI)

| Codemod               | Tier | Description                                            |
| --------------------- | ---- | ------------------------------------------------------ |
| `import-paths`        | 1    | Rewrite `@fluentui/react/lib/*` deep imports to barrel |
| `aria-props`          | 1    | `ariaLabel` → `aria-label` etc. across all components  |
| `component-ref`       | 1    | `componentRef` → `ref` across all components           |
| `component-renames`   | 1    | 1:1 renames (Separator→Divider, Toggle→Switch, etc.)   |
| `button-variants`     | 2    | PrimaryButton → `Button appearance="primary"`, etc.    |
| `button-text-prop`    | 2    | `text` prop → children (static strings only)           |
| `textfield-multiline` | 2    | `TextField multiline` → `Textarea` (static only)       |
| `pivot-props`         | 2    | Pivot/PivotItem prop renames                           |
| `styles-flag`         | 2    | Remove `styles` prop + insert TODO comment             |
| `todo-annotations`    | 3    | Detect Tier 3 patterns, insert TODO comments + skip    |

### Detection-Only Codemods (for `report` command)

These should be detected by `UsageCollector` and surfaced in `fluent-report.json` usage inventory:

- All `ContextualMenu` / `menuProps` usages → manual migration count
- All `Stack` / `StackItem` usages → manual migration count
- All `label` prop usages on text inputs → manual migration count
- All `onRender*` prop usages → manual migration count
- All `styles` prop usages → partially-automatable count
- All `iconProps` usages → flag for icon name mapping
