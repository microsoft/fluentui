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
  const ComponentWithResponsiveContainer: React.FC<TProps> = ({ width, height, onResize, ...restProps }) => {
    return (
      <ResponsiveContainer width={width} height={height} onResize={onResize}>
        <WrappedComponent {...(restProps as any)} />
      </ResponsiveContainer>
    );
  };

  return ComponentWithResponsiveContainer;
}
