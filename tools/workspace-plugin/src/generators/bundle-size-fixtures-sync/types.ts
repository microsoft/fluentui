/**
 * Per project fixture declaration, provided via `project.json#metadata.bundleSizeFixtures`, keyed by
 * the fixture file name within the project's `bundle-size` folder.
 *
 * Only declared fixtures are generated; hand written monosize fixtures in the same folder are left
 * alone.
 */
export type BundleSizeFixturesConfig = Record<string, BundleSizeFixture>;

export type BundleSizeFixture = EntryPointsFixture | BaseHooksFixture;

interface FixtureBase {
  /**
   * monosize fixture name. Doubles as the bundle size report baseline key, so renaming it drops the
   * recorded history for that fixture.
   */
  name: string;
}

/**
 * Namespace imports every non-root export subpath of the project itself, so a subpath missing from
 * the export map fails `verify-bundle-isolation` rather than going unnoticed.
 */
export interface EntryPointsFixture extends FixtureBase {
  kind: 'entryPoints';
}

/**
 * Named imports every `use*Base_unstable` hook exported by the project's workspace dependencies.
 *
 * Named rather than namespace imports are load bearing: a namespace import would retain every styled
 * component and make the isolation check meaningless.
 */
export interface BaseHooksFixture extends FixtureBase {
  kind: 'baseHooks';
}
