import * as React from 'react';
import { DefaultButton, getTheme, FontWeights, mergeStyleSets, DelayedRender, Callout } from 'office-ui-fabric-react';

export interface IStatusCalloutExampleState {
  isCalloutVisible?: boolean;
}

// Themed styles for the example.
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

// Example code
export class StatusCalloutExample extends React.Component<{}, IStatusCalloutExampleState> {
  public state: IStatusCalloutExampleState = {
    isCalloutVisible: false,
  };

  private _menuButtonElement = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <>
        <div className={styles.buttonArea} ref={this._menuButtonElement}>
          <DefaultButton
            onClick={this._onShowMenuClicked}
            text={isCalloutVisible ? 'Hide StatusCallout' : 'Show StatusCallout'}
          />
        </div>
        {this.state.isCalloutVisible && (
          <Callout
            className={styles.callout}
            target={this._menuButtonElement.current}
            onDismiss={this._onCalloutDismiss}
            role="status"
            aria-live="assertive"
          >
            <DelayedRender>
              <>
                <p className={styles.subtext}>
                  This message is treated as an aria-live assertive status message, and will be read by a screen reader
                  regardless of focus.
                </p>
              </>
            </DelayedRender>
          </Callout>
        )}
      </>
    );
  }

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible,
    });
  };

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };
}
