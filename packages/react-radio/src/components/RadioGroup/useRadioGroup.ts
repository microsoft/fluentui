import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useEventCallback, useId } from '@fluentui/react-utilities';
import { RadioGroupProps, RadioGroupState } from './RadioGroup.types';
import { Label } from '@fluentui/react-label';

/**
 * Create the state required to render RadioGroup.
 *
 * The returned state can be modified with hooks such as useRadioGroupStyles_unstable,
 * before being passed to renderRadioGroup_unstable.
 *
 * @param props - props from this instance of RadioGroup
 * @param ref - reference to root HTMLElement of RadioGroup
 */
export const useRadioGroup_unstable = (
  props: RadioGroupProps,
  ref: React.Ref<HTMLFieldSetElement>,
): RadioGroupState => {
  const generatedName = useId('radiogroup-');

  const { name = generatedName, value, defaultValue, layout = 'vertical', required, disabled, onChange } = props;

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: generatedName + '__label',
      required,
      disabled,
    },
  });

  const root = getNativeElementProps('fieldset', {
    ref,
    role: 'radiogroup',
    'aria-labelledby': label?.id,
    ...props,
  });

  root.onChange = useEventCallback(ev => {
    if (onChange && ev.target instanceof HTMLInputElement && ev.target.name === name) {
      onChange(ev, { value: ev.target.value });
    }
  });

  return {
    layout,
    required,
    context: React.useMemo(
      () => ({
        name,
        layout,
        value,
        defaultValue,
        disabled,
      }),
      [name, layout, value, defaultValue, disabled],
    ),
    components: {
      root: 'fieldset',
      label: Label,
    },
    root,
    label,
  };
};
