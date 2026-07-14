import type { BaseSymbolDoc } from './types';

/**
 * Known annotation groups in display order.
 * Symbols are bucketed into the first matching group.
 */
export const ANNOTATION_GROUPS = [
  { key: 'stable', label: 'Stable', tags: [] as string[] },
  { key: 'deprecated', label: 'Deprecated', tags: ['deprecated'] },
  { key: 'internal', label: 'Internal', tags: ['internal'] },
  { key: 'preview', label: 'Preview', tags: ['alpha', 'beta'] },
] as const;

export type AnnotationGroupKey = (typeof ANNOTATION_GROUPS)[number]['key'];

export interface AnnotationGroup<T> {
  key: AnnotationGroupKey;
  label: string;
  items: T[];
}

/**
 * Group an array of symbol docs by their annotation tags.
 * Returns only non-empty groups in display order.
 */
export function groupByAnnotation<T extends BaseSymbolDoc>(symbols: T[]): AnnotationGroup<T>[] {
  const buckets = new Map<AnnotationGroupKey, T[]>(ANNOTATION_GROUPS.map(g => [g.key, []]));

  for (const sym of symbols) {
    const group = resolveGroup(sym.tags);
    buckets.get(group)!.push(sym);
  }

  return ANNOTATION_GROUPS.filter(g => buckets.get(g.key)!.length > 0).map(g => ({
    key: g.key,
    label: g.label,
    items: buckets.get(g.key)!.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

function resolveGroup(tags: Record<string, string>): AnnotationGroupKey {
  // Check non-stable groups in order; first match wins
  for (const group of ANNOTATION_GROUPS) {
    if (group.key === 'stable') {
      continue;
    }
    if (group.tags.some(t => t in tags)) {
      return group.key;
    }
  }
  return 'stable';
}
