import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import { classNamesFunction, setPortalAttribute, setVirtualParent } from '../../Utilities';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';
import { useMergedRefs, useWarnings } from '@uifabric/react-hooks';
import { useDocument } from '@fluentui/react-window-provider';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

export const LayerBase: React.FunctionComponent<ILayerProps> = React.forwardRef<HTMLDivElement, ILayerProps>(
  (props, ref) => {
    const [layerElement, setLayerElement] = React.useState<HTMLDivElement | undefined>();
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

    // Returns the user provided hostId props element, the default target selector,
    // or undefined if document doesn't exist.
    const getHost = (): Node | undefined => {
      if (!doc) {
        return undefined;
      }

      if (hostId) {
        return doc.getElementById(hostId) as Node;
      } else {
        const defaultHostSelector = getDefaultTarget();
        return defaultHostSelector ? (doc.querySelector(defaultHostSelector) as Node) : doc.body;
      }
    };

    // Removes the current layer element's parentNode and runs onLayerWillUnmount prop if provided.
    const removeLayerElement = (): void => {
      onLayerWillUnmount?.();

      if (layerElement && layerElement.parentNode) {
        const parentNode = layerElement.parentNode;
        if (parentNode) {
          parentNode.removeChild(layerElement);
        }
      }
    };

    // If a doc or host exists, it will remove and update layer parentNodes.
    const createLayerElement = () => {
      const host = getHost();

      if (!doc || !host) {
        return;
      }

      // Remove and re-create any previous existing layer elements.
      removeLayerElement();

      const el: HTMLDivElement = doc.createElement('div');

      el.className = classNames.root!;
      setPortalAttribute(el);
      setVirtualParent(el, rootRef.current!);

      insertFirst ? host.insertBefore(el, host.firstChild) : host.appendChild(el);

      setLayerElement(el);

      onLayerMounted?.();
      onLayerDidMount?.();
    };

    React.useEffect(() => {
      // During the initial render and any hostId updates:
      //
      // Check if the user provided a hostId prop and register the layer with the ID.
      if (hostId) {
        registerLayer(hostId, createLayerElement);
      }
      // The user didn't provide a hostId, create a new layer element.
      else {
        createLayerElement();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on mount and if the hostId updates.
    }, [hostId]);

    useUnmount(() => {
      // During component unmount:
      //
      // Check if the user provided a hostId prop and unregister it.
      if (hostId) {
        unregisterLayer(hostId, createLayerElement);
      }
      // The user didn't provide a hostId prop, remove the layerElement.
      else {
        removeLayerElement();
      }
    });

    useDebugWarnings(props);

    return (
      <span className="ms-layer" ref={mergedRef}>
        {layerElement &&
          ReactDOM.createPortal(
            <Fabric {...(!eventBubblingEnabled && getFilteredEvents())} className={classNames.content}>
              {children}
            </Fabric>,
            layerElement,
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
    [],
  );
};
