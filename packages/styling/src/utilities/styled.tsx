import * as React from 'react';
import { concatStyleSets } from '../MergeStyles';
import { Customizer } from '@uifabric/utilities/lib/Customizer';

export interface IPropsWithStyles<TStyleProps, TStyles> {
  getStyles?: (props?: TStyleProps) => Partial<TStyles>;
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
  scopedSettings?: { [key: string]: {} }
): (props: TComponentProps) => JSX.Element {

  return (componentProps: TComponentProps) => {
    const getStyles = (
      styleProps: TStyleProps
    ) => concatStyleSets(
      getBaseStyles && getBaseStyles(styleProps),
      componentProps && componentProps.getStyles && componentProps.getStyles(styleProps)
    );

    const renderedComponent = (
      <Component
        { ...componentProps }
        getStyles={ getStyles }
      />
    );

    if (scopedSettings) {
      return (
        <Customizer scopedSettings={ scopedSettings }>
          { renderedComponent }
        </Customizer>
      );
    }

    return renderedComponent;
  };
}
