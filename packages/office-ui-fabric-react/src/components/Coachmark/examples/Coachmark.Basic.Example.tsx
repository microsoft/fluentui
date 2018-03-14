import * as React from 'react';
import { Coachmark } from '../Coachmark';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStyle } from '../../../Styling';
import {
  BaseComponent,
  classNamesFunction,
  createRef
} from 'office-ui-fabric-react/lib/Utilities';

export interface ICoachmarkBasicExampleState {
  isVisible?: boolean;
  isCoachmarkCollapsed?: boolean;
  targetElement?: HTMLElement;
}

export interface ICoachmarkBasicExampleStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * The example button container
   */
  buttonContainer: IStyle;
}

export class CoachmarkBasicExample extends BaseComponent<{}, ICoachmarkBasicExampleState> {
  private _targetButton = createRef<HTMLDivElement>();

  public constructor(props: {}) {
    super(props);

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);

    this.state = {
      isVisible: false,
      isCoachmarkCollapsed: true
    };
  }

  public render(): JSX.Element {
    const { isVisible } = this.state;

    const calloutProps: ICalloutProps = {
      doNotLayer: true
    };

    const getClassNames = classNamesFunction<{}, ICoachmarkBasicExampleStyles>();
    const classNames = getClassNames(() => {
      return {
        root: {},
        buttonContainer: {
          display: 'inline-block'
        }
      };
    });

    return (
      <div className={ classNames.root }>
        <div
          className={ classNames.buttonContainer }
          ref={ this._targetButton }
        >
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isVisible ? 'Hide Coachmark' : 'Show Coachmark' }
          />
        </div>
        { isVisible && (
          <Coachmark
            target={ this._targetButton.value }
          >
            <TeachingBubbleContent
              headline='Example Title'
              calloutProps={ calloutProps }
            >
              Welcome to the land of coachmarks
            </TeachingBubbleContent>
          </Coachmark>
        ) }
      </div>
    );
  }

  private _onShowMenuClicked(): void {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  private _onCalloutDismiss(): void {
    this.setState({
      isVisible: false
    });
  }
}