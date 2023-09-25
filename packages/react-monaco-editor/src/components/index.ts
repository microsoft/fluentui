// Public component API, but only the parts which don't import Monaco aside from its types.
export { EditorWrapper } from './EditorWrapper';
export { EditorError } from './EditorError';
export { EditorErrorBoundary } from './EditorErrorHandler';
export { CODE_FONT_FAMILY } from './consts';

// Intentionally not exporting:
// - EditorLoading and TypeScriptSnippet since they're basically internal helpers.
// - TsxEditor and Editor because they import Monaco
export type { IEditorWrapperProps } from './EditorWrapper.types';
export type { IEditorErrorProps } from './EditorError';
export type { IEditorErrorBoundaryProps } from './EditorErrorHandler';
