import { DefaultButton, IconButton, CommandButton, CompoundButton, PrimaryButton } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ButtonVPage extends React.Component<any, any> {
  public render() {
    let iconName: string = 'Snow';
    return (
      <div>
        <div>
          <label> Default Button:   </label>
          <DefaultButton id='DefaultButton' iconProps={ { iconName: 'Add' } } text='Default Button' />
        </div>
        <div>
          <label> Default Button Disabled:   </label>&nbsp;
        <DefaultButton id='DefaultButtonDisabled' disabled={ true } iconProps={ { iconName: 'Add' } } text='Default Button' />
        </div>&nbsp;
      <div>
          <label> Default Button Checked:   </label>
          <DefaultButton id='DefaultButtonChecked' iconProps={ { iconName: 'Add' } } checked={ true } text='Default Button' />
        </div>&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <IconButton id={ 'IconButton' } iconProps={ { iconName } } />
        </div>&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <IconButton id={ 'IconButtonChecked' } checked={ true } iconProps={ { iconName } } />
        </div>&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <CommandButton
            id='CommandButton'
            iconProps={ { iconName: 'AddFriend' } }
            text='Command Button'
          />
        </div>&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <CommandButton
            id='CommandButtonDisabled'
            iconProps={ { iconName: 'AddFriend' } }
            disabled={ true }
            text='Command Button'
          />
        </div >&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <CommandButton
            id='CommandButtonChecked'
            checked={ true }
            iconProps={ { iconName: 'AddFriend' } }
            text='Command Button'
          />
        </div>&nbsp;
      <div>
          <CompoundButton
            id='CompoundButton'
            description='You can create a new account here.'
            text='Compound Button'
          />
        </div>&nbsp;
      <div>
          <CompoundButton
            id='CompoundButtonDisabled'
            disabled={ true }
            description='You can create a new account here.'
            text='Compound Button'
          />
        </div>&nbsp;
      <div>
          <CompoundButton
            id='CompoundButtonChecked'
            checked={ true }
            description='You can create a new account here.'
            text='Compound Button'
          />
        </div>&nbsp;
      <div>
          <PrimaryButton
            id='PrimaryButton'
            iconProps={ { iconName: 'Add' } }
            text='Primary Button'
          />
        </div >&nbsp;
      <div>
          <PrimaryButton
            id='PrimaryButtonDisabled'
            disabled
            iconProps={ { iconName: 'Add' } }
            text='Primary Button'
          />
        </div >&nbsp;
      <div>
          <PrimaryButton
            id='PrimaryButtonToggled'
            checked
            iconProps={ { iconName: 'Add' } }
            text='Primary Button'
          />
        </div>&nbsp;

      <div>
          <DefaultButton
            id='ContextualButton'
            disabled={ false }
            iconProps={ { iconName: 'Add' } }
            text='New'
            menuProps={ {
              className: 'ContextualButtonMenu',
              id: 'ContextualButtonMenu',
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
          <DefaultButton
            id='ContextualButtonToggled'
            checked={ true }
            iconProps={ { iconName: 'Add' } }
            text='New'
            menuProps={ {
              className: 'ContextualButtonMenu',
              id: 'ContextualButtonMenu',
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