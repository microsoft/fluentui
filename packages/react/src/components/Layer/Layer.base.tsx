import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import { classNamesFunction, setPortalAttribute, setVirtualParent } from '../../Utilities';
import {
  registerLayer,
  getDefaultTarget,
  unregisterLayer,
  getLayerHost,
  createDefaultLayerHost,
} from './Layer.notification';
import { useIsomorphicLayoutEffect, useMergedRefs, useWarnings } from '@fluentui/react-hooks';
import { useDocument } from '../../WindowProvider';
import type { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

export const LayerBase: React.FunctionComponent<ILayerProps> = React.forwardRef<HTMLDivElement, ILayerProps>(
  (props, ref) => {
    const rootRef = React.useRef<HTMLSpanElement>(null);
    const mergedRef = useMergedRefs(rootRef, ref);
    const layerRef = React.useRef<HTMLDivElement>();

    // Tracks if the layer mount events need to be raised.
    // Required to allow the DOM to render after the layer element is added.
    const [needRaiseLayerMount, setNeedRaiseLayerMount] = React.useState(false);

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

    // Returns the user provided hostId props element, the default target selector,
    // or undefined if document doesn't exist.
    const getHost = (): Node | null => {
      if (hostId) {
        const layerHost = getLayerHost(hostId);

        if (layerHost) {
          return layerHost.rootRef.current ?? null;
        }

        return doc?.getElementById(hostId) ?? null;
      } else {
        const defaultHostSelector = getDefaultTarget();

        // Find the host.
        let host: Node | null = defaultHostSelector ? (doc?.querySelector(defaultHostSelector) as Node) : null;

        // If no host is available, create a container for injecting layers in.
        // Having a container scopes layout computation.
        if (!host && doc) {
          host = createDefaultLayerHost(doc);
        }

        return host;
      }
    };

    // Removes the current layer element's parentNode and runs onLayerWillUnmount prop if provided.
    const removeLayerElement = (): void => {
      onLayerWillUnmount?.();

      const elem = layerRef.current;

      // Clear ref before removing from the DOM
      layerRef.current = undefined;

      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    };

    // If a doc or host exists, it will remove and update layer parentNodes.
    const createLayerElement = () => {
      const host = getHost();

      if (!host) {
        return;
      }

      // Remove and re-create any previous existing layer elements.
      removeLayerElement();

      const el = (host.ownerDocument ?? doc)?.createElement('div');

      if (el) {
        el.className = classNames.root!;
        setPortalAttribute(el);
        setVirtualParent(el, rootRef.current!);

        insertFirst ? host.insertBefore(el, host.firstChild) : host.appendChild(el);
        layerRef.current = el;
        setNeedRaiseLayerMount(true);
      }
    };

    useIsomorphicLayoutEffect(() => {
      createLayerElement();
      // Check if the user provided a hostId prop and register the layer with the ID.
      if (hostId) {
        registerLayer(hostId, createLayerElement);
      }

      return () => {
        removeLayerElement();

        if (hostId) {
          unregisterLayer(hostId, createLayerElement);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should run if the hostId updates.
    }, [hostId]);

    React.useEffect(() => {
      if (layerRef.current && needRaiseLayerMount) {
        onLayerMounted?.();
        onLayerDidMount?.();
        setNeedRaiseLayerMount(false);
      }
    }, [needRaiseLayerMount, onLayerMounted, onLayerDidMount]);

    useDebugWarnings(props);

    return (
      <span className="ms-layer" ref={mergedRef}>
        {layerRef.current &&
          ReactDOM.createPortal(
            /* eslint-disable deprecation/deprecation */
            <Fabric {...(!eventBubblingEnabled && getFilteredEvents())} className={classNames.content}>
              {children}
            </Fabric>,
            /* eslint-enable deprecation/deprecation */
            layerRef.current,
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
