import type * as React from 'react';
import type { SlotComponentType, UnknownSlotProps } from '@fluentui/react-utilities';

export type JSXRuntime = <P extends {}>(
  type: React.ElementType<P>,
  props: P | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<P>;

export type JSXSlotRuntime = <Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
  overrideProps: Props | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<Props>;
