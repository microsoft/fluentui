/** @jsxRuntime classic */
/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '@fluentui/foundation-legacy';
import { getNativeProps, htmlElementProperties } from '../../../Utilities';
import { StackItemStyles as styles } from './StackItem.styles';
import type { IStackItemComponent, IStackItemProps, IStackItemSlots } from './StackItem.types';

const StackItemView: IStackItemComponent['view'] = props => {
  const { children } = props;
  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, htmlElementProperties);
  // eslint-disable-next-line eqeqeq
  if (children == null) {
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
