import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export interface IButtonToggleExampleState {
  muted: boolean;
}

export class ButtonToggleExample extends React.Component<IButtonProps, IButtonToggleExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      muted: false
    };
  }

  public render(): JSX.Element {
    const { disabled, checked } = this.props;

    // tslint:disable:jsx-no-lambda
    return (
      <div>
        <div>
          <DefaultButton
            data-automation-id="test"
            allowDisabledFocus={true}
            disabled={disabled}
            toggle={true}
            checked={this.state.muted || checked}
            text={this.state.muted ? 'Volume Muted' : 'Volume Unmuted'}
            onClick={() => {
              this.setState({ muted: !this.state.muted });
            }}
          />
        </div>
      </div>
    );
  }
}
