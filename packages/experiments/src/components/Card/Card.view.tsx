/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { Stack } from '../../Stack';
import { getNativeProps, htmlElementProperties } from '../../Utilities';

import { ICardComponent, ICardProps, ICardSlots } from './Card.types';

export const CardView: ICardComponent['view'] = props => {
  const Slots = getSlots<ICardProps, ICardSlots>(props, {
    root: 'div',
    stack: Stack
  });

  const { compact, ...rest } = props;

  const nativeProps = getNativeProps(rest, htmlElementProperties);

  return (
    <Slots.root {...nativeProps}>
      <Slots.stack horizontal={compact} disableShrink verticalFill verticalAlign="space-between">
        {props.children}
      </Slots.stack>
    </Slots.root>
  );
};
