import { resolveClassesBySlots } from './runtime/resolveClassesBySlots';
import { MakeStylesOptions, ResolvedStylesBySlots } from './types';

/**
 * @internal
 */
export function __styles<Slots extends string>(resolvedStyles: ResolvedStylesBySlots<Slots>) {
  let resolvedClasses: Record<Slots, string> | null = null;
  let resolvedClassesRtl: Record<Slots, string> | null = null;

  const insertionCache: Record<string, boolean> = {};

  function computeClasses(options: Pick<MakeStylesOptions<unknown>, 'dir' | 'renderer'>): Record<Slots, string> {
    const { dir, renderer } = options;

    if (dir === 'rtl') {
      // As RTL classes are different they should have a different cache key for insertion
      const rendererId = renderer.id + 'r';

      if (resolvedClassesRtl === null || insertionCache[rendererId] === undefined) {
        resolvedClassesRtl = resolveClassesBySlots(resolvedStyles, dir, renderer);
        insertionCache[rendererId] = true;
      }
    } else {
      if (resolvedClasses === null || insertionCache[renderer.id] === undefined) {
        resolvedClasses = resolveClassesBySlots(resolvedStyles, dir, renderer);
        insertionCache[options.renderer.id] = true;
      }
    }

    return dir === 'ltr' ? (resolvedClasses as Record<Slots, string>) : (resolvedClassesRtl as Record<Slots, string>);
  }

  return computeClasses;
}
