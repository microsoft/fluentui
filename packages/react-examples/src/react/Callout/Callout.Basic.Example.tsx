import * as React from 'react';
import { Callout, Link, mergeStyleSets, Text, FontWeights } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

export const CalloutBasicExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  return (
    <>
      <DefaultButton
        id={buttonId}
        onClick={toggleIsCalloutVisible}
        text={isCalloutVisible ? 'Hide callout' : 'Show callout'}
        className={styles.button}
      />
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="dialog"
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <Text block variant="xLarge" className={styles.title} id={labelId}>
            Callout title here
          </Text>
          <Text block variant="small" id={descriptionId}>
            Message body is optional. If help documentation is available, consider adding a link to learn more at the
            bottom.
          </Text>
          <Link href="http://microsoft.com" target="_blank" className={styles.link}>
            Sample link
          </Link>
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
    maxWidth: '90%',
    padding: '20px 24px',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
});
