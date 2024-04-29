import * as React from 'react';
// @ts-ignore
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';

export class RenderButton extends React.Component<LocalButtonProps> {
  public render(): JSX.Element {
    const { id, ...restProps } = this.props;
    return (
      <div>
        <CompoundButton {...this.props} {...restProps} id={'d2'}>
          Button!
        </CompoundButton>
      </div>
    );
  }
}

export interface LocalButtonProps {
  id: string;
  description?: string;
  imageSource: string;
  toggled?: boolean;
}
