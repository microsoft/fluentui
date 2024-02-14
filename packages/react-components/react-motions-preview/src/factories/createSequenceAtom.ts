import { MOTION } from '../constants';
import { isMotionCollection } from '../utils/isMotionCollection';
import type { AtomMotion, AtomMotionCollection } from '../types';

function sumDuration(currentAtom: AtomMotion, nextAtom: AtomMotion) {
  // TODO: handle iterations
  return Number(currentAtom.delay ?? 0) + (nextAtom.delay ?? 0) + Number(currentAtom.duration ?? 0);
}

export function createSequenceAtom(...motions: Array<AtomMotion | AtomMotionCollection>): AtomMotionCollection {
  return {
    [MOTION]: true,
    motions: motions.reduce((acc, value, index, arr) => {
      const nextValue = arr[index + 1];

      if (isMotionCollection(value)) {
        if (nextValue) {
          const maxDelayInGroup =
            value.motions
              .map(v => Number(v.delay ?? 0) + Number(v.duration ?? 0))
              .sort()
              .pop() ?? 0;
          const fakeItem = { delay: maxDelayInGroup, keyframes: [] };

          if (isMotionCollection(nextValue)) {
            nextValue.motions.forEach(valueInGroup => {
              valueInGroup.delay = sumDuration(fakeItem, valueInGroup);
            });
          } else {
            nextValue.delay = sumDuration(fakeItem, nextValue);
          }
        }

        acc.push(...value.motions);
      } else {
        if (nextValue) {
          if (isMotionCollection(nextValue)) {
            nextValue.motions.forEach(valueInGroup => {
              valueInGroup.delay = sumDuration(value, valueInGroup);
            });
          } else {
            nextValue.delay = sumDuration(value, nextValue);
          }
        }

        acc.push(value);
      }

      return acc;
    }, [] as AtomMotion[]),
  };
}
