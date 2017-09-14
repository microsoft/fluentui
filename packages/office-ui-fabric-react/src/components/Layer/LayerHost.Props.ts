import * as React from 'react';

export interface ILayerHost {

}

export interface ILayerHostProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the ILayerHost interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ILayerHost) => void;

  /**
   * Defines the id for the layer host that Layers can target (using the hostId property.)
   */
  id?: string;
}