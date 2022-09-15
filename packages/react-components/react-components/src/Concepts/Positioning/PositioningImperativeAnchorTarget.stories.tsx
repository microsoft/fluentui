import * as React from 'react';
import { Tooltip } from '@fluentui/react-components';
import type { PositioningImperativeRef, PositioningVirtualElement } from '@fluentui/react-components';

export const ImperativeAnchorTarget = () => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);

  const onMouseMove = React.useCallback((e: React.MouseEvent) => {
    const getRect = (x = 0, y = 0) => {
      return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
        x,
        y,
      });
    };
    const virtualElement: PositioningVirtualElement = {
      getBoundingClientRect: getRect(e.clientX, e.clientY),
    };
    positioningRef.current?.setTarget(virtualElement);
  }, []);

  const onMouseEnter = React.useCallback(() => {
    setOpen(true);
  }, []);

  const onMouseLeave = React.useCallback((e: React.MouseEvent) => {
    if (e.relatedTarget instanceof HTMLElement && e.relatedTarget.getAttribute('role') === 'tooltip') {
      return;
    }
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        visible={open}
        positioning={{ positioningRef, offset: { crossAxis: 0, mainAxis: 15 } }}
        content="Follows the cursor"
        relationship="label"
      />
      <div
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          width: 200,
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed red',
        }}
      >
        Move the mouse in here
      </div>
    </>
  );
};

ImperativeAnchorTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The `positioningRef` positioning prop provides an [imperative handle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)',
        'to manually position an element. The target can be a normal HTML element or a virtual element such as a',
        'coordinate on the viewport.',
        'This can be useful to reduce the number of renders required, for example when the positioned element',
        'follows the mouse cursor',
        '',
        'This example creates a virtual element that follows the coordinates of the mouse cursor.',
      ].join('\n'),
    },
  },
};
