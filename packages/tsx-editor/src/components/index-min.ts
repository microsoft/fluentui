// Public component API, but only the parts which don't import Monaco aside from its types.
export { EditorWrapper } from './EditorWrapper';
export { IEditorWrapperProps } from './EditorWrapper.types';
export { CODE_FONT_FAMILY } from './consts';

// Intentionally not exporting:
// - EditorError, EditorLoading, and TypeScriptSnippet since they're basically internal helpers.
// - TsxEditor and Editor because they import Monaco
