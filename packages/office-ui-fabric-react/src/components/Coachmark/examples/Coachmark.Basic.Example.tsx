import * as React from 'react';
import { Coachmark } from '../Coachmark';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import { IStyle } from '../../../Styling';
import {
  BaseComponent,
  classNamesFunction,
  createRef
} from 'office-ui-fabric-react/lib/Utilities';

export interface ICoachmarkBasicExampleState {
  isTargetVisible?: boolean;
  isCoachmarkCollapsed?: boolean;
  targetElement?: HTMLElement;
  showPanel?: boolean;
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

    this.state = {
      isTargetVisible: false,
      isCoachmarkCollapsed: true,
      showPanel: false
    };
  }

  public render(): JSX.Element {
    const { isTargetVisible } = this.state;

    const getClassNames = classNamesFunction<{}, ICoachmarkBasicExampleStyles>();
    const classNames = getClassNames(() => {
      return {
        buttonContainer: {
          display: 'inline-block'
        }
      };
    });

    const buttonProps: IButtonProps = {
      text: 'Try it'
    };

    const buttonProps2: IButtonProps = {
      text: 'Try it again'
    };

    return (
      <div className={ classNames.root }>
        <div
          className={ classNames.buttonContainer }
          ref={ this._targetButton }
        >
          <DefaultButton
            onClick={ this._onShowMenuClicked }
            text={ isTargetVisible ? 'Hide Coachmark' : 'Show Coachmark' }
          />
        </div>
        { isTargetVisible && (
          <Coachmark
            target={ this._targetButton.current }
            positioningContainerProps={ {
              directionalHint: DirectionalHint.topLeftEdge
            } }
          >
            <TeachingBubbleContent
              headline='Example Title'
              hasCloseIcon={ true }
              closeButtonAriaLabel='Close'
              primaryButtonProps={ buttonProps }
              secondaryButtonProps={ buttonProps2 }
              onDismiss={ this._onDismiss }
            >
              Welcome to the land of coachmarks
            </TeachingBubbleContent>
          </Coachmark>
        ) }
      </div>
    );
  }

  private _onDismiss = (): void => {
    this.setState({
      isTargetVisible: false
    });
  }

  private _onShowMenuClicked = (): void => {
    this.setState({
      isTargetVisible: !this.state.isTargetVisible
    });
  }
}