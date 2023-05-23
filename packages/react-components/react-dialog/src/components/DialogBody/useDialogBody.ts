import * as React from 'react';
import type { DialogBodyProps, DialogBodySlots, DialogBodyState } from './DialogBody.types';
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
export const useDialogBody_unstable = (props: DialogBodyProps, ref: React.Ref<HTMLDivElement>): DialogBodyState => ({
  components: { root: 'div' },
  root: slotFromProps<DialogBodySlots>(props, { ref, elementType: props.as ?? 'div' }),
});
