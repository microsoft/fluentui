import * as React from 'react';
import * as PropTypes from 'prop-types';
import { concatStyleSets } from '@uifabric/merge-styles';
import { IStyleFunction } from './IStyleFunction';
import { CustomizableContextTypes } from './customizable';
import { Customizations, ICustomizations } from './Customizations';

export type IStyleFunctionOrObject<TStyleProps, TStyles> = IStyleFunction<TStyleProps, TStyles> | TStyles;

export interface IPropsWithStyles<TStyleProps, TStyles> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyles>;
  subComponents?: {
    [key: string]: IStyleFunction<{}, {}>;
  };
}

export interface ICustomizableProps {
  /**
   * Name of scope, which can be targeted using the Customizer.
   */
  scope: string;

  /**
   * List of fields which can be customized.
   * @default [ 'theme', 'styles' ]
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
export function styled<TComponentProps extends IPropsWithStyles<TStyleProps, TStyles>, TStyleProps, TStyles>(
  Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyles>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps
): (props: TComponentProps) => JSX.Element {
  const Wrapped: React.StatelessComponent<TComponentProps> = (
    componentProps: TComponentProps,
    context: { customizations: ICustomizations }
  ) => {
    customizable = customizable || { scope: '', fields: undefined };

    const { scope, fields = DefaultFields } = customizable;
    const settings = Customizations.getSettings(fields, scope, context.customizations);
    const { styles: customizedStyles, ...rest } = settings;
    const styles = (styleProps: TStyleProps) =>
      _resolve(styleProps, baseStyles, customizedStyles, componentProps.styles);

    const additionalProps = getProps ? getProps(componentProps) : undefined;

    return <Component {...rest} {...additionalProps} {...componentProps} styles={styles} />;
  };

  Wrapped.contextTypes = CustomizableContextTypes;
  Wrapped.displayName = `Styled${Component.displayName || Component.name}`;

  return Wrapped as (props: TComponentProps) => JSX.Element;
}

function _resolve<TStyleProps, TStyles>(
  styleProps: TStyleProps,
  ...allStyles: (IStyleFunctionOrObject<TStyleProps, Partial<TStyles>> | undefined)[]
): Partial<TStyles> | undefined {
  const result: Partial<TStyles>[] = [];

  for (const styles of allStyles) {
    if (styles) {
      result.push(typeof styles === 'function' ? styles(styleProps) : styles);
    }
  }
  if (result.length) {
    return concatStyleSets(...result);
  }

  return undefined;
}
