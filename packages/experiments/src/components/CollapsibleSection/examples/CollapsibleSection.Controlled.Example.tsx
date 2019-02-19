import * as React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CollapsibleSection } from '@uifabric/experiments/lib/CollapsibleSection';

export interface ICollapsibleSectionControlledExampleState {
  collapsed: boolean;
  clicks: number;
}

// tslint:disable:jsx-no-lambda
export class CollapsibleSectionControlledExample extends React.Component<{}, ICollapsibleSectionControlledExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      collapsed: true,
      clicks: 0
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          <p>
            Even though we are using the same CollapsibleSection with the same state component, createComponent overrides the state
            component's output when the controlled prop has a value passed in automatically. As a result, clicking on the titles in this
            example does not affect collapsed state, only clicking on the Toggle button does.
          </p>
          <Stack horizontal gap={20} verticalAlign="center">
            <DefaultButton
              text="Toggle"
              onClick={() => {
                this.setState({ collapsed: !this.state.collapsed });
              }}
            />
            <p>Number of title clicks: {this.state.clicks}</p>
          </Stack>
          <CollapsibleSection
            collapsed={this.state.collapsed}
            title={{
              text: `Title 1`,
              onClick: () => {
                this.setState((state: ICollapsibleSectionControlledExampleState) => ({ clicks: state.clicks + 1 }));
              }
            }}
          >
            Content 1
          </CollapsibleSection>
          <CollapsibleSection
            collapsed={this.state.collapsed}
            title={{
              text: `Title 2`,
              onClick: () => {
                this.setState((state: ICollapsibleSectionControlledExampleState) => ({ clicks: state.clicks + 1 }));
              }
            }}
          >
            Content 2
          </CollapsibleSection>
        </FocusZone>
      </div>
    );
  }
}
