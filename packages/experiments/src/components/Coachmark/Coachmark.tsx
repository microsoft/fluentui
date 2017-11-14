import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICoachmarkProps } from './Coachmark.Props';
import { DynamicallyPositionedContainer } from '../DynamicallyPositionedContainer/DynamicallyPositionedContainer';
import { getStyles } from './Coachmark.Styles';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface ICoachmarkState {
  isCollapsed: boolean;
  isBeaconAnimating: boolean;
  isMeasuring: boolean;
}

export class Coachmark extends BaseComponent<ICoachmarkProps, ICoachmarkState> {
  private _entityInnerHost: HTMLElement;
  private _entityHost: HTMLElement;
  private _originalEntityHostHeight: number;
  private _originalEntityHostWidth: number;

  public static defaultProps = {
    isCollapsed: true
  };

  constructor(props: ICoachmarkProps) {
    super();
    this.state = {
      isCollapsed: props.isCollapsed!,
      isBeaconAnimating: true,
      isMeasuring: true
    };
  }

  public componentDidMount() {
    // Set the height and width of the entity explicitly
    // in order to trigger the width/height css transition
    // animation

    // Adding this because i beleive i am not getting the correct height and width
    // and could just be a race condition issue.

    // The coachmark has to be open before these measurements are taken
    if (!this._originalEntityHostHeight && !this._originalEntityHostWidth) {
      this._async.setTimeout(() => {
        // Store the original dimensions
        this._originalEntityHostHeight = this._entityInnerHost.offsetHeight;
        this._originalEntityHostWidth = this._entityInnerHost.offsetWidth;

        // Since measurements have been complete let's
        // update the state.
        this.setState({
          isMeasuring: false
        });
      }, 100);
    }
  }

  // public componentWillReceiveProps(newProps: ICoachmarkProps) {
  //   // Check if the Coachmark is now open
  //   if (this.props.isCollapsed !== newProps.isCollapsed) {
  //     // Set the height and width to the original
  //     // measurements saved when mounting this component.
  //     this._entityHost.style.width = this._entityInnerHost.offsetWidth + 'px';
  //     this._entityHost.style.height = this._entityInnerHost.offsetHeight + 'px';
  //   }
  // }

  public render() {
    let {
      children
    } = this.props;

    // Classnames
    const classNames = getStyles({
      isCollapsed: this.state.isCollapsed,
      isBeaconAnimating: this.state.isBeaconAnimating,
      isMeasuring: this.state.isMeasuring,
      entityHostHeight: this._originalEntityHostHeight + 'px',
      entityHostWidth: this._originalEntityHostWidth + 'px'
    });

    return (
      <DynamicallyPositionedContainer
        target={ this.props.positioningTarget }>
        <div
          className={ classNames.root }
          onClick={ this._onCLickHandler }
        >
          <div className={ classNames.pulsingBeacon }></div>
          <div className={ classNames.translateAnimationContainer }>
            <div className={ classNames.scaleAnimationLayer }>
              <div className={ classNames.rotateAnimationLayer }>
                <div
                  className={ classNames.entityHost }
                  ref={ this._resolveRef('_entityHost') }
                >
                  <div
                    className={ classNames.entityInnerHost }
                    ref={ this._resolveRef('_entityInnerHost') }
                  >
                    { children }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DynamicallyPositionedContainer>
    );
  }

  @autobind
  private _onCLickHandler() {

    // @TODO remove this as it's an example
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });

    if (this.props.onClickHandler) {
      this.props.onClickHandler();
    }
  }
};