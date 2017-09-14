import { DetailsList } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class DetailsListVPage extends React.Component<any, any> {

  public render() {
    return (
      <div style={ { width: '600px' } }>
        <DetailsList
          className='DetailsList'
          items={ [{
            key: 'score',
            name: 'Score',
            fieldName: 'score'
          },
          {
            key: 'name',
            name: 'Name',
            fieldName: 'Name'
          }] }
        />
      </div>
    );
  }
}
