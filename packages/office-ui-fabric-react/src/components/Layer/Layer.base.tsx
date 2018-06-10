/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import { Fabric } from '../../Fabric';
import {
  ILayerProps,
  ILayerStyleProps,
  ILayerStyles,
} from './Layer.types';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  getDocument,
  setVirtualParent,
  createRef
} from '../../Utilities';

const _layersByHostId: { [hostId: string]: LayerBase[] } = {};
let _defaultHostSelector: string | undefined;

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

@customizable('Layer', ['theme', 'hostId'])
export class LayerBase extends BaseComponent<ILayerProps, {}> {

  public static defaultProps: ILayerProps = {
    onLayerDidMount: () => undefined,
    onLayerWillUnmount: () => undefined
  };

  private _rootElement = createRef<HTMLDivElement>();
  private _host: Node;
  private _layerElement: HTMLElement | undefined;
  private _hasMounted: boolean;
  /**
   * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
   * care about the specific host.
   */
  public static notifyHostChanged(id: string) {
    if (_layersByHostId[id]) {
      _layersByHostId[id].forEach(layer => layer.forceUpdate());
    }
  }

  /**
   * Sets the default target selector to use when determining the host in which
   * Layered content will be injected into. If not provided, an element will be
   * created at the end of the document body.
   *
   * Passing in a falsey value will clear the default target and reset back to
   * using a created element at the end of document body.
   */
  public static setDefaultTarget(selector?: string) {
    _defaultHostSelector = selector;
  }

  constructor(props: ILayerProps) {
    super(props);

    this._warnDeprecations({
      onLayerMounted: 'onLayerDidMount'
    });

    if (this.props.hostId) {
      if (!_layersByHostId[this.props.hostId]) {
        _layersByHostId[this.props.hostId] = [];
      }

      _layersByHostId[this.props.hostId].push(this);
    }
  }

  public componentDidMount(): void {
    this.componentDidUpdate();
  }

  public componentWillUnmount(): void {
    this._removeLayerElement();

    if (this.props.hostId) {
      _layersByHostId[this.props.hostId] = _layersByHostId[this.props.hostId].filter(layer => layer !== this);
      if (!_layersByHostId[this.props.hostId].length) {
        delete _layersByHostId[this.props.hostId];
      }
    }
  }

  public componentDidUpdate(): void {
    const host = this._getHost();

    const { className, getStyles, theme } = this.props;
    const classNames = getClassNames(getStyles!,
      {
        theme: theme!,
        className,
        isNotHost: !this.props.hostId
      }
    );

    if (host !== this._host) {
      this._removeLayerElement();
    }

    if (host) {
      this._host = host;

      if (!this._layerElement) {
        const rootElement = this._rootElement.current;
        const doc = getDocument(rootElement);

        if (!doc || !rootElement) {
          return;
        }

        this._layerElement = doc.createElement('div');
        this._layerElement.className = classNames.root!;

        host.appendChild(this._layerElement);
        setVirtualParent(this._layerElement, rootElement);
      }

      // Using this 'unstable' method allows us to retain the React context across the layer projection.
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        (
          <Fabric className={ classNames.content }>
            { this.props.children }
          </Fabric>
        ),
        this._layerElement,
        () => {
          if (!this._hasMounted) {
            this._hasMounted = true;

            // TODO: @deprecated cleanup required.
            if (this.props.onLayerMounted) {
              this.props.onLayerMounted();
            }

            this.props.onLayerDidMount!();
          }
        });
    }
  }

  public render(): JSX.Element {
    return (
      <span
        className='ms-Layer'
        ref={ this._rootElement }
      />
    );
  }

  private _removeLayerElement(): void {
    if (this._layerElement) {
      this.props.onLayerWillUnmount!();

      ReactDOM.unmountComponentAtNode(this._layerElement);
      const parentNode = this._layerElement.parentNode;
      if (parentNode) {
        parentNode.removeChild(this._layerElement);
      }
      this._layerElement = undefined;
      this._hasMounted = false;
    }
  }

  private _getHost(): Node | undefined {
    const { hostId } = this.props;
    const doc = getDocument(this._rootElement.current);

    if (!doc) {
      return undefined;
    }

    if (hostId) {
      return doc.getElementById(hostId) as Node;
    } else {
      return _defaultHostSelector ? doc.querySelector(_defaultHostSelector) as Node : doc.body;
    }
  }

}
