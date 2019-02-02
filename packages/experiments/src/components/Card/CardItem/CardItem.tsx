/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '../../../Foundation';
import { ICardItemComponent, ICardItemProps, ICardItemSlots } from './CardItem.types';
import { styles } from './CardItem.styles';

const view: ICardItemComponent['view'] = props => {
  const childNodes: React.ReactElement<{}>[] = React.Children.toArray(props.children) as React.ReactElement<{}>[];
  const first = childNodes[0];
  if (!first) {
    return null;
  }

  const Slots = getSlots<ICardItemProps, ICardItemSlots>(props, {
    root: 'span'
  });

  return <Slots.root>{first}</Slots.root>;
};

export const CardItem: React.StatelessComponent<ICardItemProps> = createComponent({
  displayName: 'CardItem',
  styles,
  view
});

export default CardItem;
