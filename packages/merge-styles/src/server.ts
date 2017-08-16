import { InjectionMode, Stylesheet } from './Stylesheet';

export function renderStatic(
  onRender: () => string
): { html: string, css: string } {
  let stylesheet = Stylesheet.getInstance();

  stylesheet.setConfig({
    injectionMode: InjectionMode.none
  });
  stylesheet.reset();

  return {
    html: onRender(),
    css: stylesheet.getRules()
  };
}