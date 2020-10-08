/** @jsx withSlots */
import * as React from 'react';
import { withSlots, getSlots } from '@uifabric/foundation';
import { getNativeProps, htmlElementProperties } from '../../Utilities';
import { ITextComponent, ITextProps, ITextSlots } from './Text.types';

export const TextView: ITextComponent['view'] = props => {
  if (React.Children.count(props.children) === 0) {
    return null;
  }

  const { block, className, as: RootType = 'span', variant, nowrap, ...rest } = props;

  const Slots = getSlots<ITextProps, ITextSlots>(props, {
    root: RootType,
  });

  return <Slots.root {...getNativeProps(rest, htmlElementProperties)} />;
};
