import { UnknownSlotProps, slot, SlotShorthandValue } from '@fluentui/react-utilities';
import { MotionShorthand, MotionState, useMotion, UseMotionOptions } from './useMotion';

export interface UnknownSlotPropsWithMotion<Element extends HTMLElement> extends UnknownSlotProps {
  motion?: MotionShorthand<Element>;
}

/**
 * @internal
 *
 * Hook to manage the presence of an element in the DOM based on its CSS transition/animation state.
 *
 * @param props - Motion props to manage the presence of an element in the DOM
 * @param options - Motion options to configure the hook
 */
export function useMotionFromSlot<Props extends UnknownSlotProps, Element extends HTMLElement>(
  props: Props | SlotShorthandValue | undefined | null,
  shorthand: MotionShorthand<Element>,
  options?: UseMotionOptions,
): [Props, MotionState<Element>] {
  const shorthandProps = slot.resolveShorthand(props);
  const { motion: motionProp, ...slotProps } = (shorthandProps ?? {}) as UnknownSlotPropsWithMotion<Element>;
  const motion = useMotion(motionProp ? motionProp : shorthand, options);

  return [slotProps as Props, motion];
}
