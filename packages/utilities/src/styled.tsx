import * as React from 'react';
import { IStyleSet, IStyleFunctionOrObject, concatStyleSetsWithProps } from '@uifabric/merge-styles';
import { Customizations } from './customizations/Customizations';
import { CustomizerContext, ICustomizerContext } from './customizations/CustomizerContext';

export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}

export interface ICustomizableProps {
  /**
   * Name of scope, which can be targeted using the Customizer.
   */
  scope: string;

  /**
   * List of fields which can be customized.
   * @defaultvalue [ 'theme', 'styles' ]
   */
  fields?: string[];
}

const DefaultFields = ['theme', 'styles'];

export type StyleFunction<TStyleProps, TStyleSet> = IStyleFunctionOrObject<TStyleProps, TStyleSet> & {
  /** Cache for all style functions. */
  __cachedInputs__: (IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined)[];

  /** True if no styles prop or styles from Customizer is passed to wrapped component. */
  __noStyleOverride__: boolean;
};

/**
 * The styled HOC wrapper allows you to create a functional wrapper around a given component which will resolve
 * getStyles functional props, and mix customized props passed in using concatStyleSets.
 *
 * @example
 * ```tsx
 * export const Toggle = styled(
 *   ToggleBase,
 *   props => ({ root: { background: 'red' }})
 * );
 * ```
 * @param Component - The unstyled base component to render, which receives styles.
 * @param baseStyles - The styles which should be curried with the component.
 * @param getProps - A helper which provides default props.
 * @param customizable - An object which defines which props can be customized using the Customizer.
 * @param pure - A boolean indicating if the component should avoid re-rendering when props haven't changed.
 * Note that pure should not be used on components which allow children, or take in complex objects or
 * arrays as props which could mutate on every render.
 */
export function styled<
  TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>,
  TStyleProps,
  TStyleSet extends IStyleSet<TStyleSet>
>(
  Component: React.ComponentClass<TComponentProps> | React.FunctionComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps,
  pure?: boolean,
): React.FunctionComponent<TComponentProps> {
  customizable = customizable || { scope: '', fields: undefined };

  const { scope, fields = DefaultFields } = customizable;
  const ParentComponent = pure ? React.PureComponent : React.Component;

  class Wrapped extends ParentComponent<TComponentProps, {}> {
    // Function.prototype.name is an ES6 feature, so the cast to any is required until we're
    // able to drop IE 11 support and compile with ES6 libs
    // tslint:disable-next-line:no-any
    public static displayName = `Styled${Component.displayName || (Component as any).name}`;

    private _inCustomizerContext = false;
    private _styles: StyleFunction<TStyleProps, TStyleSet>;

    public render(): JSX.Element {
      return <CustomizerContext.Consumer>{this._renderContent}</CustomizerContext.Consumer>;
    }

    public componentDidMount(): void {
      if (!this._inCustomizerContext) {
        Customizations.observe(this._onSettingsChanged);
      }
    }

    public componentWillUnmount(): void {
      if (!this._inCustomizerContext) {
        Customizations.unobserve(this._onSettingsChanged);
      }
    }

    private _renderContent = (context: ICustomizerContext): JSX.Element => {
      this._inCustomizerContext = !!context.customizations.inCustomizerContext;

      const settings = Customizations.getSettings(fields, scope, context.customizations);
      const { styles: customizedStyles, dir, ...rest } = settings;
      const additionalProps = getProps ? getProps(this.props) : undefined;

      this._updateStyles(customizedStyles);

      return <Component {...rest} {...additionalProps} {...this.props} styles={this._styles} />;
    };

    private _updateStyles(customizedStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>): void {
      // tslint:disable-next-line:no-any
      const cache = (this._styles && (this._styles as any).__cachedInputs__) || [];
      if (!this._styles || customizedStyles !== cache[1] || this.props.styles !== cache[2]) {
        // Cache the customized styles.
        // this._customizedStyles = customizedStyles;

        // Using styled components as the Component arg will result in nested styling arrays.
        const concatenatedStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> = (styleProps: TStyleProps) =>
          concatStyleSetsWithProps(styleProps, baseStyles, customizedStyles, this.props.styles);

        // The __cachedInputs__ array is attached to the function and consumed by the
        // classNamesFunction as a list of keys to include for memoizing classnames.
        (concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>).__cachedInputs__ = [
          baseStyles,
          customizedStyles,
          this.props.styles,
        ];

        (concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>).__noStyleOverride__ =
          !customizedStyles && !this.props.styles;

        this._styles = concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>;
      }
    }

    private _onSettingsChanged = (): void => this.forceUpdate();
  }

  // This preserves backwards compatibility.
  // tslint:disable-next-line:no-any
  return Wrapped as any;
}
