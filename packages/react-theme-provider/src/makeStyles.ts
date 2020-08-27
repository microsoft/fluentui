// :( todo: this needs to be ... removed or abstracted.
import { Stylesheet, IStyle } from '@uifabric/merge-styles';
import { Theme } from '@fluentui/theme';
import { useWindow } from '@fluentui/react-window-provider';
import { useTheme } from './useTheme';
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

// TODO: this needs to be removed or abstracted.
// If the stylesheet reset call is made, invalidate the cache keys.
let _seed = 0;
Stylesheet.getInstance().onReset(() => _seed++);

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

    // Expected: theme is either always provided or never.
    theme = theme || useTheme();
    renderer = renderer || useStyleRenderer();

    const path = theme ? [_seed, win, theme] : [_seed, win];
    let value = graphGet(graph, path);

    if (!value) {
      const styles = typeof styleOrFunction !== 'function' ? styleOrFunction : styleOrFunction(theme);

      value = renderer.renderStyles(styles, { targetWindow: win!, rtl: !!theme.rtl });
      // value = mergeStyleSets(styles);
      graphSet(graph, path, value);
    }

    return value;
  };
}
