import * as React from 'react';
import { Customizations } from './Customizations';
import { hoistStatics } from '../hoistStatics';
import { CustomizerContext } from './CustomizerContext';
import { concatStyleSets } from '@fluentui/merge-styles';
import type { ICustomizerContext } from './CustomizerContext';
import { MergeStylesShadowRootConsumer } from '../shadowDom/MergeStylesShadowRootContext';
import type { ShadowConfig } from '@fluentui/merge-styles';
import { getWindow } from '../dom/getWindow';
// eslint-disable-next-line
import { WindowContext } from '@fluentui/react-window-provider';

export function customizable(
  scope: string,
  fields: string[],
  concatStyles?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <P>(ComposedComponent: React.ComponentType<P>) => any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function customizableFactory<P>(ComposedComponent: React.ComponentType<P>): any {
    const resultClass = class ComponentWithInjectedProps extends React.Component<P, {}> {
      public static displayName: string = 'Customized' + scope;
      public static contextType = WindowContext;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      private _styleCache: { default?: any; component?: any; merged?: any } = {};

      private _shadowConfig: ShadowConfig | undefined;

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
          <MergeStylesShadowRootConsumer stylesheetKey={scope}>
            {(inShadow: boolean) => {
              return (
                <CustomizerContext.Consumer>
                  {(context: ICustomizerContext) => {
                    const defaultProps = Customizations.getSettings(fields, scope, context.customizations);

                    const win = this.context.window ?? getWindow();
                    if (
                      !this._shadowConfig ||
                      this._shadowConfig.stylesheetKey !== scope ||
                      this._shadowConfig.inShadow !== inShadow ||
                      this._shadowConfig.window !== win
                      // false
                    ) {
                      this._shadowConfig = {
                        stylesheetKey: scope,
                        inShadow,
                        window: win,
                      };
                    }

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const componentProps = this.props as any;

                    // If defaultProps.styles is a function, evaluate it before calling concatStyleSets
                    if (defaultProps.styles && typeof defaultProps.styles === 'function') {
                      defaultProps.styles = defaultProps.styles({ ...defaultProps, ...componentProps });
                    }

                    // If concatStyles is true and custom styles have been defined compute those styles
                    if (concatStyles && defaultProps.styles) {
                      if (
                        this._styleCache.default !== defaultProps.styles ||
                        this._styleCache.component !== componentProps.styles
                      ) {
                        const mergedStyles = concatStyleSets(defaultProps.styles, componentProps.styles);
                        mergedStyles.__shadowConfig__ = this._shadowConfig;
                        this._styleCache.default = defaultProps.styles;
                        this._styleCache.component = componentProps.styles;
                        this._styleCache.merged = mergedStyles;
                      }

                      return (
                        <ComposedComponent {...defaultProps} {...componentProps} styles={this._styleCache.merged} />
                      );
                    }

                    const styles = {
                      ...defaultProps.styles,
                      ...componentProps.styles,
                      __shadowConfig__: this._shadowConfig,
                    };
                    return <ComposedComponent {...defaultProps} {...componentProps} styles={styles} />;
                  }}
                </CustomizerContext.Consumer>
              );
            }}
          </MergeStylesShadowRootConsumer>
        );
      }

      private _onSettingChanged(): void {
        this.forceUpdate();
      }
    };

    return hoistStatics(ComposedComponent, resultClass);
  };
}
