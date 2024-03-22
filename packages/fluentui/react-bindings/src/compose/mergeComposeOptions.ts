import { defaultComposeOptions, ComposeOptions, ComposePreparedOptions, Input } from './consts';
import { computeDisplayNames } from './computeDisplayNames';

export function mergeComposeOptions(
  input: Input,
  inputOptions: ComposeOptions,
  parentOptions: Required<ComposePreparedOptions> = defaultComposeOptions,
): Required<ComposePreparedOptions> {
  const mapPropsToSlotPropsChain = inputOptions.slotProps
    ? [...parentOptions.slotProps, inputOptions.slotProps]
    : parentOptions.slotProps;

  const resolveSlotProps = <P extends {} = {}>(props: P) =>
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

  const state: ComposePreparedOptions['state'] = (props, ref, options) => {
    if (inputOptions.state) {
      return inputOptions.state(parentOptions.state(props, ref, options), ref, options);
    }

    return parentOptions.state(props, ref, options);
  };

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

    state,

    resolveSlotProps,

    shorthandConfig: {
      ...parentOptions.shorthandConfig,
      ...inputOptions.shorthandConfig,
    },
  };
}
