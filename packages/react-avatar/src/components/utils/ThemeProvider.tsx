import * as React from 'react';
import * as sassClasses from './ThemeProvider.scss';
import { compose, extractFromSass } from './compose';
import cx from 'classnames';
import { useStylesheet } from './StylesheetProvider';

export type ThemeColorSet =
  | Partial<{
      default: string;
      hover: string;
      active: string;
      disabled: string;
    }>
  | string;

export type ThemePlateSet = Partial<{
  fill: ThemeColorSet;
  text: ThemeColorSet;
  subText: ThemeColorSet;
  link: ThemeColorSet;
  divider: ThemeColorSet;
}>;

export type TokenSetType = string | { [key: string]: TokenSetType | undefined };

export interface Theme {
  tokens: {
    site: {
      body?: ThemePlateSet;
      accent?: ThemePlateSet;
      neutral?: ThemePlateSet;
    };
    [key: string]: TokenSetType;
  };
  stylesheets?: string[];
}

export interface ThemeProviderProps extends React.AllHTMLAttributes<{}> {
  theme?: Theme;
}

export const ThemeContext = React.createContext({});

// tslint:disable-next-line:no-any
const buildInlineStyleFromTokens = (tokens: { [key: string]: TokenSetType }, style: any, prefix?: string) => {
  for (const name in tokens) {
    if (tokens.hasOwnProperty(name)) {
      const varName = prefix ? `${prefix}${name === 'default' ? '' : '-' + name}` : `--${name}`;
      const varValue = tokens[name];

      if (varValue && typeof varValue === 'object') {
        // tslint:disable-next-line:no-any
        buildInlineStyleFromTokens(varValue as any, style, varName);
      } else {
        style[varName] = varValue;
      }
    }
  }

  return style;
};

const getInlineStyle = (theme: Theme, userStyle?: React.CSSProperties): React.CSSProperties => {
  return buildInlineStyleFromTokens(theme.tokens, { ...userStyle });
};

const classObj = extractFromSass(sassClasses);

export const ThemeProvider = compose<ThemeProviderProps>(
  ({ theme, className, style, ...rest }: React.PropsWithChildren<ThemeProviderProps>) => {
    const { register } = useStylesheet();
    const inlineStyle = React.useMemo<React.CSSProperties>(() => getInlineStyle(theme!, style), [theme, style]);

    if (theme?.stylesheets) {
      register(theme.stylesheets);
    }

    // tslint:disable-next-line:jsx-ban-props
    return <div {...rest} className={cx(className, classObj.classes.root)} style={inlineStyle} />;
  },
  {
    ...classObj,
  },
);
