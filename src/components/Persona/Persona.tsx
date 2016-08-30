import * as React from 'react';
import { css } from '../../utilities/css';
import { Image, ImageFit } from '../../Image';
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
import './Persona.scss';

export class Persona extends React.Component<IPersonaProps, any> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    initialsColor: PersonaInitialsColor.blue,
    presence: PersonaPresence.none
  };

  public render() {
      let { className, size, imageUrl, imageInitials, initialsColor, presence, primaryText, secondaryText, tertiaryText, optionalText, hidePersonaDetails, secondaryControl } = this.props;
     let personaDetailsClass = secondaryControl ? 'ms-Persona-details-controls' : 'ms-Persona-details';

    return (
      <div { ... this.props as any } className={ css('ms-Persona', className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence]) }>
        { size !== PersonaSize.tiny && (
          <div className='ms-Persona-imageArea'>
            <div className={ css('ms-Persona-initials', PERSONA_INITIALS_COLOR[initialsColor]) }>{ imageInitials }</div>
            <Image className='ms-Persona-image' imageFit={ ImageFit.cover } src={ imageUrl } />
          </div>
        ) }

        { presence !== PersonaPresence.none && <div className='ms-Persona-presence'></div> }
        { !hidePersonaDetails && (
                <div className= { personaDetailsClass }>
            <div className='ms-Persona-primaryText'>{ primaryText }</div>
            { secondaryText ? (
              <div className='ms-Persona-secondaryText'>{ secondaryText }</div>
                ) : secondaryControl ? (<div className='ms-Persona-secondaryControl'>{ secondaryControl }</div>) : (null) }
            <div className='ms-Persona-tertiaryText'>{ tertiaryText }</div>
            <div className='ms-Persona-optionalText'>{ optionalText }</div>
          </div>) }
      </div>
    );
  }
}
