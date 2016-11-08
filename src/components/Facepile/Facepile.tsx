import * as React from 'react';
import { css } from '../../utilities/css';
import {
  IFacepileProps,
  IFacepilePersona
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

  private _numPersonasToShow: number;
  private _personaDetailsShown: boolean = false;

  public render(): JSX.Element {
    this._numPersonasToShow = this._calulateNumPersonasToShow();
    this._personaDetailsShown = this.props.personaDetailsShown && this.props.personas.length === 1;

    return (
      <div className='ms-Facepile'>
        <div className='ms-Facepile-members'>
          {this.props.showAddButton ? this._getAddNewElement() : null}
          {
            this._getPersonasToDisplay().map((persona: IFacepilePersona, index: number) => {
              const personaControl: JSX.Element = this._getPersonaControl(persona);
              return persona.onClick ?
                this._getElementWithOnClickEvent(personaControl, persona, index) :
                this._getElementWithoutOnClickEvent(personaControl, persona, index);
            })
          }
          { this.props.overflowButtonProps ? this._getOverflowElement() : null }
          { this.props.chevronButtonProps && !this._personaDetailsShown ? this._getChevronElement() : null }
        </div>
      </div>
    );
  }

  private _getPersonasToDisplay(): IFacepilePersona[] {
    let personasToShow: IFacepilePersona[] = this.props.personas.slice(0, this._numPersonasToShow);
    return personasToShow;
  }

  private _getPersonasNotToDisplay(): IFacepilePersona[] {
    let personasToShow: IFacepilePersona[] = this.props.personas.slice(this._numPersonasToShow);
    return personasToShow;
  }

  private _calulateNumPersonasToShow(): number {
    let maxShownPersonas: number = this.props.maxDisplayablePersonas != null ? this.props.maxDisplayablePersonas : Facepile.defaultProps.maxDisplayablePersonas;
    return this.props.personas.length < maxShownPersonas ? this.props.personas.length : maxShownPersonas;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    return  <Persona
              imageInitials={ persona.imageInitials }
              imageUrl={ persona.imageUrl }
              initialsColor={ persona.initialsColor }
              primaryText={ persona.personaName }
              size={ PersonaSize.extraSmall }
              hidePersonaDetails={ !this._personaDetailsShown } />;
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return  <button
              { ...getNativeProps(persona, buttonProperties) }
              className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
              title={ persona.personaName }
              key={ (!!persona.imageUrl ? 'i' : '') + index }
              onClick={ this._onPersonaClick.bind(this, persona) }
              onMouseMove={ this._onPersonaMouseMove.bind(this, persona) }
              onMouseOut={ this._onPersonaMouseOut.bind(this, persona) }
              >
              { personaControl }
            </button>;
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return  <div
              { ...getNativeProps(persona, divProperties) }
              className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
              title={ persona.personaName }
              key={ (!!persona.imageUrl ? 'i' : '') + index }
              onMouseMove={ this._onPersonaMouseMove.bind(this, persona) }
              onMouseOut={ this._onPersonaMouseOut.bind(this, persona) }
              >
              { personaControl }
            </div>;
  }

  private _getOverflowElement(): JSX.Element {
    let numPersonasNotPictured: number = this.props.personas.length - this._numPersonasToShow;
    let hasPersonasNotPictured: boolean = numPersonasNotPictured > 0;
    if (!this.props.overflowButtonProps || !hasPersonasNotPictured) { return null; }

    return  <button { ...getNativeProps(this.props.overflowButtonProps, buttonProperties) }
              className={ css('ms-Facepile-overflowBtn', 'ms-Facepile-itemBtn', 'ms-Persona-initials') }
              title={ this._getPersonasNotToDisplay().map((persona: IFacepilePersona, index: number) => {
                return persona.personaName;
              }).join(', ') }>
              {'+' + numPersonasNotPictured}
            </button>;
  }

  private _getAddNewElement(): JSX.Element {
    return  <button { ...getNativeProps(this.props.addButtonProps, buttonProperties) } className={css('ms-Facepile-addBtn', 'ms-Facepile-itemBtn', 'ms-Persona-initials')}>
              <i className='ms-Icon msIcon ms-Icon--AddFriend' aria-hidden='true'></i>
            </button>;
  }

  private _getChevronElement(): JSX.Element {
    return  <button { ...getNativeProps(this.props.chevronButtonProps, buttonProperties) } className={css('ms-Facepile-chevronBtn', 'ms-Facepile-itemBtn')}>
              <i className='ms-Icon msIcon ms-Icon--ChevronDown' aria-hidden='true'></i>
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