import { ManifestVariant } from './types';

/** Name of the webpack bundle for the site */
// "as const" means the type of the constant will literally be "fabric-site" not string

// (allows referencing the type in JS even if the package hasn't been built)
export const BUNDLE_NAME = 'fabric-site' as const;

/** Format for the manifest file name. `{major}` is the major version number and `{suffix}` is `df` or `prod`. */
export const MANIFEST_NAME_FORMAT = 'v{major}-{suffix}.js' as const;

/** Suffixes for manifest files */
export const MANIFEST_VARIANTS: ManifestVariant[] = ['prod', 'df'];
