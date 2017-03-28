import * as React from 'react';
import {
  CommandButton,
  IButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import {
  Label
} from 'office-ui-fabric-react/lib/Label';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import { ThemeProvider } from '../../ThemeProvider/ThemeProvider';

export class ButtonCommandExample extends React.Component<IButtonProps, { any }> {
  private _button: IButton;

  public render() {
    let { disabled } = this.props;

    return (
      <ThemeProvider theme={ {
        defaultProps: {
          'CommandButton': {
          }
        }
      } }>
        <div className='ms-BasicButtonsExample'>
          <Label>Command button</Label>
          <CommandButton
            text='Focus the next button'
            onClick={ () => this._button.focus() }
          />
          <CommandButton
            componentRef={ b => this._button = b }
            data-automation-id='test'
            disabled={ disabled }
            text='Create account'
            icon='Mail'
            description='I am a description'
            menuProps={ {
              items: [
                {
                  key: 'a',
                  name: 'MenuItemA'
                }
              ]
            } }
          />
        </div>
      </ThemeProvider>
    );
  }

}
