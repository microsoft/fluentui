import * as React from 'react';
import { concatStyleSets } from '@uifabric/merge-styles/lib/index';
import { IStyleFunction } from './IStyleFunction';

export interface IPropsWithStyles<TStyleProps, TStyles> {
  getStyles?: IStyleFunction<TStyleProps, TStyles>;
  subComponents?: {
    [key: string]: IStyleFunction<{}, {}>;
  };
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

  return (componentProps: TComponentProps) => {
    const getStyles = (
      styleProps: TStyleProps
    ) => concatStyleSets(
      getBaseStyles && getBaseStyles(styleProps),
      componentProps && componentProps.getStyles && componentProps.getStyles(styleProps)
    );
    const additionalProps = getProps ? getProps(componentProps) : {};

    return (
      <Component
        { ...additionalProps }
        { ...componentProps }
        getStyles={ getStyles }
      />
    );
  };
}
