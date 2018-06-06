import * as React from 'react';
import { concatStyleSets } from '@uifabric/merge-styles';
import { IStyleFunction } from './IStyleFunction';

export type IStyleFunctionOrObject<TStyleProps, TStyles> = IStyleFunction<TStyleProps, TStyles> | TStyles;

export interface IPropsWithStyles<TStyleProps, TStyles> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyles>;
  subComponents?: {
    [key: string]: IStyleFunction<{}, {}>;
  };
}

interface IWrappedComponent<P> {
  (props: P): JSX.Element;
  displayName: string;
}

/**
 * The styled HOC wrapper allows you to create a functional wrapper around a given component which will resolve
 * getStyles functional props, and mix customized props passed in using concatStyleSets. Example:
 *
 * ```tsx
 * export const Toggle = styled(
 *   ToggleBase,
 *   {
 *     getStyles: props => ({ root: { background: 'red' }})
 *   }
 * );
 * ```
 *
 */
export function styled<TComponentProps extends IPropsWithStyles<TStyleProps, TStyles>, TStyleProps, TStyles>(
  Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>,
  getBaseStyles: (props: TStyleProps) => TStyles,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>
): (props: TComponentProps) => JSX.Element {
  const Wrapped = ((componentProps: TComponentProps) => {
    const getStyles = (styleProps: TStyleProps) =>
      concatStyleSets(
        getBaseStyles && getBaseStyles(styleProps),
        componentProps &&
          componentProps.styles &&
          (typeof componentProps.styles === 'function' ? componentProps.styles(styleProps) : componentProps.styles)
      );
    const additionalProps = getProps ? getProps(componentProps) : {};

    return <Component {...additionalProps} {...componentProps} styles={getStyles} />;
  }) as IWrappedComponent<TComponentProps>;

  Wrapped.displayName = `Styled${Component.displayName || Component.name}`;
  return Wrapped;
}
