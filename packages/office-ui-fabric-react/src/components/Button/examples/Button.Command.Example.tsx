import * as React from 'react';
import {
  CommandButton,
  CompoundButton,
  IconButton,
  PrimaryButton,
  DefaultButton,
  IButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';
import {
  Label
} from 'office-ui-fabric-react/lib/Label';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import { Customizer } from '../../ThemeProvider/Customizer';

const BUTTON_PROPS: IButtonProps[] = [
  {
    text: 'Text only button'
  },
  {
    iconName: 'Mail',
    text: 'Text/icon button'
  },
  {
    iconName: 'Mail',
    text: 'Text/icon/description button',
    description: 'This is the description.'
  },
  {
    iconName: 'Mail',
    text: 'Text/icon/description/href button',
    description: 'This is the description.',
    href: 'http://www.bing.com',
    target: '_blank',
  },
  {
    iconName: 'Mail',
    text: 'Text/icon/description/menu button',
    description: 'This is the description.',
    menuProps: {
      items: [{
        key: 'item A',
        name: 'Item A',
        iconName: 'Mail'
      }]
    }
  }
];

const BUTTON_VARIANTS = [
  { name: 'CommandButton', component: CommandButton },
  { name: 'CompoundButton', component: CompoundButton },
  { name: 'IconButton', component: IconButton },
  { name: 'DefaultButton', component: DefaultButton },
  { name: 'PrimaryButton', component: PrimaryButton }
];

export class ButtonCommandExample extends React.Component<IButtonProps, { any }> {
  private _button: IButton;

  public render() {
    let { disabled } = this.props;

    return (
      <Customizer settings={ {
        CompoundButton: {
          style: { background: 'red' }
        }
      } }>
        <div className='ms-BasicButtonsExample'>
          <div>
            <button>I'm a button</button>
            <button className='ms-font-xxl'>I'm a button</button>
            <button>I'm a button</button>
            <button>I'm a button</button>
          </div>

          { BUTTON_VARIANTS.map(({ name, component: ButtonComponent }) => (
            <div key={ name }>
              <Label>{ name }</Label>
              { BUTTON_PROPS.map((buttonProps, index) => (
                <ButtonComponent disabled={ disabled } { ...buttonProps } />
              )) }
            </div>
          )) }
        </div>
      </Customizer>
    );
  }

}
