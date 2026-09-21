# verify-peer-dependencies

Workspace Generator that validates peer dependency **forwarding chains** and peer metadata across all projects.

A peer dependency is a promise about what the _consumer_ must provide. This generator checks that the
promises we make are internally consistent and satisfiable.

### How peers resolve, by installer

| Installer                                        | Resolution                                                                                                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| npm / yarn classic (hoisted)                     | `require` walks up the directory tree; the nearest ancestor providing the peer wins                        |
| pnpm, midgard-yarn-strict (isolated, [RFC 0042]) | peer metadata is propagated up the graph automatically, stopping at a real dependency or a local workspace |
| Yarn PnP strict                                  | no ancestor walk — every package in the chain must declare the peer itself                                 |

Only the last one requires a package to re-declare its dependencies' peers, which is why
`missing-peer-forward` is **opt-in**: Fluent UI targets hoisted and isolated installs, so peer
forwarding is not maintained for Yarn PnP strict. Note this applies to _which package provides_ a peer. The other
checks are about _which versions_ a peer range accepts, which is version math and therefore
installer-independent - they stay on by default. Declaring peers a package never imports is not free: the peer set is
part of a package's virtual instance key, so it forks the virtual store on a dimension the package does not
care about, and it asks consumers to satisfy a module that is never loaded.

[RFC 0042]: https://github.com/npm/rfcs/blob/main/accepted/0042-isolated-mode.md

<!-- toc -->

- [Usage](#usage)
- [Checks](#checks)
- [Options](#options)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:verify-peer-dependencies
```

Verify a single project:

```sh
yarn nx g @fluentui/workspace-plugin:verify-peer-dependencies react-dialog
```

Verify everything tagged `vNext`, which is what CI runs on every PR:

```sh
yarn nx g @fluentui/workspace-plugin:verify-peer-dependencies --tag=vNext
```

Fix every missing forward automatically:

```sh
yarn nx g @fluentui/workspace-plugin:verify-peer-dependencies --fix
```

Use nx's global `--verbose` flag (or `NX_VERBOSE_LOGGING=true`) to see exactly what was checked and
what was skipped - useful when a clean result looks suspicious, since "nothing to report" and
"nothing verified" otherwise look identical. Output goes through `logger.verbose`, so nx gates it:

```sh
yarn nx g @fluentui/workspace-plugin:verify-peer-dependencies react-portal --verbose
```

```
scope
  checks   incompatible-peer-range, invalid-peer-range, orphaned-peer-meta
  packages 1 verified, 255 skipped (127 private, 128 outside --project)

@fluentui/react-portal packages/react-components/react-portal/library/package.json
  declares @types/react, react, react-dom
  react '>=16.8.0 <20.0.0' required by @griffel/react -> satisfied by peer '>=16.14.0 <20.0.0'

totals
  4 peer requirement(s) checked across 1 package(s)
  skipped: 3 optional, 0 provided as own dependency, 0 outside --peers
```

Scope the run to a single peer while paying down existing debt:

```sh
yarn nx g @fluentui/workspace-plugin:verify-peer-dependencies --peers=react-dom,scheduler
```

## Checks

| Check                     | Default | Description                                                                                                                  |
| ------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `incompatible-peer-range` | on      | The range we advertise accepts versions one of our own dependencies rejects (e.g. `>=16.8.0` onto `>=16.14.0`)               |
| `invalid-peer-range`      | on      | A peer range is not a valid semver range                                                                                     |
| `orphaned-peer-meta`      | on      | A `peerDependenciesMeta` entry has no matching `peerDependencies` entry                                                      |
| `missing-peer-forward`    | off     | A dependency requires a non-optional peer that this package neither declares as a peer nor owns outright                     |
| `unverified-peer-range`   | off     | A range was only checked against the installed copy, while the declared dependency range permits older, uninspected versions |

Use `--checks=all` to include the opt-in checks, or pass an explicit comma separated list.

### On `unverified-peer-range`

Peer ranges are validated against the dependency manifest this workspace has installed. A consumer
resolving the same declared range may legally get an older version with a narrower peer range, so a
passing range check is only as strong as the gap between the declared floor and the installed
version. This check reports that gap, without needing network access.

Both peer bugs found while building this tool had exactly that shape - `@typescript-eslint/utils`
(`^8.46.2` declared, `8.57.1` installed) and `use-sync-external-store` (`^1.2.0` declared, `1.6.0`
installed). Closing the gap means raising the dependency floor to the version whose peer range you
actually rely on.

It is opt-in because it reports a limit on what can be verified offline rather than a defect, and
closing it is a judgement call rather than a mechanical fix.

Resolution rules applied:

- **Only publishable packages are verified.** A private package is never installed by a consumer, so it has
  no peer contract to honour, and it satisfies its own dependencies' peers from `devDependencies` at install
  time. Private packages are still read, because publishable packages depend on them.
- A peer is satisfied by `dependencies` (terminates the chain) or by `peerDependencies` (forwards it).
  `devDependencies` never satisfy a published contract.
- Peers marked `peerDependenciesMeta.<name>.optional` are exempt from forwarding, since they may be
  absent. Their version constraint still applies when the peer **is** declared.
- Only `missing-peer-forward` is auto-fixable, so `--fix` enables it even though it is not a default
  check. Everything else reports a conflict that needs a human decision.

> [!IMPORTANT]
> Only mark a peer `optional` when the package can genuinely run without it. `optional` silences the
> install warning but does **not** make the import resolvable — so for a peer that is actually imported it
> converts a loud install-time warning into a silent runtime crash. It is appropriate for types-only peers
> such as `@types/react`, and inappropriate for runtime peers such as `react`, `react-dom` or `scheduler`.

## Options

#### `project`

Comma separated list of projects to verify, accepting either the nx project name (`react-dialog`) or the
package name (`@fluentui/react-dialog`). Defaults to every publishable project. An unknown name is an
error rather than a silent pass.

#### `tag`

Comma separated list of nx project tags to verify, e.g. `vNext`. Defaults to every tag. An unknown
tag is an error rather than a silent pass. CI verifies `vNext` on every PR.

#### `checks`

Comma separated list of checks to run, or `all`. Defaults to every check except `missing-peer-forward`.

#### `fix`

Add every missing forwarded peer to the offending `package.json`, using the range required by the
dependency. When several dependencies require different ranges the narrowest one is used; if no range
contains all the others the conflict is reported instead of guessed.

Forwarding cascades, so this runs to a fixpoint: adding a peer to one package creates the same
requirement for its dependents.

> [!NOTE] > `--fix` never throws, even when violations remain that it cannot fix automatically. Throwing from a
> generator makes nx discard the whole tree, which would silently drop the fixes it just applied. Re-run
> without `--fix` to get a failing exit code.

#### `peers`

Comma separated list of peer names to check. Defaults to all.
