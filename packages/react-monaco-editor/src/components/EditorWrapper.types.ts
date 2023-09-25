import * as React from 'react';
import type { IMonacoTextModel, IPackageGroup, ITransformedExample } from '../interfaces/index';

export interface IEditorWrapperProps {
  /**
   * Initial code to edit. WARNING: Changing this will re-create the editor. (For this reason, the
   * editor wrapper should NOT be used as a controlled component.)
   */
  code: string;

  /** Class to use on the div wrapping the editor/loading spinner/code viewer */
  editorClassName?: string;

  /** Custom component for the preview. It **must** render the children passed in. */
  previewAs?: React.ComponentType<{}>;

  /** Props to use on the wrapper for the rendered example. */
  previewProps?: {};

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

  /**
   * Label for the editor for screen reader users. This is applied to the Monaco instance itself,
   * not the wrapper. WARNING: Changing this will re-create the editor.
   */
  editorAriaLabel?: string;

  /**
   * Used to access the editor model. Cleared when editor component is disposed to avoid memory leaks.
   * WARNING: Changing this will re-create the editor.
   */
  modelRef?: React.MutableRefObject<IMonacoTextModel | undefined>;

  /** Force using the editor (vs the code viewer) on or off */
  useEditor?: boolean;

  /**
   * Supported packages for imports (React is implicitly supported).
   *
   * WARNING: Changing this prop will cause editor initialization to re-run.
   * (Save the value in a constant to prevent it from mutating every render.)
   */
  supportedPackages: IPackageGroup[];

  /** Callback to notify when transforming finishes. */
  onTransformFinished?: (result: ITransformedExample) => void;

  /** Initial children to show in the example results div (will be hidden when example runs) */
  children?: React.ReactNode;
}
