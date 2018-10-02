import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { CollapsibleSection } from '@uifabric/experiments/lib/CollapsibleSection';
import { Test } from '@uifabric/experiments/lib/Test';
import { TestStateless } from '@uifabric/experiments/lib/TestStateless';

export class CollapsibleSectionBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Test defaultText="default text" />
        <TestStateless text="stateless text" />
        <FocusZone>
          <CollapsibleSection
            key={1}
            defaultCollapsed={true}
            titleProps={{
              text: `Title 1`
            }}
          >
            Content 1
          </CollapsibleSection>
        </FocusZone>
      </div>
    );
  }
}
