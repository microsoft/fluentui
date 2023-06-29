import * as React from 'react';
import {
  UnknownSlotProps,
  isSlot,
  SlotComponent,
  SLOT_COMPONENT_METADATA_SYMBOL,
  slot,
} from '@fluentui/react-utilities';

export function createElement<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  ...children: React.ReactNode[]
): React.ReactElement<P> | null {
  // TODO:
  // this is for backwards compatibility with getSlotsNext
  // it should be removed once getSlotsNext is obsolete
  if (isSlot<P>(props)) {
    return createElementFromSlotComponent(
      slot(props, { required: true, elementType: type as React.ComponentType<P> }),
      children,
    );
  }
  if (isSlot<P>(type)) {
    return createElementFromSlotComponent(type, children);
  }
  return React.createElement(type, props, ...children);
}

function createElementFromSlotComponent<Props extends UnknownSlotProps>(
  slotComponent: SlotComponent<Props>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<Props> | null {
  const { [SLOT_COMPONENT_METADATA_SYMBOL]: metadata, as, ...propsWithoutMetadata } = slotComponent;
  const props = propsWithoutMetadata as UnknownSlotProps as Props;
  const { elementType: baseElementType, renderFunction } = metadata;

  const elementType =
    baseElementType === undefined || typeof baseElementType === 'string'
      ? as ?? baseElementType ?? 'div'
      : baseElementType;

  if (typeof elementType !== 'string' && as) {
    props.as = as;
  }

  if (renderFunction) {
    if (overrideChildren.length > 0) {
      props.children = React.createElement(React.Fragment, {}, ...overrideChildren);
    }

    return React.createElement(
      React.Fragment,
      {},
      renderFunction(elementType as React.ElementType<Props>, props),
    ) as React.ReactElement<Props>;
  }

  return React.createElement(elementType, props, ...overrideChildren);
}
