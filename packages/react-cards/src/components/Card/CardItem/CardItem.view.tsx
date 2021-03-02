/** @jsx withSlots */
import { withSlots, getSlots } from '@uifabric/foundation';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { ICardItemComponent, ICardItemProps, ICardItemSlots } from './CardItem.types';

/* eslint-disable deprecation/deprecation */

/** @deprecated */
export const CardItemView: ICardItemComponent['view'] = props => {
  const Slots = getSlots<ICardItemProps, ICardItemSlots>(props, {
    root: Stack.Item,
  });

  return <Slots.root {...props} />;
};
