/** `IContextualMenuItem`-like interface, compatible with ContextualMenu in versions 5-8. */
export interface VersionMenuItem {
  /** Major version number (a unique key for the entry). */
  key: string;
  /** Library name and major version displayed on the menu item (for 6+), such as "Fluent UI React 8" */
  text: string;
  /** Same as the `text` property but used only by v5 */
  name: string;
  /** Click handler to switch to this version */
  onClick: () => void;
}

export interface VersionSwitcherDefinition {
  /**
   * The list of available versions whose documentation is presented on the website.
   * Text of each item will be the library name and major version, such as "Fluent UI React 8".
   * These come pre-defined with an appropriate click handler to switch the version.
   */
  versions: VersionMenuItem[];
  /**
   * The currently selected major version number, such as "8".
   */
  selectedMajor: string;
  /**
   * The name and full version of the currently selected major version, such as "Fluent UI React 8.3.2".
   */
  selectedMajorName: string;
}

/** Config object in each manifest file */
export interface SiteConfig {
  /** CDN URL prefix where the website files for a given version are located */
  baseCDNUrl: string;
  /** Full version of `@fluentui/react` or `office-ui-fabric-react` (not the website package) */
  libraryVersion: string;
  /** Metadata, not used on the site */
  createdDate: string;
}

/** Globals set up by `loadSite` */
export interface SiteGlobals {
  /** Info for switching between versions of the site */
  __versionSwitcherDefinition: VersionSwitcherDefinition;

  /** Info from the manifest file (may not be present in local or PR deployed sites) */
  __siteConfig?: SiteConfig;

  /**
   * Monaco editor global configuration.
   * This should match `packages/monaco-editor/src/configureEnvironment.ts`.
   *
   * (The types aren't shared directly because this package must be used in old Fabric versions
   * where pulling in newer typescript output could cause issues, and `@fluentui/monaco-editor`
   * is intended to be usable outside of Fluent and therefore shouldn't depend on this package.)
   */
  MonacoConfig?: {
    baseUrl: string;
    useMinified: boolean;
    crossDomain: boolean;
  };
}

export type ManifestVariant = 'prod' | 'df';
