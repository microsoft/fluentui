/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '@uifabric/foundation';
import { Stack } from 'office-ui-fabric-react';
import { ICardItemComponent, ICardItemProps, ICardItemSlots } from './CardItem.types';
import { CardItemStyles as styles } from './CardItem.styles';

const view: ICardItemComponent['view'] = props => {
  const { children, ...rest } = props;
  if (React.Children.count(children) < 1) {
    return null;
  }

  const Slots = getSlots<ICardItemProps, ICardItemSlots>(props, {
    root: Stack.Item
  });

  return <Slots.root {...rest}>{children}</Slots.root>;
};

export const CardItem: React.StatelessComponent<ICardItemProps> = createComponent({
  displayName: 'CardItem',
  styles,
  view
});

export default CardItem;
