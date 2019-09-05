import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IEditorErrorProps {
  error?: string | string[];
}

export const EditorError: React.FunctionComponent<IEditorErrorProps> = props => {
  const { error } = props;
  const isOneError = !!error && (typeof error === 'string' || error.length === 1);

  return error ? (
    <MessageBar messageBarType={MessageBarType.error} truncated={true} overflowButtonAriaLabel="Show more">
      There {isOneError ? 'is an error' : 'are errors'} preventing the code from being rendered:{' '}
      {typeof error === 'string'
        ? error
        : error.map(err => (
            <span key={err}>
              <br />
              {'    ' + err}
            </span>
          ))}
    </MessageBar>
  ) : null;
};
