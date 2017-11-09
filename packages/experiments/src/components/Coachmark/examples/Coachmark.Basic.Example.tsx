import * as React from 'react';
import { Coachmark } from '../Coachmark';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ICoachmarkBasicExampleState {
  isVisible?: boolean;
}

const EXAMPLE_BUTTON_CLASS = 'ms-Coachmark-basicExampleButton';

export class CoachmarkBasicExample extends React.Component<{}, ICoachmarkBasicExampleState> {

  public constructor() {
    super();

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);

    this.state = {
      isVisible: false
    };
  }

  public render(): JSX.Element {
    let { isVisible } = this.state;

    const positioningContainerProps: ICalloutProps = {
      doNotLayer: true
    };

    return (
      <div className='ms-CoachmarkBasicExample'>
        <div className='ms-CoachmarkBasicExample-buttonArea'>
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isVisible ? 'Hide coachmark' : 'Show coachmark' }
            className={ 'ms-Coachmark-basicExampleButton' }
          />
        </div>
        { isVisible && (
          <Coachmark
            positioningTarget={ EXAMPLE_BUTTON_CLASS }
          >
            <TeachingBubble
              headline='Example Title'
              calloutProps={ positioningContainerProps }
            >
            </TeachingBubble>
          </Coachmark>
        ) }
      </div>
    );
  }

  private _onShowMenuClicked() {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  private _onCalloutDismiss() {
    this.setState({
      isVisible: false
    });
  }
}