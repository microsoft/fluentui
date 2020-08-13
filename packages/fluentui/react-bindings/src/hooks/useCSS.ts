import { serializeStyles } from '@emotion/serialize';
import { ICSSInJSStyle, ThemePrepared } from '@fluentui/styles';
import cx from 'classnames';
// @ts-ignore
import _Stylis from 'stylis';
// @ts-ignore No typings :(
import focusVisiblePlugin from '@quid/stylis-plugin-focus-visible';
// @ts-ignore No typings :(
import rtlPlugin from 'stylis-plugin-rtl';

import { useFluentContext } from '../context';

//
// Types
//

// Inline keyframe definitions are not supported by useCSS() hook
export type UseCSSStyle = Omit<ICSSInJSStyle, 'animationName'> & { animationName?: string };
export type UseCSSStyleInput = string | UseCSSStyle | ((theme: ThemePrepared) => UseCSSStyle);

//
// Definitions
//

// SPECIFICITY_CLASSNAME is used to increase the specificity of produced CSS to win over other defined classes.
// "css" used for production to decrease DOM size.
const SPECIFICITY_CLASSNAME = process.env.NODE_ENV === 'production' ? 'css' : 'use-css';
const CLASSNAME_PREFIX = 'f';

// `stylis@3` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const Stylis = (_Stylis as any).default || _Stylis;
const stylisOptions = {
  cascade: true,
  compress: false,
  global: false,
  keyframe: false,
  preserve: false,
  semicolon: false,
};

// Two separate instances are requires as we can't call Stylis plugins conditionally
const stylis = new Stylis(stylisOptions);
stylis.use(focusVisiblePlugin);

const rtlStylis = new Stylis(stylisOptions);
rtlStylis.use(focusVisiblePlugin);
rtlStylis.use(rtlPlugin);

// Stores a mapping between hashed string and cssified styles object
const stylesCache: Record<string, string> = {};

//
// Hook
//

export function useCSS(...styles: UseCSSStyleInput[]) {
  const { theme, renderer, rtl } = useFluentContext();

  if (styles.length === 0) {
    return '';
  }

  // This resolution allows to map passed classnames to actual styles that can be used on next styles
  const resolvedStyles = styles.reduce<UseCSSStyleInput[]>((acc, style) => {
    if (typeof style === 'string') {
      style.split(' ').forEach(className => {
        if (stylesCache[className] !== undefined) {
          acc.push(stylesCache[className]);
        }
      });
    } else {
      acc.push(style);
    }

    return acc;
  }, []);

  // serializeStyles() will concat all passed styles and will resolve functions
  const serializedStyles = serializeStyles(resolvedStyles, stylesCache, theme);
  // ".name" is not a valid CSS classname as it can start from a digit
  //  "r" prefix is used to avoid collision between LTR and RTL styles
  const serializedClassName = `${rtl ? 'r' : ''}${CLASSNAME_PREFIX}${serializedStyles.name}`;

  stylesCache[serializedClassName] = serializedStyles.styles;

  // Selector should include specificity className to have higher specificity than other passed classes
  const selector = `.${SPECIFICITY_CLASSNAME}.${serializedClassName}`;

  // Stylis performs transform of nested selectors and ":focus-visible"
  const css = rtl ? rtlStylis(selector, serializedStyles.styles) : stylis(selector, serializedStyles.styles);

  renderer.renderGlobal(css);

  return cx(SPECIFICITY_CLASSNAME, serializedClassName);
}
