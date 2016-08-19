
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ILayerProps } from './Layer.Props';
import { Portal, IPortalProps } from '../portal/Portal';
import { layerPortalNexusKey } from './LayerPortalNexusKey';
import './Layer.scss';

const LayerPortal: (new (props: IPortalProps<void>, ...args: any[]) => React.Component<IPortalProps<void>, any>) = Portal;

export class Layer extends React.Component<ILayerProps, {}> {
  public render(): JSX.Element {
    let {
      children
    } = this.props;

    let options: void;

    return (
      <LayerPortal
        options={ options }
        nexusKey={ layerPortalNexusKey }>
        { children }
      </LayerPortal>
    );
  }
}
