import * as React from 'react';

export interface ILayerProps extends React.HTMLProps<HTMLDivElement> {
  /** Callback for when the layer is mounted. */
  onLayerMounted?: () => void;

  /**
   * Callback for when the layer is mounted.
   */
  onLayerDidMount?: () => void;

  /**
   * Callback for when the layer is unmounted.
   */
  onLayerWillUnmount?: () => void;

  /**
   * The id property provided on a LayerHost that this Layer should render within.
   */
  hostId?: string;
}
