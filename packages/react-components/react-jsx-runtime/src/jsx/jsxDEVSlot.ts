import * as React from 'react';
import { SlotComponentType, UnknownSlotProps } from '@fluentui/react-utilities';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import { DevRuntime } from '../utils/DevRuntime';

export const jsxDEVSlot = <Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
  overrideProps: Props | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
): React.ReactElement<Props> => {
  const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);

  const props: Props = { ...slotProps, ...overrideProps };

  if (renderFunction) {
    // if runtime is static
    if (source === true) {
      return DevRuntime.jsxDEV(
        React.Fragment,
        {
          children: renderFunction(elementType, {
            ...props,
            /**
             * If the runtime is static then children is an array and this array won't be keyed.
             * Then we should wrap children by a static fragment
             * as there's no way to know if renderFunction will render statically or dynamically
             */
            children: DevRuntime.jsxDEV(React.Fragment, { children: props.children }, undefined, true, self),
          }),
        },
        key,
        false, // by marking source as false we're declaring that this render is dynamic
        self,
      ) as React.ReactElement<Props>;
    }
    // if runtime is dynamic (source = false) things are simpler
    return DevRuntime.jsxDEV(
      React.Fragment,
      { children: renderFunction(elementType, props) },
      key,
      source,
      self,
    ) as React.ReactElement<Props>;
  }
  return DevRuntime.jsxDEV(elementType, props, key, source, self);
};
