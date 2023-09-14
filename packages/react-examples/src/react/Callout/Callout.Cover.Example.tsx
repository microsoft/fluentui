import * as React from 'react';
import { Callout, getTheme, mergeStyleSets, FontWeights, Text } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

export const CalloutCoverExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');

  return (
    <>
      <DefaultButton id={buttonId} text="Show callout" onClick={toggleIsCalloutVisible} />
      {isCalloutVisible && (
        <Callout
          coverTarget
          ariaLabelledBy={labelId}
          role="dialog"
          className={styles.callout}
          onDismiss={toggleIsCalloutVisible}
          target={`#${buttonId}`}
          isBeakVisible={false}
          setInitialFocus
        >
          <Text block variant="xLarge" className={styles.title} id={labelId}>
            I'm covering the target!
          </Text>
          <div className={styles.actions}>
            <DefaultButton onClick={toggleIsCalloutVisible} text="Click to dismiss" />
          </div>
        </Callout>
      )}
    </>
  );
};

const theme = getTheme();
const styles = mergeStyleSets({
  callout: {
    width: 320,
    padding: '20px 24px',
    background: theme.semanticColors.bodyBackground,
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  actions: {
    marginTop: 20,
  },
});
