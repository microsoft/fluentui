import * as React from 'react';
import { EventGroup } from '../eventGroup/EventGroup';

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

const RESPONSIVE_MAX_CONSTRAINT = [
  479,
  639,
  1023,
  1365,
  1919,
  99999999
];

export function withResponsiveMode<P, S>(ComposedComponent: any): any {

  return class WithResponsiveMode extends React.Component<P, IWithResponsiveModeState> {
    private _events: EventGroup;
    private _composedComponentInstance: any;

    constructor() {
      super();

      this._events = new EventGroup(this);
      this._updateChildRef = this._updateChildRef.bind(this);

      this.state = {
        responsiveMode: this._getResponsiveMode()
      };
    }

    public componentWillMount() {
      this._events.on(window, 'resize', () => {
        let responsiveMode = this._getResponsiveMode();

        if (responsiveMode !== this.state.responsiveMode) {
          this.setState({
            responsiveMode: responsiveMode
          });
        }
      });
    }

    public componentWillUnmount() {
      this._events.dispose();
    }

    public render() {
      let { responsiveMode } = this.state;

      return (
        <ComposedComponent ref={ this._updateChildRef } responsiveMode={ responsiveMode } { ...this.props } />
      );
    }

    /**
     * Accessor for the instance of the component being wrapped by WithResponsiveMode.
     */
    public get composedComponentInstance() {
      return this._composedComponentInstance;
    }

    private _updateChildRef(composedComponentInstance: any) {
      this._composedComponentInstance = composedComponentInstance;
    }

    private _getResponsiveMode(): ResponsiveMode {
      let responsiveMode = ResponsiveMode.small;

      while (window.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
        responsiveMode++;
      }

      return responsiveMode;
    }
  };
}
