import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IButtonProps } from './IButtonProps';

export class ButtonConextualMenuExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-ContextualMenuButtonsExample'>
        <div>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            icon='Add'
            text='New'
            contextualMenuItems={ [
              {
                key: 'emailMessage',
                name: 'Email message',
                icon: 'Mail',
                ['data-automation-id']: 'newEmailButton'
              },
              {
                key: 'calendarEvent',
                name: 'Calendar event',
                icon: 'Calendar'
              }
            ] }
          >
            <i className={ `ms-Icon ms-Icon--ChevronDown` } />
          </DefaultButton>
        </div>
      </div>
    );
  }
}