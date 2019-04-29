/** @jsx withSlots */
import { PersonaCoin } from '../../PersonaCoin/PersonaCoin';
import { getSlots, withSlots } from '../../../Foundation';
import { IVerticalPersonaComponent, IVerticalPersonaProps, IVerticalPersonaSlots } from './VerticalPersona.types';
import { PersonaText } from '../PersonaText/PersonaText';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const Slots = getSlots<IVerticalPersonaProps, IVerticalPersonaSlots>(props, {
    root: 'div',
    primaryText: PersonaText,
    secondaryText: PersonaText,
    coin: PersonaCoin
  });

  return (
    <Slots.root>
      <Slots.coin text={props.text} />
      <Slots.primaryText>{props.text}</Slots.primaryText>
      <Slots.secondaryText />
    </Slots.root>
  );
};
