import * as React from 'react';
import {
  DefaultButton,
  FocusTrapCallout,
  Stack,
  FocusZone,
  PrimaryButton,
  getTheme,
  mergeStyleSets,
  FontWeights,
} from 'office-ui-fabric-react';
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 24px 24px',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
});

export const CalloutFocusTrapExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  return (
    <>
      <div className={styles.buttonArea}>
        <DefaultButton
          onClick={toggleIsCalloutVisible}
          text={isCalloutVisible ? 'Hide FocusTrapCallout' : 'Show FocusTrapCallout'}
        />
      </div>
      {isCalloutVisible ? (
        <div>
          <FocusTrapCallout
            role="alertdialog"
            className={styles.callout}
            gapSpace={0}
            target={`.${styles.buttonArea}`}
            onDismiss={toggleIsCalloutVisible}
            setInitialFocus={true}
          >
            <div className={styles.header}>
              <p className={styles.title}>Callout title here</p>
            </div>
            <div className={styles.inner}>
              <div>
                <p className={styles.subtext}>
                  Content is wrapped in a FocusTrapZone so that user cannot accidently tab out of this callout.
                </p>
              </div>
            </div>
            <FocusZone>
              <Stack className={styles.buttons} gap={8} horizontal>
                <PrimaryButton onClick={toggleIsCalloutVisible}>Button 1</PrimaryButton>
                <DefaultButton onClick={toggleIsCalloutVisible}>Button 2</DefaultButton>
              </Stack>
            </FocusZone>
          </FocusTrapCallout>
        </div>
      ) : null}
    </>
  );
};
