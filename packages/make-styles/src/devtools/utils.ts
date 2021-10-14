import { CSSClasses, CSSClassesMap, SequenceHash } from '../types';
import { MK_DEBUG } from './store';

export function getDirectionalClassName(classes: CSSClasses, direction: 'ltr' | 'rtl'): string {
  return Array.isArray(classes) ? (direction === 'rtl' ? classes[1] : classes[0]) : classes;
}

export function findRootSequenceForClassName(
  className: string,
  direction: 'ltr' | 'rtl',
  targetHash: SequenceHash,
): SequenceHash {
  const sequenceMapping = MK_DEBUG.getSequenceMapping(targetHash);

  if (sequenceMapping) {
    const matchingSequence = Object.entries(sequenceMapping).find(([, lookupItem]) => {
      const lookupClasses: CSSClassesMap = lookupItem[0];

      return Object.values(lookupClasses).find(classes => getDirectionalClassName(classes, direction) === className);
    });

    return matchingSequence![0];
  }

  return targetHash;
}
