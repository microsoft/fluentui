import * as React from 'react';
import type { IMonacoEditorOptions, IMonacoTextModel } from '../interfaces/index';

export interface IEditorProps {
  /**
   * Editor height. (Changing this prop should not re-create the editor, but it might not affect
   * the layout of the existing editor.)
   */
  height?: number | string;

  /**
   * Editor width. (Changing this prop should not re-create the editor, but it might not affect
   * the layout of the existing editor.)
   */
  width?: number | string;

  /** Class for the div containing the editor. (Can be changed without re-creating the editor.) */
  className?: string;

  /**
   * Initial code to edit. WARNING: Changing this will re-create the editor. (For this reason, the
   * editor should NOT be used as a controlled component.)
   */
  code?: string;

  /** Editor code language. WARNING: Changing this will re-create the editor. */
  language?: string;

  /** Name for the fake file. WARNING: Changing this will re-create the editor. */
  filename?: string;

  /** Label for the editor for screen reader users. WARNING: Changing this will re-create the editor. */
  ariaLabel?: string;

  /** Options for creating the editor. WARNING: Changing this will re-create the editor. */
  editorOptions?: IMonacoEditorOptions;

  /** Callback to notify when the text changes. (Can be changed without re-creating the editor.) */
  onChange?: (text: string) => void;

  /**
   * Debounce `onChange` calls by this many milliseconds, or 0 to disable.
   * (Can be changed without re-creating the editor.)
   * @defaultvalue 1000
   */
  debounceTime?: number;

  /**
   * Used to access the editor model. Cleared when editor component is disposed to avoid memory leaks.
   * WARNING: Changing this will re-create the editor.
   */
  modelRef?: React.MutableRefObject<IMonacoTextModel | undefined>;
}
