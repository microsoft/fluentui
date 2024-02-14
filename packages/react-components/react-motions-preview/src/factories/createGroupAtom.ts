import { MOTION } from '../constants';
import { isMotionCollection } from '../utils/isMotionCollection';
import type { AtomMotion, AtomMotionCollection } from '../types';

export function createGroupAtom(...values: Array<AtomMotion | AtomMotionCollection>): AtomMotionCollection {
  return {
    [MOTION]: true,
    motions: values.reduce((acc, value) => {
      if (isMotionCollection(value)) {
        acc.push(...value.motions);
      } else {
        acc.push(value);
      }

      return acc;
    }, [] as AtomMotion[]),
  };
}
