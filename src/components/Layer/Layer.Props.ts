import * as React from 'react';
import { Layer } from './Layer';

export interface ILayerProps extends React.Props<Layer> {
  /** Callback for when the layer is mounted. */
  onLayerMounted?: () => void;
}
