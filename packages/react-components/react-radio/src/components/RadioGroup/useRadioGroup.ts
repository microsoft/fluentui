import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import {
  getNativeElementProps,
  isHTMLElement,
  useEventCallback,
  useId,
  slot,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { RadioGroupProps, RadioGroupState } from './RadioGroup.types';

/**
 * Create the state required to render RadioGroup.
 *
 * The returned state can be modified with hooks such as useRadioGroupStyles_unstable,
 * before being passed to renderRadioGroup_unstable.
 *
 * @param props - props from this instance of RadioGroup
 * @param ref - reference to root HTMLElement of RadioGroup
 */
export const useRadioGroup_unstable = (props: RadioGroupProps, ref: React.Ref<HTMLDivElement>): RadioGroupState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props);

  const generatedName = useId('radiogroup-');

  const {
    name = generatedName,
    value,
    defaultValue,
    disabled,
    imperativeRef,
    layout = 'vertical',
    onChange,
    required,
  } = props;

  const rootRef = useMergedRefs(ref);

  React.useImperativeHandle(
    imperativeRef,
    () => ({
      focusSelected: () => {
        if (rootRef.current) {
          const target =
            rootRef.current.querySelector<HTMLElement>('input[type=radio]:enabled:checked') ||
            rootRef.current.querySelector<HTMLElement>('input[type=radio]:enabled');

          target?.focus();
        }
      },
    }),
    [rootRef],
  );

  return {
    layout,
    name,
    value,
    defaultValue,
    disabled,
    required,
    components: {
      root: 'div',
    },
    root: {
      ref: rootRef,
      role: 'radiogroup',
      ...slot.always(getNativeElementProps('div', props, /*excludedPropNames:*/ ['onChange', 'name']), {
        elementType: 'div',
      }),
      onChange: useEventCallback(ev => {
        if (
          onChange &&
          isHTMLElement(ev.target, { constructorName: 'HTMLInputElement' }) &&
          ev.target.type === 'radio'
        ) {
          onChange(ev, { value: ev.target.value });
        }
      }),
    },
  };
};
