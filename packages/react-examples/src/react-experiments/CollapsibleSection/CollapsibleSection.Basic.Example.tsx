import * as React from 'react';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { CollapsibleSection } from '@fluentui/react-experiments/lib/CollapsibleSection';
import type { JSXElement } from '@fluentui/utilities';

export class CollapsibleSectionBasicExample extends React.Component<{}, {}> {
  public render(): JSXElement {
    return (
      <div>
        <FocusZone>
          <CollapsibleSection key={1} defaultCollapsed={true} title="Title 1">
            Content 1
          </CollapsibleSection>
        </FocusZone>
      </div>
    );
  }
}
