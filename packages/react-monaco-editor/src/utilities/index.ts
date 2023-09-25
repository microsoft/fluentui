// Public utilities API
export { SUPPORTED_PACKAGES } from './defaultSupportedPackages';
export { isEditorSupported } from './isEditorSupported';

// Re-export for convenience
export { configureEnvironment } from '@fluentui/monaco-editor/lib/configureEnvironment';

// Intentionally not exporting the query param utilities, since those really ought to live in
// react-docsite-components and are exported from there
export type { IMonacoConfig } from '@fluentui/monaco-editor/lib/configureEnvironment';
