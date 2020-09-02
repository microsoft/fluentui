import { prettifyCode } from '@fluentui/docs-components';
import * as _ from 'lodash';
import * as React from 'react';

import { ExampleSource } from '../../../types';
import { componentAPIs as APIdefinitions, ComponentAPIs } from './componentAPIs';
import getExampleModule from './getExampleModule';

export type ComponentSourceManagerRenderProps = ComponentSourceManagerState & {
  defaultExport: React.ElementType;
  namedExports: { [key: string]: React.ElementType };
  handleCodeAPIChange: (newApi: keyof ComponentAPIs) => void;
  handleCodeChange: (newCode: string) => void;
  handleCodeFormat: () => void;
  handleCodeLanguageChange: (newLanguage: ComponentSourceManagerLanguage) => void;
  handleCodeReset: () => void;
};

export type ComponentSourceManagerLanguage = 'js' | 'ts';

export type ComponentSourceManagerProps = {
  examplePath: string;
  children: (renderProps: ComponentSourceManagerRenderProps) => React.ReactNode;
};

type ComponentSourceManagerAPIs = ComponentAPIs<{
  defaultExport: React.ElementType;
  namedExports: { [key: string]: React.ElementType };
  sourceCode: ExampleSource | undefined;
  supported: boolean;
}>;

export type ComponentSourceManagerState = {
  currentCodeLanguage: ComponentSourceManagerLanguage;
  currentCodeAPI: keyof ComponentAPIs;
  currentCodePath: string;

  componentAPIs: ComponentSourceManagerAPIs;
  currentCode?: string;
  formattedCode?: string;
  originalCode?: string;

  canCodeBeFormatted: boolean;
  wasCodeChanged: boolean;
};

export default class ComponentSourceManager extends React.Component<
  ComponentSourceManagerProps,
  ComponentSourceManagerState
> {
  constructor(props: ComponentSourceManagerProps) {
    super(props);

    const componentAPIs = _.mapValues(APIdefinitions, (definition, name: keyof ComponentAPIs) => {
      const module = getExampleModule(props.examplePath, name);

      return {
        ...definition,
        defaultExport: module && module.defaultExport,
        namedExports: module && module.namedExports,
        sourceCode: module ? module.source : '',
        supported: !!module,
      };
    }) as ComponentSourceManagerAPIs;

    this.state = {
      currentCodeLanguage: 'js' as ComponentSourceManagerLanguage,
      currentCodeAPI: _.findLastKey(componentAPIs, { supported: true }) as keyof ComponentAPIs,
      currentCodePath: '',

      componentAPIs,
      canCodeBeFormatted: false,
      wasCodeChanged: false,
    };
  }

  static getDerivedStateFromProps(
    props: ComponentSourceManagerProps,
    state: ComponentSourceManagerState,
  ): Partial<ComponentSourceManagerState> {
    const { examplePath } = props;
    const { componentAPIs, currentCodeAPI, currentCodeLanguage, currentCode: storedCode, formattedCode } = state;

    if (!componentAPIs[currentCodeAPI]) {
      throw new Error(`Cannot find sources for ${examplePath}`);
    }

    const sourceCodes = componentAPIs[currentCodeAPI].sourceCode;
    const originalCode = sourceCodes[currentCodeLanguage];

    const currentCode = typeof storedCode === 'string' ? storedCode : originalCode;
    const currentCodePath = examplePath + componentAPIs[currentCodeAPI].fileSuffix;

    const wasCodeChanged = originalCode !== currentCode;
    const canCodeBeFormatted = wasCodeChanged && currentCode !== formattedCode;

    return {
      currentCode,
      currentCodePath,
      originalCode,

      canCodeBeFormatted,
      wasCodeChanged,
    };
  }

  handleCodeAPIChange = (newAPI: keyof ComponentAPIs): void => {
    this.setState({
      currentCodeAPI: newAPI,
      currentCode: undefined,
    });
  };

  handleCodeChange = (newCode: string): void => {
    this.setState({ currentCode: newCode });
  };

  handleCodeFormat = (): void => {
    const { currentCode, currentCodeLanguage } = this.state;
    const prettierParser = currentCodeLanguage === 'ts' ? 'typescript' : 'babel';

    try {
      const formattedCode = prettifyCode(currentCode, prettierParser);

      this.setState({ currentCode: formattedCode, formattedCode });
    } catch (e) {}
  };

  handleCodeReset = (): void => {
    this.setState({ currentCode: undefined, formattedCode: undefined });
  };

  handleLanguageChange = (newLanguage: ComponentSourceManagerLanguage): void => {
    this.setState({
      currentCodeLanguage: newLanguage,
      currentCode: undefined,
    });
  };

  render() {
    return this.props.children({
      ...this.state,
      defaultExport: this.state.componentAPIs[this.state.currentCodeAPI].defaultExport,
      namedExports: this.state.componentAPIs[this.state.currentCodeAPI].namedExports,
      handleCodeAPIChange: this.handleCodeAPIChange,
      handleCodeChange: this.handleCodeChange,
      handleCodeFormat: this.handleCodeFormat,
      handleCodeReset: this.handleCodeReset,
      handleCodeLanguageChange: this.handleLanguageChange,
    });
  }
}
