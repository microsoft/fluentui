import { ComposePreparedOptions, GenericDictionary } from './types';
import { resolveClasses } from './resolveClasses';
import { resolveSlotProps } from './resolveSlotProps';

export type MergePropsResult<TState extends GenericDictionary> = {
  state: TState;
  slots: GenericDictionary;
  slotProps: GenericDictionary;
};

/**
 * Merge props takes in state and compose options, and resolves slots and slotProps.
 * It's expected that the component will call mergeProps(state, options) from within
 * render; after resolving state and before rendering slots and slotProps.
 */
export function mergeProps<TProps, TState = TProps>(
  state: TState,
  options: ComposePreparedOptions<TProps>,
): MergePropsResult<TState> {
  const result: MergePropsResult<TState> = {
    state: state,
    slots: {
      ...options.slots,
      // tslint:disable-next-line:no-any
      root: (state as any).as || options.slots.root || 'div',
    },
    slotProps: {},
  };

  // Resolve slotProps/slots from state.
  resolveSlotProps(result, options);

  // Resolve classes.
  resolveClasses(result, options.classes);

  // TODO: Resolve inline styles.

  return result;
}
