import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { BaseDecorator } from '../decorators/BaseDecorator';
import { getWindow, hoistStatics, EventGroup } from '../../Utilities';
import { ResponsiveMode, IWithResponsiveModeState } from './withResponsiveMode.types';

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

export function withResponsiveMode<TProps extends { responsiveMode?: ResponsiveMode }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>,
): any {
  const resultClass = class WithResponsiveMode extends BaseDecorator<TProps, IWithResponsiveModeState> {
    private _events: EventGroup;

    constructor(props: TProps) {
      super(props);
      this._events = new EventGroup(this);
      this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);

      this.state = {
        responsiveMode: _defaultMode || _lastMode || ResponsiveMode.large,
      };
    }

    public componentDidMount(): void {
      this._events.on(window, 'resize', this._onResize);
      this._onResize();
    }

    public componentWillUnmount(): void {
      this._events.dispose();
    }

    public render(): JSX.Element | null {
      const { responsiveMode } = this.state;

      return responsiveMode === ResponsiveMode.unknown ? null : (
        <ComposedComponent
          ref={this._updateComposedComponentRef}
          responsiveMode={responsiveMode}
          {...(this.props as any)}
        />
      );
    }

    private _onResize = () => {
      const element = findDOMNode(this) as Element;
      const currentWindow = (element && getWindow(element)) || window;
      const responsiveMode = getResponsiveMode(currentWindow);

      if (responsiveMode !== this.state.responsiveMode) {
        this.setState({
          responsiveMode,
        });
      }
    };
  };
  return hoistStatics(ComposedComponent, resultClass);
}

export const getResponsiveMode = (currentWindow: Window | undefined): ResponsiveMode => {
  let responsiveMode = ResponsiveMode.small;

  if (currentWindow) {
    try {
      while (currentWindow.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
        responsiveMode++;
      }
    } catch (e) {
      // Return a best effort result in cases where we're in the browser but it throws on getting innerWidth.
      responsiveMode = _defaultMode || _lastMode || ResponsiveMode.large;
    }

    // Tracking last mode just gives us a better default in future renders,
    // which avoids starting with the wrong value if we've measured once.
    _lastMode = responsiveMode;
  } else {
    if (_defaultMode !== undefined) {
      responsiveMode = _defaultMode;
    } else {
      throw new Error(
        'Content was rendered in a server environment without providing a default responsive mode. ' +
          'Call setResponsiveMode to define what the responsive mode is.',
      );
    }
  }

  return responsiveMode;
};
