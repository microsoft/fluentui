import * as React from 'react';
import { DefaultButton, getTheme, FontWeights, mergeStyleSets, AnnouncedCallout } from 'office-ui-fabric-react';

export interface IAnnouncedCalloutExampleState {
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
    height: 32
  },
  callout: {
    maxWidth: 300
  },

  inner: {
    height: '100%',
    padding: '24px 20px'
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

// Example code
export class AnnouncedCalloutExample extends React.Component<{}, IAnnouncedCalloutExampleState> {
  public state: IAnnouncedCalloutExampleState = {
    isCalloutVisible: false
  };

  private _menuButtonElement = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <>
        <div className={styles.buttonArea} ref={this._menuButtonElement}>
          <DefaultButton onClick={this._onShowMenuClicked} text={isCalloutVisible ? 'Hide AnnouncedCallout' : 'Show AnnouncedCallout'} />
        </div>
        {this.state.isCalloutVisible && (
          <AnnouncedCallout
            className={styles.callout}
            gapSpace={0}
            target={this._menuButtonElement.current}
            onDismiss={this._onCalloutDismiss}
            setInitialFocus={true}
          >
            <div className={styles.inner}>
              <p className={styles.subtext}>
                This message is treated as an aria-live assertive status message, and will be read by narrator regardless of focus.
              </p>
            </div>
          </AnnouncedCallout>
        )}
      </>
    );
  }

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  };

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  };
}
