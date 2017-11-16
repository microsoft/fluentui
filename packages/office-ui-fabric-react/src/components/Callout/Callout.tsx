/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { BaseComponent } from '../../Utilities';
import { ICalloutProps } from './Callout.types';
import { ICalloutState, CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';

export class Callout extends BaseComponent<ICalloutProps, ICalloutState> {

  constructor(props: ICalloutProps) {
    super(props);

    this._warnDeprecations({
      'targetPoint': 'target',
      'useTargetPoint': 'target',
    });
  }

  public render() {
    let content = (
      <CalloutContent { ...this.props } />
    );
    return this.props.doNotLayer ? content : (
      <Layer>
        { content }
      </Layer>
    );
  }
}