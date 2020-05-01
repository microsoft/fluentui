import * as React from 'react';
import { DefaultButton, getTheme, FontWeights, mergeStyleSets, DelayedRender, Callout } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';

const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300,
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      height: '100%',
      padding: '24px 20px',
      fontWeight: FontWeights.semilight,
    },
  ],
});

export const StatusCalloutExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  return (
    <>
      <div className={styles.buttonArea}>
        <DefaultButton
          onClick={toggleIsCalloutVisible}
          text={isCalloutVisible ? 'Hide StatusCallout' : 'Show StatusCallout'}
        />
      </div>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          target={`.${styles.buttonArea}`}
          onDismiss={toggleIsCalloutVisible}
          role="status"
          aria-live="assertive"
        >
          <DelayedRender>
            <p className={styles.subtext}>
              This message is treated as an aria-live assertive status message, and will be read by a screen reader
              regardless of focus.
            </p>
          </DelayedRender>
        </Callout>
      )}
    </>
  );
};
