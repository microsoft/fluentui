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

    return React.Children.map(props.children, child => {
      const commonStyles = {
        root: {
          ...child.props.styles?.root,
          width: '100%',
          height: '100%',
        },
        chartWrapper: {
          ...child.props.styles?.chartWrapper,
          width: '100%',
        },
        chart: {
          ...child.props.styles?.chart,
          // This overrides the pixel width of svg allowing it to resize properly within a flexbox or grid layout.
          // Note: height is not set to 100% because that causes the charts to resize vertically in an infinite loop.
          width: '100%',
        },
      };

      return React.cloneElement<IResponsiveChildProps>(child, {
        width: calculatedWidth,
        height: calculatedHeight,
        // For SankeyChart
        shouldResize: (calculatedWidth ?? 0) + (calculatedHeight ?? 0),
        styles: {
          // Keep components styles
          ...child.props.styles,
          ...commonStyles,
          // For HeatMapChart
          subComponentStyles: {
            ...child.props.styles?.subComponentStyles,
            cartesianStyles: {
              ...child.props.styles?.subComponentStyles?.cartesianStyles,
              ...commonStyles,
            },
          },
        },
      });
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
