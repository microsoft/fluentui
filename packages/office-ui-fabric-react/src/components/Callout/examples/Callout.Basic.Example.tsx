import * as React from 'react';
import { DefaultButton, Callout, Link, getTheme, FontWeights, mergeStyleSets, getId } from 'office-ui-fabric-react';

export interface ICalloutBasicExampleState {
  isCalloutVisible?: boolean;
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
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary
    }
  ]
});

// Example code
export class CalloutBasicExample extends React.Component<{}, ICalloutBasicExampleState> {
  public state: ICalloutBasicExampleState = {
    isCalloutVisible: false
  };

  private _menuButtonElement = React.createRef<HTMLDivElement>();
  // Use getId() to ensure that the callout label and description IDs are unique on the page.
  // (It's also okay to use plain strings without getId() and manually ensure their uniqueness.)
  private _labelId: string = getId('callout-label');
  private _descriptionId: string = getId('callout-description');

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <div>
        <div className={styles.buttonArea} ref={this._menuButtonElement}>
          <DefaultButton onClick={this._onShowMenuClicked} text={isCalloutVisible ? 'Hide callout' : 'Show callout'} />
        </div>
        {this.state.isCalloutVisible && (
          <Callout
            className="ms-CalloutExample-callout"
            ariaLabelledBy={this._labelId}
            ariaDescribedBy={this._descriptionId}
            role="alertdialog"
            gapSpace={0}
            target={this._menuButtonElement.current}
            onDismiss={this._onCalloutDismiss}
            setInitialFocus={true}
          >
            <div className="ms-CalloutExample-header">
              <p className="ms-CalloutExample-title" id={this._labelId}>
                All of your favorite people
              </p>
            </div>
            <div className="ms-CalloutExample-inner">
              <div className="ms-CalloutExample-content">
                <p className="ms-CalloutExample-subText" id={this._descriptionId}>
                  Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                </p>
              </div>
              <div className="ms-CalloutExample-actions">
                <Link className="ms-CalloutExample-link" href="http://microsoft.com" target="_blank">
                  Go to microsoft
                </Link>
              </div>
            </div>
          </Callout>
        )}
      </div>
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
