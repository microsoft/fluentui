/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ResponsiveContainer } from './ResponsiveContainer';
import { IResponsiveContainerProps } from './ResponsiveContainer.types';

/**
 * An HOC to update wrapped component on container resize.
 * {@docCategory ResponsiveContainer}
 */
export function withResponsiveContainer<TProps extends Omit<IResponsiveContainerProps, 'children'>>(
  WrappedComponent: React.ComponentType<TProps>,
) {
  const ComponentWithResponsiveContainer: React.FC<TProps> = ({
    aspect,
    width,
    height,
    minWidth,
    minHeight,
    maxHeight,
    onResize,
    ...restProps
  }) => {
    return (
      <ResponsiveContainer
        aspect={aspect}
        width={width}
        height={height}
        minWidth={minWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        onResize={onResize}
      >
        <WrappedComponent {...(restProps as any)} />
      </ResponsiveContainer>
    );
  };

  return ComponentWithResponsiveContainer;
}
