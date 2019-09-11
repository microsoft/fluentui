import * as React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export type ITextModel = monaco.editor.ITextModel;

export interface IEditorProps {
  /** Code to edit */
  code: string;

  /** Editor height */
  height: number | string;

  /** Editor width */
  width: number | string;

  /** Editor code language (default typescript) */
  language?: string;

  /** Used to get notifications of changes to the editor text */
  onChange?: (model: ITextModel) => void;

  /** Used to access the editor model. Cleared when editor component is disposed to avoid memory leaks. */
  modelRef?: React.MutableRefObject<ITextModel>;
}
