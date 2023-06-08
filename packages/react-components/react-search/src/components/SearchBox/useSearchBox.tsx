import * as React from 'react';
import { resolveShorthand, useControllableState, useEventCallback } from '@fluentui/react-utilities';
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
export const useSearchBox_unstable = (props: SearchBoxProps, ref: React.Ref<HTMLElement>): SearchBoxState => {
  const { contentBefore, dismiss, contentAfter, ...inputProps } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: '',
  });

  const onDismissClick = React.useCallback(
    ev => {
      setValue('');
    },
    [setValue],
  );

  const state: SearchBoxState = {
    components: {
      root: Input,
      contentBefore: 'span',
      dismiss: 'span',
      contentAfter: 'span',
    },

    root: {
      type: 'search',
      input: {}, // defining here to have access in styles hook
      value,
      onChange: useEventCallback(ev => {
        const newValue = ev.target.value;
        setValue(newValue);
      }),
      ...inputProps,
    },
    contentBefore: resolveShorthand(contentBefore, {
      defaultProps: {
        children: <SearchRegular />,
      },
      required: true, // TODO need to allow users to remove
    }),
    dismiss: resolveShorthand(dismiss, {
      defaultProps: {
        children: <DismissRegular onClick={onDismissClick} />,
      },
      required: true,
    }),
    contentAfter: resolveShorthand(contentAfter, { required: true }),
  };

  return state;
};
