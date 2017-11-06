import * as React from 'react';
import { concatStyleSets } from '../MergeStyles';

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
  styleMethods: {[key in keyof TComponentProps]?: (props: TStyleProps) => TStyles } | ((props: TStyleProps) => TStyles)
): (props: TComponentProps) => JSX.Element {

  return (componentProps: TComponentProps) => {
    const allStyleMethods: Partial<TComponentProps> = {};

    if (typeof styleMethods === 'function') {
      styleMethods = { getStyles: styleMethods } as {[key in keyof TComponentProps]?: (props: TStyleProps) => TStyles };
    }

    for (const methodName in styleMethods) {
      if (styleMethods.hasOwnProperty(methodName)) {
        const method = styleMethods[methodName];

        allStyleMethods[methodName] = (styleProps: TStyleProps) => concatStyleSets(
          method && method(styleProps),
          componentProps[methodName] && componentProps[methodName](styleProps)
        );
      }
    }

    return (
      <Component { ...componentProps } { ...allStyleMethods } />
    );
  };
}
