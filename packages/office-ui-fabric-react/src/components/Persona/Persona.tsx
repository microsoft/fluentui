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
import { getNativeProps, divProperties } from '../../utilities/properties';

import './Persona.scss';

export class Persona extends React.Component<IPersonaProps, any> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    initialsColor: PersonaInitialsColor.blue,
    presence: PersonaPresence.none
  };

  public render() {
    let {
      className,
      size,
      imageUrl,
      imageInitials,
      initialsColor,
      presence,
      primaryText,
      secondaryText,
      tertiaryText,
      optionalText,
      hidePersonaDetails
    } = this.props;

    let presenceElement = null;
    if (presence !== PersonaPresence.none) {
      let userPresence = PersonaPresence[presence],
        statusIcon = null;
      switch (userPresence) {
        case 'online':
          userPresence = 'SkypeCheck';
          break;
        case 'away':
          userPresence = 'SkypeClock';
          break;
        case 'dnd':
          userPresence = 'SkypeMinus';
          break;
        default:
          userPresence = '';
      }
      if (userPresence) {
        let iconClass = `ms-Persona-presenceIcon ms-Icon ms-Icon--${userPresence}`;
        statusIcon = <i className={ iconClass }></i>;
      }
      presenceElement = <div className='ms-Persona-presence'>{ statusIcon }</div>;
    }

    let divProps = getNativeProps(this.props, divProperties);
    let personaDetails = <div className='ms-Persona-details'>
      <div className='ms-Persona-primaryText'>{ primaryText }</div>
      { secondaryText ? (
        <div className='ms-Persona-secondaryText'>{ secondaryText }</div>
      ) : (null) }
      <div className='ms-Persona-tertiaryText'>{ tertiaryText }</div>
      <div className='ms-Persona-optionalText'>{ optionalText }</div>
      { this.props.children }
    </div>;

    return (
      <div { ...divProps } className={ css('ms-Persona', className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence]) }>
        { size !== PersonaSize.tiny && (
          <div className='ms-Persona-imageArea'>
            <div className={ css('ms-Persona-initials', PERSONA_INITIALS_COLOR[initialsColor]) }>{ imageInitials }</div>
            <Image className='ms-Persona-image' imageFit={ ImageFit.cover } src={ imageUrl } />
          </div>
        ) }
        { presenceElement }
        { (!hidePersonaDetails || (size === PersonaSize.tiny)) && personaDetails }
      </div>
    );
  }
}
