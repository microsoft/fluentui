import * as React from 'react';
import CodeSandboxer from 'react-codesandboxer';

import { CodeSandboxImport, CodeSandboxLanguage } from './types';
import { appTemplate } from './indexTemplates';
import { createPackageJson } from './createPackageJson';

export enum CodeSandboxState {
  Default = 'DEFAULT',
  Loading = 'LOADING',
  Success = 'SUCCESS',
}

type CodeSandboxExporterProps = {
  children: (state: CodeSandboxState, onClick?: (e: React.SyntheticEvent) => void) => React.ReactNode;
  exampleCode: string;
  exampleLanguage: CodeSandboxLanguage;
  exampleName: string;
  imports: Record<string, CodeSandboxImport>;
};

type CodeSandboxExporterState = {
  exampleCode: string;
  examplePath: string;
  state: CodeSandboxState;
  sandboxUrl: string;
};

export class CodeSandboxExporter extends React.Component<CodeSandboxExporterProps, CodeSandboxExporterState> {
  state = {
    exampleCode: '',
    examplePath: '',
    sandboxUrl: '',
    state: CodeSandboxState.Default,
  };
  codeSandboxerRef = React.createRef<{ deployToCSB: Function }>();

  static getDerivedStateFromProps(
    props: CodeSandboxExporterProps,
    state: CodeSandboxExporterState,
  ): Partial<CodeSandboxExporterState> {
    const shouldKeepState = props.exampleCode === state.exampleCode;

    return {
      exampleCode: props.exampleCode,
      examplePath: props.exampleLanguage === 'ts' ? '/example.tsx' : '/example.js',
      sandboxUrl: shouldKeepState ? state.sandboxUrl : '',
      state: shouldKeepState ? state.state : CodeSandboxState.Default,
    };
  }

  handleDeploy = (embedUrl: string, sandboxId: string) => {
    const { examplePath } = this.state;
    const sandboxUrl = `https://codesandbox.io/s/${sandboxId}?module=${examplePath}`;

    this.setState({ sandboxUrl, state: CodeSandboxState.Success });
  };

  handleClick = (e: React.SyntheticEvent) => {
    const { sandboxUrl, state } = this.state;

    e.preventDefault();

    if (state === CodeSandboxState.Default) {
      this.codeSandboxerRef.current.deployToCSB(e);
      this.setState({ state: CodeSandboxState.Loading });

      return;
    }

    if (state === CodeSandboxState.Success) {
      window.open(sandboxUrl);
    }
  };

  render() {
    const { children, exampleLanguage, exampleCode, exampleName, imports } = this.props;
    const { examplePath, state } = this.state;

    const main = exampleLanguage === 'ts' ? 'index.tsx' : 'index.js';
    const template = exampleLanguage === 'ts' ? 'create-react-app-typescript' : 'create-react-app';

    return (
      <>
        <CodeSandboxer
          afterDeploy={this.handleDeploy}
          examplePath={examplePath}
          example={exampleCode}
          name={exampleName}
          providedFiles={{
            [main]: { content: appTemplate },
            'package.json': createPackageJson(main, exampleCode, exampleLanguage, imports),
          }}
          skipRedirect
          ref={this.codeSandboxerRef}
          template={template}
        >
          {/* CodeSandboxer captures ref from children and binds an event handler directly to DOM, this hack allows to avoid this behavior  */}
          {() => null}
        </CodeSandboxer>
        {children(state, this.handleClick)}
      </>
    );
  }
}
