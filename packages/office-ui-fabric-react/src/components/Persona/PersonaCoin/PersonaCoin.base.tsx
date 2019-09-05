import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getInitials, getNativeProps, getRTL } from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import { PersonaPresence } from '../PersonaPresence/index';
import { Icon } from '../../../Icon';
import { Image, ImageFit, ImageLoadState } from '../../../Image';
import {
  IPersonaCoinProps,
  IPersonaCoinStyleProps,
  IPersonaCoinStyles,
  IPersonaPresenceProps,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from '../Persona.types';
import { getPersonaInitialsColor } from '../PersonaInitialsColor';
import { sizeToPixels } from '../PersonaConsts';

const getClassNames = classNamesFunction<IPersonaCoinStyleProps, IPersonaCoinStyles>();

export interface IPersonaState {
  isImageLoaded?: boolean;
  isImageError?: boolean;
}

/**
 * PersonaCoin with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export class PersonaCoinBase extends BaseComponent<IPersonaCoinProps, IPersonaState> {
  public static defaultProps: IPersonaCoinProps = {
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
  };

  constructor(props: IPersonaCoinProps) {
    super(props);

    this._warnDeprecations({ primaryText: 'text' });

    this.state = {
      isImageLoaded: false,
      isImageError: false
    };
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(nextProps: IPersonaCoinProps): void {
    if (nextProps.imageUrl !== this.props.imageUrl) {
      this.setState({
        isImageLoaded: false,
        isImageError: false
      });
    }
  }

  public render(): JSX.Element | null {
    const {
      className,
      coinProps,
      showUnknownPersonaCoin,
      coinSize,
      styles,
      imageUrl,
      isOutOfOffice,
      onRenderCoin = this._onRenderCoin,
      onRenderInitials = this._onRenderInitials,
      presence,
      presenceTitle,
      showInitialsUntilImageLoads,
      theme
    } = this.props;

    const size = this.props.size as PersonaSize;
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);
    const divCoinProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(coinProps || {}, divProperties);
    const coinSizeStyle = coinSize ? { width: coinSize, height: coinSize } : undefined;
    const hideImage = showUnknownPersonaCoin;

    const personaPresenceProps: IPersonaPresenceProps = {
      coinSize,
      isOutOfOffice,
      presence,
      presenceTitle,
      size,
      theme
    };

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(styles, {
      theme: theme!,
      className: coinProps && coinProps.className ? coinProps.className : className,
      size,
      coinSize,
      showUnknownPersonaCoin
    });

    const shouldRenderInitials = Boolean(
      !this.state.isImageLoaded && ((showInitialsUntilImageLoads && imageUrl) || !imageUrl || this.state.isImageError || hideImage)
    );

    return (
      <div {...divProps} className={classNames.coin}>
        {// Render PersonaCoin if size is not size8. size10 and tiny need to removed after a deprecation cleanup.
        size !== PersonaSize.size8 && size !== PersonaSize.size10 && size !== PersonaSize.tiny ? (
          <div {...divCoinProps} className={classNames.imageArea} style={coinSizeStyle}>
            {shouldRenderInitials && (
              <div
                className={mergeStyles(
                  classNames.initials,
                  !showUnknownPersonaCoin && { backgroundColor: getPersonaInitialsColor(this.props) }
                )}
                style={coinSizeStyle}
                aria-hidden="true"
              >
                {onRenderInitials(this.props, this._onRenderInitials)}
              </div>
            )}
            {!hideImage && onRenderCoin(this.props, this._onRenderCoin)}
            <PersonaPresence {...personaPresenceProps} />
          </div>
        ) : // Otherwise, render just PersonaPresence.
        this.props.presence ? (
          <PersonaPresence {...personaPresenceProps} />
        ) : (
          // Just render Contact Icon if there isn't a Presence prop.
          <Icon iconName="Contact" className={classNames.size10WithoutPresenceIcon} />
        )}
        {this.props.children}
      </div>
    );
  }

  private _onRenderCoin = (props: IPersonaCoinProps): JSX.Element | null => {
    const { coinSize, styles, imageUrl, imageAlt, imageShouldFadeIn, imageShouldStartVisible, theme, showUnknownPersonaCoin } = this.props;

    // Render the Image component only if an image URL is provided
    if (!imageUrl) {
      return null;
    }

    const size = this.props.size as PersonaSize;

    const classNames = getClassNames(styles, {
      theme: theme!,
      size,
      showUnknownPersonaCoin
    });

    const dimension = coinSize || sizeToPixels[size];

    return (
      <Image
        className={classNames.image}
        imageFit={ImageFit.cover}
        src={imageUrl}
        width={dimension}
        height={dimension}
        alt={imageAlt}
        shouldFadeIn={imageShouldFadeIn}
        shouldStartVisible={imageShouldStartVisible}
        onLoadingStateChange={this._onPhotoLoadingStateChange}
      />
    );
  };

  /**
   * Deprecation helper for getting text.
   */
  private _getText(): string {
    return this.props.text || this.props.primaryText || '';
  }

  private _onRenderInitials = (props: IPersonaCoinProps): JSX.Element => {
    let { imageInitials } = props;
    const { allowPhoneInitials, showUnknownPersonaCoin } = props;

    if (showUnknownPersonaCoin) {
      return <Icon iconName="Help" />;
    }

    const isRTL = getRTL();

    imageInitials = imageInitials || getInitials(this._getText(), isRTL, allowPhoneInitials);

    return imageInitials !== '' ? <span>{imageInitials}</span> : <Icon iconName="Contact" />;
  };

  private _onPhotoLoadingStateChange = (loadState: ImageLoadState) => {
    this.setState({
      isImageLoaded: loadState === ImageLoadState.loaded,
      isImageError: loadState === ImageLoadState.error
    });

    this.props.onPhotoLoadingStateChange && this.props.onPhotoLoadingStateChange(loadState);
  };
}
