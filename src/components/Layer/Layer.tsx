
import * as React from 'react';
import { ILayerProps } from './Layer.Props';
import { Portal, IPortalProps } from '../portal/Portal';
import { layerPortalNexusKey } from './LayerPortalNexusKey';
import { setVirtualParent } from '../../utilities/DomUtils';
import './Layer.scss';

const LayerPortal: (new (props: IPortalProps<void>, ...args: any[]) => React.Component<IPortalProps<void>, any>) = Portal;

let lastPortalId: number = 0;

export class Layer extends React.Component<ILayerProps, {}> {
  private _portalId: string;

  private _layerElement: HTMLDivElement;
  private _layerContentElement: HTMLDivElement;

  constructor(layerProps: ILayerProps, context: any) {
    super(layerProps, context);

    this._portalId = `layer_${++lastPortalId}`;

    this._onLayerRef = this._onLayerRef.bind(this);
    this._onLayerContentRef = this._onLayerContentRef.bind(this);
  }

  public render(): JSX.Element {
    let {
      children
    } = this.props;

    let options: void;

    return (
      <div className='ms-Layer' ref={ this._onLayerRef }>
        <LayerPortal
          options={ options }
          nexusKey={ layerPortalNexusKey }>
          <div className='ms-Layer-content' data-parent-virtual-id={ this._portalId } ref={ this._onLayerContentRef }>
            { children }
          </div>
        </LayerPortal>
      </div>
    );
  }

  private _onLayerRef(element: HTMLDivElement) {
    this._layerElement = element;

    if (this._layerContentElement) {
      // If the content element is mounted, set its virtual parent.
      setVirtualParent(this._layerContentElement, this._layerElement);
    }
  }

  private _onLayerContentRef(element: HTMLDivElement) {
    if (this._layerContentElement && element !== this._layerContentElement) {
      // If a different content element was previously mounted, clear its virtual parent.
      setVirtualParent(this._layerContentElement, undefined);
    }

    this._layerContentElement = element;

    if (this._layerContentElement) {
      // If the content element is now mounted, set its virtual parent.
      setVirtualParent(this._layerContentElement, this._layerElement);
    }

    if (this._layerContentElement) {
      let {
        onLayerMounted
      } = this.props;

      if (onLayerMounted) {
        onLayerMounted();
      }
    }
  }
}
