import * as React from 'react';
import { Layer } from './Layer';

export interface ILayerProps extends React.Props<Layer> {
  /** Callback for when the layer is mounted. */
  onLayerMounted?: () => void;

  /** The target window to use for projection. */
  hostWindow?: Window;
}