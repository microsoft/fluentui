import * as React from 'react';
import { DefaultButton, Callout, Link, getTheme, FontWeights, mergeStyleSets, Text } from 'office-ui-fabric-react';
import { useBoolean, useId } from '@uifabric/react-hooks';

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
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});

export const CalloutBasicExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);

  const labelId: string = useId('callout-label');
  const descriptionId: string = useId('callout-description');
  return (
    <>
      <div className={styles.buttonArea}>
        <DefaultButton onClick={toggleIsCalloutVisible} text={isCalloutVisible ? 'Hide Callout' : 'Show Callout'} />
      </div>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          gapSpace={0}
          target={`.${styles.buttonArea}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <div className={styles.header}>
            <Text className={styles.title} id={labelId}>
              All of your favorite people
            </Text>
          </div>
          <div className={styles.inner}>
            <Text className={styles.subtext} id={descriptionId}>
              Message body is optional. If help documentation is available, consider adding a link to learn more at the
              bottom.
            </Text>
            <div className={styles.actions}>
              <Link className={styles.link} href="http://microsoft.com" target="_blank">
                Go to microsoft
              </Link>
            </div>
          </div>
        </Callout>
      )}
    </>
  );
};
