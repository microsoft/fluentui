import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Customizations } from './Customizations';

export function customizable(
  scope: string,
  fields: string[]
): <P, S>(ComposedComponent: new (props: P, ...args: any[]) => React.Component<P, S>) => any {

  // tslint:disable-next-line:no-shadowed-variable
  return function customizableFactory<P, S>(
    ComposedComponent: (new (props: P, ...args: any[]) => React.Component<P, S>)
  ): any {
    return class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static contextTypes: {
        customizations: PropTypes.Requireable<any>;
      } = {
        customizations: PropTypes.object
      };

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
        let defaultProps = Customizations.getSettings(fields, scope, this.context.customizations);

        return (
          <ComposedComponent { ...defaultProps } { ...this.props as any } />
        );
      }

      private _onSettingChanged(): void {
        this.forceUpdate();
      }

    };
  };
}
