import * as React from 'react';
import {
  FocusZone,
  FocusZoneDirection
} from '../../../../index';
import Card from './Card/Card';

export default class CardExample extends React.Component<any, any> {

  public render() {
    return (
      <FocusZone
      isCircularNavigation={ true }
      direction={ FocusZoneDirection.horizontal }
      focusNamespace='Card'>

        <Card focus-namespace='Card' data-contains-focusable-subcomponents={ true } title='Card 1'/>
        <Card focus-namespace='Card' data-contains-focusable-subcomponents={ true } title='Card 2'/>
        <Card focus-namespace='Card' data-contains-focusable-subcomponents={ true } title='Card 3'/>

      </FocusZone>
    );
  }
}
