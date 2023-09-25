import * as React from 'react';
import { resolvePositioningShorthand, usePositioning } from '@fluentui/react-positioning';
import type { DatePickerProps } from '../DatePicker';

/**
 * Hook used to handle positioning of the popup.
 *
 * @param props - DatePicker props
 * @returns tuple of trigger and popup refs
 * @internal
 */
export function usePopupPositioning(
  props: DatePickerProps,
): [triggerRef: React.MutableRefObject<HTMLElement>, popupRef: React.MutableRefObject<HTMLDivElement>] {
  const { positioning } = props;

  const popupOptions = {
    position: 'below' as const,
    align: 'start' as const,
    ...resolvePositioningShorthand(positioning),
  };

  const { targetRef, containerRef } = usePositioning(popupOptions);

  return [targetRef, containerRef];
}
