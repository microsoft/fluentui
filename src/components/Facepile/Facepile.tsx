import * as React from 'react';
import { Persona, PersonaSize } from '../../Persona';
import { IFacepileProps, IFacepilePersona } from './Facepile.Props';
import './Facepile.scss';

export class Facepile extends React.Component<IFacepileProps, {}> {

  public render() {
    return (
      <div className='ms-Facepile'>
        <div className='ms-Facepile-members'>
          { this.props.personas.map((persona: IFacepilePersona, index: number) => {
            const personaControl = (<Persona
              imageInitials={ persona.imageInitials }
              imageUrl={ persona.imageUrl }
              initialsColor={ persona.initialsColor }
              primaryText={ persona.personaName }
              size={ PersonaSize.extraSmall }
              hidePersonaDetails={ true } />);
            return persona.onClick ? (
              <button
                className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
                title = { persona.personaName }
                key = { index }
                onClick = { this._onPersonaClick.bind(this, persona) }>
                { personaControl }
                </button>
            ) :
              (
                <div
                  className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member'
                  title = { persona.personaName }
                  key = { index }
                  >
                { personaControl }
                  </div>
              );
          }) }
          </div>
        </div>
    );
  }

  private _onPersonaClick(persona: IFacepilePersona, ev?: React.MouseEvent) {
    persona.onClick(persona, ev);
    ev.preventDefault();
    ev.stopPropagation();
  }
}
