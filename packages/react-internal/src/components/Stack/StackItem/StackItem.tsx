/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '@uifabric/foundation';
import { IStackItemComponent, IStackItemProps, IStackItemSlots } from './StackItem.types';
import { StackItemStyles as styles } from './StackItem.styles';

const StackItemView: IStackItemComponent['view'] = props => {
  const { children } = props;
  // eslint-disable-next-line eqeqeq
  if (children == null) {
    return null;
  }

  const Slots = getSlots<IStackItemProps, IStackItemSlots>(props, {
    root: 'div',
  });

  return <Slots.root>{children}</Slots.root>;
};

export const StackItem: React.FunctionComponent<IStackItemProps> = createComponent(StackItemView, {
  displayName: 'StackItem',
  styles,
});

export default StackItem;
