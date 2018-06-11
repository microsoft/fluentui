import * as React from 'react';
import { PrimaryButton, DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';

export class FluentStylesButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="docs-ButtonExample">
        <div className={styles.sidebyside}>
          <PrimaryButton text="Primary" />
        </div>
        <div className={styles.sidebyside}>
          <DefaultButton text="Default" />
        </div>
        <div className={styles.sidebyside}>
          <CompoundButton text="Compound" />
        </div>
      </div>
    );
  }
}
