import * as monaco from 'monaco-editor';

export interface ITextModel {
  id: string;
  uri: monaco.Uri;
}

export interface IEditorProps {
  width: number;
  height: number;
  code: string;
  language: string;
  onChange: (code: string) => void;
}
