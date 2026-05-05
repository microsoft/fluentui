# `metadata` command

The `metadata` command extracts the full public API surface from a Fluent UI package's `.d.ts` build output and produces structured metadata. It is similar in spirit to [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) but covers **all exports** — components, hooks, types, and utilities — with full type signatures and JSDoc documentation.

## Usage

```bash
fluentui metadata [--entry <path>] [--reporter json|markdown|html] [--output <path>]
```

| Flag         | Alias | Default                      | Description                                     |
| ------------ | ----- | ---------------------------- | ----------------------------------------------- |
| `--entry`    | `-e`  | resolved from `package.json` | Path to `.d.ts` entry file or package directory |
| `--reporter` | `-r`  | `json`                       | Output format: `json`, `markdown`, or `html`    |
| `--output`   | `-o`  | stdout                       | Output file path                                |

### Entry resolution

By default the command reads the closest `package.json`, looks for the `"types"` (or `"typings"`) field, and resolves the `.d.ts` entry file. The `--entry` flag accepts either:

- A direct path to an `index.d.ts` file
- A directory containing a `package.json` (the types field is read from it)

> **Prerequisite**: The package must be built first (`yarn nx run <pkg>:build`) so that `.d.ts` output exists.

## Categories

Every exported symbol is classified into one of four categories:

| Category       | Criteria                                                                                |
| -------------- | --------------------------------------------------------------------------------------- |
| **Components** | `ForwardRefComponent<>`, `React.FC<>`, functions returning JSX, PascalCase + JSX return |
| **Hooks**      | `use*` naming convention (functions starting with `use` + uppercase letter)             |
| **Types**      | Interfaces, type aliases, enums                                                         |
| **Others**     | Constants, render functions, utility functions, class-name objects                      |

Within each category, symbols are further grouped by annotation:

| Group          | JSDoc tags         |
| -------------- | ------------------ |
| **Stable**     | _(no special tag)_ |
| **Deprecated** | `@deprecated`      |
| **Internal**   | `@internal`        |
| **Preview**    | `@alpha`, `@beta`  |

## Output formats

- **JSON** — machine-readable metadata with `package`, `legend`, `categories`, and `externalReferences`. Default.
- **Markdown** — collapsible sections per category with summary tables, annotation sub-groups, and clickable `$ref` links.
- **HTML** — self-contained report with collapsible categories, annotation sub-groups with colored borders, clickable anchor links, and dark-mode support.

### JSON schema overview

```jsonc
{
  "package": { "name": "@fluentui/react-button", "version": "9.8.2" },
  "legend": {
    /* category descriptions */
  },
  "categories": {
    "components": {
      "Button": {
        "name": "Button",
        "description": "Buttons give people a way to trigger an action.",
        "typeSignature": "ForwardRefComponent<ButtonProps>",
        "tags": {},
        "propsType": { "$ref": "#/categories/types/ButtonProps" }
      }
    },
    "hooks": {
      /* ... */
    },
    "types": {
      /* ... */
    },
    "others": {
      /* ... */
    }
  },
  "externalReferences": {
    "@fluentui/react-utilities": {
      "metadataRef": "@fluentui/react-utilities/metadata.json",
      "symbols": {
        "ForwardRefComponent": { "$ref": "@fluentui/react-utilities#/categories/types/ForwardRefComponent" },
        "Slot": { "$ref": "@fluentui/react-utilities#/categories/types/Slot" }
      }
    }
  }
}
```

### Cross-package references (`$ref`)

- **Within the same package**: JSON Pointer — `{ "$ref": "#/categories/types/ButtonSlots" }`
- **Across packages**: URI-style — `{ "$ref": "@fluentui/react-utilities#/categories/types/ComponentProps" }`

When a dependency does not have a `metadata.json`, the symbol falls back to `{ "inline": "SymbolName" }`.

## Architecture

```
metadata/
├── index.ts                        # Yargs command definition (--entry, --reporter, --output)
├── handler.ts                      # Main handler — orchestrates resolve → parse → refs → format → output
├── handler.spec.ts                 # Integration tests
├── impl/
│   ├── types.ts                    # All TypeScript interfaces (MetadataOutput, *Doc, ExternalPackageRef)
│   ├── entry-resolver.ts           # Resolves .d.ts from package.json or --entry flag
│   ├── entry-resolver.spec.ts      # Entry resolution tests
│   ├── dts-parser.ts               # ts-morph parser — extracts all exports with full type signatures
│   ├── dts-parser.spec.ts          # Parser tests (classification, JSDoc, members, params)
│   ├── cross-package-resolver.ts   # Loads dependency metadata.json and builds $ref URIs
│   ├── cross-package-resolver.spec.ts
│   ├── annotation-groups.ts        # Groups symbols by @deprecated, @internal, @alpha, @beta
│   ├── annotation-groups.spec.ts
│   ├── markdown-formatter.ts       # Markdown output with collapsible sections and ref links
│   └── html-formatter.ts           # Self-contained HTML output with dark mode
└── __fixtures__/                   # Test fixtures (.d.ts, package.json)
```

### How it works

1. **Entry resolution** — finds the `.d.ts` entry file from `package.json` types/typings field or `--entry` flag
2. **Parsing** — ts-morph loads the `.d.ts`, iterates `getExportedDeclarations()`, classifies each symbol, extracts JSDoc, type signatures, members, parameters, and return types
3. **Cross-package resolution** — for each imported external package, checks for `metadata.json` and builds `$ref` pointers; scans exported type signatures to determine which external symbols are actually used in the public API
4. **Annotation grouping** — symbols within each category are bucketed by `@deprecated` / `@internal` / `@alpha` / `@beta` tags
5. **Formatting** — routes to JSON, markdown, or HTML formatter
6. **Output** — prints to stdout or writes to file via `--output`

### Key implementation details

- **JSDoc on `declare const`**: In `.d.ts` files, JSDoc lives on the parent `VariableStatement`, not the `VariableDeclaration` node. The parser's `getJsDocTarget()` helper walks up to find it.
- **Function-typed variables**: `declare const renderButton: (state: S) => JSX.Element` is classified as `kind: 'function'` (not `'variable'`) by checking for call signatures on the type.
- **Props type extraction**: `ForwardRefExoticComponent<ButtonProps & RefAttributes<...>>` is parsed with a regex to extract the first type argument as the props type reference.

## Testing

```bash
# Run all metadata tests
yarn nx run cli:test -- --testPathPatterns=metadata

# Run full CLI test suite
yarn nx run cli:test
```

Tests use a fixture-based approach with `__fixtures__/sample-button.d.ts` containing components, hooks, types, enums, and external imports to exercise all classification paths and formatter output.
