import {
  SLOT_ELEMENT_TYPE_SYMBOL,
  SLOT_RENDER_FUNCTION_SYMBOL,
  type SlotComponentType,
  type SlotRenderFunction,
} from '@fluentui/react-utilities';
import * as React from 'react';

import type { PresenceComponentProps } from '../factories/createPresenceComponent';
import type { MotionParam } from '../types';

type PresenceMotionSlotReturnProps<MotionParams extends Record<string, MotionParam> = {}> = Pick<
  PresenceComponentProps,
  'appear' | 'onMotionFinish' | 'onMotionStart' | 'unmountOnExit' | 'visible'
> &
  MotionParams;

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
  as?: keyof JSX.IntrinsicElements;

  // TODO: remove once React v18 slot API is modified ComponentProps is not properly adding render function as a
  //       possible value for children
  children?: SlotRenderFunction<PresenceMotionSlotReturnProps<MotionParams> & { children: React.ReactElement }>;
};

export function presenceMotionSlot<MotionParams extends Record<string, MotionParam> = {}>(
  motion: PresenceMotionSlotProps<MotionParams> | null | undefined,
  options: {
    elementType: React.FC<PresenceComponentProps & MotionParams>;
    defaultProps: PresenceMotionSlotReturnProps<MotionParams>;
  },
): SlotComponentType<PresenceMotionSlotReturnProps<MotionParams>> {
  // eslint-disable-next-line deprecation/deprecation
  const { as, children, ...rest } = motion || ({} as PresenceMotionSlotProps<MotionParams>);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof as !== 'undefined') {
      throw new Error(`@fluentui/react-motion: "as" property is not supported on motion slots.`);
    }
  }

  if (motion === null) {
    // Heads up!
    // Render function is used there to avoid rendering a motion component and handle unmounting logic.
    const isUnmounted = !options.defaultProps.visible && options.defaultProps.unmountOnExit;
    const renderFn: SlotRenderFunction<
      PresenceMotionSlotReturnProps<MotionParams> & { children: React.ReactElement }
    > = (_, props) => (isUnmounted ? null : <>{props.children}</>);

    return {
      [SLOT_RENDER_FUNCTION_SYMBOL]: renderFn as SlotRenderFunction<PresenceMotionSlotReturnProps<MotionParams>>,
      [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType,
    } as SlotComponentType<PresenceMotionSlotReturnProps<MotionParams>>;
  }

  const propsWithMetadata = {
    ...options.defaultProps,
    ...(rest as PresenceMotionSlotReturnProps<MotionParams>),
    [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType,
  } as SlotComponentType<PresenceMotionSlotReturnProps<MotionParams>>;

  if (typeof children === 'function') {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = children as SlotRenderFunction<
      PresenceMotionSlotReturnProps<MotionParams>
    >;
  }

  return propsWithMetadata;
}
