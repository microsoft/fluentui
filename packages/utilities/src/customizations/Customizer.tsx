import * as React from 'react';
import { BaseComponent } from '../BaseComponent';
import { IBaseProps } from '../BaseComponent.types';
import { Customizations, ISettings, ISettingsFunction } from './Customizations';
import { CustomizerContext, ICustomizerContext } from './CustomizerContext';
import { mergeCustomizations } from './mergeCustomizations';

export type ICustomizerProps = IBaseProps &
  Partial<{
    /**
     * @description
     * Settings are used as general settings for the React tree below.
     * Components can subscribe to receive the settings by using `customizable`.
     *
     * @example
     * Settings can be represented by a plain object that contains the key value pairs.
     * ```
     *  <Customizer settings={{ color: 'red' }} />
     * ```
     * or a function that receives the current settings and returns the new ones
     * ```
     *  <Customizer settings={(currentSettings) => ({ ...currentSettings, color: 'red' })} />
     * ```
     */
    settings: ISettings | ISettingsFunction;
    /**
     * @description
     * Scoped settings are settings that are scoped to a specific scope. The
     * scope is the name that is passed to the `customizable` function when the
     * the component is customized.
     *
     * @example
     * Scoped settings can be represented by a plain object that contains the key value pairs.
     * ```
     *  const myScopedSettings = {
     *    Button: { color: 'red' };
     *  };
     *
     *  <Customizer scopedSettings={myScopedSettings} />
     * ```
     * or a function that receives the current settings and returns the new ones
     * ```
     *  const myScopedSettings = {
     *    Button: { color: 'red' };
     *  };
     *
     *  <Customizer scopedSettings={(currentScopedSettings) => ({ ...currentScopedSettings, ...myScopedSettings })} />
     * ```
     */
    scopedSettings: ISettings | ISettingsFunction;
  }> & {
    /**
     * Optional transform function for context. Any implementations should take care to return context without
     * mutating it.
     */
    contextTransform?: (context: Readonly<ICustomizerContext>) => ICustomizerContext;
  };

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
 */
export class Customizer extends BaseComponent<ICustomizerProps> {
  private _changeCount = 0;

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
