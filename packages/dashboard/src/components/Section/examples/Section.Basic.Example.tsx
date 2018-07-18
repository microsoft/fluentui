import * as React from 'react';
import { Section } from '../Section';

export class SectionBasicExample extends React.PureComponent {
  public render(): JSX.Element {
    return <Section title="Section for dashboard-grid-layout" removeTitle="Remove this section" id="0" />;
  }
}
