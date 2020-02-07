import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { EventGroup, getWindow, css } from '../../Utilities';
import * as WithResponsiveModeStyles from './withResponsiveMode.scss';

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

export function withResponsiveMode<TProps extends { responsiveMode?: ResponsiveMode }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>,
): any {
  // tslint:disable-next-line:function-name
  function WithResponsiveModeBase(
    props: TProps,
    forwardedRef: React.Ref<React.Component<TProps, TState>>
  ): JSX.Element | null {
    const [responsiveMode = ResponsiveMode.unknown, setCurrentResponsiveMode] = React.useState<ResponsiveMode>(
      _defaultMode || _lastMode || ResponsiveMode.large
    );

    const setCurrentResponsiveModeRef = React.useRef<typeof setCurrentResponsiveMode>();
    setCurrentResponsiveModeRef.current = setCurrentResponsiveMode;

    React.useEffect(() => {
      return () => {
        setCurrentResponsiveModeRef.current = undefined;
      };
    }, []);

    const rootRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      // Use a layout effect instead of a newer effect to ensure compatibility with existing unit tests.
      if (typeof window !== 'undefined') {
        const events = new EventGroup(null);

        const onResize = () => {
          const element = rootRef.current;
          const currentWindow = (element && getWindow(element)) || window;

          if (currentWindow) {
            if (setCurrentResponsiveModeRef.current) {
              setCurrentResponsiveModeRef.current(getResponsiveMode(currentWindow));
            }
          }
        };

        onResize();

        // There is not a good way to subscribe to the component instance window.
        events.on(window, 'resize', onResize);

        return () => {
          events.dispose();
        };
      }
    }, []);

    const componentElement = React.useMemo(() => {
      return responsiveMode === ResponsiveMode.unknown ? null : (
        <>
          <ComposedComponent {...(props as any)} ref={forwardedRef} responsiveMode={responsiveMode} />
          {
            // Mark the element with a class name so that it is clear in snapshots what has been added.
          }
          <div className={css('ms-withResponsiveMode', WithResponsiveModeStyles.root)} ref={rootRef} />
        </>
      );
    }, [forwardedRef, props, responsiveMode]);

    return componentElement;
  }

  const WithResponsiveMode = React.forwardRef(WithResponsiveModeBase);

  /**
   * Old-style component wrapper for consumption by existing callers.
   * The contract of the decorator interface expects a component instance from the ref, not
   * a function component.
   */
  class WithResponsiveModeComponent extends BaseDecorator<TProps, IWithResponsiveModeState> {
    public render(): JSX.Element | null {
      return <WithResponsiveMode {...(this.props as any)} ref={this._updateComposedComponentRef} />;
    }
  }

  return WithResponsiveModeComponent;
}

function getResponsiveMode(currentWindow: Window | undefined): ResponsiveMode {
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
        'Call setResponsiveMode to define what the responsive mode is.'
      );
    }
  }

  return responsiveMode;
}
