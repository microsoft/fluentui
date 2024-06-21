import type * as React from 'react';
import type { SlotComponentType } from '@fluentui/react-utilities';

export type JSXRuntime = <P extends {}>(
  type: React.ElementType<P>,
  props: P | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<P>;

export type JSXSlotRuntime = <Props extends SlotPropsDataType>(
  type: SlotComponentType<Props>,
  overrideProps: Props | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<Props>;

/**
 * @internal
 *
 * This should ONLY be used in type templates as in `extends SlotPropsDataType`;
 * it shouldn't be used as a component's Slot props type.
 */
export type SlotPropsDataType = {
  as?: keyof JSX.IntrinsicElements;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
};
