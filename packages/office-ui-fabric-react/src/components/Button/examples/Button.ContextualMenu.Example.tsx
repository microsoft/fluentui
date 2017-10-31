import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class ButtonContextualMenuExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-ContextualMenuButtonsExample'>
        <div>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            iconProps={ { iconName: 'Add' } }
            text='New'
            // tslint:disable-next-line:jsx-no-lambda
            onMenuClick={ (ev) => { console.log(ev); } }
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
          />
        </div>
      </div>
    );
  }
}