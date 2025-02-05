import * as React from 'react';
import { getWindow } from '@fluentui/react';
import { IResponsiveChildProps, IResponsiveContainerProps } from './ResponsiveContainer.types';

/**
 * Responsive Container component
 * {@docCategory ResponsiveContainer}
 */
export const ResponsiveContainer: React.FC<IResponsiveContainerProps> = props => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const onResizeRef = React.useRef<IResponsiveContainerProps['onResize']>();

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

  const chartContent = React.useMemo(() => {
    let calculatedWidth = size.containerWidth;
    let calculatedHeight = size.containerHeight;

    if (typeof props.aspect === 'number' && props.aspect > 0) {
      if (calculatedWidth) {
        calculatedHeight = calculatedWidth / props.aspect;
      } else if (calculatedHeight) {
        calculatedWidth = calculatedHeight * props.aspect;
      }

      if (typeof props.maxHeight === 'number' && calculatedHeight && calculatedHeight > props.maxHeight) {
        calculatedHeight = props.maxHeight;
      }
    }

    return React.cloneElement<IResponsiveChildProps>(props.children, {
      width: calculatedWidth,
      height: calculatedHeight,
      shouldResize: (calculatedWidth ?? 0) + (calculatedHeight ?? 0),
      styles: {
        root: {
          // https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
          // https://and-ha.com/en/coding-en/solving-responsive-coding-with-min-height/
          width: calculatedWidth,
          height: calculatedHeight,
        },
      },
    });
  }, [size, props.aspect, props.maxHeight, props.children]);

  return (
    <div
      ref={containerRef}
      style={{
        width: props.width ?? '100%',
        height: props.height ?? '100%',
        minWidth: props.minWidth,
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
      }}
    >
      {chartContent}
    </div>
  );
};
