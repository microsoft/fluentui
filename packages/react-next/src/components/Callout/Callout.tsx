import * as React from 'react';
import { ICalloutProps } from './Callout.types';
import { CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';

export const Callout: React.FunctionComponent<ICalloutProps> = React.forwardRef<HTMLDivElement, ICalloutProps>(
  ({ layerProps, doNotLayer, ...rest }, forwardedRef) => {
    const content = <CalloutContent {...rest} ref={forwardedRef} />;
    return doNotLayer ? content : <Layer {...layerProps}>{content}</Layer>;
  },
);
