import { CAN_USE_CSS_VARIABLES, DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
import { createCSSVariablesProxy, resolveDefinitions } from './runtime/index';
import { hashString } from './runtime/utils/hashString';
import {
  MakeStylesDefinition,
  MakeStylesMatchedDefinitions,
  MakeStylesOptions,
  MakeStylesResolvedDefinition,
} from './types';

class UsedVariables {
  public tokens: Record<string, boolean> = {};
  public addUsed(vars: string[]) {
    vars.forEach(v => {
      this.tokens[v] = true;
    });
  }
  public addOther(vars: string[]) {
    vars.forEach(v => {
      this.tokens[v] = this.tokens[v] ?? false;
    });
  }
}

export function makeStyles<Selectors, Tokens>(
  definitions: MakeStylesDefinition<Selectors, Tokens>[],
  unstable_cssPriority: number = 0,
) {
  const cxCache: Record<string, string> = {};

  function computeClasses(selectors: Selectors, options: MakeStylesOptions<Tokens>): string {
    // let tokens: Tokens | null;
    // let resolvedDefinitions: MakeStylesResolvedDefinition<Selectors, Tokens>[];
    //
    // This requires a build step which is currently WIP
    // if (process.env.NODE_ENV === 'production') {
    //   tokens = CAN_USE_CSS_VARIABLES ? null : options.tokens;
    //   resolvedDefinitions = CAN_USE_CSS_VARIABLES
    //     ? ((definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[])
    //     : resolveDefinitions(
    //         (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[],
    //         tokens,
    //         unstable_cssPriority,
    //       );
    // } else {
    const { debug } = options;
    // DEBUG // console.groupCollapsed(`computeClasses[${debug?.debugId}]`);

    const tokens = CAN_USE_CSS_VARIABLES ? createCSSVariablesProxy(options.tokens) : options.tokens;
    const resolvedDefinitions = resolveDefinitions(
      (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[],
      tokens,
      unstable_cssPriority,
    );
    // }

    let matchedIndexes = '';
    const matchedDefinitions: MakeStylesMatchedDefinitions[] = [];

    const usedVariables = new UsedVariables();

    for (let i = 0, l = resolvedDefinitions.length; i < l; i++) {
      const matcherFn = resolvedDefinitions[i][0];

      const referencedVars: string[] = [];
      Object.keys(resolvedDefinitions[i][2])
        .map(key => resolvedDefinitions[i][2][key][1])
        .reduce((sum, style) => {
          const regexp = RegExp('\\Wvar\\s*\\(\\s*(--[\\w-]+)', 'g');
          let match;
          while ((match = regexp.exec(style)) !== null) {
            sum.add(match[1]);
          }
          return sum;
        }, new Set())
        .forEach(cssVar => referencedVars.push(cssVar));

      if (matcherFn === null || matcherFn(selectors)) {
        // DEBUG // console.group(`%c HIT - ${debug?.debugId} matcher:`, 'color: green', matcherFn, {
        // DEBUG //   definition: resolvedDefinitions[i][2],
        // DEBUG // });
        usedVariables.addUsed(referencedVars);

        matchedDefinitions.push(resolvedDefinitions[i][2]);
        matchedIndexes += i;
      } else {
        // DEBUG // console.group(`%c MISS ${debug?.debugId} matcher:`, 'color: red', matcherFn, {
        // DEBUG //   definition: resolvedDefinitions[i][2],
        // DEBUG // });
        usedVariables.addOther(referencedVars);
      }
      // DEBUG // console.log(referencedVars);
      // DEBUG // console.groupEnd();
    }

    if (debug?.tokens) {
      debug.tokens = usedVariables.tokens;
    }
    // DEBUG // console.groupEnd();

    const cxCacheKey = options.renderer.id + matchedIndexes;
    const cxCacheElement = cxCache[cxCacheKey];

    if (CAN_USE_CSS_VARIABLES && cxCacheElement !== undefined) {
      return cxCacheElement;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resultDefinitions: MakeStylesMatchedDefinitions = Object.assign({}, ...matchedDefinitions);

    const resultClasses = options.renderer.insertDefinitions(resultDefinitions, !!options.rtl);
    const sequenceHash = SEQUENCE_PREFIX + hashString(resultClasses);

    const resultClassesWithHash = sequenceHash + ' ' + resultClasses;

    DEFINITION_LOOKUP_TABLE[sequenceHash] = resultDefinitions;
    cxCache[cxCacheKey] = resultClassesWithHash;

    return resultClassesWithHash;
  }

  return computeClasses;
}
