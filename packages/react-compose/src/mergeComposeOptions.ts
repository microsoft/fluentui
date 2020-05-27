import { ComposeOptions, ComposePreparedOptions, Input } from './types';
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
  slots: { __self: () => null },
  mapPropsToSlotPropsChain: [],
  resolveSlotProps: () => ({}),
  shorthandConfig: {},
  resolve: () => ({ state: {}, slots: {}, slotProps: {} }),
};

export function mergeComposeOptions(
  input: Input,
  inputOptions: ComposeOptions,
  parentOptions: ComposePreparedOptions = defaultComposeOptions,
): ComposePreparedOptions {
  const mapPropsToSlotPropsChain = inputOptions.mapPropsToSlotProps
    ? [...parentOptions.mapPropsToSlotPropsChain, inputOptions.mapPropsToSlotProps]
    : parentOptions.mapPropsToSlotPropsChain;
  const resolveSlotProps = <P = {}>(props: P) =>
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

  const preparedOptions: Partial<ComposePreparedOptions> = {
    className: inputOptions.className || parentOptions.className,
    classes: [...parentOptions.classes, inputOptions.classes],
    displayName: inputOptions.displayName || parentOptions.displayName,
    displayNames: computeDisplayNames(inputOptions, parentOptions),
    mapPropsToStylesPropsChain: inputOptions.mapPropsToStylesProps
      ? [...parentOptions.mapPropsToStylesPropsChain, inputOptions.mapPropsToStylesProps]
      : parentOptions.mapPropsToStylesPropsChain,
    render: typeof input === 'function' ? input : parentOptions.render,
    handledProps: [...parentOptions.handledProps, ...((inputOptions.handledProps as never[]) || ([] as never[]))],
    overrideStyles: inputOptions.overrideStyles || false,
    slots: {
      ...parentOptions.slots,
      ...inputOptions.slots,
    },
    mapPropsToSlotPropsChain,
    resolveSlotProps,
    shorthandConfig: {
      ...parentOptions.shorthandConfig,
      ...inputOptions.shorthandConfig,
    },
  };

  preparedOptions.resolve = createOptionsResolver(preparedOptions as ComposePreparedOptions);

  return preparedOptions as ComposePreparedOptions;
}
