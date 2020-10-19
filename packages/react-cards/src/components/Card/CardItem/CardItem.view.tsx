/** @jsx withSlots */
import { withSlots, getSlots } from '@uifabric/foundation';
import { Stack } from '@fluentui/react/lib/Stack';
import { ICardItemComponent, ICardItemProps, ICardItemSlots } from './CardItem.types';

export const CardItemView: ICardItemComponent['view'] = props => {
  const Slots = getSlots<ICardItemProps, ICardItemSlots>(props, {
    root: Stack.Item,
  });

  return <Slots.root {...props} />;
};
