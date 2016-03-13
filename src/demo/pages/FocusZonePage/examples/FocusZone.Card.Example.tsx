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

      <div className='CardWrapper'>
          <div
          data-is-focusable={ true }
          data-focusable-context='Card'
          className='CardSample'>
            <FocusZone
            isCircularNavigation={ true }
            focusNamespace='TidBit'>
              <div className='ContainerCard-header'>
                <div role='heading' className='ContainerCard-title'>T4</div>
              </div>
              <a
                data-focusable-context='TidBit'
                title='You viewed &quot;OCE Schedule Workbook&quot; on 1/29/2016'
                href='#'
                className='Activity-description'>
                You viewed <strong>OCE Schedule Workbook</strong> on 1/29/2016
              </a>

              <br/>

              <a
                data-focusable-context='TidBit'
                title='Roger Gu modified &quot;Allow users to see recycle bin items which they can before deletion&quot; 11 hours ago' href='#'
                className='Activity-description'>
                Roger Gu modified <strong>Allow users to...e deletion</strong> 11 hours ago
              </a>
              <br/>
              <a
                data-focusable-context='TidBit'
                title='Ben Parker modified &quot;Team Escalations Contacts During Business Hours&quot; 12 hours ago'
                href='#'
                className='Activity-description'>
                Ben Parker modified <strong>Team Escalati...ess Hours</strong> 12 hours ago
              </a>
            </FocusZone>
          </div>
        </div>

       <div className='CardWrapper'>
          <div
          data-is-focusable={ true }
          data-focusable-context='Card'
          className='CardSample'>
            <div className='ContainerCard-header'>
              <div role='heading' className='ContainerCard-title'>T1</div>
            </div>
          </div>
        </div>

        <div className='CardWrapper'>
          <div
          data-is-focusable={ true }
          data-focusable-context='Card'
          className='CardSample'>
            <div className='ContainerCard-header'>
              <div role='heading' className='ContainerCard-title'>T2</div>
            </div>
          </div>
        </div>

        <Card data-contains-focusable-subcomponents={ true }/>
        <Card data-contains-focusable-subcomponents={ true }/>
        <Card data-contains-focusable-subcomponents={ true }/>
        <Card data-contains-focusable-subcomponents={ true }/>
        <Card data-contains-focusable-subcomponents={ true }/>
        <Card data-contains-focusable-subcomponents={ true }/>
        <Card data-contains-focusable-subcomponents={ true }/>

      </FocusZone>
    );
  }
}
