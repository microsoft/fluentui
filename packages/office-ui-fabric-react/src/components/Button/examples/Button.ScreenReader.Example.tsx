import * as React from 'react';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ButtonScreenReaderExample extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled, checked } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          checked={ checked }
          ariaDescription='This is aria description used for screen reader.'>
          Aria Description
        </PrimaryButton>
      </div>
    );
  }
}