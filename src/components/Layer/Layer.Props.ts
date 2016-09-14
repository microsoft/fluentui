import * as React from 'react';
import { Layer } from './Layer';

export interface ILayerProps extends React.HTMLProps<HTMLDivElement> {
  /** Callback for when the layer is mounted. */
  onLayerMounted?: () => void;
}