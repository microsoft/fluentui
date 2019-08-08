import React from 'react';
import { PrimaryButton, Stack, Label, mergeStyleSets } from 'office-ui-fabric-react';
import { ITextModel } from '../components/Editor.types';
import { EditorPreview } from '../components';

import * as fabricModule from 'office-ui-fabric-react';

(window as any).Fabric = fabricModule; // tslint:disable-line:no-any

const example = require('!raw-loader!../transpiler/examples/class.txt');

interface ITranspiledOutput {
  outputString?: string;
  error?: string;
}

const classNames = mergeStyleSets({
  error: {
    backgroundColor: '#FEF0F0',
    color: '#FF5E79'
  },
  component: {
    backgroundColor: 'lightgray'
  }
});

interface IAppState {
  error?: string;
  editorHidden?: boolean;
  editor?: HTMLElement;
}

export class App extends React.Component {
  public state: IAppState = {
    editorHidden: true
  };

  public render() {
    const editor = (
      <Stack className={classNames.component} gap={4}>
        {this.state.editor}
        {this.state.error !== undefined && <Label className={classNames.error}>{this.state.error}</Label>}
      </Stack>
    );

    return (
      <div>
        <PrimaryButton text="Show/hide editor" onClick={this.buttonClicked} />
        {!this.state.editorHidden && editor}
        <EditorPreview id="output" error={this.state.error} />
      </div>
    );
  }

  private onChange = (editor: ITextModel) => {
    require.ensure(['../transpiler/transpile'], require => {
      const { evalCode, transpile } = require('../transpiler/transpile');
      transpile(editor).then((output: ITranspiledOutput) => {
        if (output.outputString) {
          const evalCodeError = evalCode(output.outputString, 'output');
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

  private buttonClicked = (): void => {
    if (this.state.editorHidden) {
      require.ensure([], require => {
        const Editor = require('../components/Editor').Editor;
        this.setState({
          editor: (
            <div>
              <div>
                <Label>Typescript + React editor</Label>
              </div>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Editor width={800} height={500} code={example} language="typescript" onChange={this.onChange} />
              </React.Suspense>
            </div>
          ),
          editorHidden: false
        });
      });
    } else {
      this.setState({ editor: null, editorHidden: true });
    }
  };
}
