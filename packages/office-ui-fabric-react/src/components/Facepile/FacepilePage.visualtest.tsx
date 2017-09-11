import { Facepile } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class FacepileVPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <label>Basic Facepile:</label>
        <Facepile
          className='Facepile'
          personas={ [{
            imageUrl: './images/persona-female.png',
            personaName: 'Annie Lindqvist',
            imageInitials: 'AL',
            data: '50%'
          },
          {
            imageUrl: './images/persona-male.png',
            personaName: 'Aaron Reid',
            imageInitials: 'AR',
            data: '$1,000'
          }] }
        />
      </div>
    );
  }
}