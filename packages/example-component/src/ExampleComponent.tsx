/**
* ExampleComponent.tsx
* Author:
* Copyright: Microsoft 2016
*
* Type definitions to support the plugin.
*/

import * as React from 'react';
import {
  BaseComponent,
  IRenderFunction,
  getNativeProps,
  buttonProperties,
  anchorProperties
} from '@uifabric/utilities';
// import { IExampleComponentProps, IExampleComponentTheme, IStyleObject } from './ExampleComponent.Props';
import { fonts } from './styles/fonts';
import { colors } from './styles/colors';
import { css, parent, after } from 'glamor';

export interface IStyleObject {
  [key: string]: any;
};

export interface IExampleComponentTheme {
  width?: string;
  height?: string;
  background?: string;
  font?: IStyleObject;
}

export interface IExampleComponentStyles {
  root?: IStyleObject;

  button?: IStyleObject;
  buttonHover?: IStyleObject;
  buttonActive?: IStyleObject;
  buttonFocus?: IStyleObject;
  buttonDisabled?: IStyleObject;
  buttonExpanded?: IStyleObject;

  flexContainer?: IStyleObject;
  icon?: IStyleObject;
  text?: IStyleObject;
  chevron?: IStyleObject;
};

export interface IExampleComponentProps extends React.HTMLProps<HTMLDivElement | ExampleComponent> {
  theme?: IExampleComponentTheme,
  styles?: IExampleComponentStyles,
  iconName?: string;
  text?: string;
  // menuProps?: IMenuProps;

  onRenderRoot?: IRenderFunction<IExampleComponentProps>;
  onRenderIcon?: IRenderFunction<IExampleComponentProps>;
  onRenderText?: IRenderFunction<IExampleComponentProps>;
  onRenderDescription?: IRenderFunction<IExampleComponentProps>;
  onRenderChevron?: IRenderFunction<IExampleComponentProps>;
  onRenderMenu?: IRenderFunction<IExampleComponentProps>;
}

export interface ITheme {
  colors?: {
    themePrimary?: string;
  };

  isLightThemed?: boolean;

  componentStyles?: {
    [key: string]: Object;
  };
}

export interface IThemeZoneProps {
  theme?: ITheme;
}

export class ThemeZone extends BaseComponent<IThemeZoneProps, {}> {
  public static contextTypes = {
    theme: React.PropTypes.object
  };

  public static childContextTypes = {
    theme: React.PropTypes.object
  };

  private _theme: ITheme | undefined;

  constructor(props: IThemeZoneProps, context: any) {
    super(props);

    this._theme = props.theme;
  }

  public getChildContext() {
    return {
      theme: this._theme
    };
  }

  public componentWillReceiveProps(props: IThemeZoneProps, context: any) { }

  public render() {
    return React.Children.only(this.props.children);
  }
}

export function withTheme<T>(componentName: string, themeDefinition?: T) {
  return function (ComponentClass: any): any {

    return class ThemedComponent extends BaseComponent<any, any> {
      public static contextTypes = {
        theme: React.PropTypes.object
      };
      public static childContextTypes = {
        theme: React.PropTypes.object
      };
      private _theme;

      constructor(props, context) {
        super(props);

        this._theme = themeDefinition;
      }


      public render() {
        return <ComponentClass { ...this.props } theme={ this._theme } />
      }
    };
  }
}
//let styles = require<any>('./ExampleComponent.scss');

/**
 * ExampleComponent implementation for web.
 *
 * @export
 * @class ExampleComponent
 * @extends {BaseComponent<IExampleComponentProps, {}>}
 */
@withTheme<IExampleComponentTheme>('exampleComponent', {
  width: 'auto',
  height: '32px',
  background: colors.themePrimary,
  font: fonts.medium
})
export class ExampleComponent extends BaseComponent<IExampleComponentProps, {}> {

