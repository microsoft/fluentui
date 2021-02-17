import { CAN_USE_CSS_VARIABLES } from '../constants';
import { MakeStyles, MakeStylesResolvedDefinition, MakeStylesStyleFunctionRule } from '../types';
import { resolveStyleRules } from './resolveStyleRules';

//
// IE11 specific
//

// Create graph of inputs to map to output.
const graph = new Map();

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

export function resolveDefinitions<Selectors, Tokens>(
  definitions: MakeStylesResolvedDefinition<Selectors, Tokens>[],
  tokens: Tokens | null,
  unstable_cssPriority: number,
): MakeStylesResolvedDefinition<Selectors, Tokens>[] {
  return definitions.map((definition, i) => {
    const matcher = definition[0];
    const styleRule = definition[1];
    const resolvedRule = definition[2];

    if (CAN_USE_CSS_VARIABLES) {
      // we can always use prebuilt styles in this case and static cache in runtime

      if (resolvedRule) {
        // DEBUG // console.log(`resolveDefinitions[${i}] - already resolved`);
        return [matcher, undefined, resolvedRule];
      }

      // DEBUG // console.log(`resolveDefinitions[${i}] - resolving`);
      // if static cache is not present, eval it and mutate original object
      const styles: MakeStyles =
        typeof styleRule === 'function' ? (styleRule as MakeStylesStyleFunctionRule<Tokens>)(tokens!!) : styleRule!!;

      definitions[i][2] = resolveStyleRules(styles, unstable_cssPriority);

      return [matcher, undefined, definition[2]];
    }

    // if CSS variables are not supported we have to re-eval only functions, otherwise static cache can be reused
    if (typeof styleRule === 'function') {
      // An additional level of cache based on tokens to avoid style computation for IE11

      const path = [tokens, styleRule];
      const resolvedStyles = graphGet(graph, path);

      if (resolvedStyles) {
        return [matcher, undefined, resolvedStyles];
      }

      const resolveStyles1 = resolveStyleRules(
        (styleRule as MakeStylesStyleFunctionRule<Tokens>)(tokens!!),
        unstable_cssPriority,
      );
      graphSet(graph, path, resolveStyles1);

      return [matcher, undefined, resolveStyles1];
    }

    if (resolvedRule) {
      return [matcher, undefined, resolvedRule];
    }

    definitions[i][2] = resolveStyleRules(styleRule!!, unstable_cssPriority);

    return [matcher, undefined, definition[2]];
  });
}
