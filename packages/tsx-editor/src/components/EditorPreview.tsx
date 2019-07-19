import * as React from 'react';
import { Label } from 'office-ui-fabric-react';
interface IEditorPreview {
  id: string;
  error?: string;
}

const errorStyle = {
  backgroundColor: 'lightgray',
  opacity: 0.7,
  disabled: true
};

export const EditorPreview = (props: IEditorPreview) => {
  return (
    <div>
      {props.error === undefined ? (
        ''
      ) : (
        <Label style={{ color: '#FF5E79' }}>There is an error preventing the code to be rendered: {props.error}</Label>
      )}
      <div style={props.error === undefined ? {} : errorStyle}>
        <div id={props.id} />
      </div>
    </div>
  );
};
