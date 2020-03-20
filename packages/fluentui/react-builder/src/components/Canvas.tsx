import * as React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import { DebugSelector, Provider, themes } from '@fluentui/react';
import { JSONTreeElement } from './types';
import { EventListener } from '@fluentui/react-component-event-listener';
import { fiberNavFindOwnerInJSONTree, fiberNavToJSONTreeElement, jsonTreeMap, renderJSONTreeToJSXElement } from '../config';
import FiberNavigator from '../../../react/src/components/Debug/FiberNavigator';

const Canvas = ({
  style,
  isSelecting,
  jsonTree,
  onMouseMove,
  onDropOnComponent,
  onSelectComponent
}: {
  style?: React.CSSProperties;
  jsonTree: JSONTreeElement;
  isSelecting: boolean;
  onMouseMove?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onDropOnComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
}) => {
  const id = React.useMemo(
    () =>
      `frame-${Math.random()
        .toString(36)
        .slice(2)}`,
    []
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const window = (e.target as HTMLElement).ownerDocument.defaultView;
      const $iframe = window.parent.document.getElementById(id);

      onMouseMove({
        clientX: $iframe.offsetLeft + e.clientX,
        clientY: $iframe.offsetTop + e.clientY
      });
    },
    [onMouseMove]
  );

  const handleMouseUp = React.useCallback(
    (e: React.SyntheticEvent<MouseEvent>, jsonTreeElement: JSONTreeElement) => {
      if (!onDropOnComponent) return;

      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      onDropOnComponent(jsonTreeElement);
    },
    [onDropOnComponent]
  );

  const handleSelectComponent = React.useCallback(
    (fiberNav: FiberNavigator) => {
      if (!onSelectComponent) return;

      onSelectComponent(fiberNavToJSONTreeElement(fiberNav));
    },
    [onSelectComponent]
  );

  // TODO: revisit this logic, it is happening every canvas render on drag...
  // When there is a mouse up listener on the canvas, we need to listen to each json tree element' mosue up
  // This is to enable drop listeners which need to callback with the element's uuid.
  // To do this, we render the tree with the mouse up listener on each tree element.
  const renderableJSONTree = jsonTreeMap(jsonTree, (jsonTreeElement: JSONTreeElement) => {
    // we only want to add listeners to object children, not strings and such
    if (jsonTreeElement === null || typeof jsonTreeElement !== 'object') {
      return jsonTreeElement;
    }

    jsonTreeElement.props = jsonTreeElement.props || {};

    const originalOnMouseUp = jsonTreeElement.props.onMouseUp;

    // do not keep wrapping our listeners on every render...
    if (originalOnMouseUp && originalOnMouseUp.__IS_DESIGNER_LISTENER) {
      return jsonTreeElement;
    }

    jsonTreeElement.props.onMouseUp = (e, ...rest) => {
      handleMouseUp(e, jsonTreeElement);

      if (originalOnMouseUp) originalOnMouseUp(e, ...rest);
    };

    jsonTreeElement.props.onMouseUp.__IS_DESIGNER_LISTENER = true;

    return jsonTreeElement;
  });

  // console.log({ jsonTree, renderableJSONTree });

  return (
    <Frame title="Designer Canvas" frameBorder="0" width="100%" height="100%" style={style} id={id}>
      <FrameContextConsumer>
        {({ document, window }) => (
          <>
            {(!jsonTree.children || jsonTree.children.length === 0) && (
              <div style={{ padding: '8rem', textAlign: 'center' }}>
                <span style={{ fontSize: '4rem' }} role="img" aria-label="Finger pointing left">
                  👈
                </span>
                <div style={{ fontSize: '1.2rem', opacity: 0.5 }}>Drag n' Drop some components</div>
              </div>
            )}

            {/* TODO: We need a debug selector that highlights the drop target */}
            <DebugSelector
              active={true}
              filter={fiberNav => {
                return fiberNavFindOwnerInJSONTree(fiberNav, jsonTree);
              }}
              mountDocument={document}
              onSelect={handleSelectComponent}
            />

            <Provider theme={themes.teams} target={document}>
              {onMouseMove && <EventListener type="mousemove" listener={handleMouseMove} target={document} />}
              {/*{onMouseUp && <EventListener type="mouseup" listener={handleMouseUp} target={document} />}*/}
              {renderJSONTreeToJSXElement(renderableJSONTree)}
            </Provider>
          </>
        )}
      </FrameContextConsumer>
    </Frame>
  );
};

export default Canvas;
