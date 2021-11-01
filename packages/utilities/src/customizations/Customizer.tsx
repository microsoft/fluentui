import * as React from 'react';
import { Customizations } from './Customizations';
import { CustomizerContext } from './CustomizerContext';
import { mergeCustomizations } from './mergeCustomizations';
import type { ICustomizerContext } from './CustomizerContext';
import type { ICustomizerProps } from './Customizer.types';

/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator, or use the styled HOC. This enables
 * injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop which should be one of the following:
 * - A json map which contains 1 or more name/value pairs representing injectable props.
 * - A function that receives the current settings and returns the new ones that apply to the scope
 *
 * @public
 *
 * @deprecated This component is deprecated for purpose of applying theme to components
 * as of `@fluentui/react` version 8. Use `ThemeProvider` for applying theme instead.
 */
export class Customizer extends React.Component<ICustomizerProps> {
  public componentDidMount(): void {
    Customizations.observe(this._onCustomizationChange);
  }

  public componentWillUnmount(): void {
    Customizations.unobserve(this._onCustomizationChange);
  }

  public render(): React.ReactElement<{}> {
    const { contextTransform } = this.props;
    return (
      <CustomizerContext.Consumer>
        {(parentContext: ICustomizerContext) => {
          let newContext = mergeCustomizations(this.props, parentContext);

          if (contextTransform) {
            newContext = contextTransform(newContext);
          }

          return <CustomizerContext.Provider value={newContext}>{this.props.children}</CustomizerContext.Provider>;
        }}
      </CustomizerContext.Consumer>
    );
  }

  private _onCustomizationChange = () => this.forceUpdate();
}
