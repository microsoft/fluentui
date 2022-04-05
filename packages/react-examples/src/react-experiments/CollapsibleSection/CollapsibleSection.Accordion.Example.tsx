import * as React from 'react';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
// TODO: move this file to Accordion
import { Accordion } from '@fluentui/react-experiments/lib/Accordion';

export class CollapsibleSectionAccordionExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          <p>TODO: Add styling and state control so that only one item is expanded at a time</p>
          <Accordion>
            <Accordion.Item title="Title 1">Accordion Item 1!</Accordion.Item>
            <Accordion.Item title="Title 2">Accordion Item 2!</Accordion.Item>
            <Accordion.Item title="Title 3">Accordion Item 4!</Accordion.Item>
            <Accordion.Item title="Title 4">Accordion Item 4!</Accordion.Item>
          </Accordion>
        </FocusZone>
      </div>
    );
  }
}
