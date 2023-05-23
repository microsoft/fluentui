import * as React from 'react';
import { isSlot, UnknownSlotProps, SLOT_COMPONENT_METADATA_SYMBOL, SlotComponent } from '@fluentui/react-utilities';

export function createElementNext<Props extends {}>(
  type: React.ElementType<Props>,
  props?: Props | null,
  ...children: React.ReactNode[]
): React.ReactElement<Props> | null {
  return isSlot<Props>(type)
    ? createElementFromSlotComponent(type, children)
    : React.createElement(type, props, ...children);
}

function createElementFromSlotComponent<Props extends UnknownSlotProps>(
  slot: SlotComponent<Props>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<Props> | null {
  const { [SLOT_COMPONENT_METADATA_SYMBOL]: metadata, as, ...propsWithoutMetadata } = slot;
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
