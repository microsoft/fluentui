import { IRenderer, TRule, TRuleProps, IStyle } from 'fela';

type Renderer = IRenderer & {
  _renderStyle: (style: IStyle, props: any) => string;
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
 * TODO: We should seperate fela plugins into two categories:
 *
 * 1. Contextual (relies on theme RTL, disableAnimations, etc.)
 * 2. Normal (no reliance on environment).
 *
 * With this approach, we can always run contextual plugins before
 * checking the cache. This would reduce coupling between the cache
 * and other fela plugins, since it would then just have to check
 * simple key: value pairs.
 *
 * Fela would need to be updated ("enhanced") in some way to support
 * this plugin split.
 *
 * After V2:
 * Rule -> Style -> Contextual Plugins -> Iterate Properties -> Return Classes
 *                                            |
 *                                      Property Cached?
 *                                               Yes -> Return Classes
 *                                               No  -> Process -> Classes -> Cache -> Return Classes
 *
 * Further, if we can make the context stable (i.e., not include `displayName`
 * for each component) then we can _also_ cache by context. e.g.:
 *
 * const cache = new WeakMap<Context, Cache>
 *
 * TODO: can we share anything with fela's internal cache?
 * TODO: possible to share ltr/rtl caches?
 * TODO: hook into .clear() to clear our cache as well?
 * TODO: cache expiry? Retain MRU? Ignore (like fela)?
 */
interface Cache {
  [key: string]: string;
}

const felaRuleCacheEnhancer = (renderer: Renderer): IRenderer => {
  let _cache = {
    ltr: {} as Cache,
    rtl: {} as Cache,
  };

  /**
   * Gets the className for an individual `property: value` pair in a style
   * object.  Returns the cached className if it's already been calculated;
   * otherwise, calculates the className as usual and then stores it in cache.
   */
  function getClassNameForProperty<T>(property: string, value: any, props: T, cache: Cache) {
    // TODO: would be nice to not have to upcast prop, value into an object
    // just to re-enter fela lifecycle.
    const style = { [property]: value };

    // Skip animations since these may change based on `disableAnimations`
    // TODO: could theoretically cache these seperately.
    // TODO: could also just skip this if disableAnimations is true.
    if (property.indexOf('animation') !== -1) {
      return renderer._renderStyle(style, props);
    }

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

    // Find the cache for this configuration of props.
    let cache: Cache;
    if (props && props.theme && props.theme.direction === 'rtl') {
      cache = _cache.rtl;
    } else {
      cache = _cache.ltr;
    }

    // TODO: evaluate perf of array vs. string concatenation.
    const classNames: string[] = [];
    for (const property in style) {
      const className = getClassNameForProperty(property, style[property], props, cache);
      if (className) {
        classNames.push(className);
      }
    }
    return classNames.join(' ');
  }

  renderer.renderRule = renderRule;
  return renderer;
};

export default felaRuleCacheEnhancer;
