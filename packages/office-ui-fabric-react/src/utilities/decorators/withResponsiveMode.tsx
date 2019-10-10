import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { BaseDecorator } from './BaseDecorator';
import { getWindow, hoistStatics } from '../../Utilities';

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
  unknown = 999
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

export function withResponsiveMode<TProps extends { responsiveMode?: ResponsiveMode }, TState>(
  ComposedComponent: new (props: TProps, ...args: any[]) => React.Component<TProps, TState>
): any {
  const resultClass = class WithResponsiveMode extends BaseDecorator<TProps, IWithResponsiveModeState> {
    constructor(props: TProps) {
      super(props);
      this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);

      this.state = {
        responsiveMode: _defaultMode || _lastMode || ResponsiveMode.large
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
        <ComposedComponent ref={this._updateComposedComponentRef} responsiveMode={responsiveMode} {...this.props as any} />
      );
    }

    private _onResize = () => {
      const responsiveMode = this._getResponsiveMode();

      if (responsiveMode !== this.state.responsiveMode) {
        this.setState({
          responsiveMode: responsiveMode
        });
      }
    };

    private _getResponsiveMode(): ResponsiveMode {
      let responsiveMode = ResponsiveMode.small;
      const element = findDOMNode(this) as Element;
      const win = getWindow(element);

      if (typeof win !== 'undefined') {
        try {
          while (win.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
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
  };
  return hoistStatics(ComposedComponent, resultClass);
}
