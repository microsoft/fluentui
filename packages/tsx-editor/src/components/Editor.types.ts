import { Uri } from 'monaco-editor';

export interface ITextModel {
  id: string;
  uri: Uri;
}

export interface IEditorProps {
  width: number | string;
  height: number | string;
  language: string;
  code: string;
  onChange: (model: ITextModel) => void;
}
