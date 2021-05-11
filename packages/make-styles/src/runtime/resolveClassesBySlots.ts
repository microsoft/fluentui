import { DEFINITION_LOOKUP_TABLE } from '../constants';
import { MakeStylesRenderer, ResolvedStylesBySlots } from '../types';
import { hashSequence } from './utils/hashSequence';

export function resolveClassesBySlots<Slots extends string>(
  resolvedStyles: ResolvedStylesBySlots<Slots>,
  dir: 'ltr' | 'rtl',
  renderer: MakeStylesRenderer,
) {
  const resolvedClasses = {} as Record<Slots, string>;

  // eslint-disable-next-line guard-for-in
  for (const slotName in resolvedStyles) {
    const slotClasses = renderer.insertDefinitions(dir, resolvedStyles[slotName]);
    const sequenceHash = hashSequence(slotClasses, dir);

    const resultSlotClasses = sequenceHash + ' ' + slotClasses;

    DEFINITION_LOOKUP_TABLE[sequenceHash] = [resolvedStyles[slotName], dir];
    resolvedClasses[slotName] = resultSlotClasses;
  }

  return resolvedClasses;
}
