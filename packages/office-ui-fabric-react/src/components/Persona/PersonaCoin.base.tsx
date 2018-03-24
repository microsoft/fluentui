import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  divProperties,
  getInitials,
  getNativeProps,
  getRTL,
  IClassNames,
} from '../../Utilities';
import { PersonaPresence } from './PersonaPresence';
import {
  IPersonaProps,
  IPersonaStyleProps,
  IPersonaStyles,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize,
} from './Persona.types';
import {
  Icon
} from '../../Icon';
import {
  Image,
  ImageFit,
  ImageLoadState
} from '../../Image';
import { mergeStyles } from '../../Styling';
import { initialsColorPropToColorCode } from './PersonaInitialsColor';

const getClassNames = classNamesFunction<IPersonaStyleProps, IPersonaStyles>();

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

export interface IPersonaState {
  isImageLoaded?: boolean;
  isImageError?: boolean;
}

// export class PersonaCoinBase extends React.Component<IPersonaProps, IPersonaState> {
@customizable('PersonaCoin', ['theme'])
export class PersonaCoinBase extends BaseComponent<IPersonaProps, IPersonaState> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: '',
    coinProps: {
      className: '',
    },
  };

  private _classNames: IClassNames<IPersonaStyles>;

  constructor(props: IPersonaProps) {
    super(props);

    this.state = {
      isImageLoaded: false,
      isImageError: false
    };

    this._classNames = getClassNames(this.props.getStyles!, {
      theme: this.props.theme!,
      className: this.props.coinProps!.className!,
      size: this.props.size,
    });
  }

  public render() {
    const {
      coinProps,
      coinSize,
      imageUrl,
      onRenderCoin = this._onRenderCoin,
      onRenderInitials = this._onRenderInitials,
      presence,
      theme,
    } = this.props;

    const size = this.props.size as PersonaSize;
    const divProps = getNativeProps(this.props, divProperties);
    const coinSizeStyle = coinSize ? { width: coinSize, height: coinSize } : undefined;

    return (
      <div
        { ...divProps }
        className={ this._classNames.coin }
      >
        { (size !== PersonaSize.size10 && size !== PersonaSize.tiny) ? (
          <div
            { ...coinProps }
            className={ this._classNames.imageArea }
            style={ coinSizeStyle }
          >
            {
              !this.state.isImageLoaded &&
              (!imageUrl || this.state.isImageError) &&
              (
                <div
                  className={ mergeStyles(
                    this._classNames.initials,
                    {
                      backgroundColor: initialsColorPropToColorCode(this.props)
                    }
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
          (this.props.presence
            ? <PersonaPresence { ...this.props } />
            : <Icon
              iconName='Contact'
              className={ this._classNames.size10NoPresenceIcon }
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
      imageShouldStartVisible,
    } = this.props;

    const size = this.props.size as PersonaSize;

    return (
      <Image
        className={ this._classNames.image }
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

    const isRTL = getRTL();

    imageInitials = imageInitials || getInitials(primaryText, isRTL);

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