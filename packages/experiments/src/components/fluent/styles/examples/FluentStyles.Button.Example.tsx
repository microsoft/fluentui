import * as React from 'react';
import { PrimaryButton, DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';

// tslint:disable-next-line:no-any
const style = require('./FluentStyles.Example.scss') as any;

export class FluentStylesButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="docs-ButtonExample">
        <div className={style.sidebyside}>
          <PrimaryButton text="Primary" />
        </div>
        <div className={style.sidebyside}>
          <DefaultButton text="Default" />
        </div>
        <div className={style.sidebyside}>
          <CompoundButton text="Compound" />
        </div>
      </div>
    );
  }
}
