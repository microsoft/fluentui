import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps, ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles, IButtonBasicExampleStyleProps, IButtonBasicExampleStyles } from './Button.Basic.Example.styles';

export class ButtonContextualMenuExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles, {});

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
