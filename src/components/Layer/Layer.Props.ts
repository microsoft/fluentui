import * as React from 'react';

export interface ILayerProps extends React.HTMLProps<HTMLDivElement> {
  /** Callback for when the layer is mounted. */
  onLayerMounted?: () => void;
}