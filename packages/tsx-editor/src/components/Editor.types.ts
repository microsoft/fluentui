import * as React from 'react';
import * as monaco from '@uifabric/monaco-editor/lib/esm/vs/editor/editor.api';

export type ITextModel = monaco.editor.ITextModel;

export interface IEditorProps {
  /** Code to edit */
  code: string;

  /** Editor height */
  height: number | string;

  /** Editor width */
  width: number | string;

  /**
   * Used to get notifications of changes to the editor text.
   * This function's identity MUST stay constant to prevent the editor model from being re-created.
   */
  onChange?: (model: ITextModel) => void;

  /** Used to access the editor model. Cleared when editor component is disposed to avoid memory leaks. */
  modelRef?: React.MutableRefObject<ITextModel | undefined>;
}
