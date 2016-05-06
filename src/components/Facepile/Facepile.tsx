import * as React from 'react';
import './Facepile.scss';
import { IFacepileProps, IFacepilePersona } from './Facepile.Props';
import { default as Persona, PersonaSize } from '../Persona/index';

export class Facepile extends React.Component<IFacepileProps, {}> {
  public render() {
    return (
      <div className='ms-Facepile'>
        <div className='ms-Facepile-members'>
          { this.props.personas.map((persona: IFacepilePersona) =>
            <div className='ms-Facepile-itemBtn ms-Facepile-itemBtn--member' title={ persona.personaName }>
              <Persona
                imageInitials={ persona.imageInitials }
                imageUrl={ persona.imageUrl }
                initialsColor={ persona.initialsColor }
                primaryText={ persona.personaName }
                size={ PersonaSize.extraSmall } />
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default Facepile;
