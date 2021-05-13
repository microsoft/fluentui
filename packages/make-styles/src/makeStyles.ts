import { createCSSVariablesProxy } from './runtime/createCSSVariablesProxy';
import { resolveClassesBySlots } from './runtime/resolveClassesBySlots';
import { resolveStyleRules } from './runtime/resolveStyleRules';
import {
  ResolvedClasses,
  ResolvedCSSRules,
  MakeStylesOptions,
  MakeStylesStyleFunctionRule,
  MakeStylesStyleRule,
  StyleBucketName,
} from './types';

export type StylesBySlots<Slots extends string, Tokens> = Record<Slots, MakeStylesStyleRule<Tokens>>;

export function resolveStyles<Slots extends string, Tokens>(
  stylesBySlots: StylesBySlots<Slots, Tokens>,
  unstable_cssPriority: number,
): [ResolvedClasses<Slots>, ResolvedCSSRules] {
  const tokensProxy = createCSSVariablesProxy() as Tokens;

  const resolvedClassesBySlots = {} as ResolvedClasses<Slots>;
  const resolvedCSSRules: ResolvedCSSRules = {};

  // eslint-disable-next-line guard-for-in
  for (const slotName in stylesBySlots) {
    const slotStyles =
      typeof stylesBySlots[slotName] === 'function'
        ? (stylesBySlots[slotName] as MakeStylesStyleFunctionRule<Tokens>)(tokensProxy)
        : stylesBySlots[slotName];

    const [resolvedStyleRulesForSlot, resolvedCSSRulesForSlot] = resolveStyleRules(slotStyles, unstable_cssPriority);

    resolvedClassesBySlots[slotName] = resolvedStyleRulesForSlot;
    (Object.keys(resolvedCSSRulesForSlot) as StyleBucketName[]).forEach(styleBucketName => {
      resolvedCSSRules[styleBucketName] = (resolvedCSSRules[styleBucketName] || []).concat(
        resolvedCSSRulesForSlot[styleBucketName]!,
      );
    });
  }

  return [resolvedClassesBySlots, resolvedCSSRules];
}

export function makeStyles<Slots extends string, Tokens>(
  stylesBySlots: StylesBySlots<Slots, Tokens>,
  unstable_cssPriority: number = 0,
) {
  const insertionCache: Record<string, boolean> = {};

  let resolvedClasses: ResolvedClasses<Slots> | null = null;
  let resolvedCSSRules: ResolvedCSSRules | null = null;

  let resolvedClassesLtr: Record<Slots, string> | null = null;
  let resolvedClassesRtl: Record<Slots, string> | null = null;

  function computeClasses(options: MakeStylesOptions): Record<Slots, string> {
    const { dir, renderer } = options;

    if (resolvedClasses === null) {
      [resolvedClasses, resolvedCSSRules] = resolveStyles(stylesBySlots, unstable_cssPriority);
    }

    const isLTR = dir === 'ltr';
    // As RTL classes are different they should have a different cache key for insertion
    const rendererId = isLTR ? renderer.id : renderer.id + 'r';

    if (isLTR) {
      if (resolvedClassesLtr === null) {
        resolvedClassesLtr = resolveClassesBySlots(resolvedClasses, dir);
      }
    } else {
      if (resolvedClassesRtl === null) {
        resolvedClassesRtl = resolveClassesBySlots(resolvedClasses, dir);
      }
    }

    if (insertionCache[rendererId] === undefined) {
      renderer.insertCSSRules(resolvedCSSRules!);
      insertionCache[rendererId] = true;
    }

    return isLTR ? (resolvedClassesLtr as Record<Slots, string>) : (resolvedClassesRtl as Record<Slots, string>);
  }

  return computeClasses;
}
