import { InjectionMode, Stylesheet } from './Stylesheet';

export function renderStatic(onRender: () => string, defaultPrefix?: string): { html: string; css: string } {
  const stylesheet = Stylesheet.getInstance();

  stylesheet.setConfig({
    injectionMode: InjectionMode.none,
    defaultPrefix
  });
  stylesheet.reset();

  return {
    html: onRender(),
    css: stylesheet.getRules(true)
  };
}
