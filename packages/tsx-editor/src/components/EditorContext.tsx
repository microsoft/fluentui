import * as React from 'react';
import * as monaco from 'monaco-editor';
import { ITextModel } from './Editor.types';

interface IProviderProps {
  code: string;
}

const defaultValues = {
  model: monaco.editor.createModel(''),
  id: '',
  setModel: (newModel: ITextModel) => {
    return;
  },
  setID: (newID: string) => {
    return;
  }
};

export const EditorContext = React.createContext(defaultValues);

export class EditorProvider extends React.Component<IProviderProps> {
  public state = defaultValues;

  public setModel = (newModel: ITextModel) => {
    this.setState({
      model: newModel
    });
  };

  public setID = (newID: string) => {
    this.setState({
      id: newID
    });
  };

  public render() {
    return (
      <EditorContext.Provider
        value={{
          ...this.state,
          setModel: this.setModel,
          setID: this.setID
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    );
  }
}
