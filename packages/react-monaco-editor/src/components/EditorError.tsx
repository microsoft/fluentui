import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { mergeStyles } from '@fluentui/react/lib/Styling';

export interface IEditorErrorProps {
  error?: string | string[];
}

const indent = 15;
const lineClass = mergeStyles({
  marginLeft: indent,
  paddingLeft: indent,
  textIndent: `-${indent}px`,
});
const indentedLineClass = mergeStyles(lineClass, { marginLeft: indent * 2 });

/** Display a message bar with an error. If there's no error, returns null. */
export const EditorError: React.FunctionComponent<IEditorErrorProps> = props => {
  const { error } = props;
  const errorArr = !error ? [] : Array.isArray(error) ? error : error.split('\n');

  return errorArr.length ? (
    <MessageBar messageBarType={MessageBarType.error} truncated overflowButtonAriaLabel="Show more">
      There {errorArr.length === 1 ? 'is an error' : 'are errors'} preventing the code from being rendered:
      {errorArr!.map(err => {
        return (
          <div key={err} className={/^  +/.test(err) ? indentedLineClass : lineClass}>
            {err.trim()}
          </div>
        );
      })}
    </MessageBar>
  ) : null;
};
