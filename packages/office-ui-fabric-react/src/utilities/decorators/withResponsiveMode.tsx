import * as React from 'react';
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
  xxxLarge = 5
}

const RESPONSIVE_MAX_CONSTRAINT = [479, 639, 1023, 1365, 1919, 99999999];

let _defaultMode: ResponsiveMode | undefined;

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
        responsiveMode: this._getResponsiveMode()
      };
    }

    public componentDidMount(): void {
      this._events.on(window, 'resize', () => {
        const responsiveMode = this._getResponsiveMode();

        if (responsiveMode !== this.state.responsiveMode) {
          this.setState({
            responsiveMode: responsiveMode
          });
        }
      });
    }

    public componentWillUnmount(): void {
      this._events.dispose();
    }

    public render(): JSX.Element {
      const { responsiveMode } = this.state;

      return <ComposedComponent ref={this._updateComposedComponentRef} responsiveMode={responsiveMode} {...this.props as any} />;
    }

    private _getResponsiveMode(): ResponsiveMode {
      let responsiveMode = ResponsiveMode.small;
      const win = getWindow();

      if (typeof win !== 'undefined') {
        try {
          while (win.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
            responsiveMode++;
          }
        } catch (e) {
          // Return a best effort result in cases where we're in the browser but it throws on getting innerWidth.
          responsiveMode = ResponsiveMode.large;
        }
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
