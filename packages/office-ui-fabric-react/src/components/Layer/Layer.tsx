import * as ReactDOM from 'react-dom';
import { styled } from '../../Utilities';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import { LayerBase } from './Layer.base';
import { PortalLayerBase } from './PortalLayer.base';
import { getStyles } from './Layer.styles';

const portalSupport: boolean = !!ReactDOM.createPortal;

// TODO: is there a reason to keep LayerBase? React 16 is minbar and Customizer will be converted to React 16 context and
//        won't work with old LayerBase. (unless we're keeping a backwards compatible version of React 15 Customizer)
export const Layer = styled<ILayerProps, ILayerStyleProps, ILayerStyles>(
  portalSupport ? PortalLayerBase : LayerBase,
  getStyles,
  undefined,
  {
    scope: 'Layer',
    fields: ['hostId', 'theme', 'styles']
  }
);
