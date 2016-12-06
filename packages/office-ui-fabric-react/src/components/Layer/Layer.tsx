import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from '../../Fabric';
import { ILayerProps, ILayerRenderer } from './Layer.Props';
import { css, BaseComponent, getDocument, setVirtualParent } from '../../Utilities';
import './Layer.scss';

export class Layer extends BaseComponent<ILayerProps, {}> {
  public static contextTypes = {
    layerRenderer: React.PropTypes.object
  };

  public static defaultProps = {
    onLayerMounted: () => undefined
  };

  public context: {
    layerRenderer: ILayerRenderer
  };

  private _rootElement: HTMLElement;
  private _layerElement: HTMLElement;

  public componentDidMount() {
    const container: Node = this._getContainer();
    const doc = getDocument(this._rootElement);

    this._layerElement = doc.createElement('div');
    this._layerElement.className = css('ms-Layer', {
      'ms-Layer--fixed': !this.context.layerRenderer
    });

    container.appendChild(this._layerElement);
    setVirtualParent(this._layerElement, this._rootElement);

    this.componentDidUpdate();
  }

  public componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._layerElement);
    this._layerElement.remove();
  }

  public componentDidUpdate() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <Fabric className='ms-Layer-content'>
        { this.props.children }
      </Fabric>,
      this._layerElement,
      () => this.props.onLayerMounted()
    );
  }

  public render() {
    return (
      <span
        className='ms-Layer'
        ref={ this._resolveRef('_rootElement') }
        />
    );
  }

  private _getContainer(): Node {
    return this.context.layerRenderer ? this.context.layerRenderer.getContainer() : getDocument(this._rootElement).body;
  }

}
