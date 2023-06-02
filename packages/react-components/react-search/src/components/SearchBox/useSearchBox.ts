import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import type { SearchBoxProps, SearchBoxState } from './SearchBox.types';
import { useOverrides_unstable as useOverrides } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render SearchBox.
 *
 * The returned state can be modified with hooks such as useSearchBoxStyles_unstable,
 * before being passed to renderSearchBox_unstable.
 *
 * @param props - props from this instance of SearchBox
 * @param ref - reference to `<input>` element of SearchBox
 */
export const useSearchBox_unstable = (props: SearchBoxProps, ref: React.Ref<HTMLInputElement>): SearchBoxState => {
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });

  const overrides = useOverrides();

  const { size = 'medium', appearance = overrides.inputDefaultAppearance ?? 'outline', onChange } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: '',
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['size', 'onChange', 'value', 'defaultValue'],
  });

  const state: SearchBoxState = {
    size,
    appearance,
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
      dismiss: 'span',
    },
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: {
        type: 'search',
        ref,
        ...nativeProps.primary,
      },
    }),
    contentBefore: resolveShorthand(props.contentBefore),
    contentAfter: resolveShorthand(props.contentAfter),
    dismiss: resolveShorthand(props.dismiss),
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };

  state.input.value = value;
  state.input.onChange = useEventCallback(ev => {
    const newValue = ev.target.value;
    onChange?.(ev, { value: newValue });
    setValue(newValue);
  });

  return state;
};
