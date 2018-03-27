import * as React from 'react';
import {
  css,
  divProperties,
  getInitials,
  getNativeProps,
  getRTL
} from '../../Utilities';
import { Image, ImageFit, ImageLoadState } from '../../Image';
import { PersonaPresence } from './PersonaPresence';
import {
  IPersonaProps,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from './Persona.types';
import {
  Icon
} from '../../Icon';
import * as stylesImport from './PersonaCoin.scss';
const styles: any = stylesImport;

const SIZE_TO_PIXELS: { [key: number]: number } = {
  [PersonaSize.tiny]: 20,
  [PersonaSize.extraExtraSmall]: 24,
  [PersonaSize.extraSmall]: 28,
  [PersonaSize.small]: 40,
  [PersonaSize.regular]: 48,
  [PersonaSize.large]: 72,
  [PersonaSize.extraLarge]: 100,

  [PersonaSize.size24]: 24,
  [PersonaSize.size28]: 28,
  [PersonaSize.size10]: 20,
  [PersonaSize.size32]: 32,
  [PersonaSize.size40]: 40,
  [PersonaSize.size48]: 48,
  [PersonaSize.size72]: 72,
  [PersonaSize.size100]: 100
};
import { mergeStyles } from '../../Styling';
import { initialsColorPropToColorCode } from './PersonaInitialsColor';

export const PERSONACOIN_SIZE: { [key: number]: string } = {
  // All non-numerically named sizes are deprecated, use the numerically named classes below
  [PersonaSize.tiny]: 'ms-Persona--tiny ' + styles.rootIsSize10,
  [PersonaSize.extraExtraSmall]: 'ms-Persona--xxs ' + styles.rootIsSize24,
  [PersonaSize.extraSmall]: 'ms-Persona--xs ' + styles.rootIsSize28,
  [PersonaSize.small]: 'ms-Persona--sm ' + styles.rootIsSize40,
  [PersonaSize.regular]: '',
  [PersonaSize.large]: 'ms-Persona--lg ' + styles.rootIsSize72,
  [PersonaSize.extraLarge]: 'ms-Persona--xl ' + styles.rootIsSize100,

  [PersonaSize.size10]: 'ms-Persona--size10 ' + styles.rootIsSize10,
  [PersonaSize.size16]: 'ms-Persona--size16 ' + styles.rootIsSize16,
  [PersonaSize.size24]: 'ms-Persona--size24 ' + styles.rootIsSize24,
  [PersonaSize.size28]: 'ms-Persona--size28 ' + styles.rootIsSize28,
  [PersonaSize.size32]: 'ms-Persona--size32 ' + styles.rootIsSize32,
  [PersonaSize.size40]: 'ms-Persona--size40 ' + styles.rootIsSize40,
  [PersonaSize.size48]: 'ms-Persona--size48 ' + styles.rootIsSize48,
  [PersonaSize.size72]: 'ms-Persona--size72 ' + styles.rootIsSize72,
  [PersonaSize.size100]: 'ms-Persona--size100 ' + styles.rootIsSize100
};

export interface IPersonaState {
  isImageLoaded?: boolean;
  isImageError?: boolean;
}

export class PersonaCoin extends React.Component<IPersonaProps, IPersonaState> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
  };

  constructor(props: IPersonaProps) {
    super(props);

    this.state = {
      isImageLoaded: false,
      isImageError: false
    };
  }

  public render(): JSX.Element | null {
    const {
      coinProps,
      coinSize,
      imageUrl,
      onRenderCoin = this._onRenderCoin,
      onRenderInitials = this._onRenderInitials,
    } = this.props;

    const size = this.props.size as PersonaSize;
    const divProps = getNativeProps(this.props, divProperties);
    const coinSizeStyle = coinSize ? { width: coinSize, height: coinSize } : undefined;

    return (
      <div
        { ...divProps }
        className={ css('ms-Persona-coin', PERSONACOIN_SIZE[size], coinProps && coinProps.className) }
      >
        { (size !== PersonaSize.size10 && size !== PersonaSize.tiny) ? (
          <div
            { ...coinProps }
            className={ css('ms-Persona-imageArea', styles.imageArea) }
            style={ coinSizeStyle }
          >
            {
              !this.state.isImageLoaded &&
              (!imageUrl || this.state.isImageError) &&
              (
                <div
                  className={ css(
                    'ms-Persona-initials',
                    styles.initials,
                    mergeStyles({
                      backgroundColor: initialsColorPropToColorCode(this.props)
                    })
                  ) }
                  style={ coinSizeStyle }
                  aria-hidden='true'
                >
                  { onRenderInitials(this.props, this._onRenderInitials) }
                </div>
              )
            }
            { onRenderCoin(this.props, this._onRenderCoin) }
            <PersonaPresence { ...this.props } />
          </div>
        ) :
          (this.props.presence ?
            <PersonaPresence
              { ...this.props }
            /> :
            <Icon
              iconName='Contact'
              className={ styles.size10NoPresenceIcon }
            />
          )
        }
        { this.props.children }
      </div>
    );
  }

  private _onRenderCoin = (props: IPersonaProps): JSX.Element | null => {
    const {
      coinSize,
      imageUrl,
      imageAlt,
      imageShouldFadeIn,
      imageShouldStartVisible
    } = this.props;

    const size = this.props.size as PersonaSize;

    return (
      <Image
        className={ css('ms-Persona-image', styles.image) }
        imageFit={ ImageFit.cover }
        src={ imageUrl }
        width={ coinSize || SIZE_TO_PIXELS[size] }
        height={ coinSize || SIZE_TO_PIXELS[size] }
        alt={ imageAlt }
        shouldFadeIn={ imageShouldFadeIn }
        shouldStartVisible={ imageShouldStartVisible }
        onLoadingStateChange={ this._onPhotoLoadingStateChange }
      />
    );
  }

  private _onRenderInitials = (props: IPersonaProps): JSX.Element => {
    let { imageInitials } = props;
    const { primaryText } = props;
    const { calculateInitialsForPhoneNumber } = props;

    const isRTL = getRTL();

    imageInitials = imageInitials || getInitials(primaryText, isRTL, calculateInitialsForPhoneNumber);

    return (
      imageInitials !== '' ?
        <span>{ imageInitials }</span> :
        <Icon iconName='Contact' />
    );
  }

  private _onPhotoLoadingStateChange = (loadState: ImageLoadState) => {
    this.setState({
      isImageLoaded: loadState === ImageLoadState.loaded,
      isImageError: loadState === ImageLoadState.error
    });

    if (this.props.onPhotoLoadingStateChange) {
      this.props.onPhotoLoadingStateChange(loadState);
    }
  }
}