import type { HeavyType } from './heavy';

export { useHeavy } from './heavy';
export { useLight } from './light';
export type { LightOptions } from './light';
// Re-export of a type-only thing from the heavy module — must not count as a runtime reach.
export type { HeavyType } from './heavy';

export type HeavyWrapper = { tag: 'heavy-wrapper'; inner: HeavyType };
