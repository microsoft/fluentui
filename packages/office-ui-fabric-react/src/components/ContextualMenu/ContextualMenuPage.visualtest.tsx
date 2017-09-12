import { ContextualMenu } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ContextualMenuVPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div>
          <ContextualMenu
            id='ContextualMenu'
            shouldFocusOnMount={ false }
            items={
              [{
                key: 'new',
                name: 'New',
                icon: 'Add',
                onClick: () => alert('New')
              },
              {
                key: 'upload',
                name: 'Upload',
                icon: 'Upload',
                onClick: () => alert('upload')
              }]
            }
          />
        </div>
      </div>
    );
  }
}