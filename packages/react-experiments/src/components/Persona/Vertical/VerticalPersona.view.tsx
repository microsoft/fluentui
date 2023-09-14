/** @jsxRuntime classic */
/** @jsx withSlots */
import { PersonaCoin } from '../../PersonaCoin/PersonaCoin';
import { getSlots, withSlots } from '@fluentui/foundation-legacy';
import { PersonaText } from '../PersonaText/PersonaText';
import type { IVerticalPersonaComponent, IVerticalPersonaProps, IVerticalPersonaSlots } from './VerticalPersona.types';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const Slots = getSlots<IVerticalPersonaProps, IVerticalPersonaSlots>(props, {
    root: 'div',
    primaryText: PersonaText,
    secondaryText: PersonaText,
    coin: PersonaCoin,
  });

  return (
    <Slots.root>
      <Slots.coin text={props.text} />
      <Slots.primaryText>{props.text}</Slots.primaryText>
      <Slots.secondaryText />
    </Slots.root>
  );
};
