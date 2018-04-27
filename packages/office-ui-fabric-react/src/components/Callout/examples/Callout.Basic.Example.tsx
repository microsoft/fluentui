import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  createRef
} from 'office-ui-fabric-react/lib/Utilities';
import { getTheme, FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

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
  private _menuButtonElement = createRef<HTMLElement>();

  public constructor(props: {}) {
    super(props);

    this.state = {
      isCalloutVisible: false
    };
  }

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;

    return (
      <div>
        <div
          className={ styles.buttonArea }
          ref={ this._menuButtonElement }
        >
          <DefaultButton
            id='toggleCallout'
            onClick={ this._onShowMenuClicked }
            text={ isCalloutVisible ? 'Hide callout' : 'Show callout' }
          />
        </div>
        <Callout
          className='ms-CalloutExample-callout'
          ariaLabelledBy={ 'callout-label-1' }
          ariaDescribedBy={ 'callout-description-1' }
          role={ 'alertdialog' }
          gapSpace={ 0 }
          target={ this._menuButtonElement.value }
          onDismiss={ this._onCalloutDismiss }
          setInitialFocus={ true }
          hidden={ !this.state.isCalloutVisible }
        >
          <div className='ms-CalloutExample-header'>
            <p className='ms-CalloutExample-title' id={ 'callout-label-1' }>
              All of your favorite people
              </p>
          </div>
          <div className='ms-CalloutExample-inner'>
            <div className='ms-CalloutExample-content'>
              <p className='ms-CalloutExample-subText' id={ 'callout-description-1' }>
                Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                </p>
            </div>
            <div className='ms-CalloutExample-actions'>
              <Link className='ms-CalloutExample-link' href='http://microsoft.com'>Go to microsoft</Link>
            </div>
          </div>
        </Callout>
      </div>
    );
  }

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  }
}
