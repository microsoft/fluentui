import * as React from 'react';
import { UnknownSlotProps, isSlot, SlotComponent, SLOT_COMPONENT_METADATA_SYMBOL } from '@fluentui/react-utilities';

export function createElement<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  ...children: React.ReactNode[]
): React.ReactElement<P> | null {
  return isSlot<P>(props)
    ? createElementFromSlotComponent(type, props, children)
    : React.createElement(type, props, ...children);
}

function createElementFromSlotComponent<P extends UnknownSlotProps>(
  type: React.ElementType<P>,
  props: SlotComponent<P>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<P> | null {
  const { [SLOT_COMPONENT_METADATA_SYMBOL]: metadata, ...renderProps } = props;
  if (metadata.renderFunction) {
    if (overrideChildren.length > 0) {
      renderProps.children = React.createElement(React.Fragment, {}, ...overrideChildren);
    }

    return React.createElement(
      React.Fragment,
      {},
      metadata.renderFunction(type, renderProps as UnknownSlotProps as P),
    ) as React.ReactElement<P>;
  }
  return React.createElement(type, props, ...overrideChildren);
}
