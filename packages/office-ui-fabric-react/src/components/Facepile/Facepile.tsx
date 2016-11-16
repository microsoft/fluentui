import * as React from 'react';
import { css } from '../../utilities/css';
import {
  IFacepileProps,
  IFacepilePersona,
  OverflowButtonType
} from './Facepile.Props';
import {
  Persona,
  PersonaSize
} from '../../Persona';
import './Facepile.scss';
import { getNativeProps, buttonProperties, divProperties } from '../../utilities/properties';

export class Facepile extends React.Component<IFacepileProps, {}> {
  public static defaultProps: IFacepileProps = {
    maxDisplayablePersonas: 5,
    personas: []
  };

  public render(): JSX.Element {
    let { chevronButtonProps, maxDisplayablePersonas, overflowButtonProps, overflowButtonType, personas, showAddButton } = this.props;
    let numPersonasToShow: number = Math.min(personas.length, maxDisplayablePersonas);

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if(chevronButtonProps && !overflowButtonProps){
      overflowButtonProps = chevronButtonProps;
      overflowButtonType = OverflowButtonType.downArrow;
    }

    return (
      <div className='ms-Facepile'>
        <div className='ms-Facepile-members'>
          {showAddButton ? this._getAddNewElement() : null}
          {
            personas.slice(0, numPersonasToShow).map((persona: IFacepilePersona, index: number) => {
              const personaControl: JSX.Element = this._getPersonaControl(persona);
              return persona.onClick ?
                this._getElementWithOnClickEvent(personaControl, persona, index) :
                this._getElementWithoutOnClickEvent(personaControl, persona, index);
            })
          }
          {overflowButtonProps ? this._getOverflowElement(numPersonasToShow) : null}
        </div>
      </div>
    );
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    return <Persona
      imageInitials={persona.imageInitials}
      imageUrl={persona.imageUrl}
      initialsColor={persona.initialsColor}
      primaryText={persona.personaName}
      size={PersonaSize.extraSmall}
      hidePersonaDetails={true}
      />;
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <button
      { ...getNativeProps(persona, buttonProperties) }
      className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
      title={persona.personaName}
      key={(!!persona.imageUrl ? 'i' : '') + index}
      onClick={this._onPersonaClick.bind(this, persona)}
      onMouseMove={this._onPersonaMouseMove.bind(this, persona)}
      onMouseOut={this._onPersonaMouseOut.bind(this, persona)}
      >
      {personaControl}
    </button>;
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <div
      { ...getNativeProps(persona, divProperties) }
      className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
      title={persona.personaName}
      key={(!!persona.imageUrl ? 'i' : '') + index}
      onMouseMove={this._onPersonaMouseMove.bind(this, persona)}
      onMouseOut={this._onPersonaMouseOut.bind(this, persona)}
      >
      {personaControl}
    </div>;
  }

  private _getOverflowElement(numPersonasToShow: number): JSX.Element {
    switch (this.props.overflowButtonType) {
      case OverflowButtonType.descriptive:
        return this._getDescriptiveOverflowElement(numPersonasToShow);
      case OverflowButtonType.downArrow:
        return this._getIconElement('ChevronDown');
      case OverflowButtonType.more:
        return this._getIconElement('More');
      default:
        return null;
    }
  }

  private _getDescriptiveOverflowElement(numPersonasToShow: number): JSX.Element {
    let numPersonasNotPictured: number = this.props.personas.length - numPersonasToShow;

    if (!this.props.overflowButtonProps || numPersonasNotPictured < 1) { return null; }

    let personaNames: string = this.props.personas.slice(numPersonasToShow).map((p: IFacepilePersona) => p.personaName).join(', ');

    return <button { ...getNativeProps(this.props.overflowButtonProps, buttonProperties) }
      className={css('ms-Facepile-descriptiveOverflowBtn', 'ms-Facepile-itemBtn')}
      title={personaNames}>
      {'+' + numPersonasNotPictured}
    </button>;
  }

  private _getIconElement(icon: string): JSX.Element {
    return <button { ...getNativeProps(this.props.overflowButtonProps, buttonProperties) }
      className={css('ms-Facepile-overflowBtn', 'ms-Facepile-itemBtn')}>
      <i className={css('ms-Icon', 'msIcon', `ms-Icon ms-Icon--${icon}`)} aria-hidden='true'></i>
    </button>;
  }

  private _getAddNewElement(): JSX.Element {
    return <button { ...getNativeProps(this.props.addButtonProps, buttonProperties) } className={css('ms-Facepile-addBtn', 'ms-Facepile-itemBtn')}>
      <i className='ms-Icon msIcon ms-Icon--AddFriend' aria-hidden='true'></i>
    </button>;
  }

  private _onPersonaClick(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    persona.onClick(ev, persona);
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onPersonaMouseMove(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    if (!!persona.onMouseMove) {
      persona.onMouseMove(ev, persona);
    }
  }

  private _onPersonaMouseOut(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    if (!!persona.onMouseOut) {
      persona.onMouseOut(ev, persona);
    }
  }
}