import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import { classNamesFunction, setPortalAttribute, setVirtualParent } from '../../Utilities';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';
import { useMergedRefs, useWarnings, useBoolean } from '@uifabric/react-hooks';
import { useDocument } from '@fluentui/react-window-provider';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

export const LayerBase: React.FunctionComponent<ILayerProps> = React.forwardRef<HTMLDivElement, ILayerProps>(
  (props, ref) => {
    const layerElement = React.useRef<HTMLElement | undefined>();
    const [isLayerOpen, { setTrue: showLayer, setFalse: hideLayer }] = useBoolean(false);

    const rootRef = React.useRef<HTMLSpanElement>(null);
    const mergedRef = useMergedRefs(rootRef, ref);

    const doc = useDocument();

    const {
      eventBubblingEnabled,
      styles,
      theme,
      className,
      children,
      hostId,
      onLayerDidMount = () => undefined,
      // eslint-disable-next-line deprecation/deprecation
      onLayerMounted = () => undefined,
      onLayerWillUnmount,
      insertFirst,
    } = props;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isNotHost: !hostId,
    });

    const [layerHostId, setLayerHostId] = React.useState<string | undefined>(hostId);

    // Returns the user provided hostId props element, the default target selector,
    // or undefined if document doesn't exist.
    const getHost = React.useCallback((): Node | undefined => {
      if (!doc) {
        return undefined;
      }

      if (hostId) {
        return doc.getElementById(hostId) as Node;
      } else {
        const defaultHostSelector = getDefaultTarget();
        return defaultHostSelector ? (doc.querySelector(defaultHostSelector) as Node) : doc.body;
      }
    }, [doc, hostId]);

    // Removes the current layer element's parentNode and runs onLayerWillUnmount prop if provided.
    const removeLayerElement = React.useCallback((): void => {
      onLayerWillUnmount?.();

      if (layerElement.current && layerElement.current?.parentNode) {
        if (layerElement.current?.parentNode) {
          layerElement.current?.parentNode.removeChild(layerElement.current);
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLayerWillUnmount]);

    // If a doc or host exists, it will remove and update layer parentNodes.
    const createLayerElement = React.useCallback(() => {
      const host = getHost();

      if (!doc || !host) {
        return;
      }

      // Remove and re-create any previous existing layer elements.
      removeLayerElement();

      const el = doc.createElement('div');

      el.className = classNames.root!;
      setPortalAttribute(el);
      setVirtualParent(el, rootRef.current!);

      insertFirst ? host.insertBefore(el, host.firstChild) : host.appendChild(el);

      setLayerHostId(hostId);
      layerElement.current = el;
      onLayerMounted?.();
      onLayerDidMount?.();
    }, [classNames.root, doc, getHost, hostId, insertFirst, onLayerDidMount, onLayerMounted, removeLayerElement]);

    React.useEffect(() => {
      // On initial render:
      // Check if the user provided a hostId prop and register the layer with the ID.
      if (hostId) {
        showLayer();
        registerLayer(hostId, createLayerElement);
      }
      // Create a new layer element
      else {
        showLayer();
        createLayerElement();
      }
      () => {
        // On component unmount:
        // Remove previous layer elements and unregister the layer if a hostId prop was provided.
        console.log(layerElement.current);
        hideLayer();
        removeLayerElement();

        if (hostId) {
          unregisterLayer(hostId, createLayerElement);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on mount.
    }, [showLayer]);

    // useUnmount(() => {

    // });

    React.useEffect(() => {
      // If the the user's hostID prop doesn't equal the state layerHostId, re-create a new layer element.
      if (hostId !== layerHostId) {
        showLayer();
        createLayerElement();
      }
    }, [hostId, layerHostId, showLayer]);

    useDebugWarnings(props);

    return (
      <span className="ms-layer" ref={mergedRef}>
        {isLayerOpen &&
          layerElement.current &&
          ReactDOM.createPortal(
            <Fabric {...(!eventBubblingEnabled && getFilteredEvents())} className={classNames.content}>
              {children}
            </Fabric>,
            layerElement.current,
          )}
      </span>
    );
  },
);
LayerBase.displayName = 'LayerBase';

let filteredEventProps: { [key: string]: (ev: React.SyntheticEvent<HTMLElement, Event>) => void };

const onFilterEvent = (ev: React.SyntheticEvent<HTMLElement>): void => {
  // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though
  // mouseenter and mouseleave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on
  // event name rather than ev.bubble.
  if (
    ev.eventPhase === Event.BUBBLING_PHASE &&
    ev.type !== 'mouseenter' &&
    ev.type !== 'mouseleave' &&
    ev.type !== 'touchstart' &&
    ev.type !== 'touchend'
  ) {
    ev.stopPropagation();
  }
};

function getFilteredEvents() {
  if (!filteredEventProps) {
    filteredEventProps = {} as any;

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
      'onTouchMove',
      'onTouchStart',
      'onTouchCancel',
      'onTouchEnd',
      'onKeyDown',
      'onKeyPress',
      'onKeyUp',
      'onFocus',
      'onBlur',
      'onChange',
      'onInput',
      'onInvalid',
      'onSubmit',
    ].forEach(name => (filteredEventProps[name] = onFilterEvent));
  }

  return filteredEventProps;
}

function useDebugWarnings(props: ILayerProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Layer',
      props,
      deprecations: { onLayerMounted: 'onLayerDidMount' },
    });
  }
}

const useUnmount = (unmountFunction: () => void) => {
  const unmountRef = React.useRef(unmountFunction);
  unmountRef.current = unmountFunction;
  React.useEffect(
    () => () => {
      if (unmountRef.current) {
        unmountRef.current();
      }
    },
    [unmountFunction],
  );
};
