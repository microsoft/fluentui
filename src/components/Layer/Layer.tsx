
import * as React from 'react';
import { ILayerProps } from './Layer.Props';
import { Portal, IPortalProps } from '../portal/Portal';
import { layerPortalNexusKey } from './LayerPortalNexusKey';
import { setVirtualParent } from '../../utilities/DomUtils';
import './Layer.scss';

export interface ILayerContext {
  isInLayer?: boolean;
}

export const LAYER_CONTEXT_PROP_TYPES = {
  isInLayer: React.PropTypes.bool
};

const LayerPortal: (new (props: IPortalProps<void>, ...args: any[]) => React.Component<IPortalProps<void>, any>) = Portal;

export class Layer extends React.Component<ILayerProps, {}> {
  public static contextTypes = LAYER_CONTEXT_PROP_TYPES;

  public context: ILayerContext;

  private _layerElement: HTMLDivElement;
  private _layerContentElement: HTMLDivElement;

  constructor(layerProps: ILayerProps, context: any) {
    super(layerProps, context);

    this._onLayerRef = this._onLayerRef.bind(this);
    this._onLayerContentRef = this._onLayerContentRef.bind(this);
  }

  public render(): JSX.Element {
    let {
      children
    } = this.props;

    let {
      isInLayer = false
    } = this.context;

    if (isInLayer) {
      return children as JSX.Element;
    } else {
      let options: void;

      return (
        <div className='ms-Layer' ref={ this._onLayerRef }>
          <LayerPortal
            options={ options }
            nexusKey={ layerPortalNexusKey }>
            <LayerContent contentRef={ this._onLayerContentRef }>
              { children }
            </LayerContent>
          </LayerPortal>
        </div>
      );
    }
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

interface ILayerContentProps extends React.Props<LayerContent> {
  contentRef: (element: HTMLDivElement) => void;
}

interface ILayerContentState {
  // Nothing special.
}

class LayerContent extends React.Component<ILayerContentProps, ILayerContentState> {
  public static childContextTypes = LAYER_CONTEXT_PROP_TYPES;

  public getChildContext(): ILayerContext {
    return {
      isInLayer: true
    };
  }

  public render() {
    let {
      children,
      contentRef
    } = this.props;

    return (
      <div className='ms-Layer-content' ref={ contentRef }>
        { children }
      </div>
    );
  }
}

