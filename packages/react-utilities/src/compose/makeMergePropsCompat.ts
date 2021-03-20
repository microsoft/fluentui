import { makeMergeProps, MergePropsOptions } from './makeMergeProps';
import { GenericDictionary } from './types';

/**
 * Backwards-compatible version of makeMergeProps that has less restrictive type checking
 *
 * @deprecated Use makeMergeProps instead
 */
export const makeMergePropsCompat = <TState = GenericDictionary>(
  options: MergePropsOptions<GenericDictionary> = {},
) => {
  return makeMergeProps(options) as (
    target: GenericDictionary,
    ...propSets: (GenericDictionary | undefined)[]
  ) => TState;
};
