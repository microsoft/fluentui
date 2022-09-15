import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { getWindow, hoistStatics, EventGroup } from '../../Utilities';
import { WindowContext } from '../../WindowProvider';

/**
 * @deprecated Decorator usage is deprecated. Either call `getResponsiveMode` manually, or
 * use the `useResponsiveMode` hook within a function component.
 */
export interface IWithResponsiveModeState {
  responsiveMode?: ResponsiveMode;
}

export enum ResponsiveMode {
  /** Width \<= 479px */
  small = 0,
  /** Width \> 479px and \<= 639px */
  medium = 1,
  /** Width \> 639px and \<= 1023px */
  large = 2,
  /** Width \> 1023px and \<= 1365px */
  xLarge = 3,
  /** Width \> 1365px and \<= 1919px */
  xxLarge = 4,
  /** Width \> 1919px */
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
 * Allows a server rendered scenario to provide a **default** responsive mode.
 * This WILL NOT trigger any updates to components that have already consumed the responsive mode!
 */
export function setResponsiveMode(responsiveMode: ResponsiveMode | undefined): void {
  _defaultMode = responsiveMode;
}

/**
 * Initializes the responsive mode to the current window size. This can be used to avoid
 * a re-render during first component mount since the window would otherwise not be measured
 * until after mounting.
 *
 * This WILL NOT trigger any updates to components that have already consumed the responsive mode!
 */
export function initializeResponsiveMode(element?: HTMLElement): void {
  const currentWindow = getWindow(element);

  if (currentWindow) {
    getResponsiveMode(currentWindow);
  }
}

export function getInitialResponsiveMode(): ResponsiveMode {
  return _defaultMode ?? _lastMode ?? ResponsiveMode.large;
}

/**
 * @deprecated Decorator usage is deprecated. Either call `getResponsiveMode` manually, or
 * use the `useResponsiveMode` hook within a function component.
 */
export function withResponsiveMode<TProps extends { responsiveMode?: ResponsiveMode }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>,
): any {
  // eslint-disable-next-line deprecation/deprecation
  const resultClass = class WithResponsiveMode extends BaseDecorator<TProps, IWithResponsiveModeState> {
    public static contextType = WindowContext;
    public context: React.ContextType<typeof WindowContext>;

    private _events: EventGroup;

    constructor(props: TProps) {
      super(props);
      this._events = new EventGroup(this);
      this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);

      this.state = {
        responsiveMode: getInitialResponsiveMode(),
      };
    }

    public componentDidMount(): void {
      this._events.on(this.context.window, 'resize', this._onResize);
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
      const responsiveMode = getResponsiveMode(this.context.window);

      if (responsiveMode !== this.state.responsiveMode) {
        this.setState({
          responsiveMode,
        });
      }
    };
  };
  return hoistStatics(ComposedComponent, resultClass);
}

function getWidthOfCurrentWindow(currentWindow: Window): number {
  try {
    return currentWindow.document.documentElement.clientWidth;
  } catch (e) {
    return currentWindow.innerWidth;
  }
}

/**
 * Hook to get the current responsive mode (window size category).
 * @param currentWindow - Use this window when determining the responsive mode.
 */
export function getResponsiveMode(currentWindow: Window | undefined): ResponsiveMode {
  let responsiveMode = ResponsiveMode.small;

  if (currentWindow) {
    try {
      while (getWidthOfCurrentWindow(currentWindow) > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
        responsiveMode++;
      }
    } catch (e) {
      // Return a best effort result in cases where we're in the browser but it throws on getting innerWidth.
      responsiveMode = getInitialResponsiveMode();
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
}
