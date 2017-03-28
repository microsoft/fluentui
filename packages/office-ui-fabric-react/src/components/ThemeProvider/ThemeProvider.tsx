import * as React from 'react';
import {
  BaseComponent,
  assign
} from '../../Utilities';

export interface IThemedComponentProps {
  theme?: ITheme;
}

export interface IThemeProviderState {
  theme?: ITheme;
}

export interface ITheme {
  isDarkTheme?: boolean;

  defaultProps?: {
    [key: string]: Object
  };
}

export class ThemeProvider extends BaseComponent<IThemedComponentProps, IThemeProviderState> {
  public static contextTypes = {
    theme: React.PropTypes.object
  };

  public static childContextTypes = ThemeProvider.contextTypes;

  constructor(props, context) {
    super(props);

    this.state = {
      theme: this._getTheme(props, context)
    };
  }

  public getChildContext(): any {
    return this.state;
  }

  public componentWillReceiveProps(newProps, newContext) {

    this.setState({
      theme: this._getTheme(newProps, newContext)
    });
  }

  public render() {
    return React.Children.only(this.props.children);
  }

  private _getTheme(props: IThemedComponentProps, context: IThemedComponentProps) {
    let { theme: propsTheme = {} as ITheme } = props;
    let { theme: contextTheme = {} as ITheme } = context;

    return {
      defaultProps: assign({}, contextTheme.defaultProps, propsTheme.defaultProps)
    };
  }
}
