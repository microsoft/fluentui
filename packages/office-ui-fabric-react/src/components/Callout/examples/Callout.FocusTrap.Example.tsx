import * as React from 'react';
import {
  DefaultButton,
  FocusTrapCallout,
  Stack,
  getId,
  FocusZone,
  PrimaryButton,
  getTheme,
  mergeStyleSets,
  FontWeights
} from 'office-ui-fabric-react';

export interface ICalloutFocusTrapExampleState {
  isCalloutVisible: boolean;
}

// Themed styles for the example.
const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center'
  },
  callout: {
    maxWidth: 300
  },
  header: {
    padding: '18px 24px 12px'
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.semilight
    }
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px'
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap'
  },
  buttons: {
    padding: '0 24px 12px'
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.semilight
    }
  ]
});

export class CalloutFocusTrapExample extends React.Component<{}, ICalloutFocusTrapExampleState> {
  public state: ICalloutFocusTrapExampleState = {
    isCalloutVisible: false
  };

  private _menuButtonElement: HTMLElement | null;
  // Use getId() to ensure that the callout title ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure its uniqueness.)
  private _titleId: string = getId('callout-label');

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <div className="ms-CalloutExample">
        <div className={styles.buttonArea} ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton onClick={this._onDismiss} text={isCalloutVisible ? 'Hide callout' : 'Show callout'} />
        </div>
        {isCalloutVisible ? (
          <div>
            <FocusTrapCallout
              role="alertdialog"
              ariaLabelledBy={this._titleId}
              className={styles.callout}
              gapSpace={0}
              target={this._menuButtonElement}
              onDismiss={this._onDismiss}
              setInitialFocus={true}
            >
              <div className={styles.header}>
                <p className={styles.title} id={this._titleId}>
                  Callout title here
                </p>
              </div>
              <div className={styles.inner}>
                <div className="ms-CalloutExample-content">
                  <p className={styles.subtext}>
                    Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                  </p>
                </div>
              </div>
              <FocusZone>
                <Stack className={styles.buttons} gap={8} horizontal>
                  <PrimaryButton onClick={this._onDismiss}>Agree</PrimaryButton>
                  <DefaultButton onClick={this._onDismiss}>Cancel</DefaultButton>
                </Stack>
              </FocusZone>
            </FocusTrapCallout>
          </div>
        ) : null}
      </div>
    );
  }

  private _onDismiss = () => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  };
}
