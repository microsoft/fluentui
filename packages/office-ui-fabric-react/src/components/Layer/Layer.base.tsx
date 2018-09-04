import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from '../../Fabric';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  getDocument,
  createRef,
  setPortalAttribute,
  setVirtualParent
} from '../../Utilities';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

@customizable('Layer', ['theme', 'hostId'])
export class LayerBase extends BaseComponent<ILayerProps, {}> {
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
    const { eventBubblingEnabled } = this.props;

    return (
      <span className="ms-layer" ref={this._rootElement}>
        {this._layerElement &&
          ReactDOM.createPortal(
            eventBubblingEnabled ? (
              <Fabric className={classNames.content}>{this.props.children}</Fabric>
            ) : (
              <Fabric
                className={classNames.content}
                onClick={this._filterEvent}
                onContextMenu={this._filterEvent}
                onDoubleClick={this._filterEvent}
                onDrag={this._filterEvent}
                onDragEnd={this._filterEvent}
                onDragEnter={this._filterEvent}
                onDragExit={this._filterEvent}
                onDragLeave={this._filterEvent}
                onDragOver={this._filterEvent}
                onDragStart={this._filterEvent}
                onDrop={this._filterEvent}
                onMouseDown={this._filterEvent}
                onMouseEnter={this._filterEvent}
                onMouseLeave={this._filterEvent}
                onMouseMove={this._filterEvent}
                onMouseOver={this._filterEvent}
                onMouseOut={this._filterEvent}
                onMouseUp={this._filterEvent}
                onKeyDown={this._filterEvent}
                onKeyPress={this._filterEvent}
                onKeyUp={this._filterEvent}
                onFocus={this._filterEvent}
                onBlur={this._filterEvent}
                onChange={this._filterEvent}
                onInput={this._filterEvent}
                onInvalid={this._filterEvent}
                onSubmit={this._filterEvent}
              >
                {this.props.children}
              </Fabric>
            ),
            this._layerElement
          )}
      </span>
    );
  }

  /**
   * Helper to stop events from bubbling up out of Layer.
   */
  private _filterEvent = (ev: React.SyntheticEvent<HTMLElement>): void => {
    // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though mouseenter and
    //    mouseleave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on event name rather than ev.bubble.
    if (ev.type !== 'mouseenter' && ev.type !== 'mouseleave') {
      ev.stopPropagation();
    }
  };

  private _getClassNames() {
    const { className, styles, theme } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isNotHost: !this.props.hostId
    });

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
        setPortalAttribute(this._layerElement);

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
      return defaultHostSelector ? (doc.querySelector(defaultHostSelector) as Node) : doc.body;
    }
  }
}
