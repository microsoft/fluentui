import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import './PersonaExample.scss';
import { TestImages } from '../../../common/TestImages';

export class UnknownPersonaExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-PersonaExample">
        <Persona showUnknownPersonaCoin={true} text="Maor Sharett" secondaryText="Designer" size={PersonaSize.size40} />

        <Persona
          showUnknownPersonaCoin={true}
          text="Kat Larrson"
          secondaryText="Designer"
          tertiaryText="Unverified sender"
          size={PersonaSize.size72}
          imageUrl={TestImages.personaFemale}
        />
      </div>
    );
  }
}
