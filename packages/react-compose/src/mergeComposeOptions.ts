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

  const inputClasses = Array.isArray(inputOptions.classes) ? inputOptions.classes : [inputOptions.classes];

  return {
    className: inputOptions.className || parentOptions.className,
    classes: [...parentOptions.classes, ...inputClasses],

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

    resolveSlotProps,

    shorthandConfig: {
      ...parentOptions.shorthandConfig,
      ...inputOptions.shorthandConfig,
    },
  };
}
