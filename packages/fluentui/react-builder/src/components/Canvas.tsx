import * as React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import { DebugSelector, FiberNavigator, Provider, themes } from '@fluentui/react-northstar';
import { JSONTreeElement } from './types';
import { EventListener } from '@fluentui/react-component-event-listener';
import { fiberNavFindOwnerInJSONTree, fiberNavToJSONTreeElement, renderJSONTreeToJSXElement } from '../config';

const Canvas = ({
  renderJSONTreeElement,
  style,
  isSelecting,
  jsonTree,
  onMouseMove,
  onMouseUp,
  onSelectComponent,
  onSelectorHover,
}: {
  renderJSONTreeElement?: (jsonTreeElement: JSONTreeElement) => JSONTreeElement;
  style?: React.CSSProperties;
  jsonTree: JSONTreeElement;
  isSelecting: boolean;
  onMouseMove?: ({ clientX, clientY }: { clientX: number; clientY: number }) => void;
  onMouseUp?: () => void;
  onSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  onSelectorHover?: (jsonTreeElement: JSONTreeElement) => void;
}) => {
  const id = React.useMemo(
    () =>
      `frame-${Math.random()
        .toString(36)
        .slice(2)}`,
    [],
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const window = (e.target as HTMLElement).ownerDocument.defaultView;
      const $iframe = window.parent.document.getElementById(id);

      onMouseMove({
        clientX: $iframe.offsetLeft + e.clientX,
        clientY: $iframe.offsetTop + e.clientY,
      });
    },
    [onMouseMove],
  );

  const handleMouseUp = React.useCallback(
    (e: MouseEvent) => {
      if (!onMouseUp) return;

      e.preventDefault();
      e.stopPropagation();

      onMouseUp();
    },
    [onMouseUp],
  );

  const handleSelectComponent = React.useCallback(
    (fiberNav: FiberNavigator) => {
      onSelectComponent?.(fiberNavToJSONTreeElement(fiberNav));
    },
    [onSelectComponent],
  );

  const handleSelectorHover = React.useCallback(
    (fiberNav: FiberNavigator) => {
      onSelectorHover?.(fiberNavToJSONTreeElement(fiberNav));
    },
    [onSelectorHover],
  );

  return (
    <Frame
      title="Designer Canvas"
      frameBorder="0"
      width="100%"
      height="100%"
      initialContent='<!DOCTYPE html><html><head><style>html {font-size: 14px;}</style></head><body><div class="frame-root"></div></body></html>'
      style={style}
      id={id}
    >
      <FrameContextConsumer>
        {({ document, window }) => (
          <>
            {(!jsonTree.children || jsonTree.children.length === 0) && (
              <div
                style={{
                  padding: '8rem',
                  textAlign: 'center',
                  position: 'absolute',
                  pointerEvents: 'none',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '4rem' }} role="img" aria-label="Finger pointing left">
                  👈
                </span>
                <div style={{ fontSize: '1.2rem', opacity: 0.5 }}>Drag n' Drop some components</div>
              </div>
            )}

            <DebugSelector
              active={isSelecting}
              filter={fiberNav => fiberNavFindOwnerInJSONTree(fiberNav, jsonTree)}
              mountDocument={document}
              showElement={false}
              showClassName={false}
              onSelect={handleSelectComponent}
              onHover={handleSelectorHover}
            />

            <Provider theme={themes.teams} target={document}>
              {onMouseMove && <EventListener type="mousemove" listener={handleMouseMove} target={document} />}
              {onMouseUp && <EventListener type="mouseup" listener={handleMouseUp} target={document} />}
              {renderJSONTreeToJSXElement(jsonTree, renderJSONTreeElement)}
            </Provider>
          </>
        )}
      </FrameContextConsumer>
    </Frame>
  );
};

export default Canvas;
