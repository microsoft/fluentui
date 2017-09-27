import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Customizations } from './Customizations';

export function customizable(
  scope: string,
  fields: string[]
  // tslint:disable-next-line:no-any
): <P, S>(ComposedComponent: new (props: P, ...args: any[]) => React.Component<P, S>) => any {

  // tslint:disable-next-line:no-shadowed-variable
  return function customizableFactory<P, S>(
    // tslint:disable-next-line:no-any
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
    // tslint:disable-next-line:no-any
  ): any {
    return class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static displayName: string = 'Customized' + scope;

      public static contextTypes: {
        customizations: PropTypes.Requireable<{}>;
      } = {
        customizations: PropTypes.object
      };

      // tslint:disable-next-line:no-any
      constructor(props: P, context: any) {
        super(props, context);

        this._onSettingChanged = this._onSettingChanged.bind(this);
      }

      public componentDidMount(): void {
        Customizations.observe(this._onSettingChanged);
      }

      public componentWillUnmount(): void {
        Customizations.unobserve(this._onSettingChanged);
      }

      public render(): JSX.Element {
        const defaultProps = Customizations.getSettings(fields, scope, this.context.customizations);

        return (
          // tslint:disable-next-line:no-any
          <ComposedComponent { ...defaultProps } { ...this.props as any } />
        );
      }

      private _onSettingChanged(): void {
        this.forceUpdate();
      }

    };
  };
}
