import * as React from 'react';
import {
  UnknownSlotProps,
  isSlot,
  SlotComponentType,
  SLOT_ELEMENT_TYPE_SYMBOL,
  SLOT_RENDER_FUNCTION_SYMBOL,
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
      { ...props, [SLOT_ELEMENT_TYPE_SYMBOL]: type } as SlotComponentType<P>,
      children,
    );
  }
  if (isSlot<P>(type)) {
    return createElementFromSlotComponent(type, children);
  }
  return React.createElement(type, props, ...children);
}

function createElementFromSlotComponent<Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<Props> | null {
  const {
    as,
    [SLOT_ELEMENT_TYPE_SYMBOL]: baseElementType,
    [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction,
    ...propsWithoutMetadata
  } = type;
  const props = propsWithoutMetadata as UnknownSlotProps as Props;

  const elementType = typeof baseElementType === 'string' ? as ?? baseElementType : baseElementType;

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
