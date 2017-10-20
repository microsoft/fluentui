import { IIconProps, IconType } from './Icon.Props';
import { IRenderFunction } from '../../Utilities';

let _iconRendererFns: IRenderFunction<IIconProps>[] = [];

/**
 * Registers a function that will be called whenever an Icon gets rendered
 * The function can return a JSX.Element for the icon depending on iconProps, which could be an SVG, a dyamically-generated icon, etc.
 * The function should return null for icons that are not specifically handled; in such cases, the Icon will fallback to default rendering
 * @param renderFunction The callback function that will be invoked whenever an Icon gets rendered
 * @returns an unsubscribe function that can be used to detach the callback from Icon rendering
 */
export function registerIconRenderer(renderFunction: IRenderFunction<IIconProps>): () => void {
  _iconRendererFns.push(renderFunction);

  // return an unsubscribe fn
  return () => {
    const index = _iconRendererFns.indexOf(renderFunction);
    if (index > -1) {
      _iconRendererFns.splice(index, 1);
    }
  };
}

/**
 * Iterates through the custom IconRenderFunctions and returns the first JSX.Element returned by a callback or null if a callback isn't registered/if none of the callbacks returns an Icon
 * Note that this function is internal and only intended to be called by the Icon component
 */
export function getIconFromRendererFunctions(props: IIconProps): JSX.Element | undefined {
  let iconFromRenderers: JSX.Element | undefined;
  for (let renderer of _iconRendererFns) {
    let icon = renderer(props);
    if (icon) {
      iconFromRenderers = icon;
      break;
    }
  }
  return iconFromRenderers;
}