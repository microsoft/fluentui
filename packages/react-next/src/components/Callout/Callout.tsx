import * as React from 'react';
import { ICalloutProps } from './Callout.types';
import { CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';

export const Callout = React.forwardRef(
  ({ layerProps, doNotLayer, ...rest }: ICalloutProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const content = <CalloutContent {...rest} ref={forwardedRef} />;
    return doNotLayer ? content : <Layer {...layerProps}>{content}</Layer>;
  },
);
