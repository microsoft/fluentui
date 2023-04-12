import { Input } from '@fluentui/react-input';
import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { DatePickerProps } from '../DatePicker';

export function usePopup(
  props: DatePickerProps,
  triggerShorthand?: ExtractSlotProps<Slot<typeof Input>>,
  popupSurfaceShorthand?: ExtractSlotProps<Slot<'div'>>,
): [trigger: ExtractSlotProps<Slot<typeof Input>>, popupSurface?: ExtractSlotProps<Slot<'div'>>] {
  const { positioning } = props;

  const popupOptions = {
    position: 'below' as const,
    align: 'start' as const,
    // offset: { crossAxis: 0, mainAxis: 2 },
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popupOptions);

  const popupSurfaceRef = useMergedRefs(popupSurfaceShorthand?.ref, containerRef);
  const popupSurface = popupSurfaceShorthand && { ...popupSurfaceShorthand, ref: popupSurfaceRef };

  return [{ ...triggerShorthand, ref: useMergedRefs(triggerShorthand?.ref, targetRef) }, popupSurface];
}
