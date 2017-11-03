import * as React from 'react';
import { concatStyleSets } from 'office-ui-fabric-react/lib/Styling';

export interface IPropsWithStyles<TStyleProps, TStyles> {
  getStyles?: (props?: TStyleProps) => Partial<TStyles>;
}

export function styled<TComponentProps extends IPropsWithStyles<TStyleProps, TStyles>, TStyleProps, TStyles>(
  Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>,
  styleMethods: {[key in keyof TComponentProps]?: TComponentProps[key]}
): (props: TComponentProps) => JSX.Element {

  return (componentProps: TComponentProps) => {
    const allStyleMethods: Partial<TComponentProps> = {};

    for (const methodName in styleMethods) {
      if (styleMethods.hasOwnProperty(methodName)) {
        const method = styleMethods[methodName];

        allStyleMethods[methodName] = (styleProps: any) => concatStyleSets(
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
