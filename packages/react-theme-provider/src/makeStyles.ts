// TODO: Move IStyle into a separate typing library
import { IStyle } from '@uifabric/merge-styles';

import { Theme } from '@fluentui/theme';
import { useCustomizationSettings } from '@uifabric/utilities';
import { useWindow } from '@fluentui/react-window-provider';
import { useStyleRenderer } from './styleRenderers/useStyleRenderer';
import { StyleRenderer } from './styleRenderers/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphGet = (graphNode: Map<any, any>, path: any[]): any | undefined => {
  for (const key of path) {
    graphNode = graphNode.get(key);

    if (!graphNode) {
      return;
    }
  }

  return graphNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphSet = (graphNode: Map<any, any>, path: any[], value: any) => {
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    let current = graphNode.get(key);

    if (!current) {
      current = new Map();

      graphNode.set(key, current);
    }

    graphNode = current;
  }

  graphNode.set(path[path.length - 1], value);
};

/**
 * Registers a css object, optionally as a function of the theme.
 *
 * @param styleOrFunction - Either a css javascript object, or a function which takes in `ITheme`
 * and returns a css javascript object.
 */
export function makeStyles<TStyleSet extends { [key: string]: IStyle }>(
  styleOrFunction: TStyleSet | ((theme: Theme) => TStyleSet),
): (theme?: Theme, renderer?: StyleRenderer) => { [key in keyof TStyleSet]: string } {
  // Create graph of inputs to map to output.
  const graph = new Map();

  return (theme?: Theme, renderer?: StyleRenderer) => {
    const win = useWindow();

    // Expected: theme and renderer are either always provided or never.
    theme = useCustomizationSettings(['theme']).theme as Theme;
    renderer = (renderer || useStyleRenderer()) as StyleRenderer;

    const id = renderer.getId();
    const isStyleFunction = typeof styleOrFunction === 'function';
    const path = isStyleFunction ? [id, win, theme] : [id, win];
    let value = graphGet(graph, path);

    if (!value) {
      const styles = isStyleFunction ? (styleOrFunction as (theme: Theme) => TStyleSet)(theme) : styleOrFunction;

      value = renderer.renderStyles(styles, { targetWindow: win, rtl: !!theme.rtl });
      graphSet(graph, path, value);
    }

    return value;
  };
}
