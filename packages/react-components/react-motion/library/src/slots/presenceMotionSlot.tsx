import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from '@fluentui/react-utilities';
import type {
  JSXElement,
  JSXIntrinsicElementKeys,
  SlotComponentType,
  SlotRenderFunction,
} from '@fluentui/react-utilities';

import type { PresenceComponentProps } from '../factories/createPresenceComponent';
import type { MotionParam } from '../types';

/**
 * @internal
 */
type PresenceMotionSlotRenderProps = Pick<
  PresenceComponentProps,
  'appear' | 'onMotionFinish' | 'onMotionStart' | 'unmountOnExit' | 'visible'
>;

export type PresenceMotionSlotProps<MotionParams extends Record<string, MotionParam> = {}> = Pick<
  PresenceComponentProps,
  'imperativeRef' | 'onMotionFinish' | 'onMotionStart'
> & {
  // FIXME: 'as' property is required by design on the slot AP but it does not support components, only intrinsic
  //        elements motion slots do not support intrinsic elements, only custom components.
  /**
   * @deprecated Do not use. Presence Motion Slots do not support intrinsic elements.
   *
   * If you want to override the animation, use the children render function instead.
   */
  as?: JSXIntrinsicElementKeys;

  // TODO: remove once React v18 slot API is modified ComponentProps is not properly adding render function as a
  //       possible value for children
  children?: SlotRenderFunction<PresenceMotionSlotRenderProps & MotionParams & { children: JSXElement }>;
};

export function presenceMotionSlot<MotionParams extends Record<string, MotionParam> = {}>(
  motion: PresenceMotionSlotProps<MotionParams> | null | undefined,
  options: {
    elementType: React.FC<PresenceComponentProps & MotionParams>;
    defaultProps: PresenceMotionSlotRenderProps & MotionParams;
  },
): SlotComponentType<PresenceMotionSlotRenderProps & MotionParams> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { as, children, ...rest } = motion ?? {};

  if (process.env.NODE_ENV !== 'production') {
    if (typeof as !== 'undefined') {
      throw new Error(`@fluentui/react-motion: "as" property is not supported on motion slots.`);
    }
  }

  if (motion === null) {
    // Heads up!
    // Render function is used there to avoid rendering a motion component and handle unmounting logic
    const isUnmounted = !options.defaultProps.visible && options.defaultProps.unmountOnExit;
    const renderFn: SlotRenderFunction<PresenceMotionSlotRenderProps & MotionParams & { children: JSXElement }> = (
      _,
      props,
    ) => (isUnmounted ? null : <>{props.children}</>);

    /**
     * Casting is required here as SlotComponentType is a function, not an object.
     * Although SlotComponentType has a function signature, it is still just an object.
     * This is required to make a slot callable (JSX compatible), this is the exact same approach
     * that is used on `@types/react` components
     */
    return {
      [SLOT_RENDER_FUNCTION_SYMBOL]: renderFn,
      [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType,
    } as SlotComponentType<PresenceMotionSlotRenderProps & MotionParams>;
  }

  /**
   * Casting is required here as SlotComponentType is a function, not an object.
   * Although SlotComponentType has a function signature, it is still just an object.
   * This is required to make a slot callable (JSX compatible), this is the exact same approach
   * that is used on `@types/react` components
   */
  const propsWithMetadata = {
    ...options.defaultProps,
    ...rest,
    [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType,
  } as SlotComponentType<PresenceMotionSlotRenderProps & MotionParams>;

  if (typeof children === 'function') {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = children as SlotRenderFunction<
      PresenceMotionSlotRenderProps & MotionParams
    >;
  }

  return propsWithMetadata;
}
