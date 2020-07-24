import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { BaseDecorator } from './BaseDecorator';
import { getWindow, hoistStatics, EventGroup } from '../../Utilities';
import { useResponsiveMode } from '@uifabric/react-hooks';

export interface IWithResponsiveModeState {
  responsiveMode?: ResponsiveMode;
}

export enum ResponsiveMode {
  small = 0,
  medium = 1,
  large = 2,
  xLarge = 3,
  xxLarge = 4,
  xxxLarge = 5,
  unknown = 999,
}

const RESPONSIVE_MAX_CONSTRAINT = [479, 639, 1023, 1365, 1919, 99999999];

/**
 * User specified mode to default to, useful for server side rendering scenarios.
 */
let _defaultMode: ResponsiveMode | undefined;

/**
 * Tracking the last mode we successfully rendered, which allows us to
 * paint initial renders with the correct size.
 */
let _lastMode: ResponsiveMode | undefined;

/**
 * Allows a server rendered scenario to provide a default responsive mode.
 */
export function setResponsiveMode(responsiveMode: ResponsiveMode | undefined): void {
  _defaultMode = responsiveMode;
}

/**
 * Initializes the responsive mode to the current window size. This can be used to avoid
 * a re-render during first component mount since the window would otherwise not be measured
 * until after mounting.
 */
export function initializeResponsiveMode(element?: HTMLElement): void {
  if (typeof window !== 'undefined') {
    const currentWindow = (element && getWindow(element)) || window;

    getResponsiveMode(currentWindow);
  }
}

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
