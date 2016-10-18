import * as React from 'react';
import { css } from '../../utilities/css';
import { Button, ButtonType } from '../../Button';
import { IFacepileProps, IFacepilePersona } from './Facepile.Props';
import { Persona, PersonaInitialsColor, PersonaSize } from '../../Persona';
import {
  PERSONA_INITIALS_COLOR,
  PERSONA_PRESENCE,
  PERSONA_SIZE
} from '../../components/persona/PersonaConsts';

import './Facepile.scss';

export class Facepile extends React.Component<IFacepileProps, {}> {
  public static defaultProps: IFacepileProps = {
    availableWidth: 0,
    addUserIconColor: PersonaInitialsColor.blue,
    overflowIconColor: PersonaInitialsColor.black,
    personas: []
  };

  private personaSize: number = 32;
  private showAdditionalPersonas: boolean = false;

  public render(): JSX.Element {
    return (
      <div className='ms-Facepile'>
        <div className='ms-Facepile-members'>
          {this.props.showAddButton ? this._getAddNewElement({}, 0) : null}
          {
            this._getPersonasToDisplay(this.props.personas).map((persona: IFacepilePersona, index: number) => {
              const personaControl: JSX.Element = this._getPersonaControl(persona);
              return persona.onClick ?
                this._getElementWithOnClickEvent(personaControl, persona, index) :
                this._getElementWithoutOnClickEvent(personaControl, persona, index);
            })
          }
        </div>
      </div>
    );
  }

  private _getPersonasToDisplay(personas: IFacepilePersona[]): IFacepilePersona[] {
    let numPersonasToShow: number = this._calulateDisplayableMax();
    let numPersonasNotPictured: number = this.props.personas.length - numPersonasToShow;
    let personasToShow: IFacepilePersona[] = [];
    let hasPersonasNotPictured: boolean = this.props.personas.length > numPersonasToShow;

    // Remove one if exceeded for +1 circle
    if (hasPersonasNotPictured) {
      --numPersonasToShow;
    }

    personasToShow = this.props.personas.slice(0, numPersonasToShow);

    if (this.props.showAddButton) {
      if (hasPersonasNotPictured) {
        ++numPersonasNotPictured;
        personasToShow.pop();
      }
    }

    //this._addNewFaceButton(hasPersonasNotPictured, numPersonasNotPictured, personasToShow);
    this._addNumberNotPictured(hasPersonasNotPictured, numPersonasNotPictured, personasToShow);

    return personasToShow;
  }

  private _addNumberNotPictured(hasPersonasNotPictured: boolean, numPersonasNotPictured: number, personasToShow: IFacepilePersona[]): void {
    if (hasPersonasNotPictured) {
      personasToShow.push({
        imageInitials: '+' + numPersonasNotPictured,
        initialsColor: PersonaInitialsColor.black
      });
    }
  }

  private _calulateDisplayableMax(): number {
    if (!this.props.availableWidth) { return this.props.personas.length; }
    let maxPersonas: number = Math.floor(this.props.availableWidth / this.personaSize);
    this.showAdditionalPersonas = (this.props.personas.length === maxPersonas);

    return this.props.personas.length < maxPersonas ? this.props.personas.length : maxPersonas;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    return <Persona
      imageInitials={persona.imageInitials}
      imageUrl={persona.imageUrl}
      initialsColor={persona.initialsColor}
      primaryText={persona.personaName}
      size={PersonaSize.extraSmall}
      hidePersonaDetails={this.props.personas.length > 1} />;
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <button
      className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
      title={persona.personaName}
      key={index}
      onClick={this._onPersonaClick.bind(this, persona)}
      onMouseMove={this._onPersonaMouseMove.bind(this, persona)}
      onMouseOut={this._onPersonaMouseOut.bind(this, persona)}>
      {personaControl}
    </button>;
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <div
      className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
      title={persona.personaName}
      key={index}
      onMouseMove={this._onPersonaMouseMove.bind(this, persona)}
      onMouseOut={this._onPersonaMouseOut.bind(this, persona)}>
      {personaControl}
    </div>;
  }

  private _getAddNewElement(persona: IFacepilePersona, index: number): JSX.Element {
    return <div className={css('ms-Facepile-itemBtn', 'ms-Persona-initials', PERSONA_INITIALS_COLOR[this.props.addUserIconColor])}
      onMouseMove={this._onPersonaMouseMove.bind(this, persona)}
      onMouseOut={this._onPersonaMouseOut.bind(this, persona)}>
      <i className='ms-Icon msIcon ms-Icon--AddFriend' aria-hidden='true'></i>
    </div>;
  }

  private _onPersonaClick(persona: IFacepilePersona, ev?: React.MouseEvent): void {
    persona.onClick(ev, persona);
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onPersonaMouseMove(persona: IFacepilePersona, ev?: React.MouseEvent): void {
    if (!!persona.onMouseMove) {
      persona.onMouseMove(ev, persona);
    }
  }

  private _onPersonaMouseOut(persona: IFacepilePersona, ev?: React.MouseEvent): void {
    if (!!persona.onMouseOut) {
      persona.onMouseOut(ev, persona);
    }
  }
}
