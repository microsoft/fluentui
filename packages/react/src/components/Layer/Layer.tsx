import * as React from 'react';
import { styled } from '../../Utilities';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import { LayerBase } from './Layer.base';
import { getStyles } from './Layer.styles';

export const Layer: React.FunctionComponent<ILayerProps> = styled<ILayerProps, ILayerStyleProps, ILayerStyles>(
  LayerBase,
  getStyles,
  undefined,
  {
    scope: 'Layer',
    fields: ['hostId', 'theme', 'styles'],
  },
);
