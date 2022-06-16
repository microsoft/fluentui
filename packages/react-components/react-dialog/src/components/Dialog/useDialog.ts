import * as React from 'react';
import {
  getNativeElementProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import type { DialogOpenChangeEvent, DialogProps, DialogState } from './Dialog.types';
import { DialogRequestOpenChangeData } from '../../contexts/dialogContext';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog_unstable = (props: DialogProps, ref: React.Ref<HTMLElement>): DialogState => {
  const { children, open, defaultOpen, overlay, type = 'modal', onOpenChange, as } = props;
  const [trigger, content] = childrenToTriggerAndContent(children);

  const [openValue, setOpenValue] = useControllableState({
    state: open,
    defaultState: defaultOpen,
    initialState: false,
  });

  const requestOpenChange = useEventCallback((data: DialogRequestOpenChangeData) => {
    const nextOpen = normalizeSetOpen(data.open)(openValue);
    onOpenChange?.(data.event as DialogOpenChangeEvent, { open: nextOpen, type: data.type });
    // if user prevents default then do not change state value
    if (!data.event.defaultPrevented) {
      setOpenValue(nextOpen);
    }
  });

  return {
    components: {
      overlay: 'div',
      root: 'div',
    },
    overlay: resolveShorthand(overlay, {
      required: type === 'modal',
    }),
    root: getNativeElementProps(as ?? 'div', {
      ...props,
      ref,
    }),
    content,
    trigger,
    open: openValue,
    requestOpenChange,
    type: type,
  };
};

/**
 * Extracts trigger and content from children
 */
function childrenToTriggerAndContent(
  children: React.ReactNode,
): readonly [trigger: React.ReactNode, content: React.ReactNode] {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  if (process.env.NODE_ENV !== 'production') {
    if (childrenArray.length !== 1 && childrenArray.length !== 2) {
      // eslint-disable-next-line no-console
      console.warn(
        'Dialog must contain at least one child <DialogContent/>,\n' +
          'and at most two children <DialogTrigger/> <DialogContent/> (in this order)',
      );
    }
  }
  switch (childrenArray.length) {
    // case where there's a trigger followed by content
    case 2:
      return childrenArray as [trigger: React.ReactNode, content: React.ReactNode];
    // case where there's only content
    case 1:
      return [undefined, childrenArray[1]];
    // unknown case
    default:
      return [undefined, undefined];
  }
}

/**
 * Normalizes a state action into a function
 */
function normalizeSetOpen(setOpen: React.SetStateAction<boolean>) {
  return typeof setOpen === 'function' ? setOpen : () => setOpen;
}
