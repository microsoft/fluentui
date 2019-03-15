/** @jsx withSlots */
import { withSlots, getSlots } from '@uifabric/foundation';
import { getNativeProps, htmlElementProperties } from '@uifabric/utilities';
import { Stack } from 'office-ui-fabric-react';

import { ICardComponent, ICardProps, ICardSlots, ICardTokens } from './Card.types';

export const CardView: ICardComponent['view'] = props => {
  const Slots = getSlots<ICardProps, ICardSlots>(props, {
    root: 'div',
    stack: Stack
  });

  const { tokens, compact, ...rest } = props;
  const cardTokens = tokens && typeof tokens !== 'function' ? (tokens as ICardTokens) : undefined;
  const { childrenGap } = cardTokens ? cardTokens : { childrenGap: 12 };

  const nativeProps = getNativeProps(rest, htmlElementProperties);

  return (
    <Slots.root {...nativeProps}>
      <Slots.stack
        horizontal={compact}
        tokens={{ childrenGap: childrenGap }}
        verticalFill
        verticalAlign="space-between"
        horizontalAlign="space-between"
      >
        {props.children}
      </Slots.stack>
    </Slots.root>
  );
};
