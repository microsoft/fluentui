import * as React from 'react';
import { Label } from 'office-ui-fabric-react';

export interface IEditorPreviewProps {
  id: string;
  error?: string;
  className?: string;
}

const errorStyle: React.CSSProperties = {
  backgroundColor: 'lightgray',
  opacity: 0.7
};

export const EditorPreview = (props: IEditorPreviewProps) => {
  return (
    <div>
      {props.error === undefined ? (
        ''
      ) : (
        <Label style={{ color: '#FF5E79' }}>There is an error preventing the code from being rendered: {props.error}</Label>
      )}
      <div style={props.error === undefined ? {} : errorStyle}>
        <div className={props.className} id={props.id} />
      </div>
    </div>
  );
};

export default EditorPreview;
