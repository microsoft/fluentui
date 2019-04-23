/** @jsx withSlots */
import { withSlots, getSlots } from '@uifabric/foundation';
import { Stack } from 'office-ui-fabric-react';
import { ICardItemComponent, ICardItemProps, ICardItemSlots } from './CardItem.types';

export const CardItemView: ICardItemComponent['view'] = props => {
  const { children, ...rest } = props;

  const Slots = getSlots<ICardItemProps, ICardItemSlots>(props, {
    root: Stack.Item
  });

  return <Slots.root {...rest}>{children}</Slots.root>;
};
