import { IRenderer, TRule, TRuleProps, IStyle } from 'fela';

type Renderer = IRenderer & {
  _renderStyle: (style: IStyle, props: any) => void;
};

/**
 * Updates fela's `renderRule` method to compute classNames on a more granular
 * level: by property rather than by style object.
 *
 * Rather than generating a full className for an entire style object at once,
 * it now walks the style object and generates classes for each individual
 * property.  This allows us to avoid reprocessing styles that should already
 * be cached.
 *
 * NOTE: this approach does not work for monolithic classNames, since that
 * treats an entire style object as a single entity. So, do not use this if
 * you are using that mode.
 *
 * Before:
 * Rule -> Style -> Process -> Classes -> Cache -> Return Classes
 *
 * After:
 * Rule -> Style -> Iterate Properties -> Return Classes
 *                         |
 *                   Property Cached?
 *                            Yes -> Return Classes
 *                            No  -> Process -> Classes -> Cache -> Return Classes
 *
 * TODO: can we share anything with fela's internal cache?
 * TODO: hook into .clear() to clear our cache as well?
 * TODO: cache expiry? Retain MRU? Ignore (like fela)?
 */
const felaRuleCacheEnhancer = (renderer: Renderer): IRenderer => {
  let cache = {};

  /**
   * Gets the className for an individual `property: value` pair in a style
   * object.  Returns the cached className if it's already been calculated;
   * otherwise, calculates the className as usual and then stores it in cache.
   */
  function getClassNameForProperty<T>(property: string, value: any, props: T) {
    // TODO: would be nice to not have to upcast prop, value into an object
    // just to re-enter fela lifecycle.
    const style = { [property]: value };

    // Skipping complex styles (e.g. pseudo selectors) for now. Implementing this
    // would theoretically provide further improvements if the cache can be
    // implemented simply.
    // TODO: can a value be a function? If so, need to guard for that as well.
    if (typeof value === 'object') {
      return renderer._renderStyle(style, props);
    }

    const cacheKey = `${property}:${value}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const className = renderer._renderStyle(style, props);
    cache[cacheKey] = className;
    return className;
  }

  /**
   * Generates a full className string for a style rule.
   *
   * NOTE: props typed as `any` because:
   * 1. These types _really_ don't matter, since they aren't exposed in the public API.
   * 2. Typing props as (props: T = {}) gives a TS error, even though that's the
   *    exact type used by fela's type definitions.
   */
  function renderRule<T = TRuleProps>(rule: TRule<T>, props: any = {}): string {
    const style = rule(props, renderer);
    const classNames: string[] = [];
    for (const property in style) {
      const className = getClassNameForProperty(property, style[property], props);
      classNames.push(className);
    }
    return classNames.join(' ');
  }

  renderer.renderRule = renderRule;
  return renderer;
};

export default felaRuleCacheEnhancer;
