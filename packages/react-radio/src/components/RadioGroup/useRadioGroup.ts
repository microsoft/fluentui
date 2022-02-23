import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { RadioGroupProps, RadioGroupState } from './RadioGroup.types';
import { Label } from '@fluentui/react-label';
import { RadioContextValue } from '../../contexts/RadioContext';

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
  const { name, layout = 'vertical', disabled, required } = props;

  const baseId = useId('radiogroup-');

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId + '__label',
      disabled,
      required,
    },
  });

  const root = getNativeElementProps('fieldset', {
    ref,
    role: 'radiogroup',
    'aria-labelledby': label?.id,
    ...props,
  });

  const labelPosition = layout === 'horizontalStacked' ? 'below' : 'after';
  const context = React.useMemo<RadioContextValue>(() => ({ name, labelPosition }), [name, labelPosition]);

  return {
    layout,
    required,
    context,
    components: {
      root: 'fieldset',
      label: Label,
    },
    root,
    label,
  };
};
