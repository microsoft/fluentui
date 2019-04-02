import * as React from 'react';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles, IButtonBasicExampleStyleProps, IButtonBasicExampleStyles } from './Button.Basic.Example.styles';

export class ButtonCommandExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles, {});

    return (
      <div className={css(classNames.twoup)}>
        <div>
          <Label>CommandButton that focuses on menu</Label>
          <CommandButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
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
        </div>
        <div>
          <Label>CommandButton that doesn't focus on menu</Label>
          <CommandButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            iconProps={{ iconName: 'Add' }}
            text="Create account"
            menuProps={{
              shouldFocusOnMount: false,
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
        </div>
      </div>
    );
  }
}
