/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '../../../Foundation';
import { IStackItemComponent, IStackItemProps, IStackItemSlots } from './StackItem.types';
import { styles } from './StackItem.styles';

const view: IStackItemComponent['view'] = props => {
  const childNodes: React.ReactElement<{}>[] = React.Children.toArray(props.children) as React.ReactElement<{}>[];
  const first = childNodes[0];
  if (!first) {
    return null;
  }

  const Slots = getSlots<IStackItemProps, IStackItemSlots>(props, {
    root: 'span'
  });

  return <Slots.root>{first}</Slots.root>;
};

export const StackItem: React.StatelessComponent<IStackItemProps> = createComponent({
  displayName: 'StackItem',
  styles,
  view
});

export default StackItem;
