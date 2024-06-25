import * as React from 'react';
import { ExtractSlotProps, mergeCallbacks, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { PromptInputProps, PromptInputState } from './PromptInput.types';
import { Listbox } from '../Listbox/Listbox';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
import { useActiveDescendant } from '@fluentui/react-aria';
import { optionClassNames } from '../Option/useOptionStyles.styles';
import { useListboxSlot } from '../../utils/useListboxSlot';

import { PromptInput } from '@fluentui-copilot/react-prompt-input';
import { useGenericComboboxBaseState } from '../../utils/useGenericComboboxBaseState';
import { EditorInput } from '@fluentui-copilot/react-editor-input';
import { useTriggerSlot } from '../../utils/useTriggerSlot';
import { ArrowUp } from '@fluentui/keyboard-keys';

/**
 * Create the state required to render PromptInput.
 *
 * The returned state can be modified with hooks such as usePromptInputStyles_unstable,
 * before being passed to renderPromptInput_unstable.
 *
 * @param props - props from this instance of PromptInput
 * @param ref - reference to root HTMLDivElement of PromptInput
 */
export const usePromptInput_unstable = (props: PromptInputProps, ref: React.Ref<HTMLSpanElement>): PromptInputState => {
  const { inlinePopup } = props;
  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller: activeDescendantController,
  } = useActiveDescendant<HTMLSpanElement, HTMLDivElement>({
    matchOption: el => el.classList.contains(optionClassNames.root),
  });

  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);

  const editorRef = React.useRef<HTMLSpanElement>(null);

  const baseState = useGenericComboboxBaseState({
    ...props,
    activeDescendantController,
  });
  const { open, hasFocus, getOptionById, setOpen, setHasFocus, selectOption, options } = baseState;

  const root = slot.always(props, {
    elementType: PromptInput as React.FC<PromptInputProps>,
  });
  // We have to explicitly remove it since we render a span and it can have children
  root.children = undefined;

  const listbox = useListboxSlot(props.listbox, useMergedRefs(comboboxPopupRef, activeDescendantListboxRef), {
    state: baseState,
    triggerRef: editorRef,
    defaultProps: {
      children: props.children,
      disableAutoFocus: true,
    },
  });

  root.root = slot.always<ExtractSlotProps<PromptInputProps['root']>>(root.root, { elementType: 'div' });
  root.root.ref = useMergedRefs(root.root.ref, comboboxTargetRef);
  root.root['aria-owns'] = !inlinePopup && open ? listbox?.id : undefined;

  root.editor = slot.always(root.editor, { elementType: EditorInput });
  root.editor.input = useTriggerSlot(root.editor.input ?? {}, useMergedRefs(ref, activeParentRef), {
    state: { open, getOptionById, selectOption, setOpen, setHasFocus },
    defaultProps: {},
    elementType: 'span',
    activeDescendantController,
  });
  root.editor.input.onKeyDown = useEventCallback(
    mergeCallbacks(root.editor.input.onKeyDown, ev => {
      if (open && options.length > 0 && ev.key === ArrowUp && activeDescendantController.active() === options[0].id) {
        activeDescendantController.blur();
        setOpen(ev, false);
      }
    }),
  );

  // root.editor.input.ref = useMergedRefs(root.editor.input.ref, activeParentRef);

  const state: PromptInputState = {
    components: {
      root: PromptInput,
      listbox: Listbox,
    },
    root,
    listbox: open || hasFocus ? listbox : undefined,
    activeDescendantController,
    ...baseState,
  };

  return state;
};
