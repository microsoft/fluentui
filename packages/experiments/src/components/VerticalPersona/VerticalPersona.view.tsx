import * as React from 'react';
import { PersonaCoin } from '@uifabric/experiments/lib/PersonaCoin';
import { getSlots } from '@uifabric/experiments/lib/utilities/slots';
import { IVerticalPersonaComponent, IVerticalPersonaSlots } from './VerticalPersona.types';
import { PersonaText } from './PersonaText';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const classNames = props.classNames;

  const Slots = getSlots<typeof props, IVerticalPersonaSlots>(props, {
    root: 'div',
    primaryText: PersonaText,
    secondaryText: PersonaText,
    coin: PersonaCoin
  });

  return (
    <div className={classNames.root}>
      <Slots.coin text={props.text} />
      <Slots.primaryText wrap>{props.text}</Slots.primaryText>
      <Slots.secondaryText wrap />
    </div>
  );
};
