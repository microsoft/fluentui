import { resolveClassesBySlots } from './runtime/resolveClassesBySlots';
import { MakeStylesOptions, ResolvedClasses, ResolvedCSSRules } from './types';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
export function __styles<Slots extends string>(
  resolvedClasses: ResolvedClasses<Slots>,
  resolvedCSSRules: ResolvedCSSRules,
) {
  const insertionCache: Record<string, boolean> = {};

  let resolvedClassesLtr: Record<Slots, string> | null = null;
  let resolvedClassesRtl: Record<Slots, string> | null = null;

  function computeClasses(options: Pick<MakeStylesOptions, 'dir' | 'renderer'>): Record<Slots, string> {
    const { dir, renderer } = options;

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
