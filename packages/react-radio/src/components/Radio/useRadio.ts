import * as React from 'react';
import { Label, LabelProps } from '@fluentui/react-label';
import {
  getNativeElementProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { RadioProps, RadioState } from './Radio.types';

/**
 * Create the state required to render Radio.
 *
 * The returned state can be modified with hooks such as useRadioStyles_unstable,
 * before being passed to renderRadio_unstable.
 *
 * @param props - props from this instance of Radio
 * @param ref - reference to root HTMLElement of Radio
 */
export const useRadio_unstable = (props: RadioProps, ref: React.Ref<HTMLElement>): RadioState => {
  const { id, labelPosition = 'inline' } = props;
  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  const inputInternalRef = React.useRef<HTMLInputElement>(null);
  const inputShorthand = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      id: useId('radio-item-', id),
      disabled: props.disabled ?? false,
      type: 'radio',
      required: props.required ?? false,
    },
  });

  const onChange = useEventCallback<[React.ChangeEvent<HTMLInputElement>], void>(ev => {
    ev.stopPropagation();

    const { checked: isChecked } = ev.currentTarget;

    props.onChange?.(ev);
    setChecked(isChecked);
  });

  const state: RadioState = {
    checked,
    labelPosition,
    components: {
      root: 'span',
      indicator: 'div',
      input: 'input',
      label: Label as React.ComponentType<LabelProps>,
      subtext: 'span',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    input: {
      ...inputShorthand,
      ref: useMergedRefs(inputShorthand.ref, inputInternalRef),
      checked,
      onChange,
    },
    indicator: resolveShorthand(props.indicator, {
      required: true,
    }),
    label: resolveShorthand(props.label, {
      required: true,
      defaultProps: {
        htmlFor: inputShorthand.id,
      },
    }),
    subtext: resolveShorthand(props.subtext, {
      required: false,
    }),
  };

  return state;
};
