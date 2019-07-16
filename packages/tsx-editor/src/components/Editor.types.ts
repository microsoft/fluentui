import { Uri } from 'monaco-editor';

export interface ITextModel {
  id: string;
  uri: Uri;
}

export interface IEditorProps {
  width: number | string;
  height: number | string;
  code: string;
  language: string;
  onChange: (model: ITextModel) => void;
}
