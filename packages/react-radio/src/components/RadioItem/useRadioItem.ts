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
import type { RadioItemProps, RadioItemState, RadioItemRender } from './RadioItem.types';

/**
 * Create the state required to render RadioItem.
 *
 * The returned state can be modified with hooks such as useRadioItemStyles_unstable,
 * before being passed to renderRadioItem_unstable.
 *
 * @param props - props from this instance of RadioItem
 * @param ref - reference to root HTMLElement of RadioItem
 */
export const useRadioItem_unstable = (
  props: RadioItemProps,
  ref: React.Ref<HTMLElement>,
): [RadioItemState, RadioItemRender] => {
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

  const state: RadioItemState = {
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
    }),
    subtext: resolveShorthand(props.subtext, {
      required: false,
    }),
  };

  state.input.id = useId('radio-item-', id);
  state.label.htmlFor = state.input.id;

  return state;
};
