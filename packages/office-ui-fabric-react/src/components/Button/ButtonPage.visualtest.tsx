import { DefaultButton, IconButton, ActionButton, CompoundButton, PrimaryButton } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ButtonVPage extends React.Component<any, any> {
  public render() {
    let iconName = 'Snow';
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
          <ActionButton id='ActionButton'
            iconProps={ { iconName: 'AddFriend' } }
            text='Action Button' />
        </div>&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <ActionButton id='ActionButtonDisabled' iconProps={ { iconName: 'AddFriend' } }
            disabled={ true }
            text='Action Button' />
        </div >&nbsp;
      <div style={ { backgroundColor: 'white' } }>
          <ActionButton id='ActionButtonChecked'
            checked={ true }
            iconProps={ { iconName: 'AddFriend' } }
            text='Action Button' />
        </div>&nbsp;
      <div>
          <CompoundButton id='CompoundButton'
            description='You can create a new account here.'
            text='Compound Button' />
        </div>&nbsp;
      <div>
          <CompoundButton id='CompoundButtonDisabled'
            disabled={ true }
            description='You can create a new account here.'
            text='Compound Button' />
        </div>&nbsp;
      <div>
          <CompoundButton id='CompoundButtonChecked'
            checked={ true }
            description='You can create a new account here.'
            text='Compound Button' />
        </div>&nbsp;
      <div>
          <PrimaryButton id='PrimaryButton' iconProps={ { iconName: 'Add' } } text='Primary Button' />
        </div >&nbsp;
      <div>
          <PrimaryButton id='PrimaryButtonDisabled' disabled={ true } iconProps={ { iconName: 'Add' } } text='Primary Button' />
        </div >&nbsp;
      <div>
          <PrimaryButton id='PrimaryButtonToggled' checked={ true } iconProps={ { iconName: 'Add' } } text='Primary Button' />
        </div >&nbsp;

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
          >
          </DefaultButton>
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
          >
          </DefaultButton>
        </div >
      </div>
    );
  }
}