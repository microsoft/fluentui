import * as React from 'react';
import { IThemedComponentProps } from './ThemeProvider';

export interface IWithThemeState {
  theme?: IThemedComponentProps;
};

export function withTheme(componentName?: string) {
  return function withTheme<P extends IThemedComponentProps, S>(
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
  ): any {
    return class ComponentWithTheme extends React.Component<P, IWithThemeState> {
      public static contextTypes = {
        theme: React.PropTypes.object
      };

      constructor() {
        super();

        this.state = {
          theme: {}
        };
      }

      public render() {
        let { theme } = this.state;
        let defaultProps = ((this.context.theme && this.context.theme.defaultProps) ?
          this.context.theme.defaultProps[componentName] :
          null) || {};

        return (
          <ComposedComponent { ...defaultProps } { ...this.props } />
        );
      }
    };
  }
}
