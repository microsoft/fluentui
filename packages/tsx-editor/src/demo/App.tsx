import React from 'react';
import { PrimaryButton, Stack, mergeStyleSets, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { ITextModel } from '../components/Editor.types';
import { EditorPreview } from '../components/index';
import * as editorModule from '../components/Editor';

import * as fabricModule from 'office-ui-fabric-react';

(window as any).Fabric = fabricModule; // tslint:disable-line:no-any

const example = require('!raw-loader!../transpiler/examples/class.txt');
const outputId = 'output';

interface ITranspiledOutput {
  outputString?: string;
  error?: string;
}

const classNames = mergeStyleSets({
  component: {
    border: '1px solid lightgray'
  }
});

interface IAppState {
  error?: string;
  editorHidden?: boolean;
  editorModule?: typeof editorModule;
}

const width = 800;
const height = 500;

export class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    editorHidden: true
  };

  public render() {
    return (
      <Stack styles={{ root: { width, margin: '0 auto' } }} tokens={{ childrenGap: 20 }}>
        <h1>Typescript + React editor</h1>
        <Stack.Item grow={false}>
          <PrimaryButton text="Show/hide editor" onClick={this._buttonClicked} />
        </Stack.Item>
        {!this.state.editorHidden && (
          <div className={classNames.component}>
            {this.state.editorModule ? (
              <editorModule.Editor width={width} height={height} code={example} language="typescript" onChange={this._onChange} />
            ) : (
              <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height } }}>
                <Spinner size={SpinnerSize.large} label="Loading editor..." />
              </Stack>
            )}
          </div>
        )}
        <EditorPreview id={outputId} error={this.state.error} />
      </Stack>
    );
  }

  private _onChange = (model: ITextModel) => {
    require.ensure(['../transpiler/transpile'], require => {
      const { evalCode, transpile } = require('../transpiler/transpile');
      transpile(model).then((output: ITranspiledOutput) => {
        if (output.outputString) {
          const evalCodeError = evalCode(output.outputString, outputId);
          if (evalCodeError) {
            this.setState({
              error: evalCodeError.error
            });
          } else {
            this.setState({
              error: undefined
            });
          }
        } else {
          this.setState({
            error: output.error
          });
        }
      });
    });
  };

  private _buttonClicked = (): void => {
    if (this.state.editorHidden) {
      this.setState({ editorHidden: false }, () => {
        if (!this.state.editorModule) {
          require.ensure([], require => {
            this.setState({ editorModule: require('../components/Editor') });
          });
        }
      });
    } else {
      this.setState({ error: undefined, editorHidden: true });
    }
  };
}
