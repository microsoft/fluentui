import * as React from 'react';
import {
  autobind,
  css,
  divProperties,
  getInitials,
  getNativeProps,
  getRTL
} from '../../Utilities';
import { Image, ImageFit, ImageLoadState } from '../../Image';
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

// The RGB color swatches
const COLOR_SWATCHES_LOOKUP: PersonaInitialsColor[] = [
  PersonaInitialsColor.lightGreen,
  PersonaInitialsColor.lightBlue,
  PersonaInitialsColor.lightPink,
  PersonaInitialsColor.green,
  PersonaInitialsColor.darkGreen,
  PersonaInitialsColor.lightPink,
  PersonaInitialsColor.magenta,
  PersonaInitialsColor.purple,
  PersonaInitialsColor.black,
  PersonaInitialsColor.teal,
  PersonaInitialsColor.blue,
  PersonaInitialsColor.darkBlue,
  PersonaInitialsColor.orange,
  PersonaInitialsColor.darkRed,
  PersonaInitialsColor.red
];

const COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length;

export interface IPersonaState {
  isImageLoaded?: boolean;
}

export class Persona extends React.Component<IPersonaProps, IPersonaState> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    presence: PersonaPresence.none
  };

  constructor(props: IPersonaProps) {
    super(props);

    this.state = {
      isImageLoaded: false,
    };
  }

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
      hidePersonaDetails,
      imageShouldFadeIn
    } = this.props;

    let isRTL = getRTL();

    imageInitials = imageInitials || getInitials(primaryText, isRTL);
    initialsColor = initialsColor !== undefined && initialsColor !== null ? initialsColor : this._getColorFromName(primaryText);

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
      <div
        { ...divProps }
        className={ css('ms-Persona', className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence]) }
        >
        { size !== PersonaSize.tiny && (
          <div className='ms-Persona-imageArea'>
            {
              !this.state.isImageLoaded &&
              (<div className={ css('ms-Persona-initials', PERSONA_INITIALS_COLOR[initialsColor]) } aria-hidden='true'>{ imageInitials }</div>)
            }
            <Image
              className='ms-Persona-image'
              imageFit={ ImageFit.cover }
              src={ imageUrl }
              shouldFadeIn={ imageShouldFadeIn }
              onLoadingStateChange={ this._onPhotoLoadingStateChange } />
          </div>
        ) }
        { presenceElement }
        { (!hidePersonaDetails || (size === PersonaSize.tiny)) && personaDetails }
      </div>
    );
  }

  private _getColorFromName(displayName: string): PersonaInitialsColor {
    let color = PersonaInitialsColor.blue;
    if (!displayName) {
      return color;
    }

    let hashCode = 0;
    for (let iLen: number = displayName.length - 1; iLen >= 0; iLen--) {
      const ch: number = displayName.charCodeAt(iLen);
      const shift: number = iLen % 8;
      // tslint:disable-next-line:no-bitwise
      hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }

    color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES];

    return color;
  }

  @autobind
  private _onPhotoLoadingStateChange(loadState: ImageLoadState) {
    this.setState({
      isImageLoaded: loadState === ImageLoadState.loaded
    });
  }
}
