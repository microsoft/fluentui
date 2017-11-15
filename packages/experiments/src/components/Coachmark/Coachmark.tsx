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
  entityInnerHostRect: IEntityRect;
}

export interface IEntityRect {
  width: number,
  height: number
}

export class Coachmark extends BaseComponent<ICoachmarkProps, ICoachmarkState> {

  private _entityInnerHostElement: HTMLElement;

  /**
   * The height of _entityInnerHost before the
   * teaching callout collapses.
   */
  private _originalEntityHostHeight: number;

  /**
   * The widht of _entityInnerHost before the
   * teaching callout collapses
   */
  private _originalEntityHostWidth: number;


  public static defaultProps = {
    isCollapsed: true
  };

  constructor(props: ICoachmarkProps) {
    super();
    this.state = {
      isCollapsed: props.isCollapsed!,
      isBeaconAnimating: true,
      isMeasuring: true,
      entityInnerHostRect: {
        width: 0,
        height: 0
      }
    };
  }

  public render() {
    let {
      children
    } = this.props;

    // Classnames
    const classNames = getStyles({
      isCollapsed: this.state.isCollapsed,
      isBeaconAnimating: this.state.isBeaconAnimating,
      isMeasuring: this.state.isMeasuring,
      entityHostHeight: (this._originalEntityHostHeight) ? this._originalEntityHostHeight + 'px' : undefined,
      entityHostWidth: (this._originalEntityHostWidth) ? this._originalEntityHostWidth + 'px' : undefined
    });

    const entityHostStyles = {
      height: this._originalEntityHostHeight,
      width: this._originalEntityHostWidth
    };

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
                  style={ entityHostStyles }
                >
                  <div
                    className={ classNames.entityInnerHost }
                    ref={ this._resolveRef('_entityInnerHostElement') }
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

  public componentDidMount() {
    if (this.state.isMeasuring) {
      this._async.setTimeout(() => {
        if ((this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width) === 0) {
          // Store the original dimensions
          this._originalEntityHostHeight = this._entityInnerHostElement.offsetHeight;
          this._originalEntityHostWidth = this._entityInnerHostElement.offsetWidth;


          // Since measurements have been complete let's
          // update the state.
          this.setState({
            isMeasuring: false
          });
        }
      }, 100);
    }
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