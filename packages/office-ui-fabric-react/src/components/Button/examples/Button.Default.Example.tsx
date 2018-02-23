import * as React from 'react';
import { css, classNamesFunction } from '../../../Utilities';
import {
  getStyles,
  IButtonBasicExampleStyleProps,
  IButtonBasicExampleStyles
} from './Button.Basic.Example.styles';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render() {
    const { disabled, checked } = this.props;

    const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
    const classNames = getClassNames(getStyles);

    return (
      <div className={ css(classNames.twoup) }>
        <div>
          <Label>Standard</Label>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Button'
          />
        </div>
        <div>
          <Label>Primary</Label>
          <DefaultButton
            primary={ true }
            data-automation-id='test'
            disabled={ disabled }
            checked={ checked }
            text='Button'
            onClick={ this._alertClicked }
          />
        </div>
      </div>
    );
  }

  private _alertClicked(): void {
    alert('Clicked');
  }
}
