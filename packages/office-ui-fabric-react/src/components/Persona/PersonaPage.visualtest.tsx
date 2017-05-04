import { Persona, PersonaSize, PersonaPresence } from './index';
import { Icon } from '../../Icon';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class PersonaVPage extends React.Component<any, any> {
  public render() {
    const examplePersona = {
      imageUrl: './images/persona-female.png',
      imageInitials: 'AL',
      primaryText: 'Annie Lindqvist',
      secondaryText: 'Software Engineer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm'
    };
    return <div>
      <Persona className='PersonaTiny'
        { ...examplePersona }
        size={ PersonaSize.tiny }
        presence={ PersonaPresence.offline }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaExtraExtraSmall'
        { ...examplePersona }
        size={ PersonaSize.extraExtraSmall }
        presence={ PersonaPresence.none }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaSize28'
        { ...examplePersona }
        size={ PersonaSize.size28 }
        presence={ PersonaPresence.none }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaExtraSmall'
        { ...examplePersona }
        size={ PersonaSize.extraSmall }
        presence={ PersonaPresence.online }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaSmall'
        { ...examplePersona }
        size={ PersonaSize.small }
        presence={ PersonaPresence.away }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaBusy'
        { ...examplePersona }
        hidePersonaDetails={ false }
        presence={ PersonaPresence.busy }
      />
      <Persona className='PersonaDND'
        { ...examplePersona }
        size={ PersonaSize.large }
        presence={ PersonaPresence.dnd }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaBlocked'
        { ...examplePersona }
        size={ PersonaSize.extraLarge }
        presence={ PersonaPresence.blocked }
        hidePersonaDetails={ false }
      />
      <Persona className='PersonaInitials'
        { ...{
          imageInitials: 'KL',
          secondaryText: 'Designer',
          tertiaryText: 'In a meeting',
          optionalText: 'Available at 4:00pm'
        } }
        primaryText='Kat Larrson' />

      <Persona className='PersonaCustom'
        { ...examplePersona  }
        primaryText='Kat Larrson'
        onRenderSecondaryText={ () => {
          return <div>
            <Icon iconName={ 'Suitcase' } />
            { 'Software Engineer' }
          </div>;
        } }
      />
    </div>;
  }
}