import * as React from 'react';
import { css } from '../../utilities/css';
import Image from '../Image/Image';
import './Persona.scss';
import {
  IPersonaProps,
  PersonaInitialsColor,
  PersonaPresence,
  PersonaSize
} from './Persona.Props';
import {
  PERSONA_INITIALS_COLOR,
  PERSONA_PRESENCE,
  PERSONA_SIZE
} from './PersonaConsts';

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
        { (!this.props.hidePersonaDetails) && (
          <div className='ms-Persona-details'>
            <div className='ms-Persona-primaryText'>{ primaryText }</div>
            { secondaryText ? (
              <div className='ms-Persona-secondaryText'>{ secondaryText }</div>
            ) : (null) }
            <div className='ms-Persona-tertiaryText'>{ tertiaryText }</div>
            <div className='ms-Persona-optionalText'>{ optionalText }</div>
          </div>) }
      </div>
    );
  }
}

export default Persona;
