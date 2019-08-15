import * as React from 'react';
import { ICalloutProps } from './Callout.types';
import { ICalloutState } from './CalloutContent.base';
import { CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';

export class Callout extends React.Component<ICalloutProps, ICalloutState> {
  public render(): JSX.Element {
    const { layerProps, ...rest } = this.props;
    const content = <CalloutContent {...rest} />;
    return this.props.doNotLayer ? content : <Layer {...layerProps}>{content}</Layer>;
  }
}
