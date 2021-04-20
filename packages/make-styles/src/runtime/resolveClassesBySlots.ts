import { MakeStylesRenderer, ResolvedStylesBySlots } from '../types';
import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from '../constants';
import { hashString } from './utils/hashString';

export function resolveClassesBySlots<Slots extends string>(
  resolvedStyles: ResolvedStylesBySlots<Slots>,
  dir: 'ltr' | 'rtl',
  renderer: MakeStylesRenderer,
) {
  const resolvedClasses = {} as Record<Slots, string>;

  // eslint-disable-next-line guard-for-in
  for (const slotName in resolvedStyles) {
    const slotClasses = renderer.insertDefinitions(dir, resolvedStyles[slotName]);
    const sequenceHash = SEQUENCE_PREFIX + hashString(slotClasses);

    const resultSlotClasses = sequenceHash + ' ' + slotClasses;

    DEFINITION_LOOKUP_TABLE[sequenceHash] = [resolvedStyles[slotName], dir === 'rtl'];
    resolvedClasses[slotName] = resultSlotClasses;
  }

  return resolvedClasses;
}
