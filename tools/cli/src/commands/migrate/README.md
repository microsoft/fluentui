# `migrate` command

The `migrate` command performs static analysis on a codebase and inserts structured migration annotations into source files. These annotations serve as a deterministic work queue for human developers or AI agents to execute the actual migration.

## Usage

```bash
fluentui migrate [migration] [--list]
```

| Flag     | Alias | Description                   |
| -------- | ----- | ----------------------------- |
| `--list` | `-l`  | List all available migrations |

### `migrate v8-to-v9`

Analyzes a directory for Fluent UI v8 (`@fluentui/react`) usage and annotates each migration site with the appropriate action and target.

```bash
fluentui migrate v8-to-v9 --path <dir> [--dryRun]
```

| Flag       | Default | Description                                   |
| ---------- | ------- | --------------------------------------------- |
| `--path`   | —       | **Required.** Source root to analyze          |
| `--dryRun` | `false` | Preview annotations without writing any files |

> **Note**: The package must have a `package.json` reachable from `--path` so the analyzer can determine which v9 dependencies are already installed.

## Two-phase migration model

The command implements **phase 1** of a two-phase migration:

1. **Annotate** (this command) — statically detects v8 usage, classifies each finding, and inserts `@fluent-migrate:` comments into source files.
2. **Execute** (human or AI agent) — consumes annotations as a work queue, applies changes in priority order, removes comments after each fix, and validates the result.

The companion skill at `skills/fluentui-migrate-v8-to-v9/SKILL.md` defines the agent workflow for phase 2.

### Installing the migration skill

After running annotations, install the companion AI agent skill to guide phase 2:

```bash
npx skills add microsoft/fluentui --skill fluentui-migrate-v8-to-v9
```

The CLI automatically checks whether the skill is installed and prints this hint when it is missing. See [`skills/README.md`](../../../../../skills/README.md) for full installation options and the supported agent list.

## Annotation format

Annotations are inserted as comments directly above the detected usage site:

```ts
// @fluent-migrate:<action> | <codemod> | <payload> | <note>
```

Inside JSX children, block comments are used instead:

```tsx
{
  /* @fluent-migrate:<action> | <codemod> | <payload> | <note> */
}
```

### Actions

| Action          | Meaning                                                           |
| --------------- | ----------------------------------------------------------------- |
| `auto`          | Safe to apply mechanically — a 1:1 rename or straightforward swap |
| `scaffold`      | Boilerplate structure needed — e.g. wrapping in `<Field>`         |
| `manual`        | Requires human judgment — multiple valid approaches exist         |
| `no-equivalent` | No v9 replacement — requires a custom solution or removal         |

## Rules

The analyzer applies a set of rules to each source file. A rule detects a specific v8 pattern and emits one or more annotations.

### `import-paths`

Rewrites `@fluentui/react` imports to their v9 targets.

- Standard specifiers → `auto` to `@fluentui/react-components`
- Compat components (`Calendar`, `DatePicker`, `TimePicker`) → `manual` to their compat packages
- Deprecated components with no equivalent → `no-equivalent`
- Side-effect imports → `auto`

### `component-rename`

Maps v8 component names to their v9 equivalents. Covers three tiers:

- **Auto 1:1 renames** — `Separator→Divider`, `Toggle→Switch`, `Shimmer→Skeleton`, `Fabric→FluentProvider`, `Layer→Portal`, `ProgressIndicator→ProgressBar`, `ChoiceGroup→RadioGroup`, and others
- **Structural renames** (`manual`) — `Panel→OverlayDrawer`, `Callout→Popover`, `ContextualMenu→Menu`, `Pivot→TabList`, `Modal→Dialog`, and others requiring API restructuring
- **No equivalent** — handled by the `no-equivalent` rule instead

### `button-variants`

Maps v8 button types to v9 `Button` with the appropriate `appearance`:

| v8               | v9                                                  | Action |
| ---------------- | --------------------------------------------------- | ------ |
| `PrimaryButton`  | `Button appearance="primary"`                       | `auto` |
| `DefaultButton`  | `Button`                                            | `auto` |
| `ActionButton`   | `Button appearance="transparent"`                   | `auto` |
| `IconButton`     | `Button` (icon-only, ensure `aria-label`)           | `auto` |
| `CompoundButton` | `CompoundButton` (`secondaryText→secondaryContent`) | `auto` |

### `prop-rename`

Renames props mechanically:

| v8 prop           | v9 prop            |
| ----------------- | ------------------ |
| `ariaLabel`       | `aria-label`       |
| `ariaHidden`      | `aria-hidden`      |
| `ariaDescribedBy` | `aria-describedby` |
| `ariaLabelledBy`  | `aria-labelledby`  |
| `componentRef`    | `ref`              |

### `icon-props`

Converts `iconProps={{ iconName: 'X' }}` to `icon={<XRegular />}`.

- Known icon names → `auto` (requires `@fluentui/react-icons`)
- Unknown or dynamic icon names → `manual`

### `dialog-props`

Maps `Dialog`/`Modal` props:

- `hidden` → `open={!expr}` (`auto`)
- `isOpen` → `open` (`auto`)
- `onDismiss` → `onOpenChange` (`auto`)
- `isBlocking` → `modalType="alert"` (`auto`)
- `dialogContentProps` → `DialogTitle + DialogBody` structure (`scaffold`)

### `enum-to-string`

