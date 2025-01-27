import * as React from 'react';
import { classNamesFunction, getWindow } from '@fluentui/react';
import {
  IResponsiveChildProps,
  IResponsiveContainerProps,
  IResponsiveContainerStyles,
} from './ResponsiveContainer.types';
import { getStyles } from './ResponsiveContainer.styles';

const getClassNames = classNamesFunction<{}, IResponsiveContainerStyles>();

export const ResponsiveContainer: React.FC<IResponsiveContainerProps> = props => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const onResizeRef = React.useRef<IResponsiveContainerProps['onResize']>();
  const classNames = React.useMemo(() => getClassNames(getStyles()), []);

  const [size, setSize] = React.useState<{ containerWidth?: number; containerHeight?: number }>({});

  onResizeRef.current = props.onResize;

  React.useEffect(() => {
    const _window = getWindow(containerRef.current) as (Window & typeof globalThis) | undefined;
    let animationFrameId: number | undefined;
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

    if (_window && _window.ResizeObserver) {
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
  }, []);

  return (
    <div ref={containerRef} className={classNames.root} style={{ width: props.width, height: props.height }}>
      {React.cloneElement<IResponsiveChildProps>(props.children, {
        width: size.containerWidth,
        height: size.containerHeight,
        shouldResize: (size.containerWidth ?? 0) + (size.containerHeight ?? 0),
      })}
    </div>
  );
};
