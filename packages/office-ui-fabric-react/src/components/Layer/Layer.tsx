import { createPortal } from 'react-dom';
import { styled } from '../../Utilities';
import {
  ILayerProps,
  ILayerStyleProps,
  ILayerStyles
} from './Layer.types';
import { LayerBase } from './Layer.base';
import { PortalLayerBase } from './PortalLayer.base';
import { getStyles } from './Layer.styles';

const portalSupport: boolean = !!createPortal;

export const Layer = styled<ILayerProps, ILayerStyleProps, ILayerStyles>(
  portalSupport ? PortalLayerBase : LayerBase,
  getStyles
);
