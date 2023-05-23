import * as React from 'react';
import { DialogContentProps, DialogContentSlots, DialogContentState } from './DialogContent.types';
import { slotFromProps } from '@fluentui/react-utilities';

/**
 * Create the state required to render DialogBody.
 *
 * The returned state can be modified with hooks such as useDialogBodyStyles_unstable,
 * before being passed to renderDialogBody_unstable.
 *
 * @param props - props from this instance of DialogBody
 * @param ref - reference to root HTMLElement of DialogBody
 */
export const useDialogContent_unstable = (
  props: DialogContentProps,
  ref: React.Ref<HTMLDivElement>,
): DialogContentState => ({
  components: { root: 'div' },
  root: slotFromProps<DialogContentSlots>(props, { ref, elementType: props.as ?? 'div' }),
});
