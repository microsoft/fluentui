import * as React from 'react';
import { isSlot, type SlotComponentType, type UnknownSlotProps } from '@fluentui/react-utilities';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import type { JSXRuntime } from '../utils/types';
import { createCompatSlotComponent } from '../utils/createCompatSlotComponent';

/**
 * @internal
 */
export const createJSX = (runtime: JSXRuntime) => {
  const jsxFromSlotComponent = <Props extends UnknownSlotProps>(
    type: SlotComponentType<Props>,
    overrideProps: Props | null,
    key?: React.Key,
    source?: unknown,
    self?: unknown,
  ): React.ReactElement<Props> => {
    const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);

    const props: Props = { ...slotProps, ...overrideProps };

    if (renderFunction) {
      return runtime(
        React.Fragment,
        {
          children: renderFunction(elementType, props),
        },
        key,
        source,
        self,
      ) as React.ReactElement<Props>;
    }
    return runtime(elementType, props, key, source, self);
  };

  return <Props extends {}>(
    type: React.ElementType<Props>,
    overrideProps: Props | null,
    key?: React.Key,
    source?: unknown,
    self?: unknown,
  ): React.ReactElement<Props> => {
    // TODO:
    // this is for backwards compatibility with getSlotsNext
    // it should be removed once getSlotsNext is obsolete
    if (isSlot<Props>(overrideProps)) {
      return jsxFromSlotComponent(createCompatSlotComponent(type, overrideProps), null, key, source, self);
    }
    if (isSlot<Props>(type)) {
      return jsxFromSlotComponent(type, overrideProps, key, source, self);
    }
    return runtime(type, overrideProps, key, source, self);
  };
};
