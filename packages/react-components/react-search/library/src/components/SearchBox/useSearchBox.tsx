'use client';

import * as React from 'react';
import {
  isResolvedShorthand,
  mergeCallbacks,
  slot,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useInput_unstable } from '@fluentui/react-input';
import { DismissRegular, SearchRegular } from '@fluentui/react-icons';
import type { ExtractSlotProps } from '@fluentui/react-utilities';
import type {
  SearchBoxBaseProps,
  SearchBoxBaseState,
  SearchBoxSlots,
  SearchBoxProps,
  SearchBoxState,
} from './SearchBox.types';

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
  const { size = 'medium', appearance = 'outline', ...baseProps } = props;
  const state = useSearchBoxBase_unstable(baseProps, ref);

  if (state.contentBefore) {
    state.contentBefore.children ??= <SearchRegular />;
  }

  if (state.dismiss) {
    state.dismiss.children ??= <DismissRegular />;
  }

  return {
    ...state,
    size,
    appearance,
  };
};

/**
 * Base hook for SearchBox component. Manages state related to controlled/uncontrolled
 * value, focus tracking, dismiss button click handling, search icon slot, and
 * input type="search" — without design props (size, appearance).
 *
 * @param props - props from this instance of SearchBox (without size, appearance)
 * @param ref - reference to root HTMLElement of SearchBox
 */
export const useSearchBoxBase_unstable = (
  props: SearchBoxBaseProps,
  ref: React.Ref<HTMLInputElement>,
): SearchBoxBaseState => {
  const { disabled = false, root, contentBefore, dismiss, contentAfter, value, defaultValue, ...inputProps } = props;

  const searchBoxRootRef = React.useRef<HTMLDivElement>(null);
  const searchBoxRef = React.useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: '',
  });

  // Tracks the focus of the component for the contentAfter and dismiss button
  const [focused, setFocused] = React.useState(false);

  const onFocus = React.useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  const onBlur: React.FocusEventHandler<HTMLSpanElement> = React.useCallback(
    ev => {
      setFocused(!!searchBoxRootRef.current?.contains(ev.relatedTarget));
    },
    [setFocused],
  );

  const rootProps = slot.resolveShorthand(root);

  const handleDismissClick = useEventCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    if (isResolvedShorthand(dismiss)) {
      dismiss.onClick?.(event);
    }
    const newValue = '';
    setInternalValue(newValue);
    props.onChange?.(event, { value: newValue });

    searchBoxRef.current?.focus();
  });

  const inputState = useInput_unstable(
    {
      type: 'search',
      disabled,
      value: internalValue,
      root: slot.always<ExtractSlotProps<SearchBoxSlots['root']>>(
        {
          ...rootProps,
          ref: useMergedRefs(rootProps?.ref, searchBoxRootRef),
          onFocus: mergeCallbacks(rootProps?.onFocus, onFocus),
          onBlur: mergeCallbacks(rootProps?.onBlur, onBlur),
        },
        {
          elementType: 'span',
        },
      ),
      contentBefore: slot.optional(contentBefore, {
        renderByDefault: true,
        elementType: 'span',
      }),
      contentAfter: slot.optional(contentAfter, {
        renderByDefault: true,
        elementType: 'span',
      }),
      ...inputProps,
      onChange: useEventCallback(ev => {
        const newValue = ev.target.value;
        props.onChange?.(ev, { value: newValue });
        setInternalValue(newValue);
      }),
    },
    useMergedRefs(searchBoxRef, ref),
  );

  const state: SearchBoxBaseState = {
    ...inputState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...inputState.components,
      dismiss: 'span',
    },
    dismiss: slot.optional(dismiss, {
      defaultProps: {
        role: 'button',
        'aria-label': 'clear',
        tabIndex: -1,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
    disabled,
    focused,
  };

  if (state.dismiss) {
    state.dismiss.onClick = handleDismissClick;
  }

  return state;
};