Replaces v8 enum members with v9 string literals for `MessageBarType`, `SpinnerSize`, `DialogType`, and `CheckboxVisibility`.

### `toggle-props`

Maps `Toggle`-specific props: `inlineLabel→labelPosition`, `onChange` signature rewrite, and marks `onText`/`offText` as `no-equivalent`.

### `progress-bar-props`

Maps `ProgressIndicator` props: `percentComplete→value`, `label→Field wrapper`.

### `label-extraction`

For components whose `label` prop moves to a `<Field>` wrapper (`TextField`, `SpinButton`, `Slider`, `ChoiceGroup`, `Spinner`, `ProgressIndicator`):

- `label` → `scaffold` (wrap in `<Field label="...">`)
- `onRenderLabel` → `manual`

### `styles-prop`

Detects any `styles` prop on Fluent components and emits `scaffold` — suggests replacing with `makeStyles` and design tokens.

### `remove-theme-prop`

Detects `theme` prop usage and emits `auto`. Adds a note about nested `FluentProvider` if the value is non-trivial.

### `use-boolean`

Detects `useBoolean` from v8 and suggests replacing with `useState`. Emits `auto` inside function components, `manual` otherwise.

### `keycodes`

Detects `KeyCodes` enum usage and maps known members to `event.key` string values (e.g. `KeyCodes.enter→'Enter'`). Unknown members are `manual`.

### `get-id`

Detects `getId` from v8 and suggests replacing with `useId` from v9. Emits `auto` inside function components, `manual` otherwise.

### `no-equivalent`

Flags deprecated components with no v9 replacement: `ActivityItem`, `MarqueeSelection`, `HoverCard`, `ResizeGroup`, `ScrollablePane`, `Announced`, `Stack`, `StackItem`. Each annotation includes a recommended alternative in the note.

## Output

### Summary (write mode)

After annotating, the command prints:

```
Annotated 12 files
  auto             34  (safe to apply mechanically)
  scaffold          8  (boilerplate needed)
  manual            5  (requires judgment)
  no-equivalent     2  (no v9 replacement)

Required packages (not in package.json):
  @fluentui/react-components          — v9 component library
  @fluentui/react-icons               — icon replacements
```

### Dry-run mode

With `--dryRun`, no files are modified. The command prints the same counts plus a list of files that would be annotated.

### Metadata file

After writing annotations, the command creates `.fluent-migrate/metadata.json` in the project root:

```json
{
  "version": 1,
  "annotatedFiles": ["src/App.tsx", "src/components/Header.tsx"]
}
```

This file is consumed by the migration skill as the deterministic work queue.

## Architecture

```
migrate/
├── index.ts                          # Parent command — registers subcommands, --list flag
├── v8-to-v9/
│   ├── index.ts                      # Yargs subcommand definition (--path, --dryRun)
│   ├── handler.ts                    # Orchestrates analyze → write → summary
│   ├── utils/annotator/
│   │   ├── index.ts                  # Public API (analyzeFiles, writeAnnotations)
│   │   ├── types.ts                  # AnnotationAction, Annotation, FileAnalysis types
│   │   ├── analyzer.ts              # File discovery, ts-morph parsing, rule execution
│   │   ├── writer.ts                # Comment insertion, idempotency, metadata.json output
│   │   └── rules/
│   │       ├── utils.ts             # Shared helpers (getFluentImportNames, isJsxChild)
│   │       ├── import-paths.ts
│   │       ├── component-rename.ts
│   │       ├── button-variants.ts
│   │       ├── prop-rename.ts
│   │       ├── icon-props.ts
│   │       ├── dialog-props.ts
│   │       ├── enum-to-string.ts
│   │       ├── toggle-props.ts
│   │       ├── progress-bar-props.ts
│   │       ├── label-extraction.ts
│   │       ├── styles-prop.ts
│   │       ├── remove-theme-prop.ts
│   │       ├── use-boolean.ts
│   │       ├── keycodes.ts
│   │       ├── get-id.ts
│   │       └── no-equivalent.ts
│   └── __tests__/
│       ├── handler.spec.ts           # Unit tests (mocked analyzer/writer)
│       ├── handler.integration.spec.ts # Integration tests (real files + temp dirs)
│       └── fixtures/                 # Sample .tsx files exercising each rule
└── README.md                         # This file
```

### How it works

1. **Package detection** — walks up from `--path` to find the nearest `package.json` and reads installed dependencies
2. **File discovery** — scans `**/*.ts` and `**/*.tsx` under `--path`, skipping `node_modules` and `.d.ts` files
3. **Import extraction** — uses ts-morph to find all names imported from `@fluentui/react`
4. **Rule execution** — each rule inspects the AST for specific v8 patterns and emits typed annotations with line numbers
5. **Annotation writing** — inserts comments above each target node, preserving indentation and handling JSX context; sorts annotations by line descending to avoid offset drift
6. **Idempotency** — re-running the command on already-annotated files skips duplicate annotations
7. **Metadata output** — writes `.fluent-migrate/metadata.json` listing all annotated files

## Testing

```bash
# Run all migrate tests
yarn nx run cli:test -- --testPathPatterns=migrate

# Run full CLI test suite
yarn nx run cli:test
```

Tests use a fixture-based approach with sample `.tsx` files in `__tests__/fixtures/` covering each rule. Integration tests create temporary directories, run the real analyzer and writer, and verify annotation content, idempotency, indentation, and metadata output.
