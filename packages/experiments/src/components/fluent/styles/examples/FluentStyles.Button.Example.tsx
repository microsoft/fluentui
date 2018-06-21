import * as React from 'react';
import { PrimaryButton, DefaultButton, CompoundButton, CommandButton, Label } from 'office-ui-fabric-react';

// tslint:disable-next-line:no-any
const style = require('./FluentStyles.Example.scss') as any;

export class FluentStylesButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="docs-ButtonExample">
        <div className={style.sidebyside}>
          <Label>Standard</Label>
          <DefaultButton text="Default" />
        </div>
        <div className={style.sidebyside}>
          <Label>Primary</Label>
          <PrimaryButton text="Primary" />
        </div>
        {/* <div className={style.sidebyside}>
          <CompoundButton text="Compound" />
        </div> */}
        <div className={style.sidebyside}>
          <Label>Standard</Label>
          <CompoundButton secondaryText="You can create a new account here.">Create account</CompoundButton>
        </div>
        <div className={style.sidebyside}>
          <Label>Primary</Label>
          <CompoundButton primary={true} secondaryText="You can create a new account here.">
            Create account
          </CompoundButton>
        </div>
        <div>
          <Label>Command</Label>
          <div>
            <CommandButton
              data-automation-id="test"
              iconProps={{ iconName: 'Add' }}
              text="Create account"
              menuProps={{
                items: [
                  {
                    key: 'emailMessage',
                    text: 'Email message',
                    iconProps: { iconName: 'Mail' }
                  },
                  {
                    key: 'calendarEvent',
                    text: 'Calendar event',
                    iconProps: { iconName: 'Calendar' }
                  }
                ]
              }}
            />
            <CommandButton data-automation-id="test2" iconProps={{ iconName: 'Mail' }} text="Send Mail" />
          </div>
        </div>
      </div>
    );
  }
}
