import { InjectionMode, Stylesheet } from './Stylesheet';

/**
 * Renders a given string and returns both html and css needed for the html.
 *
 * The returned `css` is raw CSS text meant to be placed in a `<style>` element. Sequences that
 * could terminate that element are escaped as CSS code points, but callers remain responsible for
 * validating untrusted style data.
 *
 * @param onRender - Function that returns a string.
 * @param namespace - Optional namespace to prepend to css classnames to avoid collisions.
 */
export function renderStatic(onRender: () => string, namespace?: string): { html: string; css: string } {
  const stylesheet = Stylesheet.getInstance();

  stylesheet.setConfig({
    injectionMode: InjectionMode.none,
    namespace,
  });
  stylesheet.reset();

  return {
    html: onRender(),
    css: stylesheet.getRules(true),
  };
}
