import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { ComboboxBaseProps, ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';

export const useComboboxPopup = (props: ComboboxBaseProps, state: ComboboxBaseState) => {
  const { positioning } = props;

  // popper options
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: { crossAxis: 0, mainAxis: 2 },
    ...resolvePositioningShorthand(positioning),
  };

  const {
    targetRef,
    containerRef,
  }: {
    targetRef: React.MutableRefObject<HTMLButtonElement | HTMLInputElement>;
    containerRef: React.MutableRefObject<HTMLDivElement>;
  } = usePositioning(popperOptions);

  const containerSlot = state.listbox;
  const targetSlot = state.input || state.button;

  if (containerSlot && targetSlot) {
    containerSlot.ref = useMergedRefs(containerSlot.ref, containerRef);
    targetSlot.ref = useMergedRefs(targetSlot.ref, targetRef);
  }
};
