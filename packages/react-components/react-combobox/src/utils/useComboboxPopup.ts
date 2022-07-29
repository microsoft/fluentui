import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { ExtractSlotProps, Slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ComboboxBaseProps } from './ComboboxBase.types';
import { Listbox } from '../components/Listbox/Listbox';

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

  return [
    { ...triggerShorthand, ref: useMergedRefs(triggerShorthand?.ref, targetRef) },
    { ...listboxShorthand, ref: useMergedRefs(listboxShorthand?.ref, containerRef) },
  ];
}
