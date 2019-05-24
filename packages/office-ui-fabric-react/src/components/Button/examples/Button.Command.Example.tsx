import * as React from 'react';
import { CommandButton, css, classNamesFunction, IButtonProps, IStyle, Label } from 'office-ui-fabric-react';

type IButtonBasicExampleStyleProps = {};

interface IButtonBasicExampleStyles {
  twoup?: IStyle;
}

const exampleStyles: IButtonBasicExampleStyles = {
  twoup: [
    'ms-BasicButtonsTwoUp',
    {
      display: 'flex',
      selectors: {
        '& > *': {
          flexGrow: 1
        },
        '.ms-Label': {
          marginBottom: '10px'
        }
      }
    }
  ]
};

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export class ButtonCommandExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;
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
