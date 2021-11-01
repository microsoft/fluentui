import * as React from 'react';
import { CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';
import type { ICalloutProps } from './Callout.types';

export const Callout: React.FunctionComponent<ICalloutProps> = React.forwardRef<HTMLDivElement, ICalloutProps>(
  ({ layerProps, doNotLayer, ...rest }, forwardedRef) => {
    const content = <CalloutContent {...rest} doNotLayer={doNotLayer} ref={forwardedRef} />;
    return doNotLayer ? content : <Layer {...layerProps}>{content}</Layer>;
  },
);
Callout.displayName = 'Callout';
