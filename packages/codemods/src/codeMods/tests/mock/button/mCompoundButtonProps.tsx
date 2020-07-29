import * as React from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { ButtonProps } from './mButtonStyles';

export class RenderButton extends React.Component<ButtonProps> {
  public render(): JSX.Element {
    const { id, ...restProps } = this.props;
    return (
      <div>
        <CompoundButton {...this.props} />
        <CompoundButton {...restProps} id={'d2'}>
          Button!
        </CompoundButton>
      </div>
    );
  }
}
