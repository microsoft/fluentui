import { ComposeOptions, ComposePreparedOptions, Input, ComposeRenderFunction } from './types';
import { computeDisplayNames } from './computeDisplayNames';
import { createOptionsResolver } from './createOptionsResolver';

export const defaultComposeOptions: ComposePreparedOptions = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  classes: [],
  displayName: '',
  displayNames: [],

  mapPropsToStylesPropsChain: [],
  render: () => null,

  handledProps: [] as never[],
  overrideStyles: false,
  slots: {},
  mapPropsToSlotPropsChain: [],

  // To be removedl
  resolveSlotProps: () => ({}),

  resolve: () => ({ state: {}, slots: {}, slotProps: {} }),
};

// tslint:disable-next-line:no-any
export function mergeComposeOptions<TElementType extends React.ElementType<any> = 'div', TProps = {}, TState = TProps>(
  input: Input,
  inputOptions: ComposeOptions,
  parentOptions: ComposePreparedOptions = defaultComposeOptions,
): ComposePreparedOptions<TElementType, TProps, TState> {
  const mapPropsToSlotPropsChain = inputOptions.mapPropsToSlotProps
    ? [...parentOptions.mapPropsToSlotPropsChain, inputOptions.mapPropsToSlotProps]
    : parentOptions.mapPropsToSlotPropsChain;

  const preparedOptions: Partial<ComposePreparedOptions<TElementType, TProps, TState>> = {
    // remove
    className: inputOptions.className || parentOptions.className,

    classes: [...parentOptions.classes, inputOptions.classes],

    displayName: inputOptions.displayName || parentOptions.displayName,
    // remove
    displayNames: computeDisplayNames(inputOptions, parentOptions),

    // remove
    mapPropsToStylesPropsChain: inputOptions.mapPropsToStylesProps
      ? [...parentOptions.mapPropsToStylesPropsChain, inputOptions.mapPropsToStylesProps]
      : parentOptions.mapPropsToStylesPropsChain,

    render: (typeof input === 'function' ? input : parentOptions.render) as ComposeRenderFunction<TElementType, TProps>,

    handledProps: [...parentOptions.handledProps, ...((inputOptions.handledProps as never[]) || ([] as never[]))],

    // remove (use replacable class functions)
    overrideStyles: inputOptions.overrideStyles || false,

    slots: {
      ...parentOptions.slots,
      ...inputOptions.slots,
    },
    mapPropsToSlotPropsChain,
  };

  // leave intact with no changes (remove later)
  preparedOptions.resolveSlotProps = <P = {}>(props: P) =>
    mapPropsToSlotPropsChain.reduce<Record<string, object>>((acc, definition) => {
      const nextProps = { ...definition(props) };
      const slots: string[] = [...Object.keys(acc), ...Object.keys(nextProps)];
      const mergedSlotProps: Record<string, object> = {};

      slots.forEach(slot => {
        if (!mergedSlotProps[slot]) {
          mergedSlotProps[slot] = {
            ...acc[slot],
            ...nextProps[slot],
          };
        }
      });

      return mergedSlotProps;
    }, {});

  // replace resolveSlotProps with a more general resolve, which takes in state and returns
  // { state, slots, slotProps } fo the render function to consume.
  preparedOptions.resolve = createOptionsResolver<TElementType, TProps, TState>(
    preparedOptions as ComposePreparedOptions<TElementType, TProps, TState>,
  );

  return preparedOptions as ComposePreparedOptions<TElementType, TProps, TState>;
}
