import * as React from 'react';
import {
  DefaultButton,
  FocusTrapCallout,
  Stack,
  FocusZone,
  PrimaryButton,
  mergeStyleSets,
  FontWeights,
  Text,
} from 'office-ui-fabric-react';

export interface ICalloutFocusTrapExampleState {
  isCalloutVisible: boolean;
}

// Themed styles for the example.
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
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
});

export class CalloutFocusTrapExample extends React.Component<{}, ICalloutFocusTrapExampleState> {
  public state: ICalloutFocusTrapExampleState = {
    isCalloutVisible: false,
  };

  private _menuButtonElement: HTMLElement | null;

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <>
        <div className={styles.buttonArea} ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton
            onClick={this._onDismiss}
            text={isCalloutVisible ? 'Hide FocusTrapCallout' : 'Show FocusTrapCallout'}
          />
        </div>
        {isCalloutVisible ? (
          <div>
            <FocusTrapCallout
              role="alertdialog"
              className={styles.callout}
              gapSpace={0}
              target={this._menuButtonElement}
              onDismiss={this._onDismiss}
              setInitialFocus={true}
            >
              <div className={styles.header}>
                <Text variant="xLarge" className={styles.title}>
                  Callout title here
                </Text>
              </div>
              <div className={styles.inner}>
                <div>
                  <Text variant="small" className={styles.subtext}>
                    Content is wrapped in a FocusTrapZone so that user cannot accidently tab out of this callout.
                  </Text>
                </div>
              </div>
              <FocusZone>
                <Stack className={styles.buttons} gap={8} horizontal>
                  <PrimaryButton onClick={this._onDismiss}>Button 1</PrimaryButton>
                  <DefaultButton onClick={this._onDismiss}>Button 2</DefaultButton>
                </Stack>
              </FocusZone>
            </FocusTrapCallout>
          </div>
        ) : null}
      </>
    );
  }

  private _onDismiss = () => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible,
    });
  };
}
