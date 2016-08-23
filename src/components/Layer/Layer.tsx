
import * as React from 'react';
import { ILayerProps } from './Layer.Props';
import { Portal, IPortalProps } from '../portal/Portal';
import { layerPortalNexusKey } from './LayerPortalNexusKey';
import './Layer.scss';

const LayerPortal: (new (props: IPortalProps<void>, ...args: any[]) => React.Component<IPortalProps<void>, any>) = Portal;

let lastPortalId: number = 0;

export class Layer extends React.Component<ILayerProps, {}> {
  private _portalId: string;

  constructor(layerProps: ILayerProps, context: any) {
    super(layerProps, context);

    this._portalId = `layer_${++lastPortalId}`;

    this._onLayerRef = this._onLayerRef.bind(this);
  }

  public render(): JSX.Element {
    let {
      children
    } = this.props;

    let options: void;

    return (
      <div className='ms-Layer' data-virtual-id={ this._portalId }>
        <LayerPortal
          options={ options }
          nexusKey={ layerPortalNexusKey }>
          <div className='ms-Layer-content' data-parent-virtual-id={ this._portalId } ref={ this._onLayerRef }>
            { children }
          </div>
        </LayerPortal>
      </div>
    );
  }

  private _onLayerRef(element: HTMLDivElement) {
    if (element) {
      let {
        onLayerMounted
      } = this.props;

      if (onLayerMounted) {
        onLayerMounted();
      }
    }
  }
}
