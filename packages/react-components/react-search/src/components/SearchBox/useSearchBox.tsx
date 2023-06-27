import * as React from 'react';
import {
  mergeCallbacks,
  resolveShorthand,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { Input, InputState } from '@fluentui/react-input';
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
  const { size = 'medium', disabled = false, root, contentBefore, dismiss, contentAfter, ...inputProps } = props;

  const searchBoxRootRef = React.useRef<HTMLDivElement>(null);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: '',
  });

  // Tracks the focus of the component for the contentAfter and dismiss button
  const [focused, setFocused] = React.useState(false);

  const onFocus = useEventCallback(() => {
    setFocused(true);
  });

  const onBlur: React.FocusEventHandler<HTMLSpanElement> = useEventCallback(ev => {
    setFocused(!!searchBoxRootRef.current?.contains(ev.relatedTarget));
  });

  const state: SearchBoxState = {
    components: {
      root: Input,
      dismiss: 'span',
      contentAfter: 'span',
    },

    root: {
      ref: useMergedRefs(searchBoxRef, ref),
      type: 'search',
      input: {}, // defining here to have access in styles hook

      disabled,
      size,
      value,

      contentBefore: resolveShorthand(contentBefore, {
        defaultProps: {
          children: <SearchRegular />,
        },
        required: true, // TODO need to allow users to remove
      }),

      ...inputProps,

      root: resolveShorthand(root, {
        required: true,
      }),

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
        tabIndex: -1,
      },
      required: true,
    }),
    contentAfter: resolveShorthand(contentAfter, {
      required: true,
    }),

    disabled,
    focused,
    size,
  };

  const searchBoxRoot = state.root.root as InputState['root'];
  searchBoxRoot.ref = useMergedRefs(searchBoxRoot.ref, searchBoxRootRef);
  searchBoxRoot.onFocus = useEventCallback(mergeCallbacks(searchBoxRoot.onFocus, onFocus));
  searchBoxRoot.onBlur = useEventCallback(mergeCallbacks(searchBoxRoot.onBlur, onBlur));

  const onDismissClick = useEventCallback(mergeCallbacks(state.dismiss?.onClick, () => setValue('')));
  if (state.dismiss) {
    state.dismiss.onClick = onDismissClick;
  }

  return state;
};
