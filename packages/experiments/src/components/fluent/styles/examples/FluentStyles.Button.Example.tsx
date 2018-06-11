import * as React from 'react';
import { PrimaryButton, DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';

export class FluentStylesButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="docs-ButtonExample">
        <div>
          <PrimaryButton text="Primary" />
        </div>
        <div>
          <DefaultButton text="Default" />
        </div>
        <div>
          <CompoundButton text="Compound" />
        </div>
      </div>
    );
  }
}
