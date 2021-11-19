import * as React from 'react';
// @ts-ignore
import { Persona, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export class PersonaExtender extends React.Component<IPersonaProps, {}> {
  constructor(props: IPersonaProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Persona>Persona</Persona>
        {/* include self closing persona check */}
        <Persona text={'PersonaName'} />
      </div>
    );
  }
}
