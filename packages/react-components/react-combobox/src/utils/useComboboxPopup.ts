import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';
import type { ComboboxBaseProps } from '../ComboboxBase/ComboboxBase.types';
import type { ComboboxState } from '../components/Combobox/Combobox.types';
import type { DropdownState } from '../components/Dropdown/Dropdown.types';

export const useComboboxPopup = (props: ComboboxBaseProps, state: DropdownState | ComboboxState) => {
  const { positioning } = props;

  // popper options
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: { crossAxis: 0, mainAxis: 2 },
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popperOptions);

  state.listbox.ref = useMergedRefs(state.listbox.ref, containerRef);

  if ((state as ComboboxState).input) {
    const triggerSlot = (state as ComboboxState).input;
    triggerSlot.ref = useMergedRefs(triggerSlot.ref, targetRef as React.MutableRefObject<HTMLInputElement>);
  } else if ((state as DropdownState).button) {
    const triggerSlot = (state as DropdownState).button;
    triggerSlot.ref = useMergedRefs(triggerSlot.ref, targetRef as React.MutableRefObject<HTMLButtonElement>);
  }
};
