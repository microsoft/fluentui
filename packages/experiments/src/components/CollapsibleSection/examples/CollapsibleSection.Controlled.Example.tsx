import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CollapsibleSection } from '@uifabric/experiments/lib/CollapsibleSection';

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
          <CollapsibleSection
            collapsed={this.state.collapsed}
            titleProps={{
              text: `Title 1`
            }}
          >
            Content 1
          </CollapsibleSection>
          <CollapsibleSection
            collapsed={this.state.collapsed}
            titleProps={{
              text: `Title 2`
            }}
          >
            Content 2
          </CollapsibleSection>
        </FocusZone>
      </div>
    );
  }
}
