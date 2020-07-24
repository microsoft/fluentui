import * as React from 'react';
import { useResponsiveMode } from './useResponsiveMode';
import { ResponsiveMode } from './withResponsiveMode.types';

export const withResponsiveMode = <TProps extends { responsiveMode?: ResponsiveMode }>(
  ComposedComponent: React.ComponentClass | React.FunctionComponent<TProps>,
  props: TProps,
) => {
  const Component = () => {
    const ref = React.useRef(null);
    const responsiveMode = useResponsiveMode(ref);

    return <ComposedComponent ref={ref} responsiveMode={responsiveMode} {...props} />;
  };

  Component.displayName = ComposedComponent.displayName;

  return Component;
};
