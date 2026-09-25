# @fluentui/api-metadata

Versioned, package-neutral contracts for generated Fluent UI API metadata.

The package root is reader-safe: it contains schema constants, TypeScript contracts, canonical serialization, and bounded validation, and does not import TypeScript or `ts-morph`. Generator implementations use the separate `@fluentui/api-metadata/generator` entrypoint.

## Metadata v1

Metadata is split into a compact `package-index` and package-local `api-record` shards. The index owns public import routes and points each type/value binding to either:

- a local record and symbol ID; or
- a bundled record whose declarations remain owned by an installed external dependency; or
- a logical dependency package, entrypoint, export name, and namespace.

API records retain every declaration, original type expressions with semantic reference spans, overload order, generic parameters, type relationships, and optional checker-derived effective views. Unsupported or partial expansion remains explicit rather than replacing the symbolic declaration.

Schema v1 revision 1 adds optional `ApiSymbol.props` views for classified components. Each view references a call
signature ID and expands its actual first parameter using the checker, including generic substitution, omitted fields,
inline shapes, and inherited members. It does not infer props from an export naming convention. Original declarations
remain unchanged. Bounds and semantic-reference validation apply to these views, and dependency drift invalidates them
along with other checker-derived data. Readers still accept revision-0 catalogs; regenerate catalogs and update readers
together to make the new views available.

Schema v1 revision 2 adds optional `EffectiveMember.declarationPackages`: sorted, unique package names owning the
original member declarations. The generator follows checker root symbols through mapped types, aliases, and
instantiation; these are not packages mentioned by the member's type or the package exposing the component.
Mixed declaration origins are preserved. Unknown origins omit the field rather than guessing. This provenance lets
readers distinguish control-defined APIs from inherited React/DOM members without property-name heuristics or a
runtime TypeScript dependency. Older catalogs remain readable, but need regeneration to expose provenance.

Schema v1 revision 3 adds optional `EffectiveMember.defaultValue`, containing authored `@default` or `@defaultValue`
text from declarations. Runtime defaults are not inferred. Repeated identical tags are deduplicated; conflicting
values leave the default unset and mark the member partial with an explicit reason. Older catalogs remain readable
and simply have no documented-default field.

Schema v1 revision 4 adds `EffectiveMember.presentation` for verified Fluent slot inputs. Its `summary` is a
documentation view, never a replacement for `type`. `slotType` references the actual exported `Slot` declaration
from `@fluentui/react-utilities`; `targets` records known intrinsic elements (default versus alternate) or resolved
component references. `nullable` is included only when established, independently of member optionality.

Recognition follows declaration roots, import/re-export aliases and transparent type aliases. Authored wrappers,
custom props aliases and intersection restrictions remain visible. A checker-derived `NonNullable` wrapper is
retained with `basis: "semantic"`; ordinary authored presentations use `basis: "declaration"`. The generator requires
the effective member type to match the declaration (or the verified `NonNullable` wrapping), so resolved state
members, mixed unions, unrelated `as` objects and unverified generic substitutions are not mislabeled. Those members
keep their full types. Nested `node_modules` declarations are dependencies, not package-local definitions.

Presentation references participate in validation and dependency verification, and are removed with other effective
member data on dependency drift. The reader and CLI use this precomputed data without loading TypeScript.

Schema v1 revision 5 adds declaration-backed bundled records for public re-exports from external packages that do not
publish Fluent catalogs. The Fluent facade remains the public route authority, while each bundled record keeps the
actual definition package identity. Its descriptor records the importer-relative package chain and the exact local
declaration files used at every bridge and definition hop.

Generation recursively materializes only the selected external public definitions. It emits finer symbol-closure
shards rather than copying an external package's entire catalog or increasing the 16 MiB artifact bound. Fluent-owned
dependencies remain logical package routes so enabled leaf packages continue to own their metadata. Readers resolve
every bundled package from the referring installed instance, verify package identity and all recorded declaration
fingerprints, and refuse to return a stale bundled definition when a bridge or owner declaration changes. Version-only
changes remain usable when all relevant declaration fingerprints are unchanged.

