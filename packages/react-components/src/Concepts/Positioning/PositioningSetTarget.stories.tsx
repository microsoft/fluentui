import * as React from 'react';
import { Tooltip } from '@fluentui/react-components';
import { PopperRefHandle } from '@fluentui/react-positioning';

export const ImperativeAnchorTarget = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const popperRef = React.useRef<PopperRefHandle>(null);
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
    popperRef.current?.setTarget({
      getBoundingClientRect: getRect(e.clientX, e.clientY),
    });
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

  React.useEffect(() => {
    if (buttonRef.current) {
      popperRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, popperRef]);

  return (
    <>
      <Tooltip
        visible={open}
        positioning={{ popperRef, offset: [0, 15] }}
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
        'The `popperRef` positioning prop provides an [imperative handle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)',
        'to manually set the target for a positioned element.',
        'This can be useful to reduce the number of renders required, for example when the positined element is',
        'following the mouse cursor',
        '',
        'In this example, you can scroll so that there is on enough space under the button to fit the popover',
        'with loading text.',
      ].join('\n'),
    },
  },
};
