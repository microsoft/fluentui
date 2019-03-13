/** @jsx withSlots */
import { withSlots, getSlots } from '@uifabric/foundation';
import { getNativeProps, htmlElementProperties } from '@uifabric/utilities';
import { Stack } from 'office-ui-fabric-react';

import { ICardComponent, ICardProps, ICardSlots } from './Card.types';

export const CardView: ICardComponent['view'] = props => {
  const Slots = getSlots<ICardProps, ICardSlots>(props, {
    root: 'div',
    stack: Stack
  });

  const { compact, gap, ...rest } = props;

  const nativeProps = getNativeProps(rest, htmlElementProperties);

  return (
    <Slots.root {...nativeProps}>
      <Slots.stack horizontal={compact} gap={gap ? gap : 12} verticalFill verticalAlign="space-between" horizontalAlign="space-between">
        {props.children}
      </Slots.stack>
    </Slots.root>
  );
};
