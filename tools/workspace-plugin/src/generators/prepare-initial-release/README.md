# prepare-initial-release

Workspace Generator which automates initial release process steps for `preview` and `stable` stages of core @fluentui (v9) packages.

## v9 Release process flow:

We have 2 kinds of packages in v9:

- standard
- compat

### Standard

Core control/library following all converged patterns (Research,Figma, Specs)

- this ships initially with `-preview` suffix as standalone package
- when entering stable phase, `-preview` suffix is removed and package becomes part of `react-components` suite

```mermaid
flowchart TB

subgraph IRP[1st release preparation for preview]
GP(nx prepare-initial-release --phase=preview)
RP(released to npm as v0.1.0)
GP--ci:npm publish-->RP
end

subgraph IRS[1st release preparation for stable]
GS(nx prepare-initial-release --phase=stable)
RS(released to npm as v9.0.0)
GS--ci:npm publish-->RS
end

subgraph KP[kickoff phase]
  AA[bootstrap package]---AB[nx react-library --kind=standard]
  AC[research]
  AD[prototyping]
end

subgraph PP[preview phase]
BA[ongoing development]
BB[uses 0.x.x semver release pattern]
BC[released to npm as *-preview]
end

subgraph SP[stable phase]
CA[ongoing development]
CB[released as part of react-components suite]
CC[released to npm as stable 9.0.0]
end

KP-.->IRP-.->PP-.->IRS-.->SP

```

### Compat

Control/library ported directly from v8 or v0 to use v9 apis including griffel.

> [Learn more](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-datepicker-compat/README.md#compat-component)

- this always ships with `-compat` suffix as standalone package ( never becomes part of `react-components` suite )

```mermaid
flowchart TB

subgraph IRP[1st release preparation]
GP(nx prepare-initial-release --phase=compat)
RP(released to npm as v0.0.1)
GP--ci:npm publish-->RP
end



subgraph KP[kickoff phase]
  AA[bootstrap package]---AB[nx react-library --kind=compat]
  AC[back-porting implementation from older DS]
end

subgraph PP[compat phase development]
BA[ongoing development]
BB[uses 0.x.x semver release pattern]
BC[breaking changes as necessary]
end



KP-.->IRP-.->PP

```

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`project`](#project)
  - [`phase`](#phase)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:prepare-initial-release ...
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:prepare-initial-release --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:prepare-initial-release
```

## Options

#### `project`

Type: `string`

Library name to to be released.

#### `phase`

Type: `preview` | 'stable' | 'compat'

Phase of npm release life cycle for monorepo package
