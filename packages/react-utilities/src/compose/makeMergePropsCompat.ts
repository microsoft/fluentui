import { makeMergeProps, MergePropsOptions } from './makeMergeProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericDictionary = Record<string, any>;

/**
 * Backwards-compatible version of makeMergeProps that has less restrictive type checking
 *
 * @deprecated Use makeMergeProps instead
 */
export const makeMergePropsCompat = makeMergeProps as <TState = GenericDictionary>(
  options?: MergePropsOptions<GenericDictionary>,
) => (target: GenericDictionary, ...propSets: (GenericDictionary | undefined)[]) => TState;
