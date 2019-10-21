import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from '../../Fabric';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import { classNamesFunction, customizable, getDocument, setPortalAttribute, setVirtualParent, warnDeprecations } from '../../Utilities';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';

export type ILayerBaseState = {
  hostId?: string;
  layerElement?: HTMLElement;
};

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

@customizable('Layer', ['theme', 'hostId'])
export class LayerBase extends React.Component<ILayerProps, ILayerBaseState> {
  public static defaultProps: ILayerProps = {
    onLayerDidMount: () => undefined,
    onLayerWillUnmount: () => undefined
  };

  private _rootRef = React.createRef<HTMLSpanElement>();

  constructor(props: ILayerProps) {
    super(props);

    this.state = {};

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations('Layer', props, {
        onLayerMounted: 'onLayerDidMount'
      });
    }
  }

  public componentDidMount(): void {
    const { hostId } = this.props;

    this._createLayerElement();

    if (hostId) {
      registerLayer(hostId, this._createLayerElement);
    }
  }

  public render(): React.ReactNode {
    const { layerElement } = this.state;
    const classNames = this._getClassNames();
    const { eventBubblingEnabled } = this.props;

    return (
      <span className="ms-layer" ref={this._rootRef}>
        {layerElement &&
          ReactDOM.createPortal(
            <Fabric {...!eventBubblingEnabled && _getFilteredEvents()} className={classNames.content}>
              {this.props.children}
            </Fabric>,
            layerElement
          )}
      </span>
    );
  }

  public componentDidUpdate(): void {
    if (this.props.hostId !== this.state.hostId) {
      this._createLayerElement();
    }
  }

  public componentWillUnmount(): void {
    const { hostId } = this.props;

    this._removeLayerElement();
    if (hostId) {
      unregisterLayer(hostId, this._createLayerElement);
    }
  }

  private _createLayerElement = () => {
    const { hostId } = this.props;

    const doc = getDocument(this._rootRef.current);
    const host = this._getHost();

    if (!doc || !host) {
      return;
    }

    // If one was already existing, remove.
    this._removeLayerElement();

    const layerElement = doc.createElement('div');
    const classNames = this._getClassNames();

    layerElement.className = classNames.root!;
    setPortalAttribute(layerElement);
    setVirtualParent(layerElement, this._rootRef.current!);

    this.props.insertFirst ? host.insertBefore(layerElement, host.firstChild) : host.appendChild(layerElement);

    this.setState(
      {
        hostId,
        layerElement
      },
      () => {
        const { onLayerDidMount, onLayerMounted } = this.props;
        if (onLayerMounted) {
          onLayerMounted();
        }

        if (onLayerDidMount) {
          onLayerDidMount();
        }
      }
    );
  };

  private _removeLayerElement(): void {
    const { onLayerWillUnmount } = this.props;
    const { layerElement } = this.state;

    if (onLayerWillUnmount) {
      onLayerWillUnmount();
    }

    if (layerElement && layerElement.parentNode) {
      const parentNode = layerElement.parentNode;
      if (parentNode) {
        parentNode.removeChild(layerElement);
      }
    }
  }

  private _getClassNames() {
    const { className, styles, theme } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isNotHost: !this.props.hostId
    });

    return classNames;
  }

  private _getHost(): Node | undefined {
    const { hostId } = this.props;
    const doc = getDocument(this._rootRef.current);
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

const _onFilterEvent = (ev: React.SyntheticEvent<HTMLElement>): void => {
  // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though mouseenter and
  //    mouseleave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on event name rather than ev.bubble.
  if (ev.eventPhase === Event.BUBBLING_PHASE && ev.type !== 'mouseenter' && ev.type !== 'mouseleave') {
    ev.stopPropagation();
  }
};

let _filteredEventProps: { [key: string]: (ev: React.SyntheticEvent<HTMLElement, Event>) => void };

function _getFilteredEvents() {
  if (!_filteredEventProps) {
    _filteredEventProps = {} as any;

    [
      'onClick',
      'onContextMenu',
      'onDoubleClick',
      'onDrag',
      'onDragEnd',
      'onDragEnter',
      'onDragExit',
      'onDragLeave',
      'onDragOver',
      'onDragStart',
      'onDrop',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onMouseOver',
      'onMouseOut',
      'onMouseUp',
      'onKeyDown',
      'onKeyPress',
      'onKeyUp',
      'onFocus',
      'onBlur',
      'onChange',
      'onInput',
      'onInvalid',
      'onSubmit'
    ].forEach(name => (_filteredEventProps[name] = _onFilterEvent));
  }

  return _filteredEventProps;
}
