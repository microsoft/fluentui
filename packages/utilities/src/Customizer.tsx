import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, IBaseProps } from './BaseComponent';
import { ICustomizations } from './Customizations';

export interface ICustomizerContext {
  customizations: ICustomizations;
}

export type ICustomizerProps = Partial<ICustomizations> & IBaseProps;

/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator. This enables injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop, which should be a json map which contains 1 or more
 * name/value pairs representing injectable props.
 *
 * @public
 */
export class Customizer extends BaseComponent<ICustomizerProps, ICustomizerContext> {
  public static contextTypes: {
    customizations: PropTypes.Requireable<{}>;
  } = {
    customizations: PropTypes.object
  };

  public static childContextTypes: {
    customizations: PropTypes.Requireable<{}>;
  } = Customizer.contextTypes;

  // tslint:disable-next-line:no-any
  constructor(props: ICustomizerProps, context: any) {
    super(props);

    this.state = this._getCustomizations(props, context);
  }

  public getChildContext(): ICustomizerContext {
    return this.state;
  }

  // tslint:disable-next-line:no-any
  public componentWillReceiveProps(newProps: any, newContext: any): void {
    this.setState(this._getCustomizations(newProps, newContext));
  }

  public render(): React.ReactElement<{}> {
    return React.Children.only(this.props.children);
  }

  private _getCustomizations(
    props: ICustomizerProps,
    context: ICustomizerContext
  ): ICustomizerContext {
    let {
      settings = {},
      scopedSettings = {}
    } = props;
    let {
      customizations = { settings: {}, scopedSettings: {} }
    } = context;

    let newScopedSettings = { ...scopedSettings };

    for (let name in customizations.scopedSettings) {
      if (customizations.scopedSettings.hasOwnProperty(name)) {
        newScopedSettings[name] = { ...scopedSettings[name], ...customizations.scopedSettings[name] };
      }
    }

    return {
      customizations: {
        settings: {
          ...settings,
          ...customizations.settings
        },
        scopedSettings: newScopedSettings
      }
    };
  }
}
