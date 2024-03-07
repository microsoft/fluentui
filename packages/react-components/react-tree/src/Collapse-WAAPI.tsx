import * as React from 'react';

type CollapseProps = {
  visible: boolean;
  children: React.ReactNode;
  duration?: number;
};

export const Collapse: React.FC<CollapseProps> = ({ visible, children, duration = 200 }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    if (nodeRef.current === null) {
      return;
    }

    if (isFirstRender.current) {
      // Assign initial styles on the first render and skip the animation.
      Object.assign(nodeRef.current.style, {
        width: 'fit-content',
        height: 'fit-content',

        opacity: visible ? 1 : 0,
        maxHeight: visible ? '' : '0px',
      });

      isFirstRender.current = false;
      return;
    }

    // Keyframes for the animation are same for both show and hide. Reverse them if making the element visible.
    const keyframes = [
      { opacity: 1, maxHeight: `${nodeRef.current.scrollHeight}px` },
      { opacity: 0, maxHeight: '0px' },
    ];

    if (visible) {
      keyframes.reverse();
    }

    const animation = nodeRef.current.animate(keyframes, {
      duration,
      easing: 'ease-out',
      fill: 'forwards',
    });

    // When the animation is finished, clear the maxHeight so the element can grow with its content.
    animation.onfinish = () => {
      if (nodeRef.current) {
        nodeRef.current.style.maxHeight = '';
      }
    };

    return () => {
      animation.cancel();
    };
  }, [duration, visible]);

  // TODO: This can just clone the children and add the ref to the clone
  return <div ref={nodeRef}>{children}</div>;
};
