import { ComposePreparedOptions, GenericDictionary } from './types';
import { getNativeElementProps, assign } from '@uifabric/utilities';
import { resolveClasses } from './resolveClasses';
import { resolveSlotProps } from './resolveSlotProps';

export type OptionsResolverResult = {
  state: GenericDictionary;
  slots: GenericDictionary;
  slotProps: GenericDictionary;
};

/**
 * A set of mapped props for intrinsic element types.
 */
export const defaultMappedProps: Record<string, string> = {
  iframe: 'src',
  img: 'src',
  input: 'type',
};

export const EmptyRender = () => null;

/**
 * Creates an options resolve function which should attach to an options object
 * for a composed component.
 */
export const createOptionsResolver = <TState>(options: ComposePreparedOptions) => {
  // Returning a function so that "resolve" function shows up in profiling.
  // tslint:disable-next-line:no-function-expression
  return function resolve(stateOrProps: TState): OptionsResolverResult {
    const slotProps: OptionsResolverResult['slotProps'] = {};
    const state = stateOrProps as OptionsResolverResult['state'];
    const slots: OptionsResolverResult['slots'] = { ...options.slots };
    const result: OptionsResolverResult = {
      state,
      slotProps,
      slots,
    };

    // Always ensure a root slot exists.
    slots.root = state.as || slots.root || 'div';

    // Mix unrecognized props onto root, excluding the handled props.
    assignToMapObject(
      slotProps,
      'root',
      getNativeElementProps(state.as, state, [...options.handledProps, 'className']),
    );

    // Resolve slotProps/slots from state.
    resolveSlotProps(result);

    // Resolve classes.
    resolveClasses(options.classes, result);

    return result;
  };
};

function assignToMapObject(map: Record<string, {}>, key: string, value: {}) {
  if (value) {
    if (!map[key]) {
      map[key] = {};
    }
    assign(map[key], value);
  }
}
