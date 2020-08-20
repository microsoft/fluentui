import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import { ILayerProps, ILayerStyleProps, ILayerStyles } from './Layer.types';
import { classNamesFunction } from '../../Utilities';
import { setPortalAttribute, setVirtualParent } from '@uifabric/utilities/src/dom';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';
import { useMergedRefs, useWarnings } from '@uifabric/react-hooks';
import { useDocument } from '@fluentui/react-window-provider';

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>();

// const useUnmount = (unmountFunction: () => void) => {
//   const unmountRef = React.useRef(unmountFunction);
//   unmountRef.current = unmountFunction;
//   React.useEffect(
//     () => () => {
//       unmountRef.current?.();
//     },
//     [unmountFunction],
//   );
// };

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

let filteredEventProps: { [key: string]: (ev: React.SyntheticEvent<HTMLElement, Event>) => void };

const onFilterEvent = (ev: React.SyntheticEvent<HTMLElement>): void => {
  // We should just be able to check ev.bubble here and only stop events that are bubbling up. However, even though
  // mouseEnter and mouseLeave do NOT bubble up, they are showing up as bubbling. Therefore we stop events based on
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const LayerBase = React.forwardRef<HTMLDivElement, ILayerProps>((props, ref) => {
  const [layerHostId, setLayerHostId] = React.useState<string | undefined>();
  const [currentLayerElement, setCurrentLayerElement] = React.useState<HTMLElement | undefined>();
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

  // Returns the user provided hostId props element, the default target selector, or undefined if their is no document.
  const getHost = React.useCallback((): Node | undefined => {
    // If the document object is undefined, return an undefined host.
    if (!doc) {
      return undefined;
    }

    // If the user provides a hostId prop, return the element with the mathching string provided.
    if (hostId) {
      return doc.getElementById(hostId) as Node;
    }

    // If the user didn't provide a hostId prop and the document exists, return the default target selector.
    else {
      const defaultHostSelector = getDefaultTarget();
      return defaultHostSelector ? (doc.querySelector(defaultHostSelector) as Node) : doc.body;
    }
  }, [doc, hostId]);

  // Runs user provided onLayerWillUnmount prop and removes the current layer element's parentNode.
  const removeLayerElement = React.useCallback((): void => {
    // Check if the user provided a onLayerWillUnmount prop and then call it.
    onLayerWillUnmount?.();

    // Remove any existing parentNode from the layer element state value.
    if (currentLayerElement && currentLayerElement.parentNode) {
      if (currentLayerElement.parentNode) {
        currentLayerElement.parentNode.removeChild(currentLayerElement);
      }
    }
  }, [currentLayerElement, onLayerWillUnmount]);

  // If a doc or host exists, removes any previous existing layer parentNodes and then updates them.
  const createLayerElement = React.useCallback(() => {
    const host = getHost();

    // If both the document object and host are undefined then return null and don't create a layerElement.
    if (!doc || !host) {
      return;
    }

    // Remove and re-create the previous existing layer elements.
    removeLayerElement();

    const layerElement = doc.createElement('div');

    layerElement.className = classNames.root!;
    setPortalAttribute(layerElement);
    setVirtualParent(layerElement, rootRef.current!);

    insertFirst ? host.insertBefore(layerElement, host.firstChild) : host.appendChild(layerElement);

    setLayerHostId(hostId);
    setCurrentLayerElement(layerElement);
    onLayerMounted?.();
    onLayerDidMount?.();
  }, [
    currentLayerElement,
    classNames.root,
    doc,
    getHost,
    hostId,
    insertFirst,
    onLayerDidMount,
    onLayerMounted,
    removeLayerElement,
  ]);

  // onComponentMount
  React.useEffect(() => {
    // On initial render:
    // Create a new layer element
    createLayerElement();

    // Check if the user provided a hostId prop and register the layer with the ID.
    if (hostId) {
      registerLayer(hostId, createLayerElement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on mount
  }, []);

  React.useEffect(() => {
    // When hostId and layerHodstId mutate:
    // If the the user's hostID prop doesn't equal the state layerHostId, re-create a new layer element.
    if (hostId !== layerHostId) {
      createLayerElement();
    }

    // componentWillUnmount
    return () => {
      removeLayerElement();
      // Check if the user provided a hostId prop and unregister the layer with the ID.
      if (hostId) {
        unregisterLayer(hostId, createLayerElement);
      }
    };
  }, [currentLayerElement, createLayerElement, hostId, layerHostId, removeLayerElement]);

  useDebugWarnings(props);

  // When the component unmounts, remove existing layer element parent nodes and unregister the layer.
  // useUnmount(() => {
  //   // When the component unmounts:
  //   // Remove existing layer elements.
  //   removeLayerElement();
  //   // Check if the user provided a hostId prop and unregister the layer with the ID.
  //   if (hostId) {
  //     unregisterLayer(hostId, createLayerElement);
  //   }
  // });

  return (
    <span className="ms-layer" ref={mergedRef}>
      {currentLayerElement &&
        ReactDOM.createPortal(
          <Fabric {...(!eventBubblingEnabled && getFilteredEvents())} className={classNames.content}>
            {children}
          </Fabric>,
          currentLayerElement,
        )}
    </span>
  );
});
LayerBase.displayName = 'LayerBase';
