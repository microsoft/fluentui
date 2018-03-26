import * as React from 'react';
import {
  BaseComponent,
  css,
  divProperties,
  getNativeProps,
  IRenderFunction
} from '../../Utilities';
import { TooltipHost, TooltipOverflowMode, DirectionalHint } from '../../Tooltip';
import { PersonaCoin } from './PersonaCoin';
import {
  IPersonaProps,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from './Persona.types';
import {
  PERSONA_PRESENCE,
  PERSONA_SIZE
} from './PersonaConsts';
import * as stylesImport from './Persona.scss';
const styles: any = stylesImport;

export class PersonaBase extends BaseComponent<IPersonaProps, {}> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
  };

  constructor(props: IPersonaProps) {
    super(props);
  }

  public render() {
    const {
      hidePersonaDetails,
      onRenderPrimaryText,
      onRenderSecondaryText,
      onRenderTertiaryText,
      onRenderOptionalText,
    } = this.props;
    const size = this.props.size as PersonaSize;

    // These properties are to be explicitly passed into PersonaCoin because they are the only props directly used
    const {
      className,
      coinProps,
      coinSize,
      imageUrl,
      imageAlt,
      imageInitials,
      initialsColor,
      presence,
      primaryText,
      imageShouldFadeIn,
      imageShouldStartVisible,
      showSecondaryText,
      onPhotoLoadingStateChange,
      onRenderCoin
    } = this.props;

    const personaCoinProps = {
      coinProps,
      coinSize,
      imageUrl,
      imageAlt,
      imageInitials,
      initialsColor,
      presence,
      primaryText,
      imageShouldFadeIn,
      imageShouldStartVisible,
      size,
      onPhotoLoadingStateChange,
      onRenderCoin
    };

    const divProps = getNativeProps(this.props, divProperties);
    const personaDetails = (
      <div className={ css('ms-Persona-details', styles.details) }>
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
      </div>
    );

    return (
      <div
        { ...divProps }
        className={
          css('ms-Persona',
            styles.root,
            className,
            PERSONA_SIZE[size],
            PERSONA_PRESENCE[presence as PersonaPresenceEnum],
            showSecondaryText && styles.showSecondaryText
          )
        }
        style={ coinSize ? { height: coinSize, minWidth: coinSize } : undefined }
      >
        <PersonaCoin { ...personaCoinProps } />
        { (!hidePersonaDetails || (size === PersonaSize.size10 || size === PersonaSize.tiny)) && personaDetails }
      </div>
    );
  }

  private _renderElement = (text: string | undefined, className: string, render?: IRenderFunction<IPersonaProps>): JSX.Element => {
    return (
      <div className={ className }>
        { render
          ? render(this.props)
          : text && (<TooltipHost
            content={ text }
            overflowMode={ TooltipOverflowMode.Parent }
            directionalHint={ DirectionalHint.topLeftEdge }
          >
            { text }
          </TooltipHost>)
        }
      </div>
    );
  }
}
