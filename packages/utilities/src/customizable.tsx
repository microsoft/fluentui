import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Customizer } from './Customizer';

export function customizable<P>(fields: string[]) {
  return function customizableFactory<P, S>(
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
  ): any {
    return class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static contextTypes = {
        injectedProps: PropTypes.object
      };

      constructor(props: P, context: any) {
        super(props, context);

        this._onSettingChanged = this._onSettingChanged.bind(this);
      }

      public componentDidMount() {
        Customizer.addChangeListener(this._onSettingChanged);
      }

      public componentWillUnmount() {
        Customizer.removeChangeListener(this._onSettingChanged);
      }

      public render() {
        let defaultProps = {};

        for (let propName of fields) {
          (defaultProps as any)[propName] = (this.context.injectedProps) ?
            this.context.injectedProps[propName] :
            Customizer.getDefault(propName);
        }

        return (
          <ComposedComponent { ...defaultProps } { ...this.props as any } />
        );
      }

      private _onSettingChanged(name: string) {
        if (fields.indexOf(name) >= 0) {
          this.forceUpdate();
        }
      }

    };
  };
}
