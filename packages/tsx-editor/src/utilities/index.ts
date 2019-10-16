// Public utilities API
export { SUPPORTED_PACKAGES } from './defaultSupportedPackages';
export { isEditorSupported } from './isEditorSupported';

// Re-export for convenience
export { configureEnvironment, IMonacoConfig } from '@uifabric/monaco-editor/lib/configureEnvironment';

// Intentionally not exporting the query param utilities, since those really ought to live in
// example-app-base and are exported from there
