import * as React from 'react';
import { ITextModel } from './Editor.types';

export interface IEditorWrapperProps {
  /** Code to edit */
  code: string;

  /** Whether the editor (or code viewer) is visible */
  isCodeVisible?: boolean;

  onRenderPreview?: (props: IEditorPreviewProps, defaultRender: (props: IEditorPreviewProps) => React.ReactNode) => React.ReactNode;

  /** Class to use on the div wrapping the editor/loading spinner/code viewer */
  editorClassName?: string;

  /** Class to use on the wrapper for the rendered example */
  previewClassName?: string;

  /** Editor height */
  height?: number | string;

  /** Editor width */
  width?: number | string;

  /** Used to access the editor model. Cleared when editor component is disposed to avoid memory leaks. */
  modelRef?: React.MutableRefObject<ITextModel>;

  /** Force using the editor (vs the code viewer) on or off */
  useEditor?: boolean;

  /** Initial children to show in the example results div (will be replaced when the example runs) */
  children?: React.ReactNode;
}

export interface IEditorPreviewProps {
  /** ID of the div the preview will be rendered into */
  id: string;

  /** Class name for the preview container */
  className?: string;

  /** Whether the preview container should have a data-is-scrollable attribute */
  isScrollable?: boolean;

  /** Initial children to show in the example results div (will be replaced when the example runs) */
  children?: React.ReactNode;
}
