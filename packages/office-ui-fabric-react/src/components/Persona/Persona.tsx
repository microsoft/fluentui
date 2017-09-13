import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getNativeProps,
  IRenderFunction
} from '../../Utilities';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { PersonaCoin } from './PersonaCoin';
import {
  IPersonaProps,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from './Persona.Props';
import {
  PERSONA_PRESENCE,
  PERSONA_SIZE
} from './PersonaConsts';
import * as stylesImport from './Persona.scss';
const styles: any = stylesImport;

export class Persona extends BaseComponent<IPersonaProps, {}> {
  public static defaultProps: IPersonaProps = {
    primaryText: '',
    size: PersonaSize.regular,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
  };

  constructor(props: IPersonaProps) {
    super(props);
  }

  public render() {
    let {
      className,
      presence,
      hidePersonaDetails,
      onRenderPrimaryText,
      onRenderSecondaryText,
      onRenderTertiaryText,
      onRenderOptionalText,
    } = this.props;
    let size = this.props.size as PersonaSize;

    let divProps = getNativeProps(this.props, divProperties);
    let personaDetails = (
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
        className={ css('ms-Persona', styles.root, className, PERSONA_SIZE[size], PERSONA_PRESENCE[presence as PersonaPresenceEnum], this.props.showSecondaryText ? styles.showSecondaryText : '') }
      >
        <PersonaCoin { ...this.props } />
        { (!hidePersonaDetails || (size === PersonaSize.tiny)) && personaDetails }
      </div>
    );
  }

  @autobind
  private _renderElement(text: string | undefined, className: string, render?: IRenderFunction<IPersonaProps>): JSX.Element {
    return (
      <div className={ className }>
        { render
          ? render(this.props)
          : <TooltipHost content={ text } overflowMode={ TooltipOverflowMode.Parent }>{ text }</TooltipHost>
        }
      </div>
    );
  }
}
