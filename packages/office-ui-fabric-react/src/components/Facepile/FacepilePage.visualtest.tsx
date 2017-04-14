import { Facepile } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class FacepileVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div>
        <label>Basic Facepile:</label>
        <Facepile className='Facepile'
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
          }] } />
      </div>
      <div>
        <label> Baseline image:</label>
        <img max-width='300px' max-height='300px' src='./images/baseline/Facepile_hovered_1.png' />
      </div>
      <div>
        <label> Baseline image Not pressed:</label>
        <img max-width='300px' max-height='300px' src='./images/baseline/Facepile_not_pressed_0.png' />
      </div>
      <div>
        <label> Baseline image pressed:</label>
        <img max-width='300px' max-height='300px' src='./images/baseline/Facepile_pressed_2.png' />
      </div>
    </div>;
  }
}