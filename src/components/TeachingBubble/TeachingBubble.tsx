/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { ITeachingBubbleProps } from './TeachingBubble.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import './TeachingBubble.scss';

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubble extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {

  // Specify default props values
  public static defaultProps = {
    calloutProps: {
      beakStyle: 'ms-Callout-smallbeak',
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.rightCenter
    }
  };

  // Constructor
  constructor(props: ITeachingBubbleProps) {
    super(props);

    this.state = {
    };
  }

  public render() {
    let { calloutProps, targetElement } = this.props;

    return (
        <Callout
          className='ms-TeachingBubble'
          ref={this._resolveRef('_callout')}
          targetElement={ targetElement }
          {...calloutProps}
        >
          <TeachingBubbleContent { ...this.props }/>
        </Callout>
    );
  }
}