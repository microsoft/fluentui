import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from '@fluentui/react-utilities';
import type {
  JSXElement,
  JSXIntrinsicElementKeys,
  SlotComponentType,
  SlotRenderFunction,
} from '@fluentui/react-utilities';

import type { MotionComponentProps } from '../factories/createMotionComponent';
import type { MotionParam } from '../types';

/**
 * @internal
 */
type MotionSlotRenderProps = Pick<MotionComponentProps, 'onMotionFinish' | 'onMotionStart' | 'onMotionCancel'>;

export type MotionSlotProps<MotionParams extends Record<string, MotionParam> = {}> = Pick<
  MotionComponentProps,
  'imperativeRef' | 'onMotionFinish' | 'onMotionStart' | 'onMotionCancel'
> & {
  // FIXME: 'as' property is required by design on the slot AP but it does not support components, only intrinsic
  //        elements motion slots do not support intrinsic elements, only custom components.
  /**
   * @deprecated Do not use. Motion Slots do not support intrinsic elements.
   *
   * If you want to override the animation, use the children render function instead.
   */
  as?: JSXIntrinsicElementKeys;

  // TODO: remove once React v18 slot API is modified ComponentProps is not properly adding render function as a
  //       possible value for children
  children?: SlotRenderFunction<MotionSlotRenderProps & MotionParams & { children: JSXElement }>;
};

export function motionSlot<MotionParams extends Record<string, MotionParam> = {}>(
  motion: MotionSlotProps<MotionParams> | null | undefined,
  options: {
    elementType: React.FC<MotionComponentProps & MotionParams>;
    defaultProps: MotionSlotRenderProps & MotionParams;
  },
): SlotComponentType<MotionSlotRenderProps & MotionParams> {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const { as, children, ...rest } = motion ?? {};

  if (process.env.NODE_ENV !== 'production') {
    if (typeof as !== 'undefined') {
      throw new Error(`@fluentui/react-motion: "as" property is not supported on motion slots.`);
    }
  }

  if (motion === null) {
    // Heads up!
    // Render function is used there to avoid rendering a motion component and render children directly
    const renderFn: SlotRenderFunction<MotionSlotRenderProps & MotionParams & { children: JSXElement }> = (
      _,
      props,
    ) => <>{props.children}</>;

    /**
     * Casting is required here as SlotComponentType is a function, not an object.
     * Although SlotComponentType has a function signature, it is still just an object.
     * This is required to make a slot callable (JSX compatible), this is the exact same approach
     * that is used on `@types/react` components
     */
    return {
      [SLOT_RENDER_FUNCTION_SYMBOL]: renderFn,
      [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType,
    } as SlotComponentType<MotionSlotRenderProps & MotionParams>;
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
  } as SlotComponentType<MotionSlotRenderProps & MotionParams>;

  if (typeof children === 'function') {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = children as SlotRenderFunction<
      MotionSlotRenderProps & MotionParams
    >;
  }

  return propsWithMetadata;
}
