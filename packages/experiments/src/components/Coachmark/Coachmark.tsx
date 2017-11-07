import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICoachmarkProps } from './Coachmark.Props';
import { DynamicallyPositionedContainer } from '../DynamicallyPositionedContainer/DynamicallyPositionedContainer';

export interface ICoachmarkState {
  isInflated: boolean;
  isExpanded: boolean;

}

export class Coachmark extends BaseComponent<ICoachmarkProps, {}> {
  public render() {
    let {
      children
    } = this.props;

    return (
      <DynamicallyPositionedContainer>
        <div
          className={ 'ms-Coachmark' }
          ref={ this._resolveRef('_hostElement') }
        >
          <div className='ms-Coachmark-beacon'></div>
          <div className="ms-Coachmark-translateAnimationLayer">
            <div className="ms-Coachmark-scaleAnimationLayer">
              <div className="ms-Coachmark-rotateAnimationLayer">
                <div className="ms-Coachmark-content">
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