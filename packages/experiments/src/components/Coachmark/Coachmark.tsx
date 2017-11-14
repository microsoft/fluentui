import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICoachmarkProps } from './Coachmark.Props';
import { DynamicallyPositionedContainer } from '../DynamicallyPositionedContainer/DynamicallyPositionedContainer';
import { getStyles } from './Coachmark.Styles';

export interface ICoachmarkState {
  isCollapsed: boolean;
  isBeaconAnimating: boolean;
  isMouseInProximity: boolean;
}

export class Coachmark extends BaseComponent<ICoachmarkProps, ICoachmarkState> {
  private _entityElemenet: HTMLElement;
  private _elementRect: ClientRect;

  public static defaultProps = {
    mouseProximityOffset: 100
  };

  constructor(props: ICoachmarkProps) {
    super();
    this.state = {
      isCollapsed: true,
      isBeaconAnimating: true,
      isMouseInProximity: true
    };

    // Remove the measurement from the initial paint
    this._async.setTimeout(() => {
      this._elementRect = this._entityElemenet.getBoundingClientRect();
    }, 10);

    this._isElementInProximity();
  }

  public render() {
    let {
      children
    } = this.props;

    // Classnames
    const classNames = getStyles({
      isCollapsed: this.state.isCollapsed,
      isBeaconAnimating: this.state.isBeaconAnimating
    });

    return (
      <DynamicallyPositionedContainer
        target={ this.props.positioningTarget }>
        <div
          className={ classNames.root }
          ref={ this._resolveRef('_hostElement') }
        >
          <div className={ classNames.pulsingBeacon }></div>
          <div className={ classNames.translateAnimationContainer }>
            <div className={ classNames.scaleAnimationLayer }>
              <div className={ classNames.rotateAnimationLayer }>
                <div
                  className={ classNames.entityHost }
                  ref={ this._resolveRef('_') }
                >
                  { children }
                </div>
              </div>
            </div>
          </div>
        </div >
      </DynamicallyPositionedContainer >
    );
  }

  private _isElementInProximity() {
    let timeoutIds: number[] = [];

    this._events.on(window, 'resize', () => {
      timeoutIds.forEach((value) => {
        clearInterval(value)
      });

      timeoutIds.push(this._async.setTimeout(() => {
        this._elementRect = this._entityElemenet.getBoundingClientRect();
      }, 100));
    });

    this._events.on(document, 'mousemove', (e: MouseEvent) => {
      let mouseY = e.pageY;
      let mouseX = e.pageX;

      this.setState({
        isMouseInProximity: this._isInsideElement(this._elementRect, mouseX, mouseY)
      });
    });
  }

  private _isInsideElement(elementRect: ClientRect, mouseX: number, mouseY: number): boolean {
    return mouseX > (elementRect.left - this.props.mouseProximityOffset) && mouseX < ((elementRect.left + elementRect.width) + this.props.mouseProximityOffset) &&
      mouseY > (elementRect.top - this.props.mouseProximityOffset) && mouseY < ((elementRect.top + elementRect.height) + this.props.mouseProximityOffset);
  }
};