import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getInitials,
  getNativeProps,
  getRTL,
  IRenderFunction
} from '../../Utilities';
import { Icon } from '../../Icon';
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
import * as stylesImport from './Persona.scss';
const styles: any = stylesImport;

const SIZE_TO_PIXELS = {
  [PersonaSize.extraExtraSmall]: 24,
  [PersonaSize.size28]: 28,
  [PersonaSize.tiny]: 30,
  [PersonaSize.extraSmall]: 32,
  [PersonaSize.small]: 40,
  [PersonaSize.regular]: 48,
  [PersonaSize.large]: 72,
  [PersonaSize.extraLarge]: 100
};

// The RGB color swatches
const COLOR_SWATCHES_LOOKUP: PersonaInitialsColor[] = [
  PersonaInitialsColor.lightGreen,
  PersonaInitialsColor.lightBlue,
  PersonaInitialsColor.lightPink,
  PersonaInitialsColor.green,
  PersonaInitialsColor.darkGreen,
  PersonaInitialsColor.pink,
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

export class Persona extends BaseComponent<IPersonaProps, IPersonaState> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    presence: PersonaPresence.none,
    imageAlt: ''
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
      imageUrl,
      imageAlt,
      initialsColor,
      presence,
      primaryText,
      hidePersonaDetails,
      imageShouldFadeIn,
      onRenderInitials = this._onRenderInitials,
      onRenderPrimaryText,
      onRenderSecondaryText,
      onRenderTertiaryText,
      onRenderOptionalText,
      imageShouldStartVisible
    } = this.props;
    let size = this.props.size as PersonaSize;

    initialsColor = initialsColor !== undefined && initialsColor !== null ? initialsColor : this._getColorFromName(primaryText);

    let presenceElement = null;
    if (presence !== PersonaPresence.none) {
      let userPresence = PersonaPresence[presence as PersonaPresence],
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
        statusIcon = (
          <Icon className={ css('ms-Persona-presenceIcon', styles.presenceIcon) } iconName={ userPresence } />
        );
      }
      presenceElement = <div className={ css('ms-Persona-presence', styles.presence) }>{ statusIcon }</div>;
    }

    let divProps = getNativeProps(this.props, divProperties);
    let personaDetails = <div className={ css('ms-Persona-details', styles.details) }>
      { this._renderElement(
        this.props.primaryText,
        css('ms-Persona-primaryText', styles.primaryText),
        onRenderPrimaryText) }
      { this._renderElement(
        this.props.secondaryText,
        css('ms-Persona-secondaryText', styles.secondaryText),
        onRenderSecondaryText) }
      { this._renderElement(
        this.props.tertiaryText,
        css('ms-Persona-tertiaryText', styles.tertiaryText),
        onRenderTertiaryText) }
      { this._renderElement(
        this.props.optionalText,
        css('ms-Persona-optionalText', styles.optionalText),
        onRenderOptionalText) }
      { this.props.children }
    </div>;

    return (
      <div
        { ...divProps }
        className={ css('ms-Persona', styles.root, className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence as PersonaPresence], this.props.showSecondaryText ? styles.showSecondaryText : '') }
      >
        { size !== PersonaSize.tiny && (
          <div className={ css('ms-Persona-imageArea', styles.imageArea) }>
            {
              !this.state.isImageLoaded &&
              (
                <div
                  className={ css(
                    'ms-Persona-initials',
                    styles.initials,
                    PERSONA_INITIALS_COLOR[initialsColor]
                  ) }
                  aria-hidden='true'
                >
                  { onRenderInitials(this.props, this._onRenderInitials) }
                </div>
              )
            }
            <Image
              className={ css('ms-Persona-image', styles.image) }
              imageFit={ ImageFit.cover }
              src={ imageUrl }
              width={ SIZE_TO_PIXELS[size] }
              height={ SIZE_TO_PIXELS[size] }
              alt={ imageAlt }
              shouldFadeIn={ imageShouldFadeIn }
              shouldStartVisible={ imageShouldStartVisible }
              onLoadingStateChange={ this._onPhotoLoadingStateChange }
            />
          </div>
        ) }
        { presenceElement }
        { (!hidePersonaDetails || (size === PersonaSize.tiny)) && personaDetails }
      </div>
    );
  }

  @autobind
  private _renderElement(text: string | undefined, className: string, render?: IRenderFunction<IPersonaProps>): JSX.Element {
    return (
      <div className={ className }>
        { render ? render(this.props) : text }
      </div>
    );
  }

  @autobind
  private _onRenderInitials(props: IPersonaProps): JSX.Element {
    let {
      imageInitials,
      primaryText
    } = props;

    let isRTL = getRTL();

    imageInitials = imageInitials || getInitials(primaryText, isRTL);

    return (
      <span>{ imageInitials }</span>
    );
  }

  private _getColorFromName(displayName: string | undefined): PersonaInitialsColor {
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
