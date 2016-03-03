import * as React from 'react';
import { css } from '../../utilities/css';

import './Persona.scss';

export enum PersonaSize {
  tiny,
  extraSmall,
  small,
  regular,
  large,
  extraLarge
}

export enum PersonaPresence {
  offline,
  online,
  away,
  dnd,
  blocked
}

export interface IPersonaProps {
  primaryText: string;
  size?: PersonaSize;
  imageUrl?: string;
  imageInitials?: string;
  presence?: PersonaPresence;
  secondaryText?: string;
  tertiaryText?: string;
  optionalText?: string;

  key?: string;
  ref?: string;
  className?: string;
}

const PERSONA_SIZE = {
  [PersonaSize.tiny]: 'ms-Persona--tiny',
  [PersonaSize.extraSmall]: 'ms-Persona--xs',
  [PersonaSize.small]: 'ms-Persona--sm',
  [PersonaSize.regular]: '',
  [PersonaSize.large]: 'ms-Persona--lg',
  [PersonaSize.extraLarge]: 'ms-Persona--xl'
};

const PERSONA_PRESENCE = {
  [PersonaPresence.offline]: 'ms-Persona--offline',
  [PersonaPresence.online]: 'ms-Persona--online',
  [PersonaPresence.away]: 'ms-Persona--away',
  [PersonaPresence.dnd]: 'ms-Persona--dnd',
  [PersonaPresence.blocked]: 'ms-Persona--blocked'
}

export class Persona extends React.Component<IPersonaProps, any> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    presence: PersonaPresence.offline
  };

  public render() {
    let { className, size, imageUrl, imageInitials, presence, primaryText, secondaryText, tertiaryText, optionalText } = this.props;

    return (
      <div className={ css('ms-Persona', className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence]) }>
        { size !== PersonaSize.tiny ? (
        <div className='ms-Persona-imageArea'>
          <div className='ms-Persona-initials ms-Persona-initials--blue'>{ imageInitials }</div>
          <img className='ms-Persona-image' src={ imageUrl } />
        </div>
        ) : (null) }
        <div className='ms-Persona-presence'></div>
        <div className='ms-Persona-details'>
          <div className='ms-Persona-primaryText'>{ primaryText }</div>
          { secondaryText ? (
          <div className='ms-Persona-secondaryText'>{ secondaryText }</div>
          ) : (null) }
          <div className='ms-Persona-tertiaryText'>{ tertiaryText }</div>
          <div className='ms-Persona-optionalText'>{ optionalText }</div>
        </div>
      </div>
      );
  }
}

export default Persona;
