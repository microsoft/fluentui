import { InjectionMode, Stylesheet } from './Stylesheet';

/**
 * Renders a given string and returns both html and css needed for the html.
 *
 * The returned `css` is raw CSS text meant to be placed in a `<style>` element. Declaration values
 * have `<` and `>` escaped as CSS code points so they cannot terminate that element, but callers
 * remain responsible for validating untrusted data used in style values.
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
