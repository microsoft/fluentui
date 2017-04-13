import { DefaultButton } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CommandButtonVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div>
        <DefaultButton
          id='ContextualButton'
          disabled={ false }
          icon='Add'
          text='New'
          menuProps={ {
            items: [
              {
                key: 'emailMessage',
                name: 'Email message',
                icon: 'Mail'
              },
              {
                key: 'calendarEvent',
                name: 'Calendar event',
                icon: 'Calendar'
              }
            ]
          }
          }
        >
        </DefaultButton>
      </div >
      <div>
        <DefaultButton
          id='ContextualButtonDisabled'
          icon='Add'
          text='New'
          disabled={ true }
        />
      </div >
    </div>;
  }
}