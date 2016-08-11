import * as React from 'react';
import { Layer } from './Layer';

export interface ILayerProps extends React.Props<Layer> {
  /** Callback for when the layer is mounted. */
  onLayerMounted?: () => void;

  /**
   * The target window to use when the layer should be added to a window that is different than the one
   * that the javascript is executing in.
   */
  hostWindow?: Window;
}