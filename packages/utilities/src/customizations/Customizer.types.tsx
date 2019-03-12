import { IBaseProps } from '../BaseComponent.types';
import { ISettings, ISettingsFunction } from './Customizations';
import { ICustomizerContext } from './CustomizerContext';

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
