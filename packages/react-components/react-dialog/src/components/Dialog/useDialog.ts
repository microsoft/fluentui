import * as React from 'react';
import { resolveShorthand, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { DialogOpenChangeData, DialogOpenChangeEvent, DialogProps, DialogState } from './Dialog.types';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 */
export const useDialog_unstable = (props: DialogProps): DialogState => {
  const { children, open, defaultOpen, overlay, type = 'modal', onOpenChange } = props;
  const [trigger, content] = childrenToTriggerAndContent(children);

  const [openValue, setOpenValue] = useControllableState({
    state: open,
    defaultState: defaultOpen,
    initialState: false,
  });

  const requestOpenChange = useEventCallback((event: DialogOpenChangeEvent, data: DialogOpenChangeData) => {
    onOpenChange?.(event, data);
    // if user prevents default then do not change state value
    if (!event.defaultPrevented) {
      setOpenValue(data.open);
    }
  });

  return {
    components: {
      overlay: 'div',
    },
    overlay: resolveShorthand(overlay, {
      required: type === 'modal',
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
      return [childrenArray[0], childrenArray[1]];
    // case where there's only content
    case 1:
      return [undefined, childrenArray[1]];
    // unknown case
    default:
      return [undefined, undefined];
  }
}
