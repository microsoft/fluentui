import * as React from 'react';
import { mergeCallbacks, resolveShorthand, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { Input } from '@fluentui/react-input';
import type { SearchBoxProps, SearchBoxState } from './SearchBox.types';
import { DismissRegular, SearchRegular } from '@fluentui/react-icons';

/**
 * Create the state required to render SearchBox.
 *
 * The returned state can be modified with hooks such as useSearchBoxStyles_unstable,
 * before being passed to renderSearchBox_unstable.
 *
 * @param props - props from this instance of SearchBox
 * @param ref - reference to root HTMLElement of SearchBox
 */
export const useSearchBox_unstable = (props: SearchBoxProps, ref: React.Ref<HTMLInputElement>): SearchBoxState => {
  const { size = 'medium', disabled = false, contentBefore, dismiss, contentAfter, ...inputProps } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: '',
  });

  const state: SearchBoxState = {
    components: {
      root: Input,
      dismiss: 'span',
      contentAfter: 'span',
    },

    root: {
      ref,
      type: 'search',
      input: {}, // defining here to have access in styles hook
      value,

      contentBefore: resolveShorthand(contentBefore, {
        defaultProps: {
          children: <SearchRegular />,
        },
        required: true, // TODO need to allow users to remove
      }),

      ...inputProps,

      onChange: useEventCallback(ev => {
        const newValue = ev.target.value;
        props.onChange?.(ev, { value: newValue });
        setValue(newValue);
      }),
    },
    dismiss: resolveShorthand(dismiss, {
      defaultProps: {
        children: <DismissRegular />,
        role: 'button',
        'aria-label': 'clear',
      },
      required: true,
    }),
    contentAfter: resolveShorthand(contentAfter, { required: true }),

    disabled,
    size,
  };

  const onDismissClick = useEventCallback(mergeCallbacks(state.dismiss?.onClick, () => setValue('')));
  if (state.dismiss) {
    state.dismiss.onClick = onDismissClick;
  }

  return state;
};
