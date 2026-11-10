import type * as React from 'react';
import {
  SLOT_CLASS_NAME_PROP_SYMBOL,
  SLOT_ELEMENT_TYPE_SYMBOL,
  SLOT_RENDER_FUNCTION_SYMBOL,
} from '@fluentui/react-utilities';
import type { SlotComponentType, SlotRenderFunction, UnknownSlotProps } from '@fluentui/react-utilities';

/**
 * @internal
 */
export function getMetadataFromSlotComponent<Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
): {
  elementType: React.ElementType<Props>;
  props: Props;
  renderFunction: SlotRenderFunction<Props> | undefined;
} {
  const {
    as,
    [SLOT_CLASS_NAME_PROP_SYMBOL]: _classNameProp,
    [SLOT_ELEMENT_TYPE_SYMBOL]: baseElementType,
    [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction,
    ...propsWithoutMetadata
  } = type;
  const props = propsWithoutMetadata as UnknownSlotProps as Props;

  const elementType = (
    typeof baseElementType === 'string' ? as ?? baseElementType : baseElementType
  ) as React.ElementType<Props>;

  if (typeof elementType !== 'string' && as) {
    props.as = as;
  }
  return { elementType, props, renderFunction };
}
