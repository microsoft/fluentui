'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  DialogActionsBaseProps,
  DialogActionsBaseState,
  DialogActionsProps,
  DialogActionsState,
} from './DialogActions.types';

/**
 * Create the base state required to render DialogActions without design-specific props.
 *
 * The returned state can be composed with `useDialogActions_unstable` or used directly
 * to build custom-styled DialogActions variants.
 *
 * @param props - props from this instance of DialogActions (without position and fluid)
 * @param ref - reference to root HTMLElement of DialogActions
 */
export const useDialogActionsBase_unstable = (
  props: DialogActionsBaseProps,
  ref: React.Ref<HTMLElement>,
): DialogActionsBaseState => {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Create the state required to render DialogActions.
 *
 * The returned state can be modified with hooks such as useDialogActionsStyles_unstable,
 * before being passed to renderDialogActions_unstable.
 *
 * @param props - props from this instance of DialogActions
 * @param ref - reference to root HTMLElement of DialogActions
 */
export const useDialogActions_unstable = (
  props: DialogActionsProps,
  ref: React.Ref<HTMLElement>,
): DialogActionsState => {
  const { position = 'end', fluid = false } = props;
  const state = useDialogActionsBase_unstable(props, ref);
  return {
    ...state,
    components: {
      root: 'div',
    },
    position,
    fluid,
  };
};
