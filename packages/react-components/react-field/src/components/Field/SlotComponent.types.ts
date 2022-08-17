import * as React from 'react';
import type { SlotShorthandValue, SlotRenderFunction } from '@fluentui/react-utilities';

//
// TEMPORARY definition of the SlotComponent type, until it is available from react-utilities
//

export type SlotComponent<Type extends React.ComponentType | React.VoidFunctionComponent> = WithSlotShorthandValue<
  Type extends React.ComponentType<infer Props>
    ? // If this is a VoidFunctionComponent that doesn't allow children, add { children?: never }
      WithSlotRenderFunction<Props extends { children?: unknown } ? Props : Props & { children?: never }>
    : never
>;

//
// TEMPORARY copied versions of the non-exported helper types from react-utilities
//

type WithSlotShorthandValue<Props extends { children?: unknown }> =
  | Props
  | Extract<SlotShorthandValue, Props['children']>;

type WithSlotRenderFunction<Props extends { children?: unknown }> = Props & {
  children?: Props['children'] | SlotRenderFunction<Props>;
};
