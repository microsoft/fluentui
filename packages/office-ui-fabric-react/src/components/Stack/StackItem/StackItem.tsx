/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '../../../Foundation';
import { getNativeProps, htmlElementProperties } from '../../../Utilities';
import { IStackItemComponent, IStackItemProps, IStackItemSlots } from './StackItem.types';
import { StackItemStyles as styles } from './StackItem.styles';

const StackItemView: IStackItemComponent['view'] = props => {
  const { children } = props;
  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, htmlElementProperties);
  if (React.Children.count(children) < 1) {
    return null;
  }

  const Slots = getSlots<IStackItemProps, IStackItemSlots>(props, {
    root: 'div',
  });

  return <Slots.root {...nativeProps}>{children}</Slots.root>;
};

export const StackItem: React.FunctionComponent<IStackItemProps> = createComponent(StackItemView, {
  displayName: 'StackItem',
  styles,
});

export default StackItem;
