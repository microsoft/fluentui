import * as React from 'react';
import type { SlotComponentType, UnknownSlotProps } from '@fluentui/react-utilities';
import { getMetadataFromSlotComponent } from '../utils/getMetadataFromSlotComponent';
import { jsx } from '../utils/Runtime';

export const jsxSlot = <Props extends UnknownSlotProps>(
  type: SlotComponentType<Props>,
  overrideProps: Props | null,
  key?: React.Key,
): React.ReactElement<Props> => {
  const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);

  const props: Props = { ...slotProps, ...overrideProps };

  if (renderFunction) {
    return jsx(React.Fragment, { children: renderFunction(elementType, props) }, key) as React.ReactElement<Props>;
  }
  return jsx(elementType, props, key);
};
