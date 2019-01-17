import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';

export default class PersonaCoinSize10 extends React.Component {
  private styles = { root: { fontSize: 10 } };

  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render(): JSX.Element {
    return <Icon iconName="Contact" styles={this.styles} />;
  }
}