When TypeScript resolves a runtime package through a separate declaration owner, such as an `@types` package using
`export =` plus a namespace, generation falls back to the exact compiler-resolved declaration file and materializes
only the requested public binding. The bundled source retains the authored runtime specifier, the actual declaration
package identity and its fingerprint. Readers repeat that importer-relative owner resolution and reject declaration
drift without requiring either external package to publish a Fluent catalog. Checker-rendered types are anchored at
declarations inside the record owner, preserving owner-relative names instead of embedding producer filesystem paths.

### Public binding semantics

`ExportRoute.namespace` describes the referenced symbol space, while `ExportRoute.typeOnly` independently describes
whether the public binding is erased at runtime:

- A normal class or enum export has separate `type` and `value` routes.
- `export type { Class }` retains both target-space routes, but both have `typeOnly: true`.
- A type-only re-export of a value-only symbol has a `value` route with `typeOnly: true`. This supports type queries
  without claiming a runtime import.
- A named re-export resolving only to TypeScript `NamespaceModule` has a `type` route. It is a qualifier for nested
  exported types, not a runtime value; `typeOnly` reflects whether the re-export itself used `export type`.
- `export * as Namespace` is a value-space namespace route with `exportKind: "namespace"` and `typeOnly: false`.
- `export type * as Namespace` is also a value-space namespace route, but has `typeOnly: true`.
- Interfaces and type aliases have only a `type` route. Namespace-export syntax is special-cased because it creates a
  namespace object binding even when its target module primarily exposes types.

Consumers should therefore derive expected namespaces from the resolved target symbol flags, then apply the authored
type-only modifier separately. Import recommendations use `import type` whenever either the selected route is in the
type namespace or `typeOnly` is true.

Local record paths are relative to the metadata directory. Validators reject absolute paths, traversal, malformed identities and conditions, duplicate routes or symbol IDs, invalid namespaces, unresolved local references, and inputs exceeding configured bounds. Filesystem readers must additionally verify realpath containment to prevent symlink escapes.

`validateCatalog()` checks every advertised API shard by default. Lazy callers may set `requireAllApiRecords: false`; absent unrelated records are then ignored, while `selectedRecordIds` identifies records whose routes must be present and cross-record references originating in supplied records remain validated.

## Reader usage

`getEntrypointExport(exportsField, entrypoint)` returns the public export-map subtree for an exact import subpath.
It applies exact-key and wildcard precedence, substitutes wildcard captures, and preserves blocked (`null`) exports.
It is reader-safe and does not choose runtime conditions or evaluate JavaScript; callers must separately validate
the applicable conditional target and consumer resolution before recommending an import.

```ts
import { serializeMetadata, validateSerializedMetadata } from '@fluentui/api-metadata';

const result = validateSerializedMetadata(json);
if (!result.valid) {
  throw new Error(result.diagnostics.map(diagnostic => `${diagnostic.path}: ${diagnostic.message}`).join('\n'));
}

const canonicalJson = serializeMetadata(result.value);
```

Canonical serialization sorts object keys and preserves array order, including overload, parameter, union, declaration, and semantic-reference order. It emits UTF-8 JSON with one trailing newline.

## Generation

The TypeScript-powered generator is isolated from the reader-safe package root:

```ts
import { generateApiMetadata, writeGeneratedMetadata } from '@fluentui/api-metadata/generator';

const result = await generateApiMetadata({
  packageRoot,
  entrypoints: ['.', './button'],
  declarationConditions: ['types', 'import'],
});

writeGeneratedMetadata(result, outputDirectory);
```

Run the mandatory real declaration gate with:

```sh
yarn nx run api-metadata:test-real-pilots
```

The target first builds the published `react-components` root and `./unstable` declarations and generates the
headless declaration subpaths, then runs styled/headless Button, the complete four-component Accordion family, suite
route, and installed dependency-routing assertions with the real-pilot environment enabled.

Entrypoints and declaration conditions are read from the package's published export map. When no entrypoints are
specified, exported declaration subpaths are enumerated, including wildcard expansions; an empty root declaration
does not hide non-root subpaths. Data-only exports such as `./package.json` and `./metadata.json` are ignored rather
than treated as declaration failures, and more-specific `null` export patterns exclude private wildcard routes.
Legacy packages without an export map can generate only their declared root `types`/`typings` entry.

