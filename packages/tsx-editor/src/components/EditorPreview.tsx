import * as React from 'react';
import { IEditorPreviewProps } from './EditorWrapper.types';

/**
 * Region for showing the result of compiling and rendering an example.
 * This will initially show any children passed in, but they'll be replaced when the example runs.
 */
export const EditorPreview: React.FunctionComponent<IEditorPreviewProps> = props => {
  const { className, id, isScrollable, children } = props;

  return (
    <div id={id} className={className} data-is-scrollable={isScrollable}>
      {
        // Initially put the children in this div, but they'll be overwritten when the example renders
        children
      }
    </div>
  );
};