  public render() {
    let {
      theme,
      styles,
      onRenderRoot = this._onRenderRoot
    } = this.props;

    return onRenderRoot(this.props, this._onRenderRoot);
  }

  private _onRenderRoot = (props: IExampleComponentProps): JSX.Element => {
    let { href, styles = {} } = this.props;

    if (!!href) {
      let anchorProps = getNativeProps(this.props, anchorProperties);

      return (
        <a
          { ...anchorProps }
          className={ css(styles.button).toString() }
          { ...{ children: this._onRenderChildren() } }
        />
      );
    } else {
      let buttonProps = getNativeProps(this.props, anchorProperties);

      return (
        <button
          { ...buttonProps }
          className={ css(styles.button).toString() }
          { ...{ children: this._onRenderChildren() } }
        />
      );
    }
  };

  private _onRenderChildren() {
    let {
      children,
      styles = {},
      onRenderIcon = this._onRenderIcon,
      onRenderText = this._onRenderText,
      onRenderChevron = this._onRenderChevron
    } = this.props;

    return (
      <div className={ css(styles.flexContainer).toString() }>
        { onRenderIcon(this.props, this._onRenderIcon) }
        { onRenderText(this.props, this._onRenderText) }
        { onRenderChevron(this.props, this._onRenderChevron) }
        { children }
      </div>
    );
  }

  private _onRenderIcon = (props: IExampleComponentProps): JSX.Element => {
    let { styles = {} } = this.props;

    return <i className={ 'ms-Icon ms-Icon--Mail ' + css(styles.icon).toString() } />;
  }

  private _onRenderText = (props: IExampleComponentProps): JSX.Element => {
    let { styles = {} } = this.props;

    return <div className={ css(styles.text).toString() }>{ props.text }</div>;
  }

  private _onRenderChevron = (props: IExampleComponentProps): JSX.Element => {
    let { styles = {} } = this.props;

    return <i className={ 'ms-Icon ms-Icon--ChevronDown ' + css(styles.chevron).toString() } />;
  }
}

@withTheme<IExampleComponentTheme>('primaryButton', {
  width: 'auto',
  height: '32px',
  background: colors.themePrimary,
  font: fonts.medium
})
export class PrimaryButton extends BaseComponent<IExampleComponentProps, {}> {
  public render() {
    return <ExampleComponent { ...this.props } styles={ this._getStyles() } />;
  }

  private _getStyles(): IExampleComponentStyles {
    let { theme } = this.props;

    if (theme) {
      return ({
        root: {
          background: theme.background
        },
        button: {
          ...theme.font,
          background: colors.themePrimary,
          color: colors.white,
          padding: '0 16px',
          border: 'none',
          height: theme.height,
          outline: 'none',

          ":hover": {
            background: colors.themeSecondary
          },

          ...createFocusBorder()
        },

        flexContainer: {
          display: 'flex'
        },
        icon: innerContentStyles,
        text: {
          ...innerContentStyles,
          lineHeight: '100%'
        }
      });
    }

    return {};
  }
}


const innerContentStyles = {
  padding: '0 4px'
};

const styles = (theme) => ({
  root: {
    background: theme.background,
  },
  button: {
    ...theme.font,
    background: theme.background,
    color: colors.white,
    padding: '0 50px',
    border: 'none',
    height: theme.height
  },
  flexContainer: {
    display: 'flex'
  },
  icon: innerContentStyles,
  text: innerContentStyles
});

function createFocusBorder(
  color: string = 'black',
  insetSize: string = '0px',
  parentPosition: string = 'relative'): Object {

  return {
    position: parentPosition,

    ":focus": {
      ...(parent('.ms-Fabric.is-focusVisible', {
        ...(after({
          content: '""',
          position: 'absolute',
          left: insetSize,
          top: insetSize,
          right: insetSize,
          bottom: insetSize,
          border: '1px solid ' + color
        }))
      }))
    }
  };
}

