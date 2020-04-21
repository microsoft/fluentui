import * as React from 'react';
import * as sassClasses from './ThemeProvider.scss';
import { compose, extractFromSass } from './compose';
import cx from 'classnames';

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

export interface Theme {
  site: {
    body?: ThemePlateSet;
    accent?: ThemePlateSet;
    neutral?: ThemePlateSet;
  };
}

export interface ThemeProviderProps extends React.AllHTMLAttributes<{}> {
  theme?: Theme;
}

export const ThemeContext = React.createContext({});

// tslint:disable-next-line:no-any
const buildInlineStyleFromObj = (obj: any, style: any, prefix?: string) => {
  for (const name in obj) {
    if (obj.hasOwnProperty(name)) {
      const varName = prefix ? `${prefix}${name === 'default' ? '' : '-' + name}` : `--${name}`;
      const varValue = obj[name];

      if (varValue && typeof varValue === 'object') {
        buildInlineStyleFromObj(varValue, style, varName);
      } else {
        style[varName] = varValue;
      }
    }
  }

  return style;
};

const getInlineStyle = (theme: Theme, userStyle?: React.CSSProperties): React.CSSProperties => {
  return buildInlineStyleFromObj(theme, { ...userStyle });
};

const classObj = extractFromSass(sassClasses);

export const ThemeProvider = compose<ThemeProviderProps>(
  ({ theme, className, style, ...rest }: React.PropsWithChildren<ThemeProviderProps>) => {
    // tslint:disable-next-line:jsx-ban-props
    return <div {...rest} className={cx(className, classObj.classes.root)} style={getInlineStyle(theme!, style)} />;
  },
  {
    ...classObj,
  },
);
