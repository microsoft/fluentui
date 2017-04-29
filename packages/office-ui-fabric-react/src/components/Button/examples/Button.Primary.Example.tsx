import * as React from 'react';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { css } from '@uifabric/styling';

export class ButtonPrimaryExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Primary button</Label>

        <PrimaryButton
          data-automation-id='test'
          iconProps={ { iconName: 'Snow' } }
          text='Button without href'
          description='I am a description'
          ariaLabel='I am an aria label'
          onClick={ () => alert('Clicked') }
        />

        <PrimaryButton
          data-automation-id='test'
          iconProps={ { iconName: 'Snow' } }
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
          text='Disabled button without href'
          description='I am a description'
          ariaLabel='I am an aria label'
          onClick={ () => alert('Clicked') }
        />

        <PrimaryButton
          data-automation-id='test'
          disabled={ true }
          iconProps={ { iconName: 'Snow' } }
          text='Disabled button with href'
          description='I am a description'
          ariaLabel='I am an aria label'
          href='http://www.microsoft.com'
          target='_blank'
        />

        <PrimaryButton
          data-automation-id='test'
          classNames={ {
            root: css({
              height: '40px',
            }),
            rootEnabled: css({
              background: 'red',
              ':hover': {
                background: 'darkRed'
              }
            })
          } }
          iconProps={ { iconName: 'Snow' } }
          text='Customized button'
          description='I am a description'
          ariaLabel='I am an aria label'
          onClick={ () => alert('Clicked') }
        />
      </div>
    );
  }
}
