# Specification

Command `report`

Has two subcommands:

- `report info` — quick package & environment summary for issue reporting (no flags)
- `report usage` — deep codebase usage analysis of Fluent UI APIs

Running `report` without a subcommand shows help.

## `report usage` flags

- `--path`, `-p`: root of project where traversal should start with
  - @default `<git-root>`
- `--reporter`, `-r`: output format (`'json' | 'markdown' | 'html'`)
  - @default `json`
- `--include`: glob patterns to include files
- `--exclude`: glob patterns to exclude files

### --path

Should traverse `.ts` and `.tsx` files in project.

**NOTE:** skips gitignored files

## `report info`

This flag will provide only simple installed packages report which can be used for issue reporting.

> **NOTE:**
>
> - We can leverage existing utils from `@nx/devkit`
> - inspired by https://github.com/nrwl/nx/tree/master/packages/nx/src/command-line/report

**We are interested only into following package names:**

1. fluent scoped packages:

- `@fluentui/*`
- `@fluentui-contrib/*`

2. fluent related packages without scope or with non fluentui scope:

- `tabster`
- `keyborg`
- `@griffel/*`

3. 3rd party fluent related packages

- `react`
- `@types/react`
- `typescript`
- `@floating-ui/*`

**duplicates**

These are very important for the `short` report. We are interested in scenarios where dependencies that we search for to report are not deduped - which will lead to runtime issues

### Output

```
FluentCLI   Report complete - copy this into the issue template

System:

Node           : 22.21.1
OS             : darwin-arm64
Native Target  : aarch64-macos
<package manager version>           : 1.23.34
---------------------------------------

Packages:

@fluentui/react             : 21.6.10
@fluentui/react-components           : 21.6.10
@fluentui/react-icons:              21.6.0
@fluentui-contrib/shadow-dom         : 21.6.10
@types/react         : 5.7.3
typescript         : 5.7.3
react         : 5.7.3
---------------------------------------

🚨 Duplicates:

- @fluentui/react-icons: 12.3.1, 15.1.2
---------------------------------------
```

## `report usage`

Comprehensive parser of codebase analysis that will gather all Fluent scoped and Fluent related packages for sake of getting metrics of usage of our apis in user codebase.

### Output

A json metadata file which can be used to produce Markdown report.

**Structure proposal:**

```typescript
interface Metadata {
  // eg `@fluentui/react-components` , `@fluentui/react/button`
  [packageImport: string]: {
    // React Components
    components: {
      [componentName: string]: {
        props: {
          [propName: string]: {
            values: /* value used */ Set<string>;
            count: number;
          };
        };
        count: number;
      };
    };
    // React Hooks -> function that start with `use*`
    hooks: {
      [hookName: string]: {
        props: {
          [propName: string]: {
            values: /* value used */ Set<string>;
            count: number;
          };
        };
        count: number;
      };
    };
    // Any interface,type,enum typescript kind
    types: {
      [symbolName: string]: {
        count: number;
        // How many usages are typeof references (e.g., typeof Button)
        typeofCount: number;
        // Generic type arguments — captured like component/hook props
        // e.g., ColumnDef<{name: string}> → typeArg0: {name: string}
        props: {
          [propName: string]: {
            values: /* value used */ Set<string>;
            count: number;
          };
        };
      };
    };
    // rest of symbols that don't fall into previous category
    others: {
      [symbolName: string]: {
        count: number;
      };
    };
    // number of these imports
    count: number;
  };
}
```
