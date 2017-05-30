import * as React from 'react';
import {
  IButtonProps,
  PrimaryButton
} from 'office-ui-fabric-react/lib/Button';
import {
  Label
} from 'office-ui-fabric-react/lib/Label';

export class ButtonAnchorExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Button like anchor</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          href='http://bing.com'
          target='_blank'
          title='Let us bing!'>
          Bing
        </PrimaryButton>
      </div >
    );
  }
}