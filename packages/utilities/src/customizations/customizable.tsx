import * as React from 'react';
import { Customizations } from './Customizations';
import { hoistStatics } from '../hoistStatics';
import { CustomizerContext } from './CustomizerContext';
import { concatStyleSets } from '@fluentui/merge-styles';
import type { ICustomizerContext } from './CustomizerContext';
import { MergeStylesShadowRootConsumer } from '../shadowDom/MergeStylesShadowRootContext';
import { ShadowConfig } from '@fluentui/merge-styles/lib/mergeStyleSets';
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

      private _shadowDom: ShadowConfig | undefined;

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
                      !this._shadowDom ||
                      this._shadowDom.stylesheetKey !== scope ||
                      this._shadowDom.inShadow !== inShadow ||
                      this._shadowDom.window !== win
                      // false
                    ) {
                      this._shadowDom = {
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
                        this._styleCache.default = defaultProps.styles;
                        this._styleCache.component = componentProps.styles;
                        this._styleCache.merged = mergedStyles;
                        // this._styleCache.merged.__stylesheetKey__ = scope;
                        // this._styleCache.merged.__inShadow__ = inShadow;
                      }

                      return (
                        <ComposedComponent
                          {...defaultProps}
                          {...componentProps}
                          shadowDom={this._shadowDom}
                          styles={this._styleCache.merged}
                        />
                      );
                    }

                    const styles = { ...defaultProps.styles, ...componentProps.styles };
                    return (
                      <ComposedComponent
                        {...defaultProps}
                        {...componentProps}
                        shadowDom={this._shadowDom}
                        styles={styles}
                      />
                    );
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
