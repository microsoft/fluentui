import { DEFINITION_LOOKUP_TABLE } from '../constants';
import { hashSequence } from './utils/hashSequence';
import type { CSSClassesMapBySlot, CSSClassesMap, CSSClasses } from '../types';

/**
 * Reduces a classname map for slot to a classname string. Uses classnames according to text directions.
 *
 * @private
 */
export function reduceToClassName(classMap: CSSClassesMap, dir: 'ltr' | 'rtl'): string {
  let className = '';

  // eslint-disable-next-line guard-for-in
  for (const propertyHash in classMap) {
    const classNameMapping: CSSClasses = classMap[propertyHash];

    if (classNameMapping) {
      const hasRTLClassName = Array.isArray(classNameMapping);

      if (dir === 'rtl') {
        className += (hasRTLClassName ? classNameMapping[1] : classNameMapping) + ' ';
      } else {
        className += (hasRTLClassName ? classNameMapping[0] : classNameMapping) + ' ';
      }
    }
  }

  return className.slice(0, -1);
}

/**
 * Reduces classname maps for slots to classname strings. Registers them in a definition cache to be used by
 * `mergeClasses()`.
 *
 * @private
 */
export function reduceToClassNameForSlots<Slots extends string | number>(
  classesMapBySlot: CSSClassesMapBySlot<Slots>,
  dir: 'ltr' | 'rtl',
): Record<Slots, string> {
  const classNamesForSlots = {} as Record<Slots, string>;

  // eslint-disable-next-line guard-for-in
  for (const slotName in classesMapBySlot) {
    const classnamesForSlot = reduceToClassName(classesMapBySlot[slotName], dir);

    const sequenceHash = hashSequence(classnamesForSlot, dir);
    const resultSlotClasses = sequenceHash + ' ' + classnamesForSlot;

    DEFINITION_LOOKUP_TABLE[sequenceHash] = [classesMapBySlot[slotName], dir];
    classNamesForSlots[slotName] = resultSlotClasses;
  }

  return classNamesForSlots;
}