Generation uses final declaration files as the authority. It preserves separate type/value routes, renamed/default
and namespace exports, dependency re-exports, merged declarations, overload order, generic signatures, original type
expressions with semantic reference spans, and bounded checker-derived effective members. `writeGeneratedMetadata`
uses canonical serialization and verifies every record fingerprint before writing `index.json` and API shards.
Checker-rendered effective type strings are marked partial because they do not have source nodes from which reliable
semantic reference spans can be recovered; the original symbolic expressions remain available with resolved spans.

Equivalent import/require declaration variants share one API payload, for example `api/api-root.json` or
`api/api-button.json`, rather than duplicating the entire record per module format. Both condition-specific export
routes and their original declaration fingerprints remain in the index. Deduplication requires matching
source-backed symbols and declaration/dependency fingerprints, allowing only the sibling `.d.ts`/`.d.cts`/`.d.mts`
path distinction. Genuinely different conditional APIs remain separate.

The shared record keeps one canonical declaration source and checker-derived view, together with provenance for
both conditions. Differences in checker-rendered union ordering do not create a second copy of an otherwise
identical API. Export resolution verifies the selected branch's inputs; direct record validation, including
`doctor --deep`, checks all recorded branches. Regeneration removes obsolete API files advertised by the previous
index, while preserving unrelated files in the output directory.

## MVP scope

The MVP generates API indexes and records for selected declarations. It includes explicit partial/error diagnostics
and bounded effective-type expansion for intersections, inheritance, unions, mapped types, indexed access, index
signatures, and recursive symbolic types. Dependency routes remain logical package/entrypoint/export references and
record the declaration fingerprints and installed package identities used during generation.

API completeness is scoped to the package's advertised declaration routes and condition variants. Selecting only a
subpath or only import declarations produces an explicitly partial package index; it never claims the complete
package surface. Unresolved imports from declaration files are errors even though the checker otherwise uses
`skipLibCheck`, preventing unresolved semantic inputs from becoming complete `any`-based records.

Non-Fluent external re-exports are complete when their bundled declaration-backed records are generated successfully.
Arbitrary checker expansion can still be partial and remains reported independently. External generation failures
stay as dependency routes with explicit diagnostics; the generator never fabricates local ownership.

Guidance, search, catalog discovery, publication wiring, and CLI command registration are intentionally not generated
here. Arbitrary consumer path aliases and unsupported package-manager layouts require a later configured resolver;
the generator does not fabricate successful coverage for unresolved or unselected routes.

## Minimal installed-package reader

```ts
import { createMetadataReader } from '@fluentui/api-metadata';

const reader = createMetadataReader();
const result = reader.resolveExport({
  package: '@fluentui/react-components',
  importer: process.cwd(),
  entrypoint: '.',
  export: 'Button',
  namespace: 'value',
  conditions: ['types', 'import'],
});
```

The reader resolves the public `<package>/metadata.json` export from the importing context. Dependency routes are resolved again from the referring installed package, so nested versions, npm aliases, pnpm links, and workspace symlinks retain their actual package-instance identity. Bundled records use the same importer-relative resolution for every recorded bridge and definition owner without requiring those packages to ship metadata. It never adds exports from a dependency that the selected public route does not declare.

Only the selected package indexes, route chain, API shard, and relevant declaration inputs are loaded. In-process reader caches are keyed by physical package instance and file identity. Limits apply to bytes, JSON depth/nodes, catalog record inventory, records actually loaded, reference depth, and total artifact fan-out; `maxCatalogRecords` and `maxLoadedRecords` are intentionally independent.

Local artifacts and declaration inputs must remain within their metadata/package realpath boundaries. Missing or invalid referenced detail returns a `partial` result with a stable diagnostic; an invalid root catalog or nonexistent requested route throws `MetadataReaderError`. Custom export conditions and Yarn Plug’n’Play are explicitly unsupported in metadata v1. Marker resolution currently uses Node's `require` export conditions, while `types` plus standard `import`/`require` declaration route conditions can be selected exactly.

Each traversed route is checked against the installed package's current export map and only its selected declaration input is fingerprinted. Package, record, and effective-type completeness remain visible in the result. A dependency version change is accepted when the selected declaration fingerprint is unchanged; semantic drift preserves source-backed symbolic declarations but replaces checker-derived effective views with an explicit unsupported view until regeneration.
