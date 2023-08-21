import { UnknownSlotProps, slot, SlotShorthandValue } from '@fluentui/react-utilities';
import { MotionShorthand, MotionState, useMotion, MotionOptions } from './useMotion';

export interface UnknownSlotPropsWithMotion<Element extends HTMLElement> extends UnknownSlotProps {
  motion?: MotionShorthand<Element>;
}

/**
 * @internal
 *
 * Hook to extract motion props from a slot props object and return the remaining slot props and the motion state.
 *
 * @param props - Slot props to extract motion props from
 * @param shorthand - Motion shorthand to use if no motion props are provided
 * @param options - Motion options to configure the hook
 */
export function useMotionFromProps<Props extends UnknownSlotPropsWithMotion<Element>, Element extends HTMLElement>(
  props: Props | SlotShorthandValue | undefined | null,
  shorthand: MotionShorthand<Element>,
  options?: MotionOptions,
): [props: Props, motion: MotionState<Element>] {
  const shorthandProps = slot.resolveShorthand(props);
  const { motion: motionProp, ...slotProps } = shorthandProps ?? {};
  const motion = useMotion(motionProp ?? shorthand, options ?? {});

  return [slotProps as Props, motion];
}
