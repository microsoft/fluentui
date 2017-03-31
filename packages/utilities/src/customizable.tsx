import * as React from 'react';
import { ICustomizerProps } from './Customizer';

export function customizable<P>(componentName?: string) {
  return function customizableFactory<P, S>(
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
  ): any {
    return class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static contextTypes = {
        injectedProps: React.PropTypes.object
      };

      public render() {
        let defaultProps = ((this.context.injectedProps) ?
          this.context.injectedProps[componentName] :
          null) || {};

        return (
          <ComposedComponent { ...defaultProps } { ...this.props } />
        );
      }
    };
  }
}
