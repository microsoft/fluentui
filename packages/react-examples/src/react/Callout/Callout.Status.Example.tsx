import * as React from 'react';
import { mergeStyleSets, DelayedRender, Callout, Text } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

export const StatusCalloutExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');

  return (
    <>
      <DefaultButton
        id={buttonId}
        onClick={toggleIsCalloutVisible}
        text={isCalloutVisible ? 'Hide callout' : 'Show callout'}
        className={styles.button}
      />
      {isCalloutVisible && (
        <Callout className={styles.callout} target={`#${buttonId}`} onDismiss={toggleIsCalloutVisible} role="alert">
          <DelayedRender>
            <Text variant="small">
              This message is treated as an aria-live assertive status message, and will be read by a screen reader
              regardless of focus.
            </Text>
          </DelayedRender>
        </Callout>
      )}
    </>
  );
};

const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    padding: '20px 24px',
  },
});
