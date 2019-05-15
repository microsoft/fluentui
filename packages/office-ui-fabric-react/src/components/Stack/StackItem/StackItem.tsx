/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '../../../Foundation';
import { IStackItemComponent, IStackItemProps, IStackItemSlots } from './StackItem.types';
import { StackItemStyles as styles } from './StackItem.styles';

const StackItemView: IStackItemComponent['view'] = props => {
  const { children } = props;
  if (React.Children.count(children) < 1) {
    return null;
  }

  const Slots = getSlots<IStackItemProps, IStackItemSlots>(props, {
    root: 'div'
  });

  return <Slots.root>{children}</Slots.root>;
};

export const StackItem: React.StatelessComponent<IStackItemProps> = createComponent(StackItemView, {
  displayName: 'StackItem',
  styles
});

export default StackItem;
