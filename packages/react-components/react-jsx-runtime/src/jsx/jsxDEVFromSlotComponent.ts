import * as React from 'react';
import type { SlotComponentType, UnknownSlotProps } from '@fluentui/react-utilities';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import { DevRuntime } from '../utils/DevRuntime';

export function jsxDEVFromSlotComponent<Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
  overrideProps: Props | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
): React.ReactElement<Props> {
  const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);

  const props: Props = { ...slotProps, ...overrideProps };

  if (renderFunction) {
    return DevRuntime.jsxDEV(
      React.Fragment,
      {
        children: renderFunction(elementType, props),
      },
      key,
      source,
      self,
    ) as React.ReactElement<Props>;
  }

  return DevRuntime.jsxDEV(elementType, props, key, source, self);
}
