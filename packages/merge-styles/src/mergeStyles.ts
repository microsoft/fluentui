import { extractStyleParts } from './extractStyleParts';
import { IStyle, IStyleBaseArray } from './IStyle';
import { IStyleOptions } from './IStyleOptions';
import { isShadowConfig, ShadowConfig } from './shadowConfig';
import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { styleToClassName } from './styleToClassName';

export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string;
export function mergeStyles(
  shadowConfig: ShadowConfig,
  ...args: (IStyle | IStyleBaseArray | false | null | undefined)[]
): string;

/**
 * Concatenation helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string {
  return mergeCss(args, getStyleOptions());
}

/**
 * Concatenation helper, which can merge class names together. Skips over falsey values.
 * Accepts a set of options that will be used when calculating styles.
 *
 * @public
 */
export function mergeCss(
  args:
    | (IStyle | IStyleBaseArray | false | null | undefined | ShadowConfig)
    | (IStyle | IStyleBaseArray | false | null | undefined | ShadowConfig)[],
  options?: IStyleOptions,
): string {
  const styleArgs = args instanceof Array ? args : [args];
  const opts = options || {};
  const hasShadowConfig = isShadowConfig(styleArgs[0]);
  if (hasShadowConfig) {
    opts.shadowConfig = styleArgs[0] as ShadowConfig;
  }
  opts.stylesheet = Stylesheet.getInstance(opts.shadowConfig);
  const { classes, objects } = extractStyleParts(opts.stylesheet, styleArgs);

  if (objects.length) {
    classes.push(styleToClassName(opts, objects));
  }

  return classes.join(' ');
}
