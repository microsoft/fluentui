/** @jsx withSlots */
import { withSlots, getSlots } from '@uifabric/foundation';
import { getNativeProps, htmlElementProperties } from '@uifabric/utilities';
import { Stack, IStackComponent } from 'office-ui-fabric-react/lib/Stack';

import { ICardComponent, ICardProps, ICardSlots } from './Card.types';

export const CardView: ICardComponent['view'] = props => {
  const Slots = getSlots<ICardProps, ICardSlots>(props, {
    root: Stack
  });

  const { styles, tokens, compact, ...rest } = props;

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(rest, htmlElementProperties);

  return (
    <Slots.root
      {...nativeProps}
      horizontal={compact}
      tokens={tokens as IStackComponent['tokens']}
      verticalFill
      verticalAlign="space-between"
      horizontalAlign="space-between"
    >
      {props.children}
    </Slots.root>
  );
};
