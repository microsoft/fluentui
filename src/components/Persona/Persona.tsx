import * as React from 'react';
import { css } from '../../utilities/css';
import Image from '../Image/Image';
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

export enum PersonaInitialsColor {
  lightBlue,
  blue,
  darkBlue,
  teal,
  lightGreen,
  green,
  darkGreen,
  lightPink,
  pink,
  magenta,
  purple,
  black,
  orange,
  red,
  darkRed
}

export interface IPersonaProps {
  primaryText: string;
  size?: PersonaSize;
  imageUrl?: string;
  imageInitials?: string;
  initialsColor?: PersonaInitialsColor;
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
};

const PERSONA_INITIALS_COLOR = {
  [PersonaInitialsColor.lightBlue]: 'ms-Persona-initials--lightBlue',
  [PersonaInitialsColor.blue]: 'ms-Persona-initials--blue',
  [PersonaInitialsColor.darkBlue]: 'ms-Persona-initials--darkBlue',
  [PersonaInitialsColor.teal]: 'ms-Persona-initials--teal',
  [PersonaInitialsColor.lightGreen]: 'ms-Persona-initials--lightGreen',
  [PersonaInitialsColor.green]: 'ms-Persona-initials--green',
  [PersonaInitialsColor.darkGreen]: 'ms-Persona-initials--darkGreen',
  [PersonaInitialsColor.lightPink]: 'ms-Persona-initials--lightPink',
  [PersonaInitialsColor.pink]: 'ms-Persona-initials--pink',
  [PersonaInitialsColor.magenta]: 'ms-Persona-initials--magenta',
  [PersonaInitialsColor.purple]: 'ms-Persona-initials--purple',
  [PersonaInitialsColor.black]: 'ms-Persona-initials--black',
  [PersonaInitialsColor.orange]: 'ms-Persona-initials--orange',
  [PersonaInitialsColor.red]: 'ms-Persona-initials--red',
  [PersonaInitialsColor.darkRed]: 'ms-Persona-initials--darkRed'
};

export class Persona extends React.Component<IPersonaProps, any> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    presence: PersonaPresence.offline,
    initialsColor: PersonaInitialsColor.blue
  };

  public render() {
    let { className, size, imageUrl, imageInitials, initialsColor, presence, primaryText, secondaryText, tertiaryText, optionalText } = this.props;

    return (
      <div className={ css('ms-Persona', className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence]) }>
        { size !== PersonaSize.tiny ? (
        <div className='ms-Persona-imageArea'>
          <div className={ css('ms-Persona-initials', PERSONA_INITIALS_COLOR[initialsColor]) }>{ imageInitials }</div>
          <Image className='ms-Persona-image' src={ imageUrl } />
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
