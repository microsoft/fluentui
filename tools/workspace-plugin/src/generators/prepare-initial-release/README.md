# prepare-initial-release

Workspace Generator which automates initial release process steps for `preview` and `stable` stages of core @fluentui (v9) packages.

### V9 Release process flow:

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
  AA[bootstrap package]
  AB[research]
  AB[prototyping]
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

Type: `preview` | 'stable'

Phase of npm release life cycle for monorepo package
