import { CommandBar } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CommandBarVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { width: '600px' } }>
      <CommandBar
        className='CommandBar'
        items={
          [
            {
              key: 'new',
              name: 'New',
              icon: 'Add',
              onClick: () => { return; },
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
            },
            {
              key: 'upload',
              name: 'Upload',
              icon: 'Upload'
            }] }
      />
    </div>;
  }
}
