
import * as React from 'react';
import { LayoutGroup } from '../LayoutGroup';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export class LayoutGroupBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Layout Group</h3>
        <LayoutGroup gap={ 20 } direction='vertical'>
          <PrimaryButton>
            Button1
          </PrimaryButton>
          <PrimaryButton>
            Button1
          </PrimaryButton>
          <PrimaryButton>
            Button1
          </PrimaryButton>
          <PrimaryButton>
            Button1
          </PrimaryButton>
          <PrimaryButton>
            Button1
          </PrimaryButton>
          <PrimaryButton>
            Button1
          </PrimaryButton>

        </LayoutGroup>
      </div>
    );
  }
}
