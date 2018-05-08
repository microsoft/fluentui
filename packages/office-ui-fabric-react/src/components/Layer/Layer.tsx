
import { styled } from '../../Utilities';
import {
  ILayerProps,
  ILayerStyleProps,
  ILayerStyles
} from './Layer.types';
import { PortalLayerBase } from './PortalLayer.base';
import { getStyles } from './Layer.styles';


export const Layer = styled<ILayerProps, ILayerStyleProps, ILayerStyles>(
  PortalLayerBase,
  getStyles
);
