import * as React from 'react';
import {
  css,
  classNamesFunction,
  ContextualMenu,
  DefaultButton,
  IButtonProps,
  IContextualMenuProps,
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

const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export class ButtonContextualMenuExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.twoup)}>
        <div>
          <Label>Non persisted menu</Label>
          <DefaultButton
            data-automation-id="test"
            disabled={disabled}
            allowDisabledFocus={true}
            checked={checked}
            iconProps={{ iconName: 'Add' }}
            menuAs={this._getMenu}
            text="New"
            // tslint:disable-next-line:jsx-no-lambda
            onMenuClick={ev => {
              console.log(ev);
            }}
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
              ],
              directionalHintFixed: true
            }}
          />
        </div>
        <div>
          <Label>Persisted menu</Label>
          <DefaultButton
            data-automation-id="test"
            disabled={disabled}
            allowDisabledFocus={true}
            checked={checked}
            persistMenu={true}
            iconProps={{ iconName: 'Add' }}
            menuAs={this._getMenu}
            text="New"
            // tslint:disable-next-line:jsx-no-lambda
            onMenuClick={ev => {
              console.log(ev);
            }}
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
              ],
              directionalHintFixed: true
            }}
          />
        </div>
      </div>
    );
  }

  private _getMenu = (menuProps: IContextualMenuProps): JSX.Element => {
    // Customize contextual menu with menuAs
    return <ContextualMenu {...menuProps} />;
  };
}
