import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
<<<<<<< HEAD
import { ExtractSlotProps, Slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ComboboxBaseProps } from './ComboboxBase.types';
import { Listbox } from '../components/Listbox/Listbox';
=======
import { useMergedRefs } from '@fluentui/react-utilities';
import type { ComboboxBaseProps } from '../ComboboxBase/ComboboxBase.types';
import type { ComboboxState } from '../components/Combobox/Combobox.types';
>>>>>>> update types

export function useComboboxPopup(
  props: ComboboxBaseProps,
  triggerShorthand?: ExtractSlotProps<Slot<'button'>>,
  listboxShorthand?: ExtractSlotProps<Slot<typeof Listbox>>,
): [ExtractSlotProps<Slot<'button'>>, ExtractSlotProps<Slot<typeof Listbox>>];
export function useComboboxPopup(
  props: ComboboxBaseProps,
  triggerShorthand?: ExtractSlotProps<Slot<'input'>>,
  listboxShorthand?: ExtractSlotProps<Slot<typeof Listbox>>,
): [ExtractSlotProps<Slot<'input'>>, ExtractSlotProps<Slot<typeof Listbox>>];

export function useComboboxPopup(
  props: ComboboxBaseProps,
  triggerShorthand?: ExtractSlotProps<Slot<'input'>> | ExtractSlotProps<Slot<'button'>>,
  listboxShorthand?: ExtractSlotProps<Slot<typeof Listbox>>,
): [ExtractSlotProps<Slot<'input'>> | ExtractSlotProps<Slot<'button'>>, ExtractSlotProps<Slot<typeof Listbox>>] {
  const { positioning } = props;

  // popper options
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: { crossAxis: 0, mainAxis: 2 },
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popperOptions);

<<<<<<< HEAD
  return [
    { ...triggerShorthand, ref: useMergedRefs(triggerShorthand?.ref, targetRef) },
    { ...listboxShorthand, ref: useMergedRefs(listboxShorthand?.ref, containerRef) },
  ];
}
=======
  state.listbox.ref = useMergedRefs(state.listbox.ref, containerRef);

  state.button.ref = useMergedRefs(state.button.ref, targetRef);
};
>>>>>>> update types
