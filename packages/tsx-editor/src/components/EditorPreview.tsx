import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

export interface IEditorPreviewProps {
  id: string;
  error?: string;
  className?: string;
}

export const EditorPreview = (props: IEditorPreviewProps) => {
  return (
    <div>
      {props.error === undefined ? (
        ''
      ) : (
        <MessageBar messageBarType={MessageBarType.error} truncated={true} overflowButtonAriaLabel="Show more">
          There is an error preventing the code from being rendered: {props.error}
        </MessageBar>
      )}
      <div className={props.className} id={props.id} />
    </div>
  );
};

export default EditorPreview;
