import * as React from 'react';
import { Customizations } from './Customizations';
import { hoistStatics } from './hoistStatics';
import { CustomizerContext, ICustomizerContext } from './Customizer';
import { concatStyleSets } from '@uifabric/merge-styles';

export function customizable(
  scope: string,
  fields: string[],
  concatStyles?: boolean
  // tslint:disable-next-line:no-any
): <P>(ComposedComponent: React.ComponentType<P>) => any {
  // tslint:disable-next-line:no-shadowed-variable
  return function customizableFactory<P>(
    // tslint:disable-next-line:no-any
    ComposedComponent: React.ComponentType<P>
    // tslint:disable-next-line:no-any
  ): any {
    const resultClass = class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static displayName: string = 'Customized' + scope;

      // tslint:disable-next-line:no-any
      constructor(props: P) {
        super(props);

        this._onSettingChanged = this._onSettingChanged.bind(this);
      }

      public componentDidMount(): void {
        Customizations.observe(this._onSettingChanged);
      }

      public componentWillUnmount(): void {
        Customizations.unobserve(this._onSettingChanged);
      }

      public render(): JSX.Element {
        return (
          <CustomizerContext.Consumer>
            {(context: ICustomizerContext) => {
              const defaultProps = Customizations.getSettings(fields, scope, context.customizations);

              // tslint:disable-next-line:no-any
              const componentProps = this.props as any;

              // If defaultProps.styles is a function, evaluate it before calling concatStyleSets
              if (defaultProps.styles && typeof defaultProps.styles === 'function') {
                defaultProps.styles = defaultProps.styles({ ...defaultProps, ...componentProps });
              }

              if (concatStyles) {
                const mergedStyles = concatStyleSets(defaultProps.styles, componentProps.styles);
                return <ComposedComponent {...defaultProps} {...componentProps} styles={mergedStyles} />;
              }

              return <ComposedComponent {...defaultProps} {...componentProps} />;
            }}
          </CustomizerContext.Consumer>
        );
      }

      private _onSettingChanged(): void {
        this.forceUpdate();
      }
    };

    return hoistStatics(ComposedComponent, resultClass);
  };
}
