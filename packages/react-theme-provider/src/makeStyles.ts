// TODO: Move IStyle into a separate typing library
import { IStyle } from '@fluentui/merge-styles';
import { Theme } from '@fluentui/theme';
import { useTheme } from './useTheme';
import { useWindow } from '@fluentui/react-window-provider';
import { useStyleRenderer } from './styleRenderers/useStyleRenderer';
import { StyleRenderer } from './styleRenderers/types';
import { graphGet, graphSet } from './graph';

/**
 * Registers a css object, optionally as a function of the theme.
 *
 * @param styleOrFunction - Either a css javascript object, or a function which takes in `ITheme`
 * and returns a css javascript object.
 */
export function makeStyles<TStyleSet extends { [key: string]: IStyle }>(
  styleOrFunction: TStyleSet | ((theme: Theme) => TStyleSet),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graph: Map<any, any> = new Map(),
): (theme?: Theme, renderer?: StyleRenderer) => { [key in keyof TStyleSet]: string } {
  // Create graph of inputs to map to output.

  return (theme?: Theme, renderer?: StyleRenderer) => {
    const win = useWindow();
    const contextualTheme = useTheme();
    const contextualRenderer = useStyleRenderer();

    theme = theme || contextualTheme || {};
    renderer = (renderer || contextualRenderer) as StyleRenderer;

    const id = renderer.getId();
    const isStyleFunction = typeof styleOrFunction === 'function';
    const path = isStyleFunction ? [id, win, theme] : [id, win];
    let value = graphGet(graph, path);

    if (!value) {
      const styles = isStyleFunction ? (styleOrFunction as (theme: Theme) => TStyleSet)(theme!) : styleOrFunction;

      value = renderer.renderStyles(styles, { targetWindow: win, rtl: !!theme!.rtl });
      graphSet(graph, path, value);
    }

    return value;
  };
}
