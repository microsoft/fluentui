import * as React from 'react';
import Persona from '../../../components/persona/Persona';

export default class PersonaExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PersonaExample'>
        <h1>Persona</h1>
        <Persona />
      </div>
    );
  }

}
