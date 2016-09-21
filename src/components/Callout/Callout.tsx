import * as React from 'react';
import { ICalloutProps, ICalloutState, CalloutContent } from './index';
import { Layer } from '../../Layer';

export class Callout extends React.Component<ICalloutProps, ICalloutState> {

  constructor(props: ICalloutProps) {
    super(props);
  }

  public render() {
    let content = (
      <CalloutContent { ...this.props }/>
    );
    return this.props.doNotLayer ? content : (
      <Layer>
        { content }
      </Layer>
    );
  }
}