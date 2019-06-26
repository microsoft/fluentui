import { PrimaryButton, Stack, Label, mergeStyleSets } from 'office-ui-fabric-react';
import { ITranspiledOutput } from '../transpiler/transpile.types';
import React from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { ITextModel } from '../components/Editor.types';
initializeIcons();

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
        {!this.state.editorHidden && this.state.editor}
        {this.state.error !== undefined && <Label className={classNames.error}>`{this.state.error}`</Label>}
      </Stack>
    );

    return (
      <div>
        <PrimaryButton onClick={this.buttonClicked} />
        {!this.state.editorHidden && editor}
        <div id="output" />
      </div>
    );
  }

  private onChange = (editor: ITextModel) => {
    require.ensure([], require => {
      const transpile = require('../transpiler/transpile').transpile;
      const _evalCode = require('../transpiler/transpile')._evalCode;
      transpile(editor).then((output: ITranspiledOutput) => {
        if (output.outputString) {
          const evaledCode = _evalCode(output.outputString);
          if (evaledCode.error) {
            this.setState({
              error: evaledCode.error
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
                <Editor width={800} height={500} code="" language="typescript" onChange={this.onChange} />
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
