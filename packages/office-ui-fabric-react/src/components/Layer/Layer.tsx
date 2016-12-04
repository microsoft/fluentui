import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from '../../Fabric';
import { ILayerProps } from './Layer.Props';
import { BaseComponent, getId, getDocument, setVirtualParent } from '../../Utilities';
import './Layer.scss';

export class Layer extends BaseComponent<ILayerProps, {}> {

  public static defaultProps = {
    onLayerMounted: () => undefined
  };

  private _rootElement: HTMLElement;
  private _layerElement: HTMLElement;
  private _id: string;

  constructor(props?: ILayerProps) {
    super(props);

    this._id = getId();
  }

  public componentDidMount() {
    const doc = getDocument(this._rootElement);

    this._layerElement = doc.createElement('div');
    this._layerElement.className = 'ms-Layer';
    doc.body.appendChild(this._layerElement);

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
      <Fabric style={ { visibility: 'visible' } }>
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
}
