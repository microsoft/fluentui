import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CollapsibleSectionUncontrolled } from '@uifabric/experiments/lib/CollapsibleSection';

export interface ICollapsibleSectionControlledExampleState {
  collapsed: boolean;
}

// tslint:disable:jsx-no-lambda
export class CollapsibleSectionControlledExample extends React.Component<
  {},
  ICollapsibleSectionControlledExampleState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          <DefaultButton
            text="Toggle"
            onClick={() => {
              this.setState({ collapsed: !this.state.collapsed });
            }}
          />
          <CollapsibleSectionUncontrolled
            collapsed={this.state.collapsed}
            titleProps={{
              text: `Title 1`
            }}
          >
            Content 1
          </CollapsibleSectionUncontrolled>
          <CollapsibleSectionUncontrolled
            collapsed={this.state.collapsed}
            titleProps={{
              text: `Title 2`
            }}
          >
            Content 2
          </CollapsibleSectionUncontrolled>
        </FocusZone>
      </div>
    );
  }
}
