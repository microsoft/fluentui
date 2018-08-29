import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Customizations } from './Customizations';
import { hoistStatics } from './hoistStatics';
import { concatStyleSets } from '@uifabric/merge-styles';

export const CustomizableContextTypes = {
  customizations: PropTypes.object
};

export function customizable(
  scope: string,
  fields: string[],
  concatStyles?: boolean
  // tslint:disable-next-line:no-any
): <P, S>(ComposedComponent: new (props: P, ...args: any[]) => React.Component<P, S>) => any {
  // tslint:disable-next-line:no-shadowed-variable
  return function customizableFactory<P, S>(
    // tslint:disable-next-line:no-any
    ComposedComponent: new (props: P, ...args: any[]) => React.Component<P, S>
    // tslint:disable-next-line:no-any
  ): any {
    const resultClass = class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static displayName: string = 'Customized' + scope;

      public static contextTypes = CustomizableContextTypes;

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

        // tslint:disable-next-line:no-any
        const componentProps = this.props as any;

        if (concatStyles) {
          const mergedStyles = concatStyleSets(defaultProps.styles, componentProps.styles);
          return <ComposedComponent {...defaultProps} {...componentProps} styles={mergedStyles} />;
        }

        return <ComposedComponent {...defaultProps} {...componentProps} />;
      }

      private _onSettingChanged(): void {
        this.forceUpdate();
      }
    };

    return hoistStatics(ComposedComponent, resultClass);
  };
}
