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

  const nativeProps = getNativeProps(props, htmlElementProperties);

  return (
    <Slots.root {...nativeProps}>
      <Slots.stack disableShrink verticalFill verticalAlign="space-between">
        {props.children}
      </Slots.stack>
    </Slots.root>
  );
};
