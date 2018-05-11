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
  createRef,
  setVirtualParent
} from '../../Utilities';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

@customizable('Layer', ['theme', 'hostId'])
export class PortalLayerBase extends BaseComponent<ILayerProps, {}> {

  public static defaultProps: ILayerProps = {
    onLayerDidMount: () => undefined,
    onLayerWillUnmount: () => undefined
  };

  private _host: Node;
  private _layerElement: HTMLElement | undefined;
  private _rootElement = createRef<HTMLDivElement>();

  constructor(props: ILayerProps) {
    super(props);

    this._warnDeprecations({
      onLayerMounted: 'onLayerDidMount'
    });

    if (this.props.hostId) {
      registerLayer(this.props.hostId, this);
    }
  }

  public componentWillMount(): void {
    this._layerElement = this._getLayerElement();
  }

  public componentWillUpdate(): void {
    if (!this._layerElement) {
      this._layerElement = this._getLayerElement();
    }
  }

  public componentDidMount(): void {
    this._setVirtualParent();

    const { onLayerDidMount, onLayerMounted } = this.props;
    if (onLayerMounted) {
      onLayerMounted();
    }

    if (onLayerDidMount) {
      onLayerDidMount();
    }
  }

  public componentWillUnmount(): void {
    this._removeLayerElement();

    const { onLayerWillUnmount, hostId } = this.props;
    if (onLayerWillUnmount) {
      onLayerWillUnmount();
    }

    if (hostId) {
      unregisterLayer(hostId, this);
    }
  }

  public componentDidUpdate(): void {
    this._setVirtualParent();
  }

  public render(): React.ReactNode {
    const classNames = this._getClassNames();

    return (
      <span className='ms-layer' ref={ this._rootElement }>
        {
          this._layerElement && ReactDOM.createPortal(
            (
              <Fabric className={ classNames.content }>
                { this.props.children }
              </Fabric>
            ),
            this._layerElement
          )
        }
      </span>
    );
  }

  private _getClassNames() {
    const { className, getStyles, theme } = this.props;
    const classNames = getClassNames(getStyles!,
      {
        theme: theme!,
        className,
        isNotHost: !this.props.hostId
      }
    );

    return classNames;
  }

  private _setVirtualParent() {
    if (this._rootElement && this._rootElement.current && this._layerElement) {
      setVirtualParent(this._layerElement, this._rootElement.current);
    }
  }

  private _getLayerElement(): HTMLElement | undefined {
    const host = this._getHost();

    const classNames = this._getClassNames();

    if (host !== this._host) {
      this._removeLayerElement();
    }

    if (host) {
      this._host = host;

      if (!this._layerElement) {
        const doc = getDocument();
        if (!doc) {
          return;
        }

        this._layerElement = doc.createElement('div');
        this._layerElement.className = classNames.root!;

        host.appendChild(this._layerElement);
      }
    }

    return this._layerElement;
  }

  private _removeLayerElement(): void {
    if (this._layerElement) {
      this.props.onLayerWillUnmount!();

      const parentNode = this._layerElement.parentNode;
      if (parentNode) {
        parentNode.removeChild(this._layerElement);
      }
      this._layerElement = undefined;
    }
  }

  private _getHost(): Node | undefined {
    const { hostId } = this.props;

    const doc = getDocument();
    if (!doc) {
      return undefined;
    }

    if (hostId) {
      return doc.getElementById(hostId) as Node;
    } else {
      const defaultHostSelector = getDefaultTarget();
      return defaultHostSelector ? doc.querySelector(defaultHostSelector) as Node : doc.body;
    }
  }
}
