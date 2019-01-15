import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';

export default class PersonaCoinSize10 extends React.Component {
  private styleDefinition = { root: { fontSize: 10 } };
  private styles = () => this.styleDefinition;

  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {
    return <Icon iconName="Contact" styles={this.styles} />;
  }
}
