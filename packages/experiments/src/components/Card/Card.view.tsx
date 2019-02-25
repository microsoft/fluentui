/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { Stack } from 'office-ui-fabric-react';
import { getNativeProps, htmlElementProperties } from '../../Utilities';

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
