import * as React from 'react';
import {
  Facepile, IFacepileProps, PersonaInitialsColor
} from '../../../../components/index';

const facepileProps: IFacepileProps = {
  personas: [
    {
      personaName: 'Bill Murray',
      imageUrl: '//www.fillmurray.com/200/200'
    },
    {
      personaName: 'Douglas Field',
      imageInitials: 'DF',
      initialsColor: PersonaInitialsColor.green
    },
    {
      personaName: 'Marcus Laue',
      imageInitials: 'ML',
      initialsColor: PersonaInitialsColor.purple
    }
  ]
};

export default class FacepileBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Facepile {...facepileProps} />
    );
  }

}
