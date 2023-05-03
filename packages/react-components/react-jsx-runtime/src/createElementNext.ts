import * as React from 'react';
import { UnknownSlotProps, isSlot } from '@fluentui/react-utilities';
import { SlotComponent } from '@fluentui/react-utilities/src/compose/types';

export function createElementNext<Props extends {}>(
  type: React.ElementType<Props>,
  props?: Props | null,
  ...children: React.ReactNode[]
): React.ReactElement<Props> | null {
  return isSlot(type) ? createElementFromSlotComponent(type, children) : React.createElement(type, props, ...children);
}

function createElementFromSlotComponent<Props extends UnknownSlotProps>(
  slotComponent: SlotComponent<Props>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<Props> | null {
  const { props, renderFunction, componentType } = slotComponent;
  const type = componentType as React.ElementType<Props>;

  if (renderFunction) {
    const children =
      overrideChildren.length > 0 ? React.createElement(React.Fragment, {}, ...overrideChildren) : props.children;

    return React.createElement(
      React.Fragment,
      {},
      renderFunction(type, { ...props, children }),
    ) as React.ReactElement<Props>;
  }

  return React.createElement(type, props, ...overrideChildren);
}
