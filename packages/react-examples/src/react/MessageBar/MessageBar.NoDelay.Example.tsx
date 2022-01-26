import * as React from 'react';
import { MessageBar, MessageBarType, Toggle, Text, mergeStyles } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

const wrapperClass = mergeStyles({
  '> *:not(:last-child)': { marginBottom: '1.5em' },
  '> * > *:not(:last-child)': { marginBottom: '0.5em' },
});

export const MessageBarNoDelayExample: React.FunctionComponent = () => {
  const [showAlert, { toggle: toggleShowAlert }] = useBoolean(false);
  const [showStatus, { toggle: toggleShowStatus }] = useBoolean(false);

  return (
    <div className={wrapperClass}>
      <Text block>
        By default, MessageBar renders its content within an internal live region after a short delay to help ensure
        it's announced by screen readers. You can disable this behavior (while still ensuring the message is read by
        screen readers) by setting the <code>delayedRender</code> prop to <code>false</code> and setting up the
        MessageBar in one of the following ways.
      </Text>
      <div>
        <Text block>
          <strong>Option 1:</strong> If the MessageBar uses <code>role="alert"</code>, the content should be read on
          insertion. This role will be set automatically if <code>messageBarType</code> is <code>error</code>,{' '}
          <code>blocked</code>, or <code>severeWarning</code>.
        </Text>
        <Toggle inlineLabel label="Show alert example" checked={showAlert} onChange={toggleShowAlert} />
        {showAlert && (
          <MessageBar
            delayedRender={false}
            // Setting this to error, blocked, or severeWarning automatically sets the role to "alert"
            messageBarType={MessageBarType.error}
            // Or you could set the role manually, IF an alert role is appropriate for the message
            // role="alert"
          >
            This is an error message.
          </MessageBar>
        )}
      </div>
      <div>
        <Text block>
          <strong>Option 2:</strong> Wrap the whole MessageBar in a <code>{'<div role="status">'}</code> which is always
          rendered, and ensure the MessageBar is rendered either conditionally or with a delay. You should also set{' '}
          <code>role="none"</code> on the MessageBar itself to prevent nested status regions.
        </Text>
        <Toggle inlineLabel label="Show status example" checked={showStatus} onChange={toggleShowStatus} />
        {/* IMPORTANT: This wrapper div must always be rendered */}
        <div role="status">
          {showStatus && (
            <MessageBar
              delayedRender={false}
              // IMPORTANT: Set role="none" to prevent nested status regions
              role="none"
            >
              This is a status message.
            </MessageBar>
          )}
        </div>
      </div>
    </div>
  );
};
