import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

interface IKeytipsTestState {
  currButton: string;
}

export class KeytipsDynamicExample extends React.Component<{}, IKeytipsTestState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currButton: 'Button1'
    };
  }

  /* tslint:disable:jsx-no-lambda */
  public render(): JSX.Element {
    const startSequence = this.state.currButton === 'Button1' ? 'gg1' : 'gg2';
    return (
      <div>
        <p>
          There is another special case where controls on the page will change other controls down the chain in the keytip sequence. Take
          the case below; clicking Button1 and Button2 will update the text of Button3. Triggering the keytip for Button1 or Button2 will
          then also change the keytip sequence of Button3, because it can be both a child of Button1 or Button2. For this to work fully,
          Button1 and Button2 should have `hasDynamicChildren: true` in their keytip props
        </p>
        <DefaultButton
          text="Button1"
          onClick={this.setCurrButton('Button1')}
          keytipProps={{ content: 'GG1', keySequences: ['gg1'], onExecute: this.setCurrButton('Button1'), hasDynamicChildren: true }}
        />
        <DefaultButton
          text="Button2"
          onClick={this.setCurrButton('Button2')}
          keytipProps={{ content: 'GG2', keySequences: ['gg2'], onExecute: this.setCurrButton('Button2'), hasDynamicChildren: true }}
        />
        <div>
          <DefaultButton
            text={'Button3, button clicked is: ' + this.state.currButton}
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
