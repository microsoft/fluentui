import * as React from 'react';

import { BaseComponent } from '../../Utilities';
import { ICalloutProps } from './Callout.types';
import { ICalloutState } from './CalloutContent.base';
import { CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';

export class Callout extends BaseComponent<ICalloutProps, ICalloutState> {

  constructor(props: ICalloutProps) {
    super(props);

    this._warnDeprecations({
      'targetPoint': 'target',
      'useTargetPoint': 'target',
    });
  }

  public render(): JSX.Element {
    const content = (
      <CalloutContent { ...this.props } />
    );
    return this.props.doNotLayer ? content : (
      <Layer>
        { content }
      </Layer>
    );
  }
}