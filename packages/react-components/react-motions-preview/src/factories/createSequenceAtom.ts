import type { AtomMotion } from '../types';

function computeDelay(value: AtomMotion | AtomMotion[], nextValue: AtomMotion) {
  const length = Array.isArray(value)
    ? value.reduce((acc, value) => Math.max(acc, getAnimationLength(value)), 0)
    : getAnimationLength(value);

  return length + (nextValue.delay ?? 0);
}

function getAnimationLength(atom: AtomMotion) {
  return Number(atom.duration ?? 0) * (atom.iterations ?? 1) + (atom.endDelay ?? 0) + (atom.delay ?? 0);
}

export function createSequenceAtom(...motions: Array<AtomMotion | AtomMotion[]>): AtomMotion[] {
  return motions.reduce<AtomMotion[]>((acc, value, index, arr) => {
    const nextValue = arr[index + 1];

    if (nextValue) {
      if (Array.isArray(nextValue)) {
        nextValue.forEach(valueInGroup => {
          valueInGroup.delay = computeDelay(value, valueInGroup);
        });
      } else {
        nextValue.delay = computeDelay(value, nextValue);
      }
    }

    if (Array.isArray(value)) {
      acc.push(...value);
    } else {
      acc.push(value);
    }

    return acc;
  }, []);
}
