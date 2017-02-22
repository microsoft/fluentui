import * as React from 'react';

export interface ILayerHostProps extends React.HTMLProps<HTMLElement> {
  /**
   * Defines the id for the layer host that Layers can target (using the hostId property.)
   */
  id: string;
}