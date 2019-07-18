import * as React from 'react';

interface IEditorPreview {
  id: string;
}

export const EditorPreview = (props: IEditorPreview) => {
  return <div id={props.id} />;
};
