import * as React from 'react';
import { PersonaCoin } from '../../PersonaCoin/PersonaCoin';
import { getSlots } from '../../../Foundation';
import { IVerticalPersonaComponent, IVerticalPersonaSlots } from './VerticalPersona.types';
import { PersonaText } from '../PersonaText/PersonaText';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const Slots = getSlots<typeof props, IVerticalPersonaSlots>(props, {
    root: 'div',
    primaryText: PersonaText,
    secondaryText: PersonaText,
    coin: PersonaCoin
  });

  return (
    <Slots.root>
      <Slots.coin text={props.text} />
      <Slots.primaryText wrap>{props.text}</Slots.primaryText>
      <Slots.secondaryText wrap />
    </Slots.root>
  );
};
