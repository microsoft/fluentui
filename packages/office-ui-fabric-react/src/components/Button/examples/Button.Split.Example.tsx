import * as React from 'react';
import {
  css,
  classNamesFunction,
  DefaultButton,
  HighContrastSelector,
  IButtonProps,
  IButtonStyles,
  IconButton,
  IStyle,
  Label
} from 'office-ui-fabric-react';

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

const customSplitButtonStyles: IButtonStyles = {
  splitButtonMenuButton: { backgroundColor: 'white', width: '10px' },
  splitButtonMenuIcon: { fontSize: '7px' },
  splitButtonDivider: { borderLeft: '1px solid #c8c8c8', right: 17 },
  splitButtonContainer: {
    selectors: {
      [HighContrastSelector]: {
        border: 'none'
      }
    }
  }
};

const alertClicked = (): void => {
  alert('Clicked');
};

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export class ButtonSplitExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.twoup)}>
        <div>
          <Label>Standard</Label>
          <DefaultButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            text="Create account"
            onClick={alertClicked}
            split={true}
            splitButtonAriaLabel={'See 2 sample options'}
            aria-roledescription={'split button'}
            style={{ height: '35px' }}
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
          <Label>Primary</Label>
          <DefaultButton
            primary
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            text="Create account"
            onClick={alertClicked}
            split={true}
            aria-roledescription={'split button'}
            style={{ height: '35px' }}
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
          <Label>Primary Action Disabled</Label>
          <DefaultButton
            primary
            data-automation-id="test"
            disabled={disabled}
            primaryDisabled={true}
            checked={checked}
            text="Create account"
            onClick={alertClicked}
            split={true}
            aria-roledescription={'split button'}
            style={{ height: '35px' }}
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
          <Label>Button Disabled</Label>
          <DefaultButton
            primary
            data-automation-id="test"
            disabled={true}
            allowDisabledFocus={true}
            checked={checked}
            text="Create account"
            onClick={alertClicked}
            onKeyPress={alertClicked}
            onKeyDown={alertClicked}
            onKeyUp={alertClicked}
            onMouseDown={alertClicked}
            onMouseUp={alertClicked}
            split={true}
            aria-roledescription={'split button'}
            style={{ height: '35px' }}
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
      </div>
    );
  }
}

export class ButtonSplitCustomExample extends React.Component<IButtonProps> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div>
        <Label>Split button with icon and custom styles</Label>
        <IconButton
          data-automation-id="test"
          disabled={disabled}
          checked={checked}
          iconProps={{ iconName: 'Upload' }}
          text="Create account"
          onClick={alertClicked}
          split={true}
          aria-roledescription={'split button'}
          styles={customSplitButtonStyles}
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
    );
  }
}
