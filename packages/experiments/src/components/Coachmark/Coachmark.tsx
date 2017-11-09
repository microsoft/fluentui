import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICoachmarkProps } from './Coachmark.Props';
import { DynamicallyPositionedContainer } from '../DynamicallyPositionedContainer/DynamicallyPositionedContainer';
import { getStyles } from './Coachmark.Styles';

export interface ICoachmarkState {
  isCollapsed: boolean;
  isBeaconAnimating: boolean;
}

export class Coachmark extends BaseComponent<ICoachmarkProps, ICoachmarkState> {
  constructor(props: ICoachmarkProps) {
    super();
    this.state = {
      isCollapsed: true,
      isBeaconAnimating: true
    };
  }

  public render() {
    let {
      children
    } = this.props;

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
                <div className={ classNames.layerHost }>
                  { children }
                </div>
              </div>
            </div>
          </div>
        </div >
      </DynamicallyPositionedContainer >
    );
  }
};