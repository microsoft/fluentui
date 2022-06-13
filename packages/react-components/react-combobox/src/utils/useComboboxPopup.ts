import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { ComboboxBaseProps } from '../ComboboxBase/ComboboxBase.types';
import type { ComboboxState } from '../components/Combobox/Combobox.types';

export const useComboboxPopup = (props: ComboboxBaseProps, state: ComboboxState) => {
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

  state.button.ref = useMergedRefs(state.button.ref, targetRef);
};
