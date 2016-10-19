import * as React from 'react';
import { css } from '../../utilities/css';
import { IFacepileProps, IFacepilePersona } from './Facepile.Props';
import { Persona, PersonaInitialsColor, PersonaSize } from '../../Persona';
import {
  PERSONA_INITIALS_COLOR
} from '../../components/persona/PersonaConsts';

import './Facepile.scss';

export class Facepile extends React.Component<IFacepileProps, {}> {
  public static defaultProps: IFacepileProps = {
    availableWidth: 0,
    addUserIconColor: PersonaInitialsColor.blue,
    overflowIconColor: PersonaInitialsColor.black,
    personas: []
  };

  private MAX_PERSONAS_SHOWN: number = 5;

  public render(): JSX.Element {
    return <div className='ms-Facepile'>
          <div className='ms-Facepile-members'>
            {this.props.showAddButton ? this._getAddNewElement() : null}
            {
              this._getPersonasToDisplay(this.props.personas).map((persona: IFacepilePersona, index: number) => {
                const personaControl: JSX.Element = this._getPersonaControl(persona);
                return persona.onClick ?
                  this._getElementWithOnClickEvent(personaControl, persona, index) :
                  this._getElementWithoutOnClickEvent(personaControl, persona, index);
              })
            }
          </div>
        </div>;
  }

  private _getPersonasToDisplay(personas: IFacepilePersona[]): IFacepilePersona[] {
    let numPersonasToShow: number = this._calulateNumPersonasToShow();
    let numPersonasNotPictured: number = this.props.personas.length - numPersonasToShow;
    let hasPersonasNotPictured: boolean = numPersonasNotPictured > 0;
    let personasToShow: IFacepilePersona[] = this.props.personas.slice(0, numPersonasToShow);

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

  private _calulateNumPersonasToShow(): number {
    if (!this.props.availableWidth) { return this.props.personas.length; }
    let maxShownPersonas: number = this.MAX_PERSONAS_SHOWN;

    // Remove one for the add person button
    if (this.props.showAddButton) {
      --maxShownPersonas;
    }

    // Remove one if max exceeded for the +1 icon
    if (this.props.personas.length > maxShownPersonas) {
      --maxShownPersonas;
    }

    return this.props.personas.length < maxShownPersonas ? this.props.personas.length : maxShownPersonas;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    let personalDetailsHidden: boolean = this.props.personas.length > 1;
    return <Persona
      imageInitials={persona.imageInitials}
      imageUrl={persona.imageUrl}
      initialsColor={persona.initialsColor}
      primaryText={persona.personaName}
      size={PersonaSize.extraSmall}
      hidePersonaDetails={personalDetailsHidden}
      />;
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

  private _getAddNewElement(): JSX.Element {
    return <div className={css('ms-Facepile-itemBtn', 'ms-Persona-initials', PERSONA_INITIALS_COLOR[this.props.addUserIconColor])}
      onMouseDown={this._onAddClick.bind(this)}>
      <i className='ms-Icon msIcon ms-Icon--AddFriend' aria-hidden='true'></i>
    </div>;
  }

  private _onAddClick(ev?: React.MouseEvent): void {
    this.props.onClickAddButton();
    ev.preventDefault();
    ev.stopPropagation();
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
