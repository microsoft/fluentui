import { getDocument } from '@fluentui/utilities';
import { cssColor } from './cssColor';
import { getColorFromRGBA } from './getColorFromRGBA';
import type { IColor } from './interfaces';

/**
 * Converts a CSS color string to a color object.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 *
 * `inputColor` will be used unmodified as the `str` property of the returned object.
 * Alpha defaults to 100 if not specified in `inputColor`.
 * Returns undefined if the color string is invalid/not recognized.
 */
export function getColorFromString(inputColor: string, doc?: Document): IColor | undefined {
  const theDoc = doc ?? getDocument()!;
  const color = cssColor(inputColor, theDoc);

  if (!color) {
    return;
  }

  return {
    ...getColorFromRGBA(color!),
    str: inputColor,
  };
}
