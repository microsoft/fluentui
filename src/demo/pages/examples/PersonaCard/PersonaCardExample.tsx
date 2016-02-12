import * as React from 'react';
import PersonaCard from '../../../../components/PersonaCard';

export default class PersonaCardExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PersonaCardExample'>
        <h1>PersonaCard</h1>
        <PersonaCard />
      </div>
    );
  }

}
