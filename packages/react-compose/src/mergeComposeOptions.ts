import { ComposeOptions, ComposePreparedOptions, Input } from './types';
import { computeDisplayNames } from './computeDisplayNames';
import { defaultComposeOptions } from './defaultComposeOptions';

export function mergeComposeOptions(
  input: Input,
  inputOptions: ComposeOptions,
  parentOptions: ComposePreparedOptions = defaultComposeOptions,
): ComposePreparedOptions {
  const mapPropsToSlotPropsChain = inputOptions.slotProps
    ? [...parentOptions.slotProps, inputOptions.slotProps]
    : parentOptions.slotProps;

  return {
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

    slotProps: mapPropsToSlotPropsChain,

    shorthandConfig: {
      ...parentOptions.shorthandConfig,
      ...inputOptions.shorthandConfig,
    },
  };
}
