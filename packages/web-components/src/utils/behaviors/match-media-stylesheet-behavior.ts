import type { ElementStyles, HostBehavior, HostController } from '@microsoft/fast-element';

/**
 * An event listener fired by a {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList | MediaQueryList }.
 * @public
 */
export type MediaQueryListListener = (this: MediaQueryList, ev?: MediaQueryListEvent) => void;

/**
 * An abstract behavior to react to media queries. Implementations should implement
 * the `constructListener` method to perform some action based on media query changes.
 *
 * @public
 */
export abstract class MatchMediaBehavior implements HostBehavior {
  /**
   * The behavior needs to operate on element instances but elements might share a behavior instance.
   * To ensure proper attachment / detachment per instance, we construct a listener for
   * each bind invocation and cache the listeners by element reference.
   */
  private listenerCache = new WeakMap<HostController, MediaQueryListListener>();

  /**
   * The media query that the behavior operates on.
   */
  public readonly query: MediaQueryList;

  /**
   *
   * @param query - The media query to operate from.
   */
  constructor(query: MediaQueryList) {
    this.query = query;
  }

  /**
   * Constructs a function that will be invoked with the MediaQueryList context
   * @param controller - The host controller orchestrating this behavior.
   */
  protected abstract constructListener(controller: HostController): MediaQueryListListener;

  /**
   * Binds the behavior to the element.
   * @param controller - The host controller orchestrating this behavior.
   */
  connectedCallback(controller: HostController) {
    const { query } = this;
    let listener = this.listenerCache.get(controller);

    if (!listener) {
      listener = this.constructListener(controller);
      this.listenerCache.set(controller, listener);
    }

    // Invoke immediately to add if the query currently matches
    listener.bind(query)();
    query.addEventListener('change', listener);
  }

  /**
   * Unbinds the behavior from the element.
   * @param controller - The host controller orchestrating this behavior.
   */
  disconnectedCallback(controller: HostController) {
    const listener = this.listenerCache.get(controller);
    if (listener) {
      this.query.removeEventListener('change', listener);
    }
  }
}

/**
 * A behavior to add or remove a stylesheet from an element based on a media query. The behavior ensures that
 * styles are applied while the a query matches the environment and that styles are not applied if the query does
 * not match the environment.
 *
 * @public
 */
export class MatchMediaStyleSheetBehavior extends MatchMediaBehavior {
  /**
   * The media query that the behavior operates on.
   */
  public readonly query!: MediaQueryList;

  /**
   * The styles object to be managed by the behavior.
   */
  public readonly styles: ElementStyles;

  /**
   * Constructs a {@link MatchMediaStyleSheetBehavior} instance.
   * @param query - The media query to operate from.
   * @param styles - The styles to coordinate with the query.
   */
  constructor(query: MediaQueryList, styles: ElementStyles) {
    super(query);
    this.styles = styles;
  }

  /**
   * Defines a function to construct {@link MatchMediaStyleSheetBehavior | MatchMediaStyleSheetBehaviors} for
   * a provided query.
   * @param query - The media query to operate from.
   *
   * @public
   * @example
   *
   * ```ts
   * import { css } from "@microsoft/fast-element";
   * import { MatchMediaStyleSheetBehavior } from "@fluentui/web-components";
   *
   * const landscapeBehavior = MatchMediaStyleSheetBehavior.with(
   *   window.matchMedia("(orientation: landscape)")
   * );
   *
   * const styles = css`
   *   :host {
   *     width: 200px;
   *     height: 400px;
   *   }
   * `
   * .withBehaviors(landscapeBehavior(css`
   *   :host {
   *     width: 400px;
   *     height: 200px;
   *   }
   * `))
   * ```
   */
  public static with(query: MediaQueryList) {
    return (styles: ElementStyles) => {
      return new MatchMediaStyleSheetBehavior(query, styles);
    };
  }

  /**
   * Constructs a match-media listener for a provided element.
   * @param source - the element for which to attach or detach styles.
   */
  protected constructListener(controller: HostController): MediaQueryListListener {
    let attached = false;
    const styles = this.styles;

    return function listener(this: { matches: boolean }) {
      const { matches } = this;

      if (matches && !attached) {
        controller.addStyles(styles);
        attached = matches;
      } else if (!matches && attached) {
        controller.removeStyles(styles);
        attached = matches;
      }
    };
  }

  /**
   * Unbinds the behavior from the element.
   * @param controller - The host controller orchestrating this behavior.
   * @internal
   */
  public removedCallback(controller: HostController<any>): void {
    controller.removeStyles(this.styles);
  }
}

/**
 * This can be used to construct a behavior to apply a forced-colors only stylesheet.
 * @public
 */
export const forcedColorsStylesheetBehavior = MatchMediaStyleSheetBehavior.with(window.matchMedia('(forced-colors)'));

/**
 * This can be used to construct a behavior to apply a prefers color scheme: dark only stylesheet.
 * @public
 */
export const darkModeStylesheetBehavior = MatchMediaStyleSheetBehavior.with(
  window.matchMedia('(prefers-color-scheme: dark)'),
);

/**
 * This can be used to construct a behavior to apply a prefers color scheme: light only stylesheet.
 * @public
 */
export const lightModeStylesheetBehavior = MatchMediaStyleSheetBehavior.with(
  window.matchMedia('(prefers-color-scheme: light)'),
);
