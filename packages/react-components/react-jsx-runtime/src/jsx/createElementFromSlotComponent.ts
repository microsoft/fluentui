import * as React from 'react';
import type { SlotComponentType, UnknownSlotProps } from '@fluentui/react-utilities';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';

/**
 * @internal
 * creates a ReactElement from a slot declaration
 */
export function createElementFromSlotComponent<Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<Props> {
  const { elementType, renderFunction, props } = getMetadataFromSlotComponent(type);

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
