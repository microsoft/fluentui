import type * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from '@fluentui/react-utilities';
import type { SlotComponentType } from '@fluentui/react-utilities';
import type { SlotPropsDataType } from './types';

/**
 * @internal
 */
export function getMetadataFromSlotComponent<Props extends SlotPropsDataType>(type: SlotComponentType<Props>) {
  const {
    as,
    [SLOT_ELEMENT_TYPE_SYMBOL]: baseElementType,
    [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction,
    ...propsWithoutMetadata
  } = type;
  const props = propsWithoutMetadata as SlotPropsDataType as Props;

  const elementType = (
    typeof baseElementType === 'string' ? as ?? baseElementType : baseElementType
  ) as React.ElementType<Props>;

  if (typeof elementType !== 'string' && as) {
    props.as = as;
  }
  return { elementType, props, renderFunction };
}
