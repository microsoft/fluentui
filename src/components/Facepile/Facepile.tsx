import * as React from 'react';
import { css } from '../../utilities/css';
import { ButtonType } from '../Button/index';
import {
  IFacepileProps,
  IFacepilePersona
} from './Facepile.Props';
import {
  Persona,
  PersonaInitialsColor,
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
    let personalDetailsHidden: boolean = this.props.personas.length > 1;
    return (
      <div className='ms-Facepile'>
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
          { this.props.chevronButtonProps && personalDetailsHidden ? this._getChevronElement() : null }
        </div>
      </div>
    );
  }

  private _getPersonasToDisplay(personas: IFacepilePersona[]): IFacepilePersona[] {
    let numPersonasToShow: number = this._calulateNumPersonasToShow();
    let numPersonasNotPictured: number = this.props.personas.length - numPersonasToShow;
    let hasPersonasNotPictured: boolean = numPersonasNotPictured > 0;
    let personasToShow: IFacepilePersona[] = this.props.personas.slice(0, numPersonasToShow);

    if (this.props.overflowPersonaProps) {
      this._addNumberNotPictured(numPersonasToShow, hasPersonasNotPictured, numPersonasNotPictured, personasToShow);
    }

    return personasToShow;
  }

  private _addNumberNotPictured(numPersonasToShow: number, hasPersonasNotPictured: boolean, numPersonasNotPictured: number, personasToShow: IFacepilePersona[]): void {
    let overflowPersonaProps: IFacepilePersona = this.props.overflowPersonaProps ? this.props.overflowPersonaProps : {};
    if (hasPersonasNotPictured) {
      personasToShow.push({
        imageInitials: overflowPersonaProps.imageInitials || '+' + numPersonasNotPictured,
        imageUrl: overflowPersonaProps.imageUrl,
        initialsColor: overflowPersonaProps.initialsColor || PersonaInitialsColor.black,
        personaName: overflowPersonaProps.personaName || this.props.personas.slice(numPersonasToShow).map((persona: IFacepilePersona, index: number) => {
          return persona.personaName;
        }).join(', '),
        onClick: overflowPersonaProps.onClick,
        onMouseMove: overflowPersonaProps.onMouseMove,
        onMouseOut: overflowPersonaProps.onMouseOut
      });
    }
  }

  private _calulateNumPersonasToShow(): number {
    let maxShownPersonas: number = this.props.maxDisplayablePersonas != null ? this.props.maxDisplayablePersonas : Facepile.defaultProps.maxDisplayablePersonas;
    return this.props.personas.length < maxShownPersonas ? this.props.personas.length : maxShownPersonas;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    let personalDetailsHidden: boolean = this.props.personas.length > 1;
    return  <Persona
              imageInitials={ persona.imageInitials }
              imageUrl={ persona.imageUrl }
              initialsColor={ persona.initialsColor }
              primaryText={ persona.personaName }
              size={ PersonaSize.extraSmall }
              hidePersonaDetails={ personalDetailsHidden } />;
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return  <button
              { ...getNativeProps(persona, buttonProperties) }
              className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
              title={ persona.personaName }
              key={ persona.imageInitials + index }
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
              key={ persona.imageInitials + index }
              onMouseMove={ this._onPersonaMouseMove.bind(this, persona) }
              onMouseOut={ this._onPersonaMouseOut.bind(this, persona) }
              >
              { personaControl }
            </div>;
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
