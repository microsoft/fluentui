import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { ResponsiveContainerProps } from './ResponsiveContainer.types';
import { useResponsiveContainerStyles_unstable } from './useResponsiveContainerStyles.styles';

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = props => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const onResizeRef = React.useRef<ResponsiveContainerProps['onResize']>();
  const { targetDocument } = useFluent_unstable();
  const classes = useResponsiveContainerStyles_unstable(props);

  const [size, setSize] = React.useState<{ containerWidth?: number; containerHeight?: number }>({});

  onResizeRef.current = props.onResize;
  const _window = targetDocument?.defaultView;

  React.useEffect(() => {
    let animationFrameId: number | undefined;
    // eslint-disable-next-line no-restricted-globals
    let resizeObserver: ResizeObserver | undefined;

    const resizeCallback = (entries: ResizeObserverEntry[]) => {
      const { width: containerWidth, height: containerHeight } = entries[0].contentRect;
      // rAF is an alternative to the throttle function. For more info, see:
      // https://css-tricks.com/debouncing-throttling-explained-examples/#aa-requestanimationframe-raf
      animationFrameId = _window?.requestAnimationFrame(() => {
        setSize(prevSize => {
          const roundedWidth = Math.floor(containerWidth);
          const roundedHeight = Math.floor(containerHeight);
          if (prevSize.containerWidth === roundedWidth && prevSize.containerHeight === roundedHeight) {
            return prevSize;
          }

          return { containerWidth: roundedWidth, containerHeight: roundedHeight };
        });
      });
      onResizeRef.current?.(containerWidth, containerHeight);
    };

    if (_window?.ResizeObserver) {
      resizeObserver = new _window.ResizeObserver(resizeCallback);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
    }

    return () => {
      if (animationFrameId) {
        _window?.cancelAnimationFrame(animationFrameId);
      }

      resizeObserver?.disconnect();
    };
  }, [_window]);

  return (
    <div ref={containerRef} className={classes.root} style={{ width: props.width, height: props.height }}>
      {props.children(size)}
    </div>
  );
};
ResponsiveContainer.displayName = 'ResponsiveContainer';
