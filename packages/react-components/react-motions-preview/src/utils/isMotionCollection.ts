import { MOTION } from '../constants';
import type { AtomMotion, AtomMotionCollection } from '../types';

export function isMotionCollection(value: AtomMotion | AtomMotionCollection): value is AtomMotionCollection {
  return Object.prototype.hasOwnProperty.call(value, MOTION);
}
