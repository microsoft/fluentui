import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps, IRenderFunction } from '../../Utilities';
import { TooltipHost, TooltipOverflowMode, DirectionalHint } from '../../Tooltip';
import { PersonaCoin } from './PersonaCoin/PersonaCoin';
import {
  IPersonaProps,
  IPersonaSharedProps,
  IPersonaStyleProps,
  IPersonaStyles,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from './Persona.types';

const getClassNames = classNamesFunction<IPersonaStyleProps, IPersonaStyles>();

/**
 * Persona with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export class PersonaBase extends BaseComponent<IPersonaProps, {}> {
  public static defaultProps: IPersonaProps = {
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
  };

  constructor(props: IPersonaProps) {
    super(props);

    this._warnDeprecations({ primaryText: 'text' });
  }

  public render(): JSX.Element {
    const {
      hidePersonaDetails,
      onRenderOptionalText,
      onRenderPrimaryText,
      onRenderSecondaryText,
      onRenderTertiaryText
    } = this.props;
    const size = this.props.size as PersonaSize;

    // These properties are to be explicitly passed into PersonaCoin because they are the only props directly used
    const {
      allowPhoneInitials,
      className,
      coinProps,
      showUnknownPersonaCoin,
      coinSize,
      styles,
      imageAlt,
      imageInitials,
      imageShouldFadeIn,
      imageShouldStartVisible,
      imageUrl,
      initialsColor,
      onPhotoLoadingStateChange,
      onRenderCoin,
      onRenderInitials,
      presence,
      showInitialsUntilImageLoads,
      showSecondaryText,
      theme
    } = this.props;

    const personaCoinProps: IPersonaSharedProps = {
      allowPhoneInitials,
      coinProps,
      showUnknownPersonaCoin,
      coinSize,
      imageAlt,
      imageInitials,
      imageShouldFadeIn,
      imageShouldStartVisible,
      imageUrl,
      initialsColor,
      onPhotoLoadingStateChange,
      onRenderCoin,
      onRenderInitials,
      presence,
      showInitialsUntilImageLoads,
      size,
      text: this._getText()
    };

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      showSecondaryText,
      presence,
      size
    });

    const divProps = getNativeProps(this.props, divProperties);
    const personaDetails = (
      <div className={classNames.details}>
        {this._renderElement(this._getText(), classNames.primaryText, onRenderPrimaryText)}
        {this._renderElement(this.props.secondaryText, classNames.secondaryText, onRenderSecondaryText)}
        {this._renderElement(this.props.tertiaryText, classNames.tertiaryText, onRenderTertiaryText)}
        {this._renderElement(this.props.optionalText, classNames.optionalText, onRenderOptionalText)}
        {this.props.children}
      </div>
    );

    return (
      <div
        {...divProps}
        className={classNames.root}
        style={coinSize ? { height: coinSize, minWidth: coinSize } : undefined}
      >
        <PersonaCoin {...personaCoinProps} />
        {(!hidePersonaDetails || (size === PersonaSize.size10 || size === PersonaSize.tiny)) && personaDetails}
      </div>
    );
  }

  /**
   * Deprecation helper for getting text.
   */
  private _getText(): string {
    return this.props.text || this.props.primaryText || '';
  }

  private _renderElement = (
    text: string | undefined,
    className: string,
    render?: IRenderFunction<IPersonaProps>
  ): JSX.Element => {
    return (
      <div className={className}>
        {render
          ? render(this.props)
          : text && (
              <TooltipHost
                content={text}
                overflowMode={TooltipOverflowMode.Parent}
                directionalHint={DirectionalHint.topLeftEdge}
              >
                {text}
              </TooltipHost>
            )}
      </div>
    );
  };
}
