import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

interface IKeytipsTestState {
  currButton: string;
}

export class KeytipsDynamicExample extends React.Component<{}, IKeytipsTestState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currButton: 'Button 1',
    };
  }

  /* tslint:disable:jsx-no-lambda */
  public render(): JSX.Element {
    const startSequence = this.state.currButton === 'Button 1' ? 'gg1' : 'gg2';
    return (
      <div>
        <p>
          There is another special case where controls on the page will change other controls down the chain in the
          keytip sequence. Take the case below; clicking Button 1 and Button 2 will update the text of Button3.
          Triggering the keytip for Button 1 or Button 2 will then also change the keytip sequence of Button 3, because
          it can be both a child of Button 1 or Button 2. For this to work fully, Button 1 and Button 2 should have
          `hasDynamicChildren: true` in their keytip props
        </p>
        <DefaultButton
          text="Button 1"
          onClick={this.setCurrButton('Button 1')}
          keytipProps={{
            content: 'GG1',
            keySequences: ['gg1'],
            onExecute: this.setCurrButton('Button 1'),
            hasDynamicChildren: true,
          }}
        />
        <DefaultButton
          text="Button 2"
          onClick={this.setCurrButton('Button 2')}
          keytipProps={{
            content: 'GG2',
            keySequences: ['gg2'],
            onExecute: this.setCurrButton('Button 2'),
            hasDynamicChildren: true,
          }}
        />
        <div>
          <DefaultButton
            text={'Button 3, active button is: ' + this.state.currButton}
            keytipProps={{ content: 'GG3', keySequences: [startSequence, 'gg3'] }}
          />
        </div>
      </div>
    );
  }

  private setCurrButton = (button: string) => {
    return () => {
      this.setState({ currButton: button });
    };
  };
}
