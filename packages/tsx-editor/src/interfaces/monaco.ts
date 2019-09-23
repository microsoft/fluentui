// Convenience re-exports of Monaco interfaces.
// Don't import this file from anything that will be used in a Jest test.

import * as monaco from '@uifabric/monaco-editor/esm/vs/editor/editor.api';

export type ICompilerOptions = monaco.languages.typescript.CompilerOptions;
export type IMonacoTextModel = monaco.editor.ITextModel;
export type IMonacoEditorOptions = monaco.editor.IEditorOptions;
