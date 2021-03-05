// Convenience re-exports of Monaco interfaces.

// This import MUST be from the API file (not the root) to prevent Monaco from being pulled into
// the main bundle.
import * as monaco from '@fluentui/monaco-editor/esm/vs/editor/editor.api';

export type ICompilerOptions = monaco.languages.typescript.CompilerOptions;
export type IMonacoTextModel = monaco.editor.ITextModel;
export type IMonacoEditorOptions = monaco.editor.IEditorOptions;
