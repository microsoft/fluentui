import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from './constants';
// import { createCSSVariablesProxy, resolveDefinitions } from './runtime/index';
import { hashString } from './runtime/utils/hashString';
import {
  MakeStylesDefinition,
  MakeStylesMatchedDefinitions,
  MakeStylesOptions,
  MakeStylesResolvedDefinition,
} from './types';

export function makeStyles<Selectors, Tokens>(
  definitions: MakeStylesDefinition<Selectors, Tokens>[],
  unstable_cssPriority: number = 0,
) {
  const cxCache: Record<string, string> = {};

  function computeClasses(selectors: Selectors, options: MakeStylesOptions<Tokens>): string {
    // let tokens: Tokens | null;
    // let resolvedDefinitions: MakeStylesResolvedDefinition<Selectors, Tokens>[];
    //
    // // TODO: describe me
    // if (process.env.NODE_ENV === 'production') {
    //   tokens = null;
    //   resolvedDefinitions = (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[];
    // } else {
    //   tokens = createCSSVariablesProxy(options.tokens);
    //   resolvedDefinitions = resolveDefinitions(
    //     (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[],
    //     tokens,
    //     unstable_cssPriority,
    //   );
    // }

    const resolvedDefinitions = (definitions as unknown) as MakeStylesResolvedDefinition<Selectors, Tokens>[];

    let matchedIndexes = '';
    const matchedDefinitions: MakeStylesMatchedDefinitions[] = [];

    for (let i = 0, l = resolvedDefinitions.length; i < l; i++) {
      const matcherFn = resolvedDefinitions[i][0];

      if (matcherFn === null || matcherFn(selectors)) {
        matchedDefinitions.push(resolvedDefinitions[i][2]);
        matchedIndexes += i;
      }
    }

    const cxCacheKey = options.renderer.id + matchedIndexes;
    const cxCacheElement = cxCache[cxCacheKey];

    if (cxCacheElement !== undefined) {
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
