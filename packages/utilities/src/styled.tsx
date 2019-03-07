import * as React from 'react';
import { concatStyleSets, IStyleSet, IStyleFunctionOrObject, IConcatenatedStyleSet } from '@uifabric/merge-styles';
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
 */
export function styled<
  TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>,
  TStyleProps,
  TStyleSet extends IStyleSet<TStyleSet>
>(
  Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps
): React.StatelessComponent<TComponentProps> {
  customizable = customizable || { scope: '', fields: undefined };

  const { scope, fields = DefaultFields } = customizable;

  class Wrapped extends React.Component<TComponentProps, {}> {
    public static displayName = `Styled${Component.displayName || Component.name}`;

    private _inCustomizerContext = false;

    public render(): JSX.Element {
      return (
        <CustomizerContext.Consumer>
          {(context: ICustomizerContext) => {
            this._inCustomizerContext = !!context.customizations.inCustomizerContext;

            const settings = Customizations.getSettings(fields, scope, context.customizations);
            const { styles: customizedStyles, ...rest } = settings;
            const styles = (styleProps: TStyleProps) => _resolve(styleProps, baseStyles, customizedStyles, this.props.styles);

            const additionalProps = getProps ? getProps(this.props) : undefined;
            return <Component {...rest} {...additionalProps} {...this.props} styles={styles} />;
          }}
        </CustomizerContext.Consumer>
      );
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

    private _onSettingsChanged = () => this.forceUpdate();
  }

  // This preserves backwards compatibility.
  // tslint:disable-next-line:no-any
  return Wrapped as any;
}

function _resolve<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>>(
  styleProps: TStyleProps,
  ...allStyles: (IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined)[]
): IConcatenatedStyleSet<TStyleSet> | undefined {
  const result: Partial<TStyleSet>[] = [];

  for (const styles of allStyles) {
    if (styles) {
      result.push(typeof styles === 'function' ? styles(styleProps) : styles);
    }
  }
  if (result.length) {
    // cliffkoh: I cannot figure out how to avoid the cast to any here.
    // It is something to do with the use of Omit in IStyleSet.
    // It might not be necessary once  Omit becomes part of lib.d.ts (when we remove our own Omit and rely on
    // the official version).
    // tslint:disable-next-line:no-any
    return concatStyleSets(...(result as any)) as IConcatenatedStyleSet<TStyleSet>;
  }

  return undefined;
}
