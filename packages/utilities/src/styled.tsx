import * as React from 'react';
import { concatStyleSetsWithProps } from '@fluentui/merge-styles';
import { useMergeStylesHooks } from './shadowDom/index';
import { useCustomizationSettings } from './customizations/useCustomizationSettings';
import type { IStyleSetBase, IStyleFunctionOrObject, ShadowConfig } from '@fluentui/merge-styles';

export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSetBase> {
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

export type StyleFunction<TStyleProps, TStyleSet extends IStyleSetBase> = IStyleFunctionOrObject<
  TStyleProps,
  TStyleSet
> & {
  /** Cache for all style functions. */
  __cachedInputs__: (IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined)[];

  /** True if no styles prop or styles from Customizer is passed to wrapped component. */
  __noStyleOverride__: boolean;

  /** Shadow DOM configuration object */
  __shadowConfig__?: ShadowConfig;
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
  TStyleSet extends IStyleSetBase,
>(
  Component: React.ComponentClass<TComponentProps> | React.FunctionComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps,
  pure?: boolean,
): React.FunctionComponent<TComponentProps>;
export function styled<
  TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet> & React.RefAttributes<TRef>,
  TStyleProps,
  TStyleSet extends IStyleSetBase,
  TRef = unknown,
>(
  Component: React.ComponentClass<TComponentProps> | React.FunctionComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps,
  pure?: boolean,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<TComponentProps> & React.RefAttributes<TRef>>;
export function styled<
  TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet> & React.RefAttributes<TRef>,
  TStyleProps,
  TStyleSet extends IStyleSetBase,
  TRef = unknown,
>(
  Component: React.ComponentClass<TComponentProps> | React.FunctionComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps,
  pure?: boolean,
) {
  customizable = customizable || { scope: '', fields: undefined };

  const { scope, fields = DefaultFields } = customizable;

  const Wrapped = React.forwardRef((props: TComponentProps, forwardedRef: React.Ref<TRef>) => {
    const styles = React.useRef<StyleFunction<TStyleProps, TStyleSet>>();

    const settings = useCustomizationSettings(fields, scope);
    const { styles: customizedStyles, dir, ...rest } = settings;
    const additionalProps = getProps ? getProps(props) : undefined;

    const { useStyled } = useMergeStylesHooks();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cache = (styles.current && (styles.current as any).__cachedInputs__) || [];
    const propStyles = props.styles;
    if (!styles.current || customizedStyles !== cache[1] || propStyles !== cache[2]) {
      // Using styled components as the Component arg will result in nested styling arrays.
      // The function can be cached and in order to prevent the props from being retained within it's closure
      // we pass in just the styles and not the entire props
      const concatenatedStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> = (styleProps: TStyleProps) =>
        concatStyleSetsWithProps(styleProps, baseStyles, customizedStyles, propStyles);

      // The __cachedInputs__ array is attached to the function and consumed by the
      // classNamesFunction as a list of keys to include for memoizing classnames.
      (concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>).__cachedInputs__ = [
        baseStyles,
        customizedStyles,
        propStyles,
      ];

      (concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>).__noStyleOverride__ =
        !customizedStyles && !propStyles;

      styles.current = concatenatedStyles as StyleFunction<TStyleProps, TStyleSet>;
    }

    styles.current.__shadowConfig__ = useStyled(scope);

    return <Component ref={forwardedRef} {...rest} {...additionalProps} {...props} styles={styles.current} />;
  });
  // Function.prototype.name is an ES6 feature, so the cast to any is required until we're
  // able to drop IE 11 support and compile with ES6 libs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Wrapped.displayName = `Styled${Component.displayName || (Component as any).name}`;

  // This preserves backwards compatibility.
  const pureComponent = pure ? React.memo(Wrapped) : Wrapped;
  // Check if the wrapper has a displayName after it has been memoized. Then assign it to the pure component.
  if (Wrapped.displayName) {
    pureComponent.displayName = Wrapped.displayName;
  }

  return pureComponent;
}
