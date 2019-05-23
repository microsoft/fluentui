import * as React from 'react';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, Label, PrimaryButton } from 'office-ui-fabric-react';

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

export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    return (
      <div className={css(classNames.twoup)}>
        <div>
          <Label>Standard</Label>
          <DefaultButton
            data-automation-id="test"
            allowDisabledFocus={true}
            disabled={disabled}
            checked={checked}
            text="Button"
            onClick={this._alertClicked}
          />
        </div>
        <div>
          <Label>Primary</Label>
          <PrimaryButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            text="Button"
            onClick={this._alertClicked}
            allowDisabledFocus={true}
          />
        </div>
      </div>
    );
  }

  private _alertClicked(): void {
    alert('Clicked');
  }
}
