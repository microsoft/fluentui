//Copied from @microsoft/fast-foundation

import { CaptureType, HTMLDirective, InlineTemplateDirective } from '@microsoft/fast-element';
import type { SyntheticViewTemplate } from '@microsoft/fast-element';

/**
 * A value that can be statically composed into a
 * foundation template.
 * @remarks
 * When providing a string, take care to ensure that it is
 * safe and will not enable an XSS attack.
 * @public
 */
export type StaticallyComposableHTML<TSource = any, TParent = any> =
  | string
  | HTMLDirective
  | SyntheticViewTemplate<TSource, TParent>
  | undefined;

/**
 * A function to compose template options.
 * @public
 */
export function staticallyCompose<TSource = any, TParent = any>(
  item: StaticallyComposableHTML<TSource, TParent>,
): CaptureType<TSource, TParent> {
  if (!item) {
    return InlineTemplateDirective.empty;
  }

  if (typeof item === 'string') {
    return new InlineTemplateDirective(item);
  }

  if ('inline' in item) {
    return item.inline();
  }

  return item;
}
