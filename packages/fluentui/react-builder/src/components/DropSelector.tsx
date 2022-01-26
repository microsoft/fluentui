import * as React from 'react';
import * as _ from 'lodash';
import { EventListener } from '@fluentui/react-component-event-listener';
import { isBrowser } from '@fluentui/react-northstar';
import { FiberNavigator } from '../../../react-northstar/src/components/Debug/FiberNavigator';
import { fiberNavFindJSONTreeElement, jsonTreeFindParent } from '../config';
import { JSONTreeElement } from './types';

export type DropSelectorProps = {
  onDropPositionChange: (dropParent: JSONTreeElement, dropIndex: number) => void;
  filter?;
  jsonTree: JSONTreeElement;
  mountDocument?: Document;
  hideSelector?: Boolean;
};

type InElementPosition = 'top' | 'right' | 'bottom' | 'left' | 'center';

// left/right wins over top/bottom
const getInElementPosition: (
  elementRect: { top: number; left: number; width: number; height: number },
  mouse: { x: number; y: number },
) => InElementPosition = ({ top, left, width, height }, { x, y }) => {
  const TRASHOLD_PERCENT = 0;
  const TRESHOLD_VALUE = 10;

  if (x <= left + width * TRASHOLD_PERCENT + TRESHOLD_VALUE) {
    return 'left';
  }
  if (x >= left + width - width * TRASHOLD_PERCENT - TRESHOLD_VALUE) {
    return 'right';
  }

  if (y <= top + height * TRASHOLD_PERCENT + TRESHOLD_VALUE) {
    return 'top';
  }
  if (y >= top + height - height * TRASHOLD_PERCENT - TRESHOLD_VALUE) {
    return 'bottom';
  }

  return 'center';
};

const findBestIndex: (parent: HTMLElement, children: JSONTreeElement[], mouse: { x: number; y: number }) => number = (
  parent,
  children,
  { x, y },
) => {
  // find first child which is after the mouse
  const index = children.findIndex(child => {
    const childEl = parent.querySelector(`[data-builder-id="${child.uuid ?? (child as any).key}"]`); // HACK!
    if (!childEl) {
      return false;
    }

    const boundingRect = childEl.getBoundingClientRect();
    const mouseIsAbove = y < boundingRect.top;
    const mouseIsToTheLeft = y >= boundingRect.top && y <= boundingRect.bottom && x < boundingRect.left; // TODO: HUH! What about RTL?

    return mouseIsAbove || mouseIsToTheLeft;
  });
  return index >= 0 ? index : children.length;
};

export const DropSelector: React.FunctionComponent<DropSelectorProps> = ({
  jsonTree,
  onDropPositionChange,
  mountDocument = isBrowser() ? window.document : null,
  filter = fiberNav => fiberNav,
  hideSelector = false,
}) => {
  const selectorRef = React.createRef<HTMLDivElement>();
  const mouseRef = React.createRef<HTMLDivElement>();

  const handleMouseMove = React.useCallback(
    e => {
      if (!selectorRef.current || !mouseRef.current) {
        return;
      }
      selectorRef.current.style.border = '';
      selectorRef.current.style.outline = '';

      let fiberNav = FiberNavigator.fromDOMNode(e.target);
      if (!fiberNav) {
        console.error('DropSelector: No fiber for dom node', e.target);
        return;
      }
      fiberNav = filter(fiberNav);
      const targetElement = fiberNav.domNode;
      if (!targetElement) {
        console.error('DropSelector: No dom node for fiber', fiberNav);
        return;
      }

      const jsonTreeElement = fiberNavFindJSONTreeElement(jsonTree, fiberNav);

      const targetRect = targetElement.getBoundingClientRect();

      mouseRef.current.style.left = `${e.x}px`;
      mouseRef.current.style.top = `${e.y}px`;

      selectorRef.current.style.top = `${targetRect.top}px`;
      selectorRef.current.style.left = `${targetRect.left}px`;
      selectorRef.current.style.width = `${targetRect.width}px`;
      selectorRef.current.style.height = `${targetRect.height}px`;

      const inElementPosition = getInElementPosition(
        {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
        },
        { x: e.x, y: e.y },
      );

      if (inElementPosition === 'center' || jsonTreeElement.uuid === 'builder-root') {
        // We're inside an element so we care about where we drop among it's children here
        if (jsonTreeElement.props?.children?.length > 0) {
          // Drop inside parent WITH children
          const bestIndex = findBestIndex(targetElement, jsonTreeElement.props.children as JSONTreeElement[], {
            x: e.x,
            y: e.y,
          });
          // console.log('DropSelector bestIndex', bestIndex, jsonTreeElement);

          selectorRef.current.style.outline = '2px solid pink';
          onDropPositionChange(jsonTreeElement, bestIndex);
        } else {
          // Drop inside parent WITH NO children
          selectorRef.current.style.outline = '2px solid red';
          onDropPositionChange(jsonTreeElement, 0);
        }
      } else {
        // We're inside an element but at edge, we care about where we drop outside among siblings
        // jsonTreeElement - is your sibling and inElementPosition
        // parent, insertAtIndex
        selectorRef.current.style[`border${_.startCase(inElementPosition)}`] = '4px solid red';
        const dropParent = jsonTreeFindParent(jsonTree, jsonTreeElement.uuid);
        const dropIndex = dropParent?.props?.children.indexOf(jsonTreeElement);

        if (inElementPosition === 'right' || inElementPosition === 'bottom') {
          onDropPositionChange(dropParent, dropIndex + 1);
        } else {
          onDropPositionChange(dropParent, dropIndex);
        }
      }
    },
    [filter, jsonTree, mouseRef, onDropPositionChange, selectorRef],
  );

  const handleMouseLeave = React.useCallback(() => {
    if (!selectorRef.current || !mouseRef.current) {
      return;
    }
    selectorRef.current.style.border = '';
    selectorRef.current.style.outline = '';
  }, [selectorRef, mouseRef]);

  return (
    <>
      {!hideSelector && (
        <>
          <div
            ref={selectorRef}
            style={{
              position: 'fixed',
              zIndex: 99999999,
              pointerEvents: 'none',
              userSelect: 'none',
              outlineOffset: '-1px',
            }}
          />
          <div
            ref={mouseRef}
            style={{
              position: 'fixed',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: '2px solid red',
              margin: '-5px 0 0 -5px',
              zIndex: 99999999,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
          <EventListener listener={handleMouseMove} target={mountDocument.body} type="mousemove" />
          <EventListener listener={handleMouseLeave} target={mountDocument.body} type="mouseleave" />
        </>
      )}
    </>
  );
};
