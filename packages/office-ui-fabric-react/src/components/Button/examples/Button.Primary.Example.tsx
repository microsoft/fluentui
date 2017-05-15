import * as React from 'react';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { mergeStyles } from '../../../Styling';
import { IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';

export class ButtonPrimaryExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;
    let menuProps: IContextualMenuProps = {
      items: [
        {
          key: 'a',
          name: 'I am a menu item',
          onClick: () => console.log('hi')
        }
      ]
    };
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Primary button</Label>

        <PrimaryButton
          data-automation-id='test'
          text='Text only button'
          description='I am a description'
          ariaLabel='I am an aria label'
          style={ {
            display: 'block'
          } }
          onClick={ () => alert('Clicked') }
        />

        <PrimaryButton
          data-automation-id='test'
          iconProps={ { iconName: 'Snow' } }
          menuProps={ menuProps }
          text='Button without href'
          description='I am a description'
          ariaLabel='I am an aria label'
          onClick={ () => alert('Clicked') }
        />

        <PrimaryButton
          data-automation-id='test'
          iconProps={ { iconName: 'Snow' } }
          menuProps={ menuProps }
          text='Button with href'
          href='http://www.microsoft.com'
          target='_blank'
          description='I am a description'
          ariaLabel='I am an aria label'
        />

        <PrimaryButton
          data-automation-id='test'
          disabled={ true }
          iconProps={ { iconName: 'Snow' } }
          menuProps={ menuProps }
          text='Disabled button without href'
          description='I am a description'
          ariaLabel='I am an aria label'
          onClick={ () => alert('Clicked') }
        />

        <PrimaryButton
          data-automation-id='test'
          disabled={ true }
          iconProps={ { iconName: 'Snow' } }
          menuProps={ menuProps }
          text='Disabled button with href'
          description='I am a description'
          ariaLabel='I am an aria label'
          href='http://www.microsoft.com'
          target='_blank'
        />

        <PrimaryButton
          data-automation-id='test'
          className='new-root'
          styles={ {
            root: mergeStyles({
              height: '100px',
              float: 'right',
            }),
            rootEnabled: mergeStyles({
              background: 'red',
              ':hover': {
                background: 'darkRed'
              }
            }),
            iconEnabled: mergeStyles({
              fontSize: '100px'
            })
          } }
          iconProps={ { iconName: 'Snow' } }
          menuProps={ menuProps }
          text='Customized button'
          description='I am a description'
          ariaLabel='I am an aria label'
          onClick={ () => alert('Clicked') }
        />
      </div>
    );
  }
}
