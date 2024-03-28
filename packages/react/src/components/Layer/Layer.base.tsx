// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore "react-portal-compat-context" uses v9 configs via path aliases
import { usePortalCompat } from '@fluentui/react-portal-compat-context';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import {
  classNamesFunction,
  css,
  getDocument,
  setPortalAttribute,
  setVirtualParent,
  FocusRectsProvider,
  FocusRectsContext,
  IsFocusVisibleClassName,
} from '../../Utilities';
import {
  registerLayer,
  getDefaultTarget,
  unregisterLayer,
  getLayerHost,
  createDefaultLayerHost,
} from './Layer.notification';
import { useIsomorphicLayoutEffect, useMergedRefs, useWarnings } from '@fluentui/react-hooks';
import type { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

const getFocusVisibility = (providerRef?: React.RefObject<HTMLElement>) => {
  if (providerRef?.current) {
    return providerRef.current.classList.contains(IsFocusVisibleClassName);
  }

  return false;
};

export const LayerBase: React.FunctionComponent<ILayerProps> = React.forwardRef<HTMLDivElement, ILayerProps>(
  (props, ref) => {
    const registerPortalEl = usePortalCompat();

    const rootRef = React.useRef<HTMLSpanElement>(null);
    const mergedRef = useMergedRefs(rootRef, ref);
    const layerRef = React.useRef<HTMLDivElement>();
    const fabricElementRef = React.useRef<HTMLDivElement>(null);
    const focusContext = React.useContext(FocusRectsContext);

    // Tracks if the layer mount events need to be raised.
    // Required to allow the DOM to render after the layer element is added.
    const [needRaiseLayerMount, setNeedRaiseLayerMount] = React.useState(false);

    // Sets the focus visible className when the FocusRectsProvider for the layer is rendered
    // This allows the current focus visibility style to be carried over to the layer content
    const focusRectsRef = React.useCallback(
      el => {
        const isFocusVisible = getFocusVisibility(focusContext?.providerRef);
        if (el && isFocusVisible) {
          el.classList.add(IsFocusVisibleClassName);
        }
      },
      [focusContext],
    );

    const {
      children,
      className,
      eventBubblingEnabled,
      fabricProps,
      hostId,
      insertFirst,
      onLayerDidMount = () => undefined,
      // eslint-disable-next-line deprecation/deprecation
      onLayerMounted = () => undefined,
      onLayerWillUnmount,
      styles,
      theme,
    } = props;

    const fabricRef = useMergedRefs(fabricElementRef, fabricProps?.ref, focusRectsRef);

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isNotHost: !hostId,
    });

    // Returns the user provided hostId props element, the default target selector,
    // or undefined if document doesn't exist.
    const getHost = (doc: Document, shadowRoot: ShadowRoot | null = null): Node | null => {
      const root = shadowRoot ?? doc;
      if (hostId) {
        const layerHost = getLayerHost(hostId);

        if (layerHost) {
          return layerHost.rootRef.current ?? null;
        }

        return root.getElementById(hostId) ?? null;
      } else {
        const defaultHostSelector = getDefaultTarget();

        // Find the host.
        let host: Node | null = defaultHostSelector ? (root.querySelector(defaultHostSelector) as Node) : null;

        // If no host is available, create a container for injecting layers in.
        // Having a container scopes layout computation.
        if (!host) {
          host = createDefaultLayerHost(doc, shadowRoot);
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
      const doc = getDocument(rootRef.current);
      const shadowRoot = (rootRef.current?.getRootNode() as ShadowRoot)?.host
        ? (rootRef?.current?.getRootNode() as ShadowRoot)
        : undefined;

      if (!doc || (!doc && !shadowRoot)) {
        return;
      }

      const host = getHost(doc, shadowRoot);

      if (!host) {
        return;
      }

      // Remove and re-create any previous existing layer elements.
      removeLayerElement();

      const el = (host.ownerDocument ?? doc).createElement('div');

      el.className = classNames.root!;
      setPortalAttribute(el);
      setVirtualParent(el, rootRef.current!);

      insertFirst ? host.insertBefore(el, host.firstChild) : host.appendChild(el);
      layerRef.current = el;
      setNeedRaiseLayerMount(true);
    };

    useIsomorphicLayoutEffect(() => {
      createLayerElement();
      // Check if the user provided a hostId prop and register the layer with the ID.
      if (hostId) {
        registerLayer(hostId, createLayerElement);
      }

      const unregisterPortalEl = layerRef.current ? registerPortalEl(layerRef.current) : undefined;

      return () => {
        if (unregisterPortalEl) {
          unregisterPortalEl();
        }

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
            <FocusRectsProvider layerRoot providerRef={fabricRef}>
              {/* eslint-disable deprecation/deprecation */}
              <Fabric
                {...(!eventBubblingEnabled && getFilteredEvents())}
                {...fabricProps}
                className={css(classNames.content, fabricProps?.className)}
                ref={fabricRef}
              >
                {children}
              </Fabric>
              {/* eslint-enable deprecation/deprecation */}
            </FocusRectsProvider>,
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
