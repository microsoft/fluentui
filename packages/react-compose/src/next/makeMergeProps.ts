import { css } from '@uifabric/utilities';
import { GenericDictionary } from './types';

export type MergePropsOptions = {
  /**
   * A list of props to deep merge. By default, `style` will
   * always be deep merged so it's not required to be provided.
   */
  deepMerge?: string[];
};

// avoiding property accessors in hot code path loops for fastest times
const { isArray } = Array;
const { keys } = Object;
const isObject = (val: undefined | null | object): boolean => val !== null && typeof val === 'object' && !isArray(val);

/**
 * Helper which deep clones props, but respectively assigns JSX, object refs, and class names
 * appropriately.
 *
 * @param target - the target object to merge onto.
 * @param propSets - one or more prop sets to deep merge onto the target.
 */
export const makeMergeProps = <TState = GenericDictionary>(options: MergePropsOptions = {}) => {
  const { deepMerge = [] } = options;

  const mergeProps = (target: GenericDictionary, ...propSets: (GenericDictionary | undefined)[]): TState => {
    for (const props of propSets) {
      if (typeof props === 'undefined') {
        continue;
      }

      for (const key of keys(props)) {
        const val = props[key];

        if (key === 'className') {
          target[key] = css(target[key], val);
          continue;
        }

        if (key === 'style' || (isObject(val) && deepMerge.includes(key))) {
          mergeProps(target[key], val);
          continue;
        }

        target[key] = val;
      }
    }

    return target as TState;
  };

  return mergeProps;
};
